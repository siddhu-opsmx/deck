import { cloneDeep } from 'lodash';
import React from 'react';
import { from as observableFrom, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SETTINGS } from '@spinnaker/core';
import type { IAccountDetails, IStage, IStageConfigProps } from '@spinnaker/core';
import { AccountService, FormikStageConfig } from '@spinnaker/core';

import { DeployStageForm } from './DeployStageForm';
import { ManifestSource } from '../../../manifest/ManifestSource';

interface IDeployStageConfigState {
  accounts: IAccountDetails[];
}

export class DeployStageConfig extends React.Component<IStageConfigProps, IDeployStageConfigState> {
  private stage: IStage;
  private destroy$ = new Subject();

  public constructor(props: IStageConfigProps) {
    super(props);
    this.state = {
      accounts: [],
    };
    const { stage: initialStageConfig } = props;
    const stage = cloneDeep(initialStageConfig);
    if (!stage.source) {
      stage.source = ManifestSource.TEXT;
    }
    if (!stage.skipExpressionEvaluation) {
      stage.skipExpressionEvaluation = false;
    }
    if (!stage.cloudProvider) {
      stage.cloudProvider = 'cloudrun';
    }
    if (!stage.moniker) {
      stage.moniker = {};
    }
    if (!stage.moniker.app) {
      stage.moniker.app = props.application.name;
    }
    // Intentionally initializing the stage config only once in the constructor
    // The stage config is then completely owned within FormikStageConfig's Formik state
    this.stage = stage;
  }

  public componentDidMount() {
    this.fetchAccounts();
  }

  private fetchAccounts = (): void => {
    observableFrom(AccountService.getAllAccountDetailsForProvider('cloudrun'))
      .pipe(takeUntil(this.destroy$))
      .subscribe((accounts: IAccountDetails[]) => {
        const accountsData = accounts.length ? accounts : [SETTINGS.providers.cloudrun.defaults.account];
        this.setState({ accounts: accountsData });
      });
  };

  public componentWillUnmount() {
    this.destroy$.next();
  }

  public render() {
    return (
      <FormikStageConfig
        {...this.props}
        stage={this.stage}
        onChange={this.props.updateStage}
        render={(props) => <DeployStageForm {...props} accounts={this.state.accounts} />}
      />
    );
  }
}
