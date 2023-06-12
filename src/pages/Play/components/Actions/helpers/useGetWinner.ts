import { useEffect, useState } from 'react';
import { ContractFunction, ResultsParser } from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
import { network } from 'config';
import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

export const useGetWinner = () => {
  // const { network } = useGetNetworkConfig();
  const [lastUser, setLastUser] = useState<string>('');
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
      if (
        queryResponse.returnCode == 'ok' &&
        position?.valueOf().toString() != lastUser.toString()
      ) {
        setLastUser(position?.valueOf());
      } else {
        return;
      }
    } catch (err) {
      console.error('Unable to call getLastUser', err);
    }
  };

  useEffect(() => {
    getWinner();
    const interval = setInterval(() => {
      setTime(new Date());
    }, 15000);
    return () => clearInterval(interval);
  }, [time]);

  return lastUser;
};
