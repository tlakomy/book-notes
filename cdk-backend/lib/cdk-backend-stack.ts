import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';

export class CdkBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(this, 'book-notes-user-pool', {
      selfSignUpEnabled: true,
      accountRecovery: cognito.AccountRecovery.PHONE_AND_EMAIL,
      userVerification: {
        emailStyle: cognito.VerificationEmailStyle.CODE,
      },
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
      },
    });

    // https://docs.amplify.aws/cli/auth/import#import-an-existing-cognito-user-pool
    const nativeAppClient = new cognito.UserPoolClient(
      this,
      'NativeAppClient',
      {
        userPool,
        generateSecret: true,
      },
    );

    const webAppClient = new cognito.UserPoolClient(this, 'WebAppClient', {
      userPool,
    });

    new cdk.CfnOutput(this, 'UserPoolId', {
      value: userPool.userPoolId,
    });

    new cdk.CfnOutput(this, 'WebAppClientId', {
      value: webAppClient.userPoolClientId,
    });

    new cdk.CfnOutput(this, 'NativeAppClientId', {
      value: nativeAppClient.userPoolClientId,
    });
  }
}
