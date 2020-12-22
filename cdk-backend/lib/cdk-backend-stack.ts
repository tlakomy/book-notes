import * as cdk from '@aws-cdk/core';
import { Auth } from './constructs/auth';

export class CdkBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const auth = new Auth(this, 'book-notes-auth');

    new cdk.CfnOutput(this, 'UserPoolId', {
      value: auth.userPool.userPoolId,
    });

    new cdk.CfnOutput(this, 'WebAppClientId', {
      value: auth.webAppClient.userPoolClientId,
    });

    new cdk.CfnOutput(this, 'NativeAppClientId', {
      value: auth.nativeAppClient.userPoolClientId,
    });
  }
}
