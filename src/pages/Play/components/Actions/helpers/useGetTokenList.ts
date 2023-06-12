import { useEffect, useState } from 'react';
import { ContractFunction, ResultsParser } from '@multiversx/sdk-core/out';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

export const useGetTokenList = () => {
  const { network } = useGetNetworkConfig();
  const [tokens, setTokens] = useState<string[]>([]);
  const time = new Date();

  const getTokenList = async () => {
    //using storage to reduce calls
    const expire_test = Number(localStorage.getItem('payment_tokens_expire'));
    const storage = localStorage.getItem('payment_tokens');
    const store = storage?.split(',');
    setTokens(store ? store : []);
    if (time.getTime() < expire_test) {
      return;
    }

    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getTokenList')
      });
      //const proxy = new ProxyNetworkProvider(network.apiAddress);
      const proxy = new ProxyNetworkProvider(
        'https://api.middlestaking.fr/' + network.id
      );
      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getTokenList');
      const { firstValue: data } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      if (queryResponse.returnCode == 'ok') {
        setTokens(data?.valueOf()?.toString(10).split(','));
        //storage of 15 minutes
        const expire = time.getTime() + 1000 * 60 * 15;
        //const expire = time.getTime() + 1000 * 60 * 15;
        localStorage.setItem(
          'payment_tokens',
          data?.valueOf()?.toString(10).split(',')
        );
        localStorage.setItem('payment_tokens_expire', expire.toString());
      }
    } catch (err) {
      console.error('Unable to call getTokenList', err);
    }
  };

  useEffect(() => {
    getTokenList();
  }, []);

  return tokens;
};
