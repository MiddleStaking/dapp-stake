import { useEffect, useState } from 'react';
import { ContractFunction, ResultsParser } from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
import { local_network } from 'config';
import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

export const useGetIdentifier = (lastUser: string) => {
  // const { network } = useGetNetworkConfig();
  const [identifier, setIdentifier] = useState<any>('');

  const getIdentifier = async () => {
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getToken')
      });

      //const proxy = new ProxyNetworkProvider(network.apiAddress);
      const proxy = new ProxyNetworkProvider(network.gatewayAddress);

      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getToken');
      const { firstValue: position } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      if (queryResponse.returnCode == 'ok') {
        setIdentifier(position?.valueOf());
      }
    } catch (err) {
      console.error('Unable to call getToken', err);
    }
  };

  useEffect(() => {
    getIdentifier();
  }, [lastUser]);
  return identifier;
};
