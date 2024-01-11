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

export const useGetPoolPosition = (
  stakedToken: any,
  rewardedToken: any,
  hasPendingTransactions: boolean,
  isDual: boolean,
  showStake?: boolean
) => {
  //const { network } = useGetNetworkConfig();
  const [tokenPosition, setTokenPosition] = useState({
    first_token: stakedToken,
    second_token: rewardedToken,
    isDual: isDual,
    has_roles: 0,
    first_token_amount: BigInt(1),
    second_token_amount: BigInt(1),
    lp_supply: BigInt(1),
    first_fee: BigInt(1),
    second_fee: BigInt(1)
  });
  const time = new Date();

  const getTokenPosition = async () => {
    //using storage to reduce calls do not load if pending tx
    if (stakedToken == rewardedToken || hasPendingTransactions || !isDual) {
      return;
    }

    setTokenPosition({
      first_token: stakedToken,
      second_token: rewardedToken,
      isDual: isDual,
      has_roles: 0,
      first_token_amount: BigInt(1),
      second_token_amount: BigInt(1),
      lp_supply: BigInt(1),
      first_fee: BigInt(1),
      second_fee: BigInt(1)
    });

    //Do not refresh if modal is closed
    if (showStake == false) {
      const expire_test = Number(
        localStorage.getItem(
          'pool_position_' + stakedToken + '_' + rewardedToken + '_expire'
        )
      );
      const load: any = localStorage.getItem(
        'pool_position_' + stakedToken + '_' + rewardedToken
      );
      const storage = JSON.parse(load);
      if (storage) {
        setTokenPosition(storage);
      }
      if (time.getTime() < expire_test) {
        return;
      }
    }

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

      //No modal > using cache
      let proxy = new ProxyNetworkProvider(
        'https://api.middlestaking.fr/' + network.id
      );
      //if modal open we want fresh data from pool
      if (showStake == true) {
        proxy = new ProxyNetworkProvider(network.apiAddress);
      }

      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getPoolPosition');
      const { firstValue: position } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );

      const tab = position?.valueOf();

      if (tab) {
        setTokenPosition({
          first_token: stakedToken,
          second_token: rewardedToken,
          isDual: isDual,
          has_roles: tab[0].toFixed(),
          first_token_amount: tab[1].toFixed(),
          second_token_amount: tab[2].toFixed(),
          lp_supply: tab[3].toFixed(),
          first_fee: tab[4].toFixed(),
          second_fee: tab[5].toFixed()
        });

        //storage of 10 minutes
        const expire = time.getTime() + 1000 * 60 * 10;
        localStorage.setItem(
          'pool_position_' + stakedToken + '_' + rewardedToken,
          JSON.stringify({
            first_token: stakedToken,
            second_token: rewardedToken,
            isDual: isDual,
            has_roles: tab[0].toFixed(),
            first_token_amount: tab[1].toFixed(),
            second_token_amount: tab[2].toFixed(),
            lp_supply: tab[3].toFixed(),
            first_fee: tab[4].toFixed(),
            second_fee: tab[5].toFixed()
          })
        );
        localStorage.setItem(
          'pool_position_' + stakedToken + '_' + rewardedToken + '_expire',
          expire.toString()
        );
      }
    } catch (err) {
      console.error('Unable to call getPoolPosition', err);
    }
  };

  useEffect(() => {
    getTokenPosition();
  }, [stakedToken, rewardedToken, showStake]);

  return tokenPosition;
};
