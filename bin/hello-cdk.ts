// CDK Entry point
import * as cdk from 'aws-cdk-lib';
//import { BEStack } from '../lib/BEstack';
//import { FEStack } from '../lib/FEStack';
import { stack } from '../lib/stack';

const app = new cdk.App();

// const beStack = new BEStack(app, 'BEStack');

// new FEStack(app, 'FEStack', {
//   backendUrl: beStack.instancePublicIp,
//   env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }
// });
new stack(app, 'GAFStack', {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  }); 