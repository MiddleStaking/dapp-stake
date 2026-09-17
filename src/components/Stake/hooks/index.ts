import { useGetAccountInfo } from 'lib';
import BigNumber from 'bignumber.js';

import { minDust } from 'config';
import { useGlobalContext } from 'context';
import { denominated } from 'helpers/denominate';
import getPercentage from 'helpers/getPercentage';
import { nominateValToHex } from 'helpers/nominate';
import useTransaction from 'helpers/useTransaction';

export type ActionCallbackType = () => void;
export interface DelegationPayloadType {
  amount: string;
}

const useStakeData = () => {
  const { account } = useGetAccountInfo();
  const { sendTransaction } = useTransaction();
  const { contractDetails, totalActiveStake } = useGlobalContext();

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

  return {
    onDelegate,
    onUndelegate,
    onRedelegate,
    onClaimRewards,
    getStakingLimits
  };
};

export default useStakeData;
