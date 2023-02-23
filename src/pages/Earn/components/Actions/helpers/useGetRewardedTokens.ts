import { useEffect, useState } from 'react';
import {
  ContractFunction,
  ResultsParser,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';

import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

export const useGetRewardedTokens = (stakedToken: string) => {
  const { network } = useGetNetworkConfig();
  const [rewardedTokens, setRewardedTokens] = useState<string[]>([]);
  const time = new Date();

  const getRewardedTokens = async () => {
    //using storage to reduce calls
    const expire_test = Number(
      localStorage.getItem('rewarded_tokens_' + stakedToken + '_expire')
    );
    if (time.getTime() < expire_test) {
      const storage = localStorage.getItem('rewarded_tokens_' + stakedToken);
      const tokens = storage?.split(',');

      setRewardedTokens(tokens ? tokens : []);
      return;
    }

    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getRewardedTokens'),
        args: [new TokenIdentifierValue(stakedToken)]
      });
      const proxy = new ProxyNetworkProvider(network.apiAddress);
      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getRewardedTokens');
      const { firstValue: tokens } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      setRewardedTokens(tokens?.valueOf()?.toString(10).split(','));

      //storage of 15 minutes
      const expire = time.getTime() + 1000 * 10;
      //const expire = time.getTime() + 1000 * 60 * 15;
      localStorage.setItem(
        'rewarded_tokens_' + stakedToken,
        tokens?.valueOf()?.toString(10).split(',')
      );
      localStorage.setItem(
        'rewarded_tokens_' + stakedToken + '_expire',
        expire.toString()
      );
    } catch (err) {
      console.error('Unable to call getRewardedTokens', err);
    }
  };

  useEffect(() => {
    getRewardedTokens();
  }, [stakedToken]);

  return rewardedTokens;
};
