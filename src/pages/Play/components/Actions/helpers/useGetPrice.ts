import { useEffect, useState } from 'react';
import {
  ContractFunction,
  ResultsParser,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { network } from 'config';
import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

export const useGetPrice = (tokenPay: string) => {
  //const { network } = useGetNetworkConfig();
  const [rewardedTokens, setRewardedTokens] = useState<string>('0');
  const time = new Date();

  const getRewardedTokens = async () => {
    //using storage to reduce calls
    const expire_test = Number(
      localStorage.getItem('play_' + tokenPay + '_price_expire')
    );
    if (time.getTime() < expire_test) {
      const storage = localStorage.getItem('play_' + tokenPay + '_price');
      const tokens = storage ? storage : '0';

      setRewardedTokens(tokens);
      return;
    }

    if (!tokenPay) {
      return;
    }
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getTokenPrice'),
        args: [new TokenIdentifierValue(tokenPay)]
      });
      const proxy = new ProxyNetworkProvider(network.apiAddress);
      // const proxy = new ProxyNetworkProvider(
      //   'https://api.middlestaking.fr/' + network.id
      // );
      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getTokenPrice');
      const { firstValue: tokens } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      if (queryResponse.returnCode == 'ok') {
        setRewardedTokens(tokens?.valueOf()?.toString(10));
        //storage of 15 minutes
        const expire = time.getTime() + 1000 * 60 * 5;
        //const expire = time.getTime() + 1000 * 60 * 15;
        localStorage.setItem(
          'play_' + tokenPay + '_price',
          tokens?.valueOf()?.toString(10)
        );
        localStorage.setItem(
          'play_' + tokenPay + '_price_expire',
          expire.toString()
        );
      }
    } catch (err) {
      console.error('Unable to call getRewardedTokens', err);
    }
  };

  useEffect(() => {
    getRewardedTokens();
  }, [tokenPay]);

  return rewardedTokens;
};
