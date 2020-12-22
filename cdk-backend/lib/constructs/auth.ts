import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';

type AuthProps = {};

export class Auth extends cdk.Construct {
  public readonly userPool: cognito.UserPool;
  public readonly nativeAppClient: cognito.UserPoolClient;
  public readonly webAppClient: cognito.UserPoolClient;

  constructor(scope: cdk.Construct, id: string, props?: AuthProps) {
    super(scope, id);

    this.userPool = new cognito.UserPool(this, 'book-notes-user-pool', {
      selfSignUpEnabled: true,
      accountRecovery: cognito.AccountRecovery.PHONE_AND_EMAIL,
      userVerification: {
        emailStyle: cognito.VerificationEmailStyle.CODE,
      },
      autoVerify: {
        email: true,
      },
      // Yolo driven development
      passwordPolicy: {
        minLength: 6,
        requireDigits: false,
        requireLowercase: false,
        requireSymbols: false,
        requireUppercase: false,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
      },
    });

    // https://docs.amplify.aws/cli/auth/import#import-an-existing-cognito-user-pool
    this.nativeAppClient = new cognito.UserPoolClient(this, 'NativeAppClient', {
      userPool: this.userPool,
      generateSecret: true,
    });

    this.webAppClient = new cognito.UserPoolClient(this, 'WebAppClient', {
      userPool: this.userPool,
    });
  }
}
