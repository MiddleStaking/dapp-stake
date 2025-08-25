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

export const useGetUserStakedNft = (address: string) => {
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
    const expire_test = Number(localStorage.getItem('useGetUserStakedexpire'));
    const load: any = localStorage.getItem('useGetUserStakedNft');
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

      setStakedTokensNft(response);
      //storage of 3 secondes
      const expire = time.getTime() + 1000 * 3;
      localStorage.setItem('useGetUserStakedNft', JSON.stringify(response));
      localStorage.setItem('useGetUserStakedexpire', expire.toString());
    } catch (err) {
      console.error('Unable to call getStakedCollections', err);
    }
  };

  useEffect(() => {
    getUserStakedNft();
  }, [hasPendingTransactions]);

  return stakedTokensNft;
};
