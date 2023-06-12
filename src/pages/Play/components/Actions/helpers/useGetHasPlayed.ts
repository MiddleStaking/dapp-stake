import { useEffect, useState } from 'react';
import {
  ContractFunction,
  ResultsParser,
  Address,
  AddressValue
} from '@multiversx/sdk-core/out';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
import { network } from 'config';
import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

export const useGetHasPlayed = () => {
  // const { network } = useGetNetworkConfig();
  const [has_played, setLastUser] = useState<any>('');
  const [time, setTime] = useState(new Date());
  const address = useGetAccountInfo().address;

  const getHasPlayed = async () => {
    if (has_played == 1) {
      return;
    }
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getHasPlayed'),
        args: [new AddressValue(new Address(address))]
      });

      //const proxy = new ProxyNetworkProvider(network.apiAddress);
      const proxy = new ProxyNetworkProvider(network.gatewayAddress);

      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getHasPlayed');
      const { firstValue: position } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      setLastUser(position?.valueOf());
    } catch (err) {
      console.error('Unable to call getHasPlayed', err);
    }
  };

  useEffect(() => {
    getHasPlayed();
    const interval = setInterval(() => {
      setTime(new Date());
      getHasPlayed();
    }, 15000);
    return () => clearInterval(interval);
  }, [time]);

  return has_played;
};
