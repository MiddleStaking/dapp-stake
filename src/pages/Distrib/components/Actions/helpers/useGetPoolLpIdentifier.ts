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

export const useGetPoolLpIdentifier = (
  stakedToken: any,
  rewardedToken: any
) => {
  //const { network } = useGetNetworkConfig();
  const [tokenPosition, setTokenPosition] = useState({
    first_token: stakedToken,
    second_token: rewardedToken,
    token_identifier: ''
  });
  const time = new Date();

  const getTokenPosition = async () => {
    //using storage to reduce calls do not load if pending tx
    if (stakedToken == rewardedToken) {
      return;
    }

    setTokenPosition({
      first_token: stakedToken,
      second_token: rewardedToken,
      token_identifier: ''
    });

    //Do not refresh if modal is closed
    const expire_test = Number(
      localStorage.getItem(
        'pool_lp_identifier_' + stakedToken + '_' + rewardedToken + '_expire'
      )
    );
    const load: any = localStorage.getItem(
      'pool_lp_identifier_' + stakedToken + '_' + rewardedToken
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
        func: new ContractFunction('getPoolLpIdentifier'),
        args: [
          new TokenIdentifierValue(stakedToken),
          new TokenIdentifierValue(rewardedToken)
        ]
      });

      //      const proxy = new ProxyNetworkProvider(network.apiAddress);
      //const proxy = new ProxyNetworkProvider(network.gatewayAddress);
      const proxy = new ProxyNetworkProvider(network.gatewayCached);

      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint(
        'getPoolLpIdentifier'
      );
      const { firstValue: position } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );

      if (position) {
        setTokenPosition({
          first_token: stakedToken,
          second_token: rewardedToken,
          token_identifier: position?.valueOf()?.toString(10)
        });

        //storage of 1000 minutes
        const expire = time.getTime() + 1000 * 60 * 1000;
        localStorage.setItem(
          'pool_lp_identifier_' + stakedToken + '_' + rewardedToken,
          JSON.stringify({
            first_token: stakedToken,
            second_token: rewardedToken,
            token_identifier: position?.valueOf()?.toString(10)
          })
        );
        localStorage.setItem(
          'pool_lp_identifier_' + stakedToken + '_' + rewardedToken + '_expire',
          expire.toString()
        );
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
