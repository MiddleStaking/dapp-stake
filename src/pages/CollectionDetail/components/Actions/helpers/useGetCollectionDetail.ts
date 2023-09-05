import { useEffect, useState } from 'react';
import {
  ContractFunction,
  ResultsParser,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { smartContract } from './smartContract';
import { network } from 'config';

const resultsParser = new ResultsParser();

export const useGetCollectionDetail = (stakedToken: string) => {
  const [stakedTokens, setStakedTokens] = useState<string[]>([]);
  const time = new Date();

  const getStakedTokens = async () => {
    //using storage to reduce calls
    const expire_test = Number(
      localStorage.getItem('collection_rewards_expire')
    );
    const storage = localStorage.getItem('collection_rewards');
    const tokens = storage?.split(',');
    setStakedTokens(tokens ? tokens : []);
    if (time.getTime() < expire_test) {
      return;
    }

    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getRewards'),
        args: [new TokenIdentifierValue(stakedToken)]
      });
      //const proxy = new ProxyNetworkProvider(network.apiAddress);
      const proxy = new ProxyNetworkProvider(network.gatewayCached);
      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getRewards');
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
          'collection_rewards',
          tokens?.valueOf()?.toString(10).split(',')
        );
        localStorage.setItem('collection_rewards_expire', expire.toString());
      }
    } catch (err) {
      console.error('Unable to call getStakedCollections', err);
    }
  };

  useEffect(() => {
    getStakedTokens();
  }, []);

  return stakedTokens;
};
