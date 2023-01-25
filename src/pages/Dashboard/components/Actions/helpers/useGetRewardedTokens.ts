import { useEffect, useState } from 'react';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import {
  ContractFunction,
  ResultsParser,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import { smartContract } from './smartContract';
import { defaultToken } from 'config';

const resultsParser = new ResultsParser();

export const useGetRewardedTokens = () => {
  const { network } = useGetNetworkConfig();
  const [rewardedTokens, setRewardedTokens] = useState([]);

  const getRewardedTokens = async () => {
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getRewardedTokens'),
        args: [new TokenIdentifierValue(defaultToken)]
      });
      const proxy = new ProxyNetworkProvider(network.apiAddress);
      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getRewardedTokens');
      const { firstValue: tokens } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );

      setRewardedTokens(tokens?.valueOf()?.toString(10).split(','));
    } catch (err) {
      console.error('Unable to call getRewardedTokens', err);
    }
  };

  useEffect(() => {
    getRewardedTokens();
  }, []);

  return rewardedTokens;
};
