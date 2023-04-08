import { useEffect, useState } from 'react';
import { ContractFunction, ResultsParser } from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';

import { smartContract } from './smartContract';
import { network } from 'config';

const resultsParser = new ResultsParser();

export const useGetWinner = () => {
  // const { network } = useGetNetworkConfig();
  const [lastUser, setLastUser] = useState<any>('');
  const [time, setTime] = useState(new Date());

  const getWinner = async () => {
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getLastUser')
      });

      //const proxy = new ProxyNetworkProvider(network.apiAddress);
      const proxy = new ProxyNetworkProvider(network.gatewayAddress);

      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getLastUser');
      const { firstValue: position } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      setLastUser(position?.valueOf());
      console.log(position?.valueOf());
    } catch (err) {
      console.error('Unable to call getLastUser', err);
    }
  };

  useEffect(() => {
    getWinner();
    const interval = setInterval(() => {
      setTime(new Date());
      getWinner();
    }, 15000);
    return () => clearInterval(interval);
  }, [time]);

  return lastUser;
};
