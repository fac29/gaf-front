import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
	aws_s3 as s3,
	aws_s3_deployment as s3deploy,
	aws_cloudfront as cloudfront,
	aws_cloudfront_origins as origins,
	aws_ec2 as ec2,
	aws_iam as iam,
} from 'aws-cdk-lib';

export class NewStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		//******************** */
		//FRONTEND
		/********************* */

		// Define an S3 bucket
		const uniqueBucketName = `backendbucket-${this.node.addr}`;
		const myBucket = new s3.Bucket(this, 'MyBucket', {
			bucketName: uniqueBucketName,
			removalPolicy: cdk.RemovalPolicy.DESTROY, // Optional: Automatically delete the bucket when the stack is deleted
			autoDeleteObjects: true, // Optional: Automatically delete objects in the bucket when the bucket is deleted
			publicReadAccess: true, // Allow public read access to the bucket
			websiteIndexDocument: 'index.html',
			websiteErrorDocument: 'index.html', // Route all errors to index.html (for SPA routing)
			blockPublicAccess: {
				blockPublicAcls: false,
				blockPublicPolicy: false,
				ignorePublicAcls: false,
				restrictPublicBuckets: false,
			},
		});

		// Deploy local files to the S3 bucket
		new s3deploy.BucketDeployment(this, 'DeployApp', {
			sources: [s3deploy.Source.asset('./dist')],
			destinationBucket: myBucket,
		});

		// Set up CloudFront distribution for the S3 bucket
		const distribution = new cloudfront.Distribution(this, 'Distribution', {
			defaultBehavior: { origin: new origins.S3Origin(myBucket) },
			defaultRootObject: 'index.html',
		});

		// Output the S3 bucket name and CloudFront URL
		new cdk.CfnOutput(this, 'BucketURL', {
			value: myBucket.bucketWebsiteUrl,
			description: 'The URL of the S3 bucket website',
		});

		new cdk.CfnOutput(this, 'CloudFrontURL', {
			//value: distribution.distributionDomainName,
			value: `http://${distribution.distributionDomainName}`,
			description: 'The URL of the CloudFront distribution',
		});

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

		// Create a new EC2 key pair
		const keyPair = ec2.KeyPair.fromKeyPairName(this, 'KeyPair', 'gafPair');

		// Define the EC2 instance
		const instance = new ec2.Instance(this, 'Instance', {
			vpc,
			instanceType: new ec2.InstanceType('t2.micro'),
			machineImage: new ec2.AmazonLinuxImage(),
			securityGroup,
			role,
			keyPair,
			vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC }, // Ensure the instance is in a public subnet
			associatePublicIpAddress: true, // Ensure the instance has a public IP
		});

		// Add user data to clone the GitHub repo and install dependencies
		instance.addUserData(
			`#!/bin/bash`,
			`sudo yum update -y`,
			`sudo yum install -y git`,
			`curl -sL https://rpm.nodesource.com/setup_20.x | sudo bash -`, // Use Node.js 16.x
			`sudo yum install -y nodejs`, // Install Node.js and npm
			`cd /home/ec2-user`,
			`git clone https://github.com/fac29/gaf-back.git`,
			`cd gaf-back`,
			`npm install`, // Install dependencies
			`npm start` // Start the application
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
