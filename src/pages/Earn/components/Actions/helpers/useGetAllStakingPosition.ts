import { useEffect, useState } from 'react';
import {
  Address,
  AddressValue,
  ContractFunction,
  ResultsParser,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import { network } from 'config';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
import { smartContract } from './smartContract';
import { BigNumber } from 'bignumber.js';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks';

const resultsParser = new ResultsParser();

export const useGetAllStakingPosition = (stakedToken: any) => {
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

  const time = new Date();

  const getAllStakingPosition = async () => {
    if (!address) {
      setTokenPosition([]);
      return;
    }
    // const expire_test = Number(
    //   localStorage.getItem('all_token_position_' + stakedToken + '_expire')
    // );
    // const load: any = localStorage.getItem('all_token_position_' + stakedToken);
    // const storage = pareseJson(load);
    // if (load) {
    //   console.log(storage);
    //   setTokenPosition(storage);
    // }
    // if (time.getTime() < expire_test) {
    //   return;
    // }

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

      const expire = time.getTime() + 1000 * 60 * 1;

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
  }, [stakedToken]);

  return tokenPosition;
};
