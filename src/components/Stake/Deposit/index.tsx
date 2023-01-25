import React, { FC, MouseEvent } from 'react';

import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';

import Action, { Submit } from 'components/Action';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';

import styles from './styles.module.scss';

const Delegate: FC = () => {
  const { network } = useGetNetworkConfig();
  const { account } = useGetAccountInfo();

  return (
    <div className={`${styles.wrapper} delegate-wrapper`}>
      <Action
        title='Delegate Now'
        description={`Select the amount of ${network.egldLabel} you want to delegate.`}
        trigger={<div className={styles.trigger}>Delegate</div>}
        render={<div className={styles.delegate}></div>}
      />
    </div>
  );
};

export default Delegate;
