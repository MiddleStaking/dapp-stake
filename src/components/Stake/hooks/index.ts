import { useEffect, useState } from 'react';

import {
  Address,
  AddressValue,
  Query,
  ContractFunction,
  decodeBigNumber,
  DevnetEntrypoint,
  Abi
} from '@multiversx/sdk-core';

import { useGetAccountInfo } from 'lib';
import { useGetPendingTransactions } from 'lib';
import { useGetSuccessfulTransactions } from 'lib';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
import BigNumber from 'bignumber.js';

import { local_network, minDust } from 'config';
import { useDispatch, useGlobalContext } from 'context';
import { denominated } from 'helpers/denominate';
import getPercentage from 'helpers/getPercentage';
import { nominateValToHex } from 'helpers/nominate';
import useTransaction from 'helpers/useTransaction';

export type ActionCallbackType = () => void;
export interface DelegationPayloadType {
  amount: string;
}

const useStakeData = () => {
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);

  const { account, address } = useGetAccountInfo();
  const { sendTransaction } = useTransaction();
  const pending = useGetPendingTransactions();
  const hasPendingTransactions = pending.length > 0;
  const successfulTransactions = useGetSuccessfulTransactions();
  const hasSuccessfulTransactions = successfulTransactions.length > 0;
  const { contractDetails, userClaimableRewards, totalActiveStake } =
    useGlobalContext();

  const onDelegate =
    (callback: ActionCallbackType) =>
    async (data: DelegationPayloadType): Promise<void> => {
      try {
        await sendTransaction({
          value: data.amount,
          type: 'delegate',
          args: ''
        });

        setTimeout(callback, 250);
      } catch (error) {
        console.error(error);
      }
    };

  const onUndelegate =
    (callback: ActionCallbackType) =>
    async (data: DelegationPayloadType): Promise<void> => {
      try {
        await sendTransaction({
          value: '0',
          type: 'unDelegate',
          args: nominateValToHex(data.amount.toString())
        });

        setTimeout(callback, 250);
      } catch (error) {
        console.error(error);
      }
    };

  const onRedelegate =
    (callback: ActionCallbackType) => async (): Promise<void> => {
      try {
        await sendTransaction({
          value: '0',
          type: 'reDelegateRewards',
          args: ''
        });

        setTimeout(callback, 250);
      } catch (error) {
        console.error(error);
      }
    };

  const onClaimRewards =
    (callback: ActionCallbackType) => async (): Promise<void> => {
      try {
        await sendTransaction({
          value: '0',
          type: 'claimRewards',
          args: ''
        });

        setTimeout(callback, 250);
      } catch (error) {
        console.error(error);
      }
    };

  const getStakingLimits = () => {
    if (contractDetails.data && totalActiveStake.data) {
      const balance = new BigNumber(account.balance);
      const gasPrice = new BigNumber('12000000');
      const gasLimit = new BigNumber('12000000');
      const available = balance.minus(gasPrice.times(gasLimit));
      const dustful = available.minus(new BigNumber(minDust)).toFixed();

      if (contractDetails.data.withDelegationCap === 'true') {
        const cap = contractDetails.data.delegationCap;
        const stake = totalActiveStake.data;
        const remainder = new BigNumber(cap).minus(new BigNumber(stake));
        const maxed =
          parseInt(getPercentage(denominated(stake), denominated(cap))) >= 100;

        if (remainder.isGreaterThan(available)) {
          return {
            balance: available.toFixed(),
            limit: dustful,
            maxed
          };
        } else {
          return {
            balance: available.toFixed(),
            limit: remainder.gt(0) ? remainder.toFixed() : '0',
            maxed
          };
        }
      } else {
        return {
          balance: available.toFixed(),
          limit: dustful,
          maxed: false
        };
      }
    }

    return {
      balance: '',
      limit: ''
    };
  };
  const entrypoint = new DevnetEntrypoint({ url: local_network.apiAddress });
  const abi = Abi.create({
    endpoints: [
      {
        name: 'getClaimableRewards',
        inputs: [{ name: 'address', type: 'Address' }],
        outputs: [{ name: 'rewards', type: 'BigUint' }]
      }
    ]
  });
  const controller = entrypoint.createSmartContractController(abi);

  const getUserClaimableRewards = async (): Promise<void> => {
    dispatch({
      type: 'getUserClaimableRewards',
      userClaimableRewards: {
        status: 'loading',
        data: null,
        error: null
      }
    });

    try {
      const contractAddress = Address.newFromBech32(
        local_network.delegationContract
      );
      const res: any = await controller.query({
        contract: contractAddress,
        function: 'getClaimableRewards',
        arguments: [new AddressValue(new Address(address))]
      });

      dispatch({
        type: 'getUserClaimableRewards',
        userClaimableRewards: {
          status: 'loaded',
          error: null,
          data: res
            ? denominated(decodeBigNumber(res).toFixed(), {
                decimals: 4
              })
            : '0'
        }
      });
    } catch (error) {
      dispatch({
        type: 'getUserClaimableRewards',
        userClaimableRewards: {
          status: 'error',
          data: null,
          error
        }
      });
    }
  };

  const fetchClaimableRewards = () => {
    if (!userClaimableRewards.data) {
      getUserClaimableRewards();
    }
  };

  const reFetchClaimableRewards = () => {
    if (hasSuccessfulTransactions) {
      getUserClaimableRewards();
    }
  };

  useEffect(fetchClaimableRewards, [userClaimableRewards.data]);
  useEffect(reFetchClaimableRewards, [
    hasSuccessfulTransactions,
    successfulTransactions
  ]);

  useEffect(() => {
    if (hasPendingTransactions && !check) {
      setCheck(true);

      return () => {
        setCheck(false);
      };
    }
  }, [hasPendingTransactions]);

  return {
    onDelegate,
    onUndelegate,
    onRedelegate,
    onClaimRewards,
    getStakingLimits
  };
};

export default useStakeData;
