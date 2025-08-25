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

export const useGetTokenPosition = (stakedToken: any, rewardedToken: any) => {
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
  const [tokenPosition, setTokenPosition] = useState({
    stakedToken: '',
    rewardedToken: '',
    balance: new BigNumber(1),
    total_stake: new BigNumber(1),
    total_rewards: new BigNumber(1),
    fee_percentage: new BigNumber(1),
    burn_percentage: new BigNumber(1),
    last_fund_block: new BigNumber(1),
    paused: 0,
    blocks_to_max: new BigNumber(1),
    users: new BigNumber(0)
  });
  const time = new Date();

  const getTokenPosition = async () => {
    //using storage to reduce calls

    setTokenPosition({
      stakedToken: '',
      rewardedToken: '',
      balance: new BigNumber(0),
      total_stake: new BigNumber(0),
      total_rewards: new BigNumber(0),
      fee_percentage: new BigNumber(1000),
      burn_percentage: new BigNumber(0),
      last_fund_block: new BigNumber(0),
      paused: 0,
      blocks_to_max: new BigNumber(0),
      users: new BigNumber(0)
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

      //      const proxy = new ProxyNetworkProvider(network.apiAddress);
      //const proxy = new ProxyNetworkProvider(network.gatewayAddress);

      //const proxy = new ProxyNetworkProvider(network.apiAddress);

      const tab = response[0];
      if (tab) {
        setTokenPosition({
          stakedToken: stakedToken,
          rewardedToken: rewardedToken,
          balance: new BigNumber(tab[0]),
          total_stake: new BigNumber(tab[1]),
          total_rewards: new BigNumber(tab[2]),
          fee_percentage: new BigNumber(tab[3]),
          burn_percentage: new BigNumber(tab[4]),
          last_fund_block: new BigNumber(tab[5]),
          paused: tab[6],
          blocks_to_max: new BigNumber(tab[7]),
          users: new BigNumber(tab[8])
        });

        //storage of 1 minutes
        //const expire = time.getTime() + 1000 * 60 * 5;
        const expire = time.getTime() + 1000 * 60 * 1;
        localStorage.setItem(
          'token_position_' + stakedToken + '_' + rewardedToken,
          JSON.stringify({
            stakedToken: stakedToken,
            rewardedToken: rewardedToken,
            balance: tab[0],
            total_stake: tab[1],
            total_rewards: tab[2],
            fee_percentage: tab[3],
            burn_percentage: tab[4],
            last_fund_block: tab[5],
            paused: tab[6],
            blocks_to_max: tab[7],
            users: tab[8]
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
