import { useEffect, useState } from 'react';
import {
  ContractFunction,
  ResultsParser,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';

import { smartContract } from './smartContract';
import { network } from 'config';

const resultsParser = new ResultsParser();

export const useGetTokenPosition = (stakedToken: any, rewardedToken: any) => {
  //const { network } = useGetNetworkConfig();
  const [tokenPosition, setTokenPosition] = useState({
    stakedToken: '',
    rewardedToken: '',
    balance: BigInt(1),
    total_stake: BigInt(1),
    total_rewards: BigInt(1),
    fee_percentage: BigInt(1),
    burn_percentage: BigInt(1),
    last_fund_block: BigInt(1),
    paused: 0,
    blocks_to_max: BigInt(1),
    users: BigInt(0)
  });
  const time = new Date();

  const getTokenPosition = async () => {
    //using storage to reduce calls

    setTokenPosition({
      stakedToken: '',
      rewardedToken: '',
      balance: BigInt(0),
      total_stake: BigInt(0),
      total_rewards: BigInt(0),
      fee_percentage: BigInt(1000),
      burn_percentage: BigInt(0),
      last_fund_block: BigInt(0),
      paused: 0,
      blocks_to_max: BigInt(0),
      users: BigInt(0)
    });

    const expire_test = Number(
      localStorage.getItem(
        'token_position_' + stakedToken + '_' + rewardedToken + '_expire'
      )
    );
    const load: any = localStorage.getItem(
      'token_position_' + stakedToken + '_' + rewardedToken
    );
    const storage = JSON.parse(load);
    if (storage) {
      setTokenPosition(storage);
    }
    if (time.getTime() < expire_test) {
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
      //const proxy = new ProxyNetworkProvider(network.gatewayAddress);

      //const proxy = new ProxyNetworkProvider(network.apiAddress);
      const proxy = new ProxyNetworkProvider(
        'https://api.middlestaking.fr/' + network.id
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
          stakedToken: stakedToken,
          rewardedToken: rewardedToken,
          balance: tab[0].toFixed(),
          total_stake: tab[1].toFixed(),
          total_rewards: tab[2].toFixed(),
          fee_percentage: tab[3].toFixed(),
          burn_percentage: tab[4].toFixed(),
          last_fund_block: tab[5].toFixed(),
          paused: tab[6].toFixed(),
          blocks_to_max: tab[7].toFixed(),
          users: tab[8].toFixed()
        });

        //storage of 1 minutes
        //const expire = time.getTime() + 1000 * 60 * 5;
        const expire = time.getTime() + 1000 * 60 * 1;
        localStorage.setItem(
          'token_position_' + stakedToken + '_' + rewardedToken,
          JSON.stringify({
            stakedToken: stakedToken,
            rewardedToken: rewardedToken,
            balance: tab[0].toFixed(),
            total_stake: tab[1].toFixed(),
            total_rewards: tab[2].toFixed(),
            fee_percentage: tab[3].toFixed(),
            burn_percentage: tab[4].toFixed(),
            last_fund_block: tab[5].toFixed(),
            paused: tab[6].toFixed(),
            blocks_to_max: tab[7].toFixed(),
            users: tab[8].toFixed()
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
  }, [stakedToken, rewardedToken]);

  return tokenPosition;
};
