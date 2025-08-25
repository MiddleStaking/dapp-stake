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

import { defaultPairs } from 'config';

export const useGetRewardedTokens = (stakedToken: string) => {
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

  const [rewardedTokens, setRewardedTokens] = useState<string[]>([]);
  const time = new Date();

  const getRewardedTokens = async () => {
    //using storage to reduce calls
    const expire_test = Number(
      localStorage.getItem('rewarded_tokens_' + stakedToken + '_expire')
    );
    const storage = localStorage.getItem('rewarded_tokens_' + stakedToken);
    const tok = storage?.split(',');
    setRewardedTokens(tok ? tok : []);
    const pairs =
      localStorage.getItem('pairs_') != null
        ? JSON.parse(localStorage.getItem('pairs_') as string)
        : defaultPairs;
    if (time.getTime() < expire_test) {
      return;
    }

    try {
      const response = await controller.query({
        contract: contractAddress,
        function: 'getRewardedTokens',
        arguments: [new TokenIdentifierValue(stakedToken)]
      });

      setRewardedTokens(response);
      //storage of 15 minutes
      const expire = time.getTime() + 1000 * 60 * 15;
      //const expire = time.getTime() + 1000 * 60 * 15;
      localStorage.setItem(
        'rewarded_tokens_' + stakedToken,
        response.toString()
      );
      localStorage.setItem(
        'rewarded_tokens_' + stakedToken + '_expire',
        expire.toString()
      );

      for (const token of response) {
        const p: any = { s: stakedToken, r: token };
        pairs.findIndex((e: any) => e?.s === p.s && e?.r === p.r) === -1
          ? pairs.push(p)
          : '';
      }
      localStorage.setItem('pairs_', JSON.stringify(pairs));
    } catch (err) {
      console.error('Unable to call getRewardedTokens', err);
    }
  };

  useEffect(() => {
    getRewardedTokens();
  }, [stakedToken]);

  return rewardedTokens;
};
