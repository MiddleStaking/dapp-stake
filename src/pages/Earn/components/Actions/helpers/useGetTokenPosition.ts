import { useEffect, useState } from 'react';
import {
  ContractFunction,
  ResultsParser,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';

import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

export const useGetTokenPosition = (stakedToken: any, rewardedToken: any) => {
  const { network } = useGetNetworkConfig();
  const [tokenPosition, setTokenPosition] = useState({
    balance: BigInt(1),
    total_stake: BigInt(1),
    total_rewards: BigInt(1),
    fee_percentage: BigInt(1),
    burn_percentage: BigInt(1),
    last_fund_block: BigInt(1),
    paused: 0,
    blocks_to_max: BigInt(1)
  });
  const time = new Date();

  const getTokenPosition = async () => {
    //using storage to reduce calls
    const expire_test = Number(
      localStorage.getItem(
        'token_position_' + stakedToken + '_' + rewardedToken + '_expire'
      )
    );
    if (time.getTime() < expire_test) {
      const load: any = localStorage.getItem(
        'token_position_' + stakedToken + '_' + rewardedToken
      );
      const storage = JSON.parse(load);
      if (storage) {
        setTokenPosition(storage);
      }
      return;
    }

    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getTokenPosition'),
        args: [
          new TokenIdentifierValue(stakedToken),
          new TokenIdentifierValue(rewardedToken)
        ]
      });

      //      const proxy = new ProxyNetworkProvider(network.apiAddress);
      const proxy = new ProxyNetworkProvider(
        'https://devnet-gateway.multiversx.com'
      );

      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getTokenPosition');
      const { firstValue: position } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );

      const tab = position?.valueOf();

      if (tab) {
        setTokenPosition({
          balance: tab[0].toFixed(),
          total_stake: tab[1].toFixed(),
          total_rewards: tab[2].toFixed(),
          fee_percentage: tab[3].toFixed(),
          burn_percentage: tab[4].toFixed(),
          last_fund_block: tab[5].toFixed(),
          paused: tab[6].toFixed(),
          blocks_to_max: tab[7].toFixed()
        });

        //storage of 1 minutes
        //const expire = time.getTime() + 1000 * 60 * 5;
        const expire = time.getTime() + 1000 * 60 * 1;
        localStorage.setItem(
          'token_position_' + stakedToken + '_' + rewardedToken,
          JSON.stringify({
            balance: tab[0].toFixed(),
            total_stake: tab[1].toFixed(),
            total_rewards: tab[2].toFixed(),
            fee_percentage: tab[3].toFixed(),
            burn_percentage: tab[4].toFixed(),
            last_fund_block: tab[5].toFixed(),
            paused: tab[6].toFixed(),
            blocks_to_max: tab[7].toFixed()
          })
        );
        localStorage.setItem(
          'token_position_' + stakedToken + '_' + rewardedToken + '_expire',
          expire.toString()
        );
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
