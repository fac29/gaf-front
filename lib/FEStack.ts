//FEStack.ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
	aws_s3 as s3,
	aws_s3_deployment as s3deploy,
	aws_cloudfront as cloudfront,
	aws_cloudfront_origins as origins,

} from 'aws-cdk-lib';

export class FEStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		//******************** */
		//FRONTEND
		// /********************* */

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
	}
}
