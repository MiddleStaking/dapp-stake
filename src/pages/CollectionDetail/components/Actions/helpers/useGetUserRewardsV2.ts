import { useEffect, useState } from 'react';
import {
  Abi,
  Address,
  AddressValue,
  DevnetEntrypoint,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import { useGetNetworkConfig, useGetPendingTransactions } from 'lib';
import { contractNftStakeV2 } from 'config';
import json from '../../../../../mx-staking-nft-sc.abi.json';

export const useGetUserRewardsV2 = (address: string, collection: string) => {
  const { network } = useGetNetworkConfig();
  const entrypoint = new DevnetEntrypoint({
    url: network.apiAddress
  });
  const contractAddress = Address.newFromBech32(contractNftStakeV2);
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
    const expire_test = Number(
      localStorage.getItem('user_rewards_nft_v2_expire')
    );
    const load: any = localStorage.getItem('user_rewards_nft_v2');
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

      setStakedTokensNft(response[0]);
      //storage of 10 secondes
      const expire = time.getTime() + 1000 * 10 * 1;
      localStorage.setItem('user_rewards_nft_v2', JSON.stringify(response[0]));
      localStorage.setItem('user_rewards_nft_v2_expire', expire.toString());
    } catch (err) {
      console.error('Unable to call getStakedCollections V2', err);
    }
  };

  useEffect(() => {
    getUserStakedNft();
  }, []);

  return stakedTokensNft;
};
