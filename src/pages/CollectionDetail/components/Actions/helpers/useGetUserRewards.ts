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

export const useGetUserRewards = (address: string, collection: string) => {
  const { network } = useGetNetworkConfig();
  const entrypoint = new DevnetEntrypoint({
    url: network.apiAddress
  });
  const contractAddress = Address.newFromBech32(contractNftStake);
  const abi = Abi.create(json);
  const controller = entrypoint.createSmartContractController(abi);
  const pending = useGetPendingTransactions();
  const hasPendingTransactions = pending.length > 0;
  const [stakedTokensNft, setStakedTokensNft] = useState([
    {
      pool_id: 0,
      rewards: ''
    }
  ]);
  const time = new Date();

  const getUserStakedNft = async () => {
    // using storage to reduce calls
    const expire_test = Number(localStorage.getItem('user_rewards_nft_expire'));
    const load: any = localStorage.getItem('user_rewards_nft');
    const storage = JSON.parse(load);
    setStakedTokensNft(storage ? storage : []);
    if (time.getTime() < expire_test) {
      return;
    }

    if (!address) {
      return;
    }

    try {
      const response = await controller.query({
        contract: contractAddress,
        function: 'getAllRewardsForUser',
        arguments: [
          new AddressValue(new Address(address)),
          new TokenIdentifierValue(collection)
        ]
      });

      setStakedTokensNft(response);
      //storage of 10 secondes
      const expire = time.getTime() + 1000 * 10 * 1;
      localStorage.setItem('user_rewards_nft', JSON.stringify(response));
      localStorage.setItem('user_rewards_nft_expire', expire.toString());
    } catch (err) {
      console.error('Unable to call getStakedCollections', err);
    }
  };

  useEffect(() => {
    getUserStakedNft();
  }, []);

  return stakedTokensNft;
};
