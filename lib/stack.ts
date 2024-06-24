import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3 as s3 } from 'aws-cdk-lib';

export class NewStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// Define an S3 bucket resource
		const myBucket = new s3.Bucket(this, 'MyBucket', {
			bucketName: 'cubete',
			versioned: true,
			removalPolicy: cdk.RemovalPolicy.DESTROY, // Optional: Automatically delete the bucket when the stack is deleted
			autoDeleteObjects: true, // Optional: Automatically delete objects in the bucket when the bucket is deleted
		});

		// CloudFormation output for your S3 bucket name
		new cdk.CfnOutput(this, 'myBucketNameOutput', {
			value: myBucket.bucketName,
		});
	}
}
