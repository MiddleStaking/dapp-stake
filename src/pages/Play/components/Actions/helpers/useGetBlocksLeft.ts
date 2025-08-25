import { useEffect, useState } from 'react';
import { ContractFunction, ResultsParser } from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
import { local_network } from 'config';
import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

export const useGetBlocksLeft = () => {
  // const { network } = useGetNetworkConfig();
  const [lastUser, setLastUser] = useState<any>('0');
  const [time, setTime] = useState(new Date());

  const getBlocksLeft = async () => {
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getBlocksLeft')
      });

      //const proxy = new ProxyNetworkProvider(network.apiAddress);
      const proxy = new ProxyNetworkProvider(network.gatewayAddress);

      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getBlocksLeft');
      const { firstValue: position } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );

      setLastUser(position?.valueOf());
    } catch (err) {
      console.error('Unable to call getBlocksLeft', err);
    }
  };

  useEffect(() => {
    getBlocksLeft();
    const interval = setInterval(() => {
      setTime(new Date());
    }, 15000);

    return () => clearInterval(interval);
  }, [time]);
  return lastUser;
};
