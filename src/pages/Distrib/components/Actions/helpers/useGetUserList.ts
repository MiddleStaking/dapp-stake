import { useEffect, useState } from 'react';
import {
  BigUIntValue,
  ContractFunction,
  ResultsParser,
  U64Type
} from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { smartContract } from './smartContract';
import { network } from 'config';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks';
import toHex from 'helpers/toHex';

const resultsParser = new ResultsParser();

export const useGetUserList = (tab: number) => {
  const [stakedTokens, setStakedTokens] = useState<string[]>([]);
  const { hasPendingTransactions } = useGetPendingTransactions();

  const getStakedTokens = async () => {
    if (hasPendingTransactions == true) {
      return;
    }
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getUserList'),
        args: [new BigUIntValue(tab)]
      });
      //const proxy = new ProxyNetworkProvider(network.apiAddress);
      const proxy = new ProxyNetworkProvider(network.apiAddress);
      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getUserList');
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
