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

export const useGetPoolPosition = (stakedToken: any, rewardedToken: any) => {
  const { network } = useGetNetworkConfig();
  const [tokenPosition, setTokenPosition] = useState({
    has_roles: 0,
    first_token_amount: BigInt(1),
    second_token_amount: BigInt(1),
    lp_supply: BigInt(1),
    first_fee: BigInt(1),
    second_fee: BigInt(1)
  });
  const time = new Date();

  const getTokenPosition = async () => {
    //using storage to reduce calls
    if (stakedToken == rewardedToken) {
      return;
    }
    setTokenPosition({
      has_roles: 0,
      first_token_amount: BigInt(1),
      second_token_amount: BigInt(1),
      lp_supply: BigInt(1),
      first_fee: BigInt(1),
      second_fee: BigInt(1)
    });

    // const expire_test = Number(
    //   localStorage.getItem(
    //     'pool_position_' + stakedToken + '_' + rewardedToken + '_expire'
    //   )
    // );
    // const load: any = localStorage.getItem(
    //   'pool_position_' + stakedToken + '_' + rewardedToken
    // );
    // const storage = JSON.parse(load);
    // if (storage) {
    //   setTokenPosition(storage);
    // }
    // if (time.getTime() < expire_test) {
    //   return;
    // }

    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getPoolPosition'),
        args: [
          new TokenIdentifierValue(stakedToken),
          new TokenIdentifierValue(rewardedToken)
        ]
      });

      //      const proxy = new ProxyNetworkProvider(network.apiAddress);
      //const proxy = new ProxyNetworkProvider(network.gatewayAddress);

      const proxy = new ProxyNetworkProvider(network.apiAddress);
      // const proxy = new ProxyNetworkProvider(
      //   'https://api.middlestaking.fr/' + network.id
      // );

      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getPoolPosition');
      const { firstValue: position } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );

      const tab = position?.valueOf();

      if (tab) {
        setTokenPosition({
          has_roles: tab[0].toFixed(),
          first_token_amount: tab[1].toFixed(),
          second_token_amount: tab[2].toFixed(),
          lp_supply: tab[3].toFixed(),
          first_fee: tab[4].toFixed(),
          second_fee: tab[5].toFixed()
        });

        //storage of 1 minutes
        //const expire = time.getTime() + 1000 * 60 * 5;
        // const expire = time.getTime() + 1000 * 60 * 1;
        // localStorage.setItem(
        //   'pool_position_' + stakedToken + '_' + rewardedToken,
        //   JSON.stringify({
        //     has_roles: tab[0].toFixed(),
        //     first_token_amount: tab[1].toFixed(),
        //     second_token_amount: tab[2].toFixed(),
        //     lp_supply: tab[3].toFixed(),
        //     first_fee: tab[4].toFixed(),
        //     second_fee: tab[5].toFixed()
        //   })
        // );
        // localStorage.setItem(
        //   'pool_position_' + stakedToken + '_' + rewardedToken + '_expire',
        //   expire.toString()
        // );
      }
    } catch (err) {
      console.error('Unable to call getPoolPosition', err);
    }
  };

  useEffect(() => {
    getTokenPosition();
  }, [stakedToken, rewardedToken]);

  return tokenPosition;
};
