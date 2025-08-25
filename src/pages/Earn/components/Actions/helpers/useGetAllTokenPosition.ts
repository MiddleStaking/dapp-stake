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
import { contractStake } from 'config';
import json from 'staking-contract.abi.json';
import { BigNumber } from 'bignumber.js';

export const useGetAllTokenPosition = (stakedToken: any) => {
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
      const response = await controller.query({
        contract: contractAddress,
        function: 'getAllTokenPosition',
        arguments: [new TokenIdentifierValue(stakedToken)]
      });

      setTokenPosition(response[0]);
      const expire = time.getTime() + 1000 * 60 * 1;
      localStorage.setItem(
        'all_token_position_' + stakedToken,
        JSON.stringify(response)
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
