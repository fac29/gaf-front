import * as cdk from 'aws-cdk-lib';
import { NewStack } from '../lib/stack';

const app = new cdk.App();
// new HelloCdkStack(app, 'HelloCdkStack');
new NewStack(app, 'NewStack');
