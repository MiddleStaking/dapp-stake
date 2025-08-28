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
import { contractNftStake, local_network } from 'config';
import json from 'staking-nft.abi.json';
import { BigNumber } from 'bignumber.js';

export const useGetCollectionRewards = (stakedToken: string) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const entrypoint = new DevnetEntrypoint({
    url: local_network.gatewayCached
  });
  const contractAddress = Address.newFromBech32(contractNftStake);
  const abi = Abi.create(json);
  const controller = entrypoint.createSmartContractController(abi);
  const pending = useGetPendingTransactions();
  const hasPendingTransactions = pending.length > 0;

  const [stakedTokens, setStakedTokens] = useState([
    {
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
    }
  ]);

  const time = new Date();

  const getStakedTokens = async () => {
    //using storage to reduce calls
    const expire_test = Number(
      localStorage.getItem('collection_rewards_' + stakedToken + '_expire')
    );
    const load: any = localStorage.getItem('collection_rewards_' + stakedToken);
    const storage = JSON.parse(load);
    setStakedTokens(storage ? storage : []);
    if (time.getTime() < expire_test) {
      return;
    }
    if (!stakedToken) {
      return;
    }

    try {
      const response = await controller.query({
        contract: contractAddress,
        function: 'getRewards',
        arguments: [new TokenIdentifierValue(stakedToken)]
      });

      setStakedTokens(response[0]);
      //storage of 1 minutes
      const expire = time.getTime() + 1000 * 60 * 1;
      localStorage.setItem(
        'collection_rewards_' + stakedToken,
        JSON.stringify(response[0].toString())
      );
      localStorage.setItem(
        'collection_rewards_' + stakedToken + '_expire',
        expire.toString()
      );
    } catch (err) {
      console.error('Unable to call getStakedCollections', err);
    }
  };

  useEffect(() => {
    getStakedTokens();
  }, [stakedToken]);

  return stakedTokens;
};
