import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
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
    });

    new cdk.CfnOutput(this, 'GraphQLAPIURL', {
      value: api.graphqlUrl,
    });

    // Prints out the AppSync GraphQL API key to the terminal
    new cdk.CfnOutput(this, 'GraphQLAPIKey', {
      value: api.apiKey || '',
    });
  }
}
