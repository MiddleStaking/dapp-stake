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

export const useGetPayment = (lastUser: string) => {
  const { network } = useGetNetworkConfig();
  const [rewardedTokens, setRewardedTokens] = useState<string>('');

  const getRewardedTokens = async () => {
    if (!lastUser) {
      return;
    }
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getTokenPay')
      });
      const proxy = new ProxyNetworkProvider(network.apiAddress);
      // const proxy = new ProxyNetworkProvider(
      //   'https://api.middlestaking.fr/' + network.id
      // );
      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getTokenPay');
      const { firstValue: tokens } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      if (queryResponse.returnCode == 'ok') {
        setRewardedTokens(tokens?.valueOf()?.toString(10));
      }
    } catch (err) {
      console.error('Unable to call getRewardedTokens', err);
    }
  };

  useEffect(() => {
    console.log(lastUser);
    getRewardedTokens();
  }, [lastUser]);

  return rewardedTokens;
};
