import { useEffect, useState } from 'react';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
import {
  Address,
  AddressValue,
  ContractFunction,
  ResultsParser,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import { smartContract } from './smartContract';
import { defaultToken } from 'config';

const resultsParser = new ResultsParser();

export const useGetStakingPositionRewards = () => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const [rewardsAmount, setRewardsAmount] = useState<string>('0');

  const getStakingPositionRewards = async () => {
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('calculateRewardsForUser'),
        args: [
          new AddressValue(new Address(address)),
          new TokenIdentifierValue(defaultToken),
          new TokenIdentifierValue(defaultToken)
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
    getStakingPositionRewards();
  }, []);

  return rewardsAmount;
};
