import { useEffect, useState } from 'react';
import {
  Abi,
  Address,
  AddressValue,
  ContractFunction,
  DevnetEntrypoint,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import {
  useGetAccount,
  useGetNetworkConfig,
  useGetPendingTransactions
} from 'lib';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
import { BigNumber } from 'bignumber.js';
import { local_network } from 'config';
import { contractStake } from 'config';
import json from 'staking-contract.abi.json';

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

  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const entrypoint = new DevnetEntrypoint({
    url: network.apiAddress
  });
  const contractAddress = Address.newFromBech32(contractStake);
  const abi = Abi.create(json);
  const controller = entrypoint.createSmartContractController(abi);
  const pending = useGetPendingTransactions();
  const hasPendingTransactions = pending.length > 0;

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
      const response = await controller.query({
        contract: contractAddress,
        function: 'getAllUserRewards',
        arguments: [
          new AddressValue(new Address(address)),
          new TokenIdentifierValue(stakedToken)
        ]
      });

      // console.log(position?.valueOf());
      // console.log(position?.valueOf()[0].token_position.balance);
      // console.log(position?.valueOf()[0].token_position.balance.toString());

      // const test = new BigNumber(position?.valueOf()[0].token_position.balance);

      // console.log(test);
      // console.log(test.toString());
      setTokenPosition(response);

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
