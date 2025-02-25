import { useEffect, useState } from 'react';
import { ContractFunction, ResultsParser } from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { network } from 'config';
import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

export const useGetIsPaused = () => {
  const [isPaused, setIsPaused] = useState<string[]>([]);
  const getIsPaused = async () => {
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('isPaused')
      });

      const proxy = new ProxyNetworkProvider(network.gatewayCached);
      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('isPaused');
      const { firstValue: tokens } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      if (queryResponse.returnCode == 'ok') {
        setIsPaused(tokens?.valueOf()?.toString(10));
      }
    } catch (err) {
      console.error('Unable to call getIsPaused', err);
    }
  };

  useEffect(() => {
    getIsPaused();
  }, []);

  return isPaused;
};
