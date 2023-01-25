import { useEffect, useState } from 'react';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
import {
  ContractFunction,
  ResultsParser,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import { smartContract } from './smartContract';
import { defaultToken } from 'config';

const resultsParser = new ResultsParser();

export const useGetTokenPosition = () => {
  const { network } = useGetNetworkConfig();
  const [tokenPosition, setTokenPosition] = useState({
    balance: '0',
    total_stake: '0',
    total_rewards: '0',
    fee_percentage: '100',
    burn_percentage: '0',
    last_fund_block: '0',
    paused: 0
  });

  const getTokenPosition = async () => {
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getTokenPosition'),
        args: [
          new TokenIdentifierValue(defaultToken),
          new TokenIdentifierValue(defaultToken)
        ]
      });

      const proxy = new ProxyNetworkProvider(network.apiAddress);
      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getTokenPosition');
      const { firstValue: position } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      const tab = position?.valueOf().toString().split(',');
      if (tab) {
        setTokenPosition({
          balance: tab[0].toString(),
          total_stake: tab[1],
          total_rewards: tab[2],
          fee_percentage: tab[3],
          burn_percentage: tab[4],
          last_fund_block: tab[5],
          paused: tab[6]
        });
      }
    } catch (err) {
      console.error('Unable to call getTokenPosition', err);
    }
  };

  useEffect(() => {
    getTokenPosition();
  }, []);

  return tokenPosition;
};
