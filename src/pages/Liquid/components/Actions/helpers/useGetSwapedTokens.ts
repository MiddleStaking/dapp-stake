import { useEffect, useState } from 'react';
import { ContractFunction, ResultsParser } from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { defaultToken, network } from 'config';
import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

export const useGetSwapedTokens = () => {
  //const { network } = useGetNetworkConfig();
  const [swapedTokens, setSwapedTokens] = useState<string[]>([]);
  const time = new Date();

  const getSwapedTokens = async () => {
    //using storage to reduce calls
    const expire_test = Number(localStorage.getItem('swaped_tokens_expire'));
    const storage = localStorage.getItem('swaped_tokens');
    const tok = storage?.split(',');
    setSwapedTokens(tok ? tok : []);
    if (time.getTime() < expire_test) {
      return;
    }

    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getSwapedTokens')
      });
      //const proxy = new ProxyNetworkProvider(network.apiAddress);
      const proxy = new ProxyNetworkProvider(
        'https://api.middlestaking.fr/' + network.id
      );
      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getSwapedTokens');
      const { firstValue: tokens } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      if (queryResponse.returnCode == 'ok') {
        const temp = defaultToken + ',' + tokens?.valueOf()?.toString(10);
        setSwapedTokens(temp.split(','));
        //storage of 15 minutes
        const expire = time.getTime() + 1000 * 60 * 15;
        //const expire = time.getTime() + 1000 * 60 * 15;
        localStorage.setItem('swaped_tokens', temp);
        localStorage.setItem('swaped_tokens_expire', expire.toString());
      }
    } catch (err) {
      console.error('Unable to call getSwapedTokens', err);
    }
  };

  useEffect(() => {
    getSwapedTokens();
  }, []);

  return swapedTokens;
};
