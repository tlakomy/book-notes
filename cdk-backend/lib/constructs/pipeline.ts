import * as cdk from '@aws-cdk/core';
import * as codePipeline from '@aws-cdk/aws-codepipeline';
import * as codePipelineActions from '@aws-cdk/aws-codepipeline-actions';
import * as cdkPipeline from '@aws-cdk/pipelines';

type PipelineProps = {};

export class Pipeline extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props?: PipelineProps) {
    super(scope, id);

    const sourceArtifact = new codePipeline.Artifact();
    const cloudAssemblyArtifact = new codePipeline.Artifact();

    // const pipeline = new cdkPipeline.CdkPipeline(this, 'Pipeline', {
    //   pipelineName: 'BookNotesPipeline',
    //   cloudAssemblyArtifact,
    // });
  }
}
