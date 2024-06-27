//stack.ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_ec2 as ec2, aws_iam as iam } from 'aws-cdk-lib';
import {
	aws_s3 as s3,
	aws_s3_deployment as s3deploy,
	aws_cloudfront as cloudfront,
	aws_cloudfront_origins as origins,
} from 'aws-cdk-lib';

export class stack extends cdk.Stack {
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
		// 	ec2.Peer.anyIpv4(),
		// 	ec2.Port.tcp(80),
		// 	'allow HTTP access from anywhere',
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

		// role.addToPolicy(
		// 	new iam.PolicyStatement({
		// 		effect: iam.Effect.ALLOW,
		// 		actions: ['secretsmanager:GetSecretValue'],
		// 		resources: [
		// 			'arn:aws:secretsmanager:eu-west-2:788798427985:secret:gaf_secret-KG9WoL',
		// 		],
		// 	}),
		// );

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
			'sudo yum update -y',
			'sudo yum install -y nginx',
			'echo "Nginx installed" | sudo tee -a /var/log/user-data.log',
			'sudo systemctl start nginx',
			'sudo systemctl enable nginx',
			'echo "Nginx started and enabled" | sudo tee -a /var/log/user-data.log',
			'sudo yum install -y git',
			'echo "Git installed" | sudo tee -a /var/log/user-data.log',
			'curl -sL https://rpm.nodesource.com/setup_20.x | sudo bash -',
			'sudo yum install -y nodejs',
			'echo "Node.js installed" | sudo tee -a /var/log/user-data.log',
			'cd /home/ec2-user',
			'git clone https://github.com/fac29/gaf-back.git',
			'echo "Repository cloned" | sudo tee -a /var/log/user-data.log',
			'cd gaf-back',
			'echo "DB_FILE=gaf_database.sqlite" > .env',
			'echo "COOKIE_SECRET=gsdfhj345q78yrsdghj£$kvhjsd£$asdfg" >> .env',
			'echo "Environment file created" | sudo tee -a /var/log/user-data.log',
			'npm ci',
			'echo "Dependencies installed" | sudo tee -a /var/log/user-data.log',
			'sudo npm install -g pm2',
			'pm2 start npm --name "gaf-back" -- run production',
			'pm2 startup',
			'sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user',
			'pm2 save',
			'echo "Application started with PM2" | sudo tee -a /var/log/user-data.log',
			// 'sudo tee /etc/nginx/conf.d/gaf-back.conf > /dev/null <<EOT',
			// 'server {',
			// '    listen 80;',
			// '    server_name _;',
			// '    location / {',
			// '        proxy_pass http://localhost:3000;',
			// '        proxy_http_version 1.1;',
			// '        proxy_set_header Upgrade $http_upgrade;',
			// "        proxy_set_header Connection 'upgrade';",
			// '        proxy_set_header Host $host;',
			// '        proxy_cache_bypass $http_upgrade;',
			// '    }',
			// '}',
			// 'EOT',
			// 'sudo nginx -t',
			// 'sudo systemctl reload nginx',
			// 'echo "Nginx configuration updated" | sudo tee -a /var/log/user-data.log',
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

		// // Store the instance public IP
		// this.instancePublicIp = instance.instancePublicIp;

		// // Output the EC2 instance public IP
		// new cdk.CfnOutput(this, 'InstancePublicIP', {
		// 	value: this.instancePublicIp,
		// 	description: 'Public IP of the EC2 instance',
		// 	exportName: 'BackendInstancePublicIp',
		// });

		//******************** */
		//FRONTEND
		// /********************* */

		// Define an S3 bucket
		const uniqueBucketName = `frontendbucket-${this.node.addr}`;
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

		// Create .env file content
		//const envFileContent = `VITE_API_URL=http://${instance.instancePublicIp}:3000\n`;

		////BUILD PROJECT

		// Deploy local files to the S3 bucket
		new s3deploy.BucketDeployment(this, 'DeployApp', {
			sources: [
				s3deploy.Source.asset('./dist'),
				//s3deploy.Source.data('.env', envFileContent),
			],
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
	}
}
