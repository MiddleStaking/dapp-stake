import { useEffect, useState } from 'react';
import {
  Address,
  AddressValue,
  ContractFunction,
  ResultsParser,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
import { BigNumber } from 'bignumber.js';
import { network } from 'config';
import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

export const useGetAllUserRewards = (stakedToken: any) => {
  const [tokenPosition, setTokenPosition] = useState([
    {
      rewarded_token: '',
      rewards_position: {
        rewards: BigNumber(0)
      }
    }
  ]);
  const [time, setTime] = useState(new Date());

  const { address } = useGetAccount();

  //const exp = new Date();

  const getAllUserRewards = async () => {
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
        func: new ContractFunction('getAllUserRewards'),
        args: [
          new AddressValue(new Address(address)),
          new TokenIdentifierValue(stakedToken)
        ]
      });

      const proxy = new ProxyNetworkProvider(network.gatewayAddress);

      const queryResponse = await proxy.queryContract(query);
      const endpointDefinition = smartContract.getEndpoint('getAllUserRewards');
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

      //const expire = exp.getTime() + 1000 * 60 * 1;

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
      console.error('Unable to call getAllUserRewards', err);
    }
  };

  useEffect(() => {
    getAllUserRewards();
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, [stakedToken, time]);

  return tokenPosition;
};
