// CDK Entry point
import * as cdk from 'aws-cdk-lib';
import { BEStack } from '../lib/BEstack';
//import { FEStack } from '../lib/FEStack';

const app = new cdk.App();

new BEStack(app, 'BEStack');
//new FEStack(app, 'FEStack');
