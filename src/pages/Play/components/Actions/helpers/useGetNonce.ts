import { useEffect, useState } from 'react';
import { ContractFunction, ResultsParser } from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
import { network } from 'config';
import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

export const useGetNonce = (lastUser: string) => {
  // const { network } = useGetNetworkConfig();
  const [nonce, setNonce] = useState<string>('');

  const getNonce = async () => {
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getNonce')
      });

      //const proxy = new ProxyNetworkProvider(network.apiAddress);
      const proxy = new ProxyNetworkProvider(network.gatewayAddress);

      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getNonce');
      const { firstValue: position } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      if (queryResponse.returnCode == 'ok') {
        let hex = position?.valueOf().toString(16);
        if (hex.length % 2 == 1) {
          hex = '0' + hex;
        }
        setNonce(hex.toString());
      }
    } catch (err) {
      console.error('Unable to call getToken', err);
    }
  };

  useEffect(() => {
    getNonce();
  }, [lastUser]);
  return nonce;
};
