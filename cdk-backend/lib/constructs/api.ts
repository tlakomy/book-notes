import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as lambda from '@aws-cdk/aws-lambda';
import * as path from 'path';

type ApiProps = {};

export class Api extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props?: ApiProps) {
    super(scope, id);

    const api = new appsync.GraphqlApi(this, 'Api', {
      name: 'book-notes-appsync-api',
      schema: appsync.Schema.fromAsset(
        path.resolve(__dirname, '../../../schema.graphql'),
      ),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
      },
      xrayEnabled: true,
    });

    new cdk.CfnOutput(this, 'GraphQLAPIURL', {
      value: api.graphqlUrl,
    });

    // Prints out the AppSync GraphQL API key to the terminal
    new cdk.CfnOutput(this, 'GraphQLAPIKey', {
      value: api.apiKey || '',
    });

    // Example of adding a lambda function data source

    // const notesLambda = new lambda.Function(this, 'AppSyncNotesHandler', {
    //   runtime: lambda.Runtime.NODEJS_12_X,
    //   handler: 'appsync.handler',
    //   code: lambda.Code.fromAsset('lambda-fns'),
    // });

    // const lambdaDataSource = api.addLambdaDataSource(
    //   'lambdaDataSource',
    //   notesLambda,
    // );
  }
}
