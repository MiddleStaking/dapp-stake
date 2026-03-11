import { useEffect, useState } from 'react';
import {
  Abi,
  Address,
  DevnetEntrypoint,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import {
  useGetAccount,
  useGetNetworkConfig,
  useGetPendingTransactions
} from 'lib';
import { contractNftStakeV2, local_network } from 'config';
import json from '../../../../../mx-staking-nft-sc.abi.json';
import { BigNumber } from 'bignumber.js';

export const useGetCollectionRewardsV2 = (stakedToken: string) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const entrypoint = new DevnetEntrypoint({
    url: local_network.gatewayCached
  });
  const contractAddress = Address.newFromBech32(contractNftStakeV2);
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
      nonce: BigInt(0),
      nonces: [],
      creator: new Address('')
    }
  ]);

  const time = new Date();

  const getStakedTokens = async () => {
    //using storage to reduce calls
    const expire_test = Number(
      localStorage.getItem('collection_rewards_v2_' + stakedToken + '_expire')
    );
    const load: any = localStorage.getItem(
      'collection_rewards_v2_' + stakedToken
    );
    const storage = JSON.parse(load);
    setStakedTokens(storage ? storage : []);
    // if (time.getTime() < expire_test) {
    //   return;
    // }
    if (!stakedToken) {
      return;
    }

    try {
      const response = await controller.query({
        contract: contractAddress,
        function: 'getRewards',
        arguments: [new TokenIdentifierValue(stakedToken)]
      });

      if (!response || response.length == 0) {
        return;
      }
      setStakedTokens(response[0]);
      //storage of 10 minutes
      const expire = time.getTime() + 1000 * 60 * 10;
      localStorage.setItem(
        'collection_rewards_v2_' + stakedToken,
        JSON.stringify(response[0])
      );
      localStorage.setItem(
        'collection_rewards_v2_' + stakedToken + '_expire',
        expire.toString()
      );
    } catch (err) {
      console.error('Unable to call getStakedCollections V2', err);
    }
  };

  useEffect(() => {
    getStakedTokens();
  }, [stakedToken]);

  return stakedTokens;
};
