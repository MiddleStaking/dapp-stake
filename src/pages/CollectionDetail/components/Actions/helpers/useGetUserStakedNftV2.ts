import { useEffect, useState } from 'react';
import {
  Abi,
  Address,
  AddressValue,
  DevnetEntrypoint
} from '@multiversx/sdk-core/out';
import { useGetNetworkConfig, useGetPendingTransactions } from 'lib';
import { contractNftStakeV2 } from 'config';
import json from '../../../../../mx-staking-nft-sc.abi.json';

export const useGetUserStakedNftV2 = (address: string) => {
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
      staked_nft: {
        id: 0,
        pool_id: 0,
        identifier: '',
        nonce: 0,
        qty: 1,
        lock: 0,
        unbound: 0,
        jump_unbound: 0
      },
      current_block: 0
    }
  ]);
  const time = new Date();

  const getUserStakedNft = async () => {
    if (hasPendingTransactions == true || address == '') {
      return;
    }
    //using storage to reduce calls
    const expire_test = Number(
      localStorage.getItem('useGetUserStakedV2expire')
    );
    const load: any = localStorage.getItem('useGetUserStakedNftV2');
    const storage = JSON.parse(load);
    setStakedTokensNft(storage ? storage : []);
    if (time.getTime() < expire_test) {
      return;
    }

    try {
      const response = await controller.query({
        contract: contractAddress,
        function: 'getUserNfts',
        arguments: [new AddressValue(new Address(address))]
      });

      const currentTimestamp = Math.floor(Date.now() / 1000);
      const formattedResponse = response[0].map((item: any) => ({
        staked_nft: {
          ...item,
          jump_unbound: 0
        },
        current_block: currentTimestamp
      }));
      setStakedTokensNft(formattedResponse);

      //storage of 3 secondes
      const expire = time.getTime() + 1000 * 3;
      localStorage.setItem(
        'useGetUserStakedNftV2',
        JSON.stringify(formattedResponse)
      );
      localStorage.setItem('useGetUserStakedV2expire', expire.toString());
    } catch (err) {
      console.error('Unable to call getUserStakedNft V2', err);
    }
  };

  useEffect(() => {
    getUserStakedNft();
  }, [hasPendingTransactions]);

  return stakedTokensNft;
};
