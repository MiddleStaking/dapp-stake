import { useEffect, useState } from 'react';
import { ContractFunction, ResultsParser } from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { smartContract } from './smartContract';
import { network } from 'config';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks';

const resultsParser = new ResultsParser();

export const useGetTotalAmount = () => {
  const [stakedTokens, setStakedTokens] = useState<bigint>(BigInt(0));
  const { hasPendingTransactions } = useGetPendingTransactions();

  const getStakedTokens = async () => {
    if (hasPendingTransactions == true) {
      return;
    }
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getTotal')
      });
      //const proxy = new ProxyNetworkProvider(network.apiAddress);
      const proxy = new ProxyNetworkProvider(network.apiAddress);
      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getTotal');
      const { firstValue: tokens } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      console.log(tokens);
      if (queryResponse.returnCode == 'ok') {
        setStakedTokens(tokens?.valueOf());
      }
    } catch (err) {
      console.error('Unable to call getNonces', err);
    }
  };

  useEffect(() => {
    getStakedTokens();
  }, [hasPendingTransactions]);

  return stakedTokens;
};
