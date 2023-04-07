import { useEffect, useState } from 'react';
import {
  Address,
  AddressValue,
  ContractFunction,
  ResultsParser,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';

import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

export const useGetStakingPosition = (
  stakedToken: any,
  rewardedToken: any,
  hasPendingTransactions: boolean
) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const [stakingPosition, setStakingPosition] = useState({
    stake_amount: BigInt(0),
    last_action_block: BigInt(0)
  });

  const getStakingPosition = async () => {
    if (hasPendingTransactions == true || address == '') {
      return;
    }
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getStakingPosition'),
        args: [
          new AddressValue(new Address(address)),
          new TokenIdentifierValue(stakedToken),
          new TokenIdentifierValue(rewardedToken)
        ]
      });

      //const proxy = new ProxyNetworkProvider(network.apiAddress);
      const proxy = new ProxyNetworkProvider(
        'https://devnet-gateway.multiversx.com'
      );

      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition =
        smartContract.getEndpoint('getStakingPosition');
      const { firstValue: position } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      const tab = position?.valueOf();

      if (tab) {
        setStakingPosition({
          stake_amount: tab[0].toFixed(),
          last_action_block: tab[1].toFixed()
        });
      } else {
        setStakingPosition({
          stake_amount: BigInt(0),
          last_action_block: BigInt(0)
        });
      }
    } catch (err) {
      console.error('Unable to call getStakingPosition', err);
    }
  };

  useEffect(() => {
    getStakingPosition();
  }, [hasPendingTransactions]);

  return stakingPosition;
};
