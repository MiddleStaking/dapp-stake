import { useEffect, useState } from 'react';
import {
  Address,
  AddressValue,
  ContractFunction,
  ResultsParser,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';

import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

export const useGetStakingPositionRewards = (
  stakedToken: any,
  rewardedToken: any,
  stake_amount: bigint,
  hasPendingTransactions: boolean
) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const [rewardsAmount, setRewardsAmount] = useState<bigint>(BigInt(1));
  const [time, setTime] = useState(new Date());

  const getStakingPositionRewards = async () => {
    //Dont call if no stake
    if (stake_amount == BigInt(0) || address == '') {
      return;
    }
    if (hasPendingTransactions == true) {
      return;
    }
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('calculateRewardsForUser'),
        args: [
          new AddressValue(new Address(address)),
          new TokenIdentifierValue(stakedToken),
          new TokenIdentifierValue(rewardedToken)
        ]
      });

      const proxy = new ProxyNetworkProvider(network.apiAddress);
      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint(
        'calculateRewardsForUser'
      );
      const { firstValue: amount } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      const position =
        amount?.valueOf()?.toString(10) === undefined
          ? '0'
          : amount?.valueOf()?.toString(10);
      setRewardsAmount(position);
    } catch (err) {
      console.error('Unable to call calculateRewardsForUser', err);
    }
  };

  useEffect(() => {
    if (stake_amount > BigInt(0)) {
      getStakingPositionRewards();
    }

    const interval = setInterval(() => {
      setTime(new Date());
      if (stake_amount > BigInt(0)) {
        getStakingPositionRewards();
      } else {
        stake_amount = BigInt(0);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [stake_amount, hasPendingTransactions, time]);

  return rewardsAmount;
};
