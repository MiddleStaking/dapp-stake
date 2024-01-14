import { useEffect, useState } from 'react';
import {
  Address,
  AddressValue,
  ContractFunction,
  ResultsParser
} from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { network } from 'config';
import { smartContract } from './smartContract';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks';

const resultsParser = new ResultsParser();

export const useGetLocked = (address: any) => {
  const { hasPendingTransactions } = useGetPendingTransactions();

  const [locked, setLocked] = useState<any>([]);
  const getIsPaused = async () => {
    if (hasPendingTransactions == true || address == '') {
      return;
    }
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getUserNonces'),
        args: [new AddressValue(new Address(address))]
      });

      const proxy = new ProxyNetworkProvider(network.gatewayAddress);
      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getUserNonces');
      const { firstValue: nonces } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      const non = nonces?.valueOf().toString(10);
      if (queryResponse.returnCode == 'ok') {
        setLocked(non.split(','));
      }
    } catch (err) {
      console.error('Unable to call getIsPaused', err);
    }
  };

  useEffect(() => {
    getIsPaused();
  }, [hasPendingTransactions]);

  return locked;
};
