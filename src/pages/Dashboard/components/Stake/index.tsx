import React, { FC, ReactNode, MouseEvent } from 'react';

import { faLock, faGift } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from 'assets/Logo';

import Delegate from './components/Delegate';
import Undelegate from './components/Undelegate';
import imagePartalConnexion from '../../../../assets/multiversxPortal.png';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';

import styles from './styles.module.scss';
import {
  getStakingLimits,
  GetUserActiveStake,
  GetUserClaimsReward,
  sendClaimRewards,
  sendReDelegateRewards
} from '../../helper/requestAbi';
import { denominated } from 'pages/Dashboard/helper/denominate';
import modifiable from 'pages/Dashboard/helper/modifiable';

interface ActionType {
  label: string;
  render?: ReactNode;
  transaction?: (value: MouseEvent) => Promise<void>;
}

interface PanelType {
  subicon: ReactNode;
  color: string;
  title: string;
  value: string;
  disabled: boolean;
  actions: Array<ActionType>;
}

const Stake: FC = () => {
  const { network } = useGetNetworkConfig();
  const UserActiveStake = GetUserActiveStake();
  const UserRewaards = GetUserClaimsReward();

  const { isLoading, isEmpty } = {
    isEmpty: UserActiveStake === '0',
    //  && userClaimableRewards.data === '0',
    isLoading: UserActiveStake === '0'
    // || userClaimableRewards.status === 'loading',
    // isError:
    //   userActiveStake.status === 'error' ||
    //   userClaimableRewards.status === 'error'
  };

  const StakingLimits = getStakingLimits();

  const panels: Array<PanelType> = [
    {
      subicon: <FontAwesomeIcon icon={faLock} />,
      color: '#2044F5',
      title: 'Active Delegation',
      // value: denominated(userActiveStake.data || '...', { addCommas: false }),
      value: denominated(UserActiveStake || '...', { addCommas: false }),

      disabled: false,
      actions: [
        {
          render: <Undelegate UserActiveStake={UserActiveStake} />,
          label: 'Undelegate'
        },
        {
          render: <Delegate StakingLimits={StakingLimits} />,
          label: 'Delegate'
        }
      ]
    },
    {
      subicon: <FontAwesomeIcon icon={faGift} />,
      color: '#27C180',
      title: 'Claimable Rewards',
      value: `+ ${denominated(UserRewaards) || '...'}`,
      disabled: !UserRewaards || UserRewaards === '0',
      actions: [
        {
          transaction: sendClaimRewards,
          label: 'Claim Now'
        },
        {
          transaction: sendReDelegateRewards,
          label: 'Redelegate'
        }
      ]
    }
  ];

  return (
    <div
      className={`${modifiable(
        'stake',
        [(isLoading || isEmpty) && 'empty'],
        styles
      )} stake`}
    >
      {isLoading || isEmpty ? (
        <div className={styles.wrapper}>
          <strong className={styles.heading}>
            Welcome to Delegation Dashboard!
          </strong>

          <div className={styles.logo}>
            <Logo />

            <div style={{ background: '#2044F5' }} className={styles.subicon}>
              <FontAwesomeIcon icon={faLock} />
            </div>
          </div>

          <div className={styles.message}>
            {isLoading
              ? 'Retrieving staking data...'
              : 'isError'
              ? 'There was an error trying to retrieve staking data.'
              : `Currently you don't have any ${network.egldLabel} staked.`}
          </div>

          <Delegate StakingLimits={StakingLimits} />
        </div>
      ) : (
        panels.map((panel, index) => (
          <div key={panel.title} className={styles.panel}>
            <div
              className={modifiable('icon', [index > 0 && 'inversed'], styles)}
            >
              {/* <Logo /> */}
              <span>
                <img
                  className={index == 0 ? styles.img : styles.imgRewards}
                  src={imagePartalConnexion}
                  alt='Grapefruit slice atop a pile of other slices'
                ></img>
              </span>
              {index > 0 &&
                Array.from({ length: 4 }).map((item, iteratee) => (
                  <strong
                    key={`plus-${iteratee}`}
                    className={modifiable('plus', [iteratee + 1], styles)}
                  >
                    +
                  </strong>
                ))}

              <div
                style={{ background: panel.color }}
                className={styles.subicon}
              >
                {panel.subicon}
              </div>
            </div>

            <div className={styles.title}>{panel.title}</div>

            <strong className={styles.value}>
              {panel.value} {network.egldLabel}
            </strong>

            <div className={styles.actions}>
              {panel.actions.map((action, iteratee) =>
                action.render ? (
                  <div key={action.label}>{action.render}</div>
                ) : (
                  <button
                    key={action.label}
                    type='button'
                    style={{ background: iteratee ? panel.color : '#303234' }}
                    className={modifiable(
                      'action',
                      [panel.disabled && 'disabled'],
                      styles
                    )}
                    onClick={action.transaction}
                  >
                    {action.label}
                  </button>
                )
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Stake;
