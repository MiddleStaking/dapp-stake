import { useEffect, useState } from 'react';
import { ContractFunction, ResultsParser } from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';

import { smartContract } from './smartContract';
import { network } from 'config';

const resultsParser = new ResultsParser();

export const useGetNonce = () => {
  // const { network } = useGetNetworkConfig();
  const [lastUser, setLastUser] = useState<string>('');
  const [time, setTime] = useState(new Date());

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
      if (position == null) {
        setLastUser('');
        return;
      }
      let hex = position?.valueOf().toString(16);
      if (hex.length % 2 == 1) {
        hex = '0' + hex;
      }
      setLastUser(hex.toString());
    } catch (err) {
      console.error('Unable to call getToken', err);
    }
  };

  useEffect(() => {
    getNonce();

    const interval = setInterval(() => {
      setTime(new Date());
      getNonce();
    }, 15000);

    return () => clearInterval(interval);
  }, [time]);
  return lastUser;
};
