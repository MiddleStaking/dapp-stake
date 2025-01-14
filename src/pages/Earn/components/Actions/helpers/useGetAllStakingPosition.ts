import { useEffect, useState } from 'react';
import {
  Address,
  AddressValue,
  ContractFunction,
  ResultsParser,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import {
  useGetAccount,
  useGetPendingTransactions
} from '@multiversx/sdk-dapp/hooks';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
import { BigNumber } from 'bignumber.js';
import { network } from 'config';
import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

export const useGetAllStakingPosition = (stakedToken: any) => {
  const { hasPendingTransactions } = useGetPendingTransactions();

  const [tokenPosition, setTokenPosition] = useState([
    {
      rewarded_token: '',
      staking_position: {
        stake_amount: BigNumber(0),
        last_action_block: BigNumber(1)
      }
    }
  ]);
  const { address } = useGetAccount();

  const getAllStakingPosition = async () => {
    if (!address) {
      setTokenPosition([]);
      return;
    }
    if (hasPendingTransactions == true) {
      return;
    }

    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getAllStakingPosition'),
        args: [
          new AddressValue(new Address(address)),
          new TokenIdentifierValue(stakedToken)
        ]
      });

      const proxy = new ProxyNetworkProvider(network.gatewayAddress);

      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint(
        'getAllStakingPosition'
      );
      const { firstValue: position } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );
      // console.log(position?.valueOf());
      // console.log(position?.valueOf()[0].token_position.balance);
      // console.log(position?.valueOf()[0].token_position.balance.toString());

      // const test = new BigNumber(position?.valueOf()[0].token_position.balance);

      // console.log(test);
      // console.log(test.toString());
      setTokenPosition(position?.valueOf());

      //const expire = time.getTime() + 1000 * 60 * 1;

      // console.log(renderJson(position?.valueOf()));
      // localStorage.setItem(
      //   'all_token_position_' + stakedToken,
      //   renderJson(position?.valueOf())
      // );
      // localStorage.setItem(
      //   'all_token_position_' + stakedToken + '_expire',
      //   expire.toString()
      // );
    } catch (err) {
      console.error('Unable to call getStakingPosition', err);
    }
  };

  useEffect(() => {
    getAllStakingPosition();
  }, [stakedToken, hasPendingTransactions]);

  return tokenPosition;
};
