import * as cdk from '@aws-cdk/core';
import { Auth } from './constructs/auth';
import { Api } from './constructs/api';
import { Pipeline } from './constructs/pipeline';

export class CdkBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const auth = new Auth(this, 'book-notes-auth');
    const api = new Api(this, 'book-notes-api');
    const pipeline = new Pipeline(this, 'book-notes-pipeline');
  }
}
