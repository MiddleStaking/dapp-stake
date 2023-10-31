import { useEffect, useState } from 'react';
import {
  ContractFunction,
  ResultsParser,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
import { network } from 'config';
import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

export const useGetTokenPosition = (stakedToken: any, rewardedToken: any) => {
  const [tokenPosition, setTokenPosition] = useState({
    stakedToken: stakedToken,
    rewardedToken: rewardedToken,
    pool_id: BigInt(0),
    collection: '',
    total_staked: BigInt(1),
    identifier: '',
    rewards: BigInt(1),
    total_rewarded: BigInt(1),
    last_fund_block: BigInt(1),
    speed: BigInt(1),
    vesting: BigInt(0),
    unbounding: BigInt(0),
    nonce: BigInt(0)
  });

  const time = new Date();

  // burn_percentage: tab[4].toFixed(),
  // paused: tab[6].toFixed(),
  // users: tab[8].toFixed()

  const getTokenPosition = async () => {
    //using storage to reduce calls

    setTokenPosition({
      pool_id: BigInt(0),
      collection: '',
      stakedToken: '',
      rewardedToken: '',
      rewards: BigInt(0),
      total_staked: BigInt(0),
      identifier: '',
      total_rewarded: BigInt(0),
      last_fund_block: BigInt(0),
      speed: BigInt(0),
      vesting: BigInt(0),
      nonce: BigInt(0),
      unbounding: BigInt(0)
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
      const proxy = new ProxyNetworkProvider(network.gatewayCached);

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
          pool_id: tab[0].toFixed(),
          collection: tab[1].toFixed(),
          total_staked: tab[2].toFixed(),
          identifier: tab[3].toFixed(),
          rewards: tab[4].toFixed(),
          total_rewarded: tab[5].toFixed(),
          last_fund_block: tab[6].toFixed(),
          speed: tab[7].toFixed(),
          vesting: tab[8].toFixed(),
          unbounding: tab[9].toFixed(),
          nonce: tab[10].toFixed()
        });

        //storage of 1 minutes
        //const expire = time.getTime() + 1000 * 60 * 5;
        const expire = time.getTime() + 1000 * 60 * 1;
        localStorage.setItem(
          'token_position_' + stakedToken + '_' + rewardedToken,
          JSON.stringify({
            stakedToken: stakedToken,
            rewardedToken: rewardedToken,
            pool_id: tab[0].toFixed(),
            collection: tab[1].toFixed(),
            total_staked: tab[2].toFixed(),
            identifier: tab[3].toFixed(),
            rewards: tab[4].toFixed(),
            total_rewarded: tab[5].toFixed(),
            last_fund_block: tab[6].toFixed(),
            speed: tab[7].toFixed(),
            vesting: tab[8].toFixed(),
            unbounding: tab[9].toFixed(),
            nonce: tab[10].toFixed()
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
