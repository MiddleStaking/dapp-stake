import React, { FC, useEffect } from 'react';

// import {
//   useGetAccountInfo,
//   transactionServices
// } from '@elrondnetwork/dapp-core';
// import {
//   decodeUnsignedNumber,
//   ContractFunction,
//   ProxyProvider,
//   AddressValue,
//   Address,
//   Query,
//   decodeString,
//   decodeBigNumber
// } from '@elrondnetwork/erdjs';
import moment from 'moment';
import { decimals, denomination } from 'config';

import Withdrawal from './components/Withdrawal';
import styles from './styles.module.scss';
import {
  useGetAccountInfo,
  useGetActiveTransactionsStatus,
  useGetNetworkConfig
} from '@multiversx/sdk-dapp/hooks';
import {
  ApiNetworkProvider,
  ProxyNetworkProvider
} from '@multiversx/sdk-network-providers/out';
import {
  Address,
  AddressValue,
  ContractFunction,
  decodeBigNumber,
  decodeString,
  decodeUnsignedNumber,
  Query
} from '@multiversx/sdk-core/out';

import { refreshAccount } from '@multiversx/sdk-dapp/utils/account';
import { smartContract } from 'pages/Dashboard/helper/smartContract';
import denominate from 'pages/Dashboard/helper/denominate';
import { UndelegateStakeListType } from 'pages/Dashboard/context/state';

const Withdrawals: FC = () => {
  // const dispatch = useDispatch();
  const { network } = useGetNetworkConfig();
  const { account, address } = useGetAccountInfo();
  // const { undelegatedStakeList } = useGlobalContext();
  const { success } = useGetActiveTransactionsStatus();

  const [tab, setTab] = React.useState([]);

  const getUndelegatedStakeList = async (): Promise<void> => {
    try {
      const proxy = new ProxyNetworkProvider(network.apiAddress);

      const query = smartContract.createQuery({
        func: new ContractFunction('getUserUnDelegatedList'),
        args: [new AddressValue(new Address(address))]
      });
      const [data, config, status] = await Promise.all([
        proxy.queryContract(query),
        proxy.getNetworkConfig(),
        proxy.getNetworkStatus()
      ]);

      const payload = data
        .getReturnDataParts()
        .reduce((total: any, item, index, array) => {
          if (index % 2 !== 0) {
            return total;
          } else {
            const next = array[index + 1];
            const getTime = (): number => {
              const epochsChangesRemaining = decodeUnsignedNumber(next);
              const roundsRemainingInEpoch =
                config.RoundsPerEpoch - status.RoundsPassedInCurrentEpoch;
              const roundEpochComplete =
                epochsChangesRemaining > 1
                  ? (epochsChangesRemaining - 1) * config.RoundsPerEpoch
                  : 0;

              return (
                moment().unix() +
                ((roundsRemainingInEpoch + roundEpochComplete) *
                  config.RoundDuration) /
                  1000
              );
            };

            const current: any = {
              timeLeft: decodeString(next) === '' ? 0 : getTime(),
              value: denominate({
                input: decodeBigNumber(item).toFixed(),
                decimals,
                denomination
              })
            };

            const exists = total.find(
              (withdrawal: UndelegateStakeListType) =>
                withdrawal.timeLeft === withdrawal.timeLeft
            );

            const value = exists
              ? (parseInt(exists.value) + parseInt(current.value)).toFixed()
              : 0;

            if (exists && current.timeLeft === exists.timeLeft) {
              return [
                ...(total.length > 1 ? total : []),
                {
                  ...exists,
                  value
                }
              ];
            } else {
              return [...total, current];
            }
          }
        }, []);

      setTab(
        payload.sort(
          (alpha: UndelegateStakeListType, beta: UndelegateStakeListType) =>
            alpha.timeLeft - beta.timeLeft
        )
      );

      return payload.sort(
        (alpha: UndelegateStakeListType, beta: UndelegateStakeListType) =>
          alpha.timeLeft - beta.timeLeft
      );
      // dispatch({
      //   type: 'getUndelegatedStakeList',
      //   undelegatedStakeList: {
      //     status: 'loaded',
      //     error: null,
      // data: payload.sort(
      //   (alpha: UndelegateStakeListType, beta: UndelegateStakeListType) =>
      //     alpha.timeLeft - beta.timeLeft
      // )
      //   }
      // });
    } catch (error) {
      console.log(error);

      return;
      // dispatch({
      //   type: 'getUndelegatedStakeList',
      //   undelegatedStakeList: {
      //     status: 'error',
      //     data: null,
      //     error
      //   }
      // });
    }
  };

  const fetchUndelegatedStakeList = () => {
    if (tab) {
      getUndelegatedStakeList();
    }
  };

  const refetchUndelegatedStakeList = () => {
    if (success && tab) {
      getUndelegatedStakeList();
    }
  };

  useEffect(fetchUndelegatedStakeList, []);
  useEffect(refetchUndelegatedStakeList, [success]);

  if (!tab || tab.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.withdrawals} withdrawals`}>
      <div className={styles.heading}>
        <span className={styles.title}>Pending Withdrawals</span>
      </div>

      <div className={styles.body}>
        {tab.map((withdrawal: UndelegateStakeListType) => (
          <Withdrawal key={withdrawal.timeLeft} {...withdrawal} />
        ))}
      </div>
    </div>
  );
};

export default Withdrawals;
