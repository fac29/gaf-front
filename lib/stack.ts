import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

export class NewStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// Define an S3 bucket resource
		const uniqueBucketName = `backendbucket-${this.node.addr}`;
		const myBucket = new s3.Bucket(this, 'MyBucket', {
			bucketName: uniqueBucketName,
			versioned: true,
			removalPolicy: cdk.RemovalPolicy.DESTROY, // Optional: Automatically delete the bucket when the stack is deleted
			autoDeleteObjects: true, // Optional: Automatically delete objects in the bucket when the bucket is deleted
		});

		// Deploy local files to the S3 bucket
		new s3deploy.BucketDeployment(this, 'DeployApp', {
			sources: [s3deploy.Source.asset('./bin')],
			destinationBucket: myBucket,
			// destinationKeyPrefix: 'app/', // optional prefix in the bucket
		});

		// CloudFormation output for your S3 bucket name
		new cdk.CfnOutput(this, 'myBucketNameOutput', {
			value: myBucket.bucketName,
		});
	}
}
