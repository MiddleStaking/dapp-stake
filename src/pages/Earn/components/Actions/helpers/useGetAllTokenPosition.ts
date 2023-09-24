import { useEffect, useState } from 'react';
import {
  ContractFunction,
  ResultsParser,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import { network } from 'config';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
import { smartContract } from './smartContract';
import { BigNumber } from 'bignumber.js';

const resultsParser = new ResultsParser();

export const useGetAllTokenPosition = (stakedToken: any) => {
  const [tokenPosition, setTokenPosition] = useState([
    {
      rewarded_token: '',
      token_position: {
        balance: BigNumber(0),
        blocks_to_max: BigNumber(1),
        burn_percentage: 0,
        fee_percentage: 0,
        last_fund_block: 0,
        paused: false,
        total_rewarded: BigNumber(0),
        total_stake: BigNumber(0)
      },
      staked_addresses: 0
    }
  ]);
  const time = new Date();

  const getAllTokenPosition = async () => {
    // const expire_test = Number(
    //   localStorage.getItem('all_token_position_' + stakedToken + '_expire')
    // );
    // const storage = JSON.parse(
    //   localStorage.getItem('all_token_position_' + stakedToken) as string
    // );
    // setTokenPosition(storage);
    // if (time.getTime() < expire_test) {
    //   return;
    // }

    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getAllTokenPosition'),
        args: [new TokenIdentifierValue(stakedToken)]
      });

      const proxy = new ProxyNetworkProvider(network.gatewayCached);

      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint(
        'getAllTokenPosition'
      );
      const { firstValue: position } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );

      setTokenPosition(position?.valueOf());
      const expire = time.getTime() + 1000 * 60 * 1;
      localStorage.setItem(
        'all_token_position_' + stakedToken,
        JSON.stringify(position?.valueOf())
      );
      localStorage.setItem(
        'all_token_position_' + stakedToken + '_expire',
        expire.toString()
      );
    } catch (err) {
      console.error('Unable to call getTokenPosition', err);
    }
  };

  useEffect(() => {
    getAllTokenPosition();
  }, [stakedToken]);

  return tokenPosition;
};
