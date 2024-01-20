import { useEffect, useState } from 'react';
import { ContractFunction, ResultsParser } from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { network } from 'config';
import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

export const useGetStakedTokens = () => {
  //const { network } = useGetNetworkConfig();
  const [stakedTokens, setStakedTokens] = useState<string[]>([]);
  const time = new Date();

  const getStakedTokens = async () => {
    //using storage to reduce calls
    const expire_test = Number(localStorage.getItem('staked_tokens_expire'));
    const storage = localStorage.getItem('staked_tokens');
    const tok = storage?.split(',');
    setStakedTokens(tok ? tok : []);
    if (time.getTime() < expire_test) {
      return;
    }

    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getStakedTokens')
      });
      //const proxy = new ProxyNetworkProvider(network.apiAddress);
      const proxy = new ProxyNetworkProvider(
        'https://api.middlestaking.fr/' + network.id
      );
      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getStakedTokens');
      const { firstValue: tokens } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      if (queryResponse.returnCode == 'ok') {
        setStakedTokens(tokens?.valueOf()?.toString(10).split(','));
        //storage of 15 minutes
        const expire = time.getTime() + 1000 * 60 * 15;
        //const expire = time.getTime() + 1000 * 60 * 15;
        localStorage.setItem(
          'staked_tokens',
          tokens?.valueOf()?.toString(10).split(',')
        );
        localStorage.setItem('staked_tokens_expire', expire.toString());
      }
    } catch (err) {
      console.error('Unable to call getStakedTokens', err);
    }
  };

  useEffect(() => {
    getStakedTokens();
  }, []);

  return stakedTokens;
};