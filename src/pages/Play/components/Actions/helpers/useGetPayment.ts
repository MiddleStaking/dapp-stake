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

export const useGetPayment = () => {
  const { network } = useGetNetworkConfig();
  const [rewardedTokens, setRewardedTokens] = useState<string>('a');
  const time = new Date();

  const getRewardedTokens = async () => {
    //using storage to reduce calls
    const expire_test = Number(localStorage.getItem('play_token_expire'));
    if (time.getTime() < expire_test) {
      const storage = localStorage.getItem('play_token');
      const tokens = storage ? storage : 'a';

      setRewardedTokens(tokens);
      return;
    }

    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getTokenIdentifier')
      });
      //const proxy = new ProxyNetworkProvider(network.apiAddress);
      const proxy = new ProxyNetworkProvider(
        'https://api.middlestaking.fr/' + network.id
      );
      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition =
        smartContract.getEndpoint('getTokenIdentifier');
      const { firstValue: tokens } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      if (queryResponse.returnCode == 'ok') {
        setRewardedTokens(tokens?.valueOf()?.toString(10));
        //storage of 15 minutes
        const expire = time.getTime() + 1000 * 60 * 1;
        //const expire = time.getTime() + 1000 * 60 * 15;
        localStorage.setItem('play_token', tokens?.valueOf()?.toString(10));
        localStorage.setItem('play_token_expire', expire.toString());
      }
    } catch (err) {
      console.error('Unable to call getRewardedTokens', err);
    }
  };

  useEffect(() => {
    getRewardedTokens();
  }, []);

  return rewardedTokens;
};
