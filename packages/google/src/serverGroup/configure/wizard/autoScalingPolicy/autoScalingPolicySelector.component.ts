import type { IComponentOptions, IController } from 'angular';
import { module } from 'angular';

class GceAutoScalingPolicySelector implements IController {
  public enabled: boolean;
}

const gceAutoScalingPolicySelectorComponent: IComponentOptions = {
  bindings: {
    enabled: '<',
    policy: '=',
    updatePolicy: '<',
  },
  templateUrl: require('./autoScalingPolicySelector.component.html'),
  controller: GceAutoScalingPolicySelector,
};

export const GCE_AUTOSCALING_POLICY_SELECTOR = 'spinnaker.gce.autoScalingPolicy.selector.component';
module(GCE_AUTOSCALING_POLICY_SELECTOR, []).component(
  'gceAutoScalingPolicySelector',
  gceAutoScalingPolicySelectorComponent,
);
