import { useEffect, useState } from 'react';
import { ContractFunction, ResultsParser } from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { network } from 'config';
import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

export const useGetFeePercent = () => {
  const [stakedTokens, setStakedTokens] = useState<string[]>([]);
  const time = new Date();

  const getFeePercent = async () => {
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getFeePercent')
      });
      //const proxy = new ProxyNetworkProvider(network.apiAddress);
      const proxy = new ProxyNetworkProvider(network.gatewayCached);
      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getFeePercent');
      const { firstValue: tokens } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      if (queryResponse.returnCode == 'ok') {
        setStakedTokens(tokens?.valueOf()?.toString(10));
      }
    } catch (err) {
      console.error('Unable to call getStakedTokens', err);
    }
  };

  useEffect(() => {
    getFeePercent();
  }, []);

  return stakedTokens;
};
