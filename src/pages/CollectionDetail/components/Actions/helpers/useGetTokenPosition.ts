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
import { contractNftStake } from 'config';
import json from 'staking-nft.abi.json';
import { BigNumber } from 'bignumber.js';

export const useGetTokenPosition = (stakedToken: any, rewardedToken: any) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const entrypoint = new DevnetEntrypoint({
    url: network.apiAddress
  });
  const contractAddress = Address.newFromBech32(contractNftStake);
  const abi = Abi.create(json);
  const controller = entrypoint.createSmartContractController(abi);
  const pending = useGetPendingTransactions();
  const hasPendingTransactions = pending.length > 0;
  const [tokenPosition, setTokenPosition] = useState({
    stakedToken: stakedToken,
    rewardedToken: rewardedToken,
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
  });

  const time = new Date();

  // burn_percentage: tab[4].toFixed(),
  // paused: tab[6].toFixed(),
  // users: tab[8].toFixed()

  const getTokenPosition = async () => {
    //using storage to reduce calls

    setTokenPosition({
      pool_id: BigInt(0),
      collection: '',
      stakedToken: '',
      rewardedToken: '',
      rewards: BigInt(0),
      total_staked: BigInt(0),
      identifier: '',
      total_rewarded: BigInt(0),
      last_fund_block: BigInt(0),
      speed: BigInt(0),
      vesting: BigInt(0),
      nonce: BigInt(0),
      unbounding: BigInt(0)
    });

    const expire_test = Number(
      localStorage.getItem(
        'token_position_' + stakedToken + '_' + rewardedToken + '_expire'
      )
    );
    const load: any = localStorage.getItem(
      'token_position_' + stakedToken + '_' + rewardedToken
    );
    const storage = JSON.parse(load);
    if (storage) {
      setTokenPosition(storage);
    }
    if (time.getTime() < expire_test) {
      return;
    }

    try {
      const response = await controller.query({
        contract: contractAddress,
        function: 'getTokenPosition',
        arguments: [
          new TokenIdentifierValue(stakedToken),
          new TokenIdentifierValue(rewardedToken)
        ]
      });

      const tab = response[0];

      if (tab) {
        setTokenPosition({
          stakedToken: stakedToken,
          rewardedToken: rewardedToken,
          pool_id: tab[0],
          collection: tab[1],
          total_staked: tab[2],
          identifier: tab[3],
          rewards: tab[4],
          total_rewarded: tab[5],
          last_fund_block: tab[6],
          speed: tab[7],
          vesting: tab[8],
          unbounding: tab[9],
          nonce: tab[10]
        });

        //storage of 1 minutes
        //const expire = time.getTime() + 1000 * 60 * 5;
        const expire = time.getTime() + 1000 * 60 * 1;
        localStorage.setItem(
          'token_position_' + stakedToken + '_' + rewardedToken,
          JSON.stringify({
            stakedToken: stakedToken,
            rewardedToken: rewardedToken,
            pool_id: tab[0],
            collection: tab[1],
            total_staked: tab[2],
            identifier: tab[3],
            rewards: tab[4],
            total_rewarded: tab[5],
            last_fund_block: tab[6],
            speed: tab[7],
            vesting: tab[8],
            unbounding: tab[9],
            nonce: tab[10]
          })
        );
        localStorage.setItem(
          'token_position_' + stakedToken + '_' + rewardedToken + '_expire',
          expire.toString()
        );
      }
    } catch (err) {
      console.error('Unable to call getTokenPosition', err);
    }
  };

  useEffect(() => {
    getTokenPosition();
  }, [stakedToken, rewardedToken]);

  return tokenPosition;
};
