import type { IStage } from '@spinnaker/core';
import {
  ArtifactReferenceService,
  ExecutionArtifactTab,
  ExecutionDetailsTasks,
  ExpectedArtifactService,
  Registry,
} from '@spinnaker/core';

import { DeployStageConfig } from './DeployStageConfig';
// import { deployValidators } from './deploy.validator';
import { DeployStatus } from './manifestStatus/DeployStatus';

Registry.pipeline.registerStage({
  label: 'Deploy (Cloudrun)',
  description: 'Deploy a Cloudrun manifest yaml/json file.',
  key: 'deployCloudrunManifest',
  cloudProvider: 'cloudrun',
  component: DeployStageConfig,
  executionDetailsSections: [DeployStatus, ExecutionDetailsTasks, ExecutionArtifactTab],
  producesArtifacts: true,
  supportsCustomTimeout: true,
  accountExtractor: (stage: IStage): string[] => (stage.account ? [stage.account] : []),
  configAccountExtractor: (stage: any): string[] => (stage.account ? [stage.account] : []),
  artifactExtractor: ExpectedArtifactService.accumulateArtifacts(['manifestArtifactId', 'requiredArtifactIds']),
  artifactRemover: ArtifactReferenceService.removeArtifactFromFields(['manifestArtifactId', 'requiredArtifactIds']),
});
