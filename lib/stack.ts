import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_ec2 as ec2, aws_iam as iam } from 'aws-cdk-lib';

export class NewStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		//******************** */
		//BACKEND
		/********************* */
		// Define a VPC
		const vpc = new ec2.Vpc(this, 'VPC', {
			maxAzs: 2, // Default is all AZs in the region
		});

		// Define a security group
		const securityGroup = new ec2.SecurityGroup(this, 'SecurityGroup', {
			vpc,
			description: 'Allow SSH access to EC2 instance',
			allowAllOutbound: true, // Allow outbound traffic by default
		});

		securityGroup.addIngressRule(
			ec2.Peer.anyIpv4(),
			ec2.Port.tcp(22),
			'allow SSH access from anywhere',
		);

		securityGroup.addIngressRule(
			ec2.Peer.anyIpv4(),
			ec2.Port.tcp(3000),
			'allow access to port 3000 from anywhere',
		);

		// securityGroup.addIngressRule(
		// 	ec2.Peer.ipv4('18.132.54.0/29'), // EC2 Instance Connect IP range for eu-west-2 (London)
		// 	ec2.Port.tcp(22),
		// 	'allow EC2 Instance Connect',
		// );

		// Define an IAM role for the EC2 instance
		const role = new iam.Role(this, 'InstanceRole', {
			assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
		});
		role.addManagedPolicy(
			iam.ManagedPolicy.fromAwsManagedPolicyName(
				'AmazonSSMManagedInstanceCore',
			),
		); // Allow SSM access
		role.addManagedPolicy(
			iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3ReadOnlyAccess'),
		); // Optional: Allow read access to S3
		role.addManagedPolicy(
			iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2FullAccess'),
		); // Allow full access to EC2

		// // Custom policy for EC2 Instance Connect
		// const ec2InstanceConnectPolicy = new iam.PolicyStatement({
		// 	effect: iam.Effect.ALLOW,
		// 	actions: [
		// 		'ec2-instance-connect:SendSSHPublicKey',
		// 		'ec2:DescribeInstances',
		// 		'ec2:DescribeInstanceStatus',
		// 	],
		// 	resources: ['*'],
		// });

		// role.addToPolicy(ec2InstanceConnectPolicy);

		// Create a new EC2 key pair
		const keyPair = ec2.KeyPair.fromKeyPairName(this, 'KeyPair', 'gafPair');

		// Define the EC2 instance
		const instance = new ec2.Instance(this, 'Instance', {
			vpc,
			instanceType: new ec2.InstanceType('t2.micro'),
			machineImage: ec2.MachineImage.latestAmazonLinux2023(),
			securityGroup,
			role,
			keyPair,
			vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC }, // Ensure the instance is in a public subnet
			associatePublicIpAddress: true, // Ensure the instance has a public IP
		});

		instance.addUserData(
			'#!/bin/bash',
			'set -e', // Exit on any error
			'sudo touch /var/log/user-data.log',
			'sudo chown ec2-user:ec2-user /var/log/user-data.log',
			'sudo chmod 644 /var/log/user-data.log',
			'echo "Starting user data script" | sudo tee -a /var/log/user-data.log',
			'sudo yum install -y ec2-instance-connect',
			'echo "EC2 Instance Connect installed" | sudo tee -a /var/log/user-data.log',
			'sudo yum update -y',
			'echo "Yum updated" | sudo tee -a /var/log/user-data.log',
			'sudo yum install -y git',
			'echo "Git installed" | sudo tee -a /var/log/user-data.log',
			'curl -sL https://rpm.nodesource.com/setup_20.x | sudo bash -',
			'echo "NodeSource repository added" | sudo tee -a /var/log/user-data.log',
			'sudo yum install -y nodejs',
			'echo "Node.js installed" | sudo tee -a /var/log/user-data.log',
			'node --version | sudo tee -a /var/log/user-data.log',
			'npm --version | sudo tee -a /var/log/user-data.log',
			'cd /home/ec2-user',
			'git clone https://github.com/fac29/gaf-back.git || { echo "Failed to clone repository" | sudo tee -a /var/log/user-data.log; exit 1; }',
			'echo "Repository cloned" | sudo tee -a /var/log/user-data.log',
			'cd gaf-back',
			'echo "DB_FILE=gaf_database.sqlite" > .env',
			'echo "COOKIE_SECRET=gsdfhj345q78yrsdghj£$kvhjsd£$asdfg" >> .env',
			'echo "Environment file created" | sudo tee -a /var/log/user-data.log',
			'npm install || { echo "Failed to install dependencies" | sudo tee -a /var/log/user-data.log; exit 1; }',
			'echo "Dependencies installed" | sudo tee -a /var/log/user-data.log',
			'npm start || { echo "Failed to start application" | sudo tee -a /var/log/user-data.log; exit 1; }',
			'echo "User data script completed" | sudo tee -a /var/log/user-data.log',
		);

		// Output the EC2 instance public IP
		new cdk.CfnOutput(this, 'InstancePublicIP', {
			value: instance.instancePublicIp,
			description: 'Public IP of the EC2 instance',
		});

		// Output the EC2 instance public DNS
		new cdk.CfnOutput(this, 'InstancePublicDNS', {
			value: `https://${instance.instancePublicDnsName}`,
			description: 'Public DNS of the EC2 instance',
		});
	}
}
