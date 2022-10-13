import { module } from 'angular';

import { CloudProviderRegistry, STAGE_ARTIFACT_SELECTOR_COMPONENT_REACT, YAML_EDITOR_COMPONENT } from '@spinnaker/core';

import logo from './logo/cloudrun.logo.png';
import { KUBERNETES_ANNOTATION_CUSTOM_SECTIONS } from './manifest/annotationCustomSections.component';
import { KUBERNETES_MANIFEST_ARTIFACT } from './manifest/artifact/artifact.component';
import { KUBERNETES_MANIFEST_DELETE_CTRL } from './manifest/delete/delete.controller';
import { JSON_EDITOR_COMPONENT } from './manifest/editor/json/jsonEditor.component';
import { KUBERNETES_MANIFEST_EVENTS } from './manifest/manifestEvents.component';
import { KUBERNETES_MANIFEST_IMAGE_DETAILS } from './manifest/manifestImageDetails.component';
import { KUBERNETES_MANIFEST_LABELS } from './manifest/manifestLabels.component';
import { KUBERNETES_MANIFEST_QOS } from './manifest/manifestQos.component';
import { KUBERNETES_MANIFEST_RESOURCES } from './manifest/manifestResources.component';
import { KUBERNETES_ROLLING_RESTART } from './manifest/rollout/RollingRestart';
import { KUBERNETES_MANIFEST_PAUSE_ROLLOUT_CTRL } from './manifest/rollout/pause.controller';
import { KUBERNETES_MANIFEST_RESUME_ROLLOUT_CTRL } from './manifest/rollout/resume.controller';
import { KUBERNETES_MANIFEST_UNDO_ROLLOUT_CTRL } from './manifest/rollout/undo.controller';
import { KUBERNETES_MANIFEST_SCALE_CTRL } from './manifest/scale/scale.controller';
import { KUBERNETES_MANIFEST_SELECTOR } from './manifest/selector/selector.component';
import { KUBERNETES_MANIFEST_CONDITION } from './manifest/status/condition.component';
import { KUBERNETES_MANIFEST_STATUS } from './manifest/status/status.component';
import './pipelines/stages';
import './pipelines/stages';
import { KUBERNETES_FIND_ARTIFACTS_FROM_RESOURCE_STAGE } from './pipelines/stages/findArtifactsFromResource/findArtifactsFromResourceStage';
import { KUBERNETES_SCALE_MANIFEST_STAGE } from './pipelines/stages/scaleManifest/scaleManifestStage';
import { KUBERNETES_DISABLE_MANIFEST_STAGE } from './pipelines/stages/traffic/disableManifest.stage';
import { KUBERNETES_ENABLE_MANIFEST_STAGE } from './pipelines/stages/traffic/enableManifest.stage';
import { KUBERNETES_UNDO_ROLLOUT_MANIFEST_STAGE } from './pipelines/stages/undoRolloutManifest/undoRolloutManifestStage';
import './pipelines/validation/manifestSelector.validator';

import './logo/cloudrun.logo.less';

export const CLOUDRUN_MODULE = 'spinnaker.cloudrun';

const requires = [
  KUBERNETES_MANIFEST_DELETE_CTRL,
  KUBERNETES_MANIFEST_SCALE_CTRL,
  KUBERNETES_MANIFEST_UNDO_ROLLOUT_CTRL,
  KUBERNETES_MANIFEST_PAUSE_ROLLOUT_CTRL,
  KUBERNETES_MANIFEST_RESUME_ROLLOUT_CTRL,
  KUBERNETES_MANIFEST_STATUS,
  KUBERNETES_MANIFEST_CONDITION,
  KUBERNETES_MANIFEST_ARTIFACT,
  KUBERNETES_SCALE_MANIFEST_STAGE,
  KUBERNETES_UNDO_ROLLOUT_MANIFEST_STAGE,
  KUBERNETES_FIND_ARTIFACTS_FROM_RESOURCE_STAGE,
  KUBERNETES_MANIFEST_SELECTOR,
  KUBERNETES_MANIFEST_LABELS,
  KUBERNETES_MANIFEST_EVENTS,
  KUBERNETES_MANIFEST_RESOURCES,
  KUBERNETES_MANIFEST_QOS,
  KUBERNETES_ANNOTATION_CUSTOM_SECTIONS,
  KUBERNETES_MANIFEST_IMAGE_DETAILS,
  YAML_EDITOR_COMPONENT,
  JSON_EDITOR_COMPONENT,
  KUBERNETES_ENABLE_MANIFEST_STAGE,
  KUBERNETES_DISABLE_MANIFEST_STAGE,
  STAGE_ARTIFACT_SELECTOR_COMPONENT_REACT,
  KUBERNETES_ROLLING_RESTART,
];

module(CLOUDRUN_MODULE, requires).config(() => {
  CloudProviderRegistry.registerProvider('cloudrun', {
    name: 'Cloudrun',
    logo: {
      path: logo,
    },
  });
});
