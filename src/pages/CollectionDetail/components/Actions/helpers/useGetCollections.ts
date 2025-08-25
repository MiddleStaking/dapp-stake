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

export const useGetCollections = () => {
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

  const [stakedTokens, setStakedTokens] = useState<string[]>([]);
  const time = new Date();

  const getStakedTokens = async () => {
    //using storage to reduce calls
    const expire_test = Number(
      localStorage.getItem('staked_collections_expire')
    );
    const storage = localStorage.getItem('staked_collections');
    const tok = storage?.split(',');
    setStakedTokens(tok ? tok : []);
    if (time.getTime() < expire_test) {
      return;
    }

    try {
      const response = await controller.query({
        contract: contractAddress,
        function: 'getStakedNfts',
        arguments: [new ContractFunction('getStakedNfts')]
      });

      setStakedTokens(response);
      //storage of 15 minutes
      const expire = time.getTime() + 1000 * 60 * 15;
      //const expire = time.getTime() + 1000 * 60 * 15;
      localStorage.setItem('staked_collections', response.toString());
      localStorage.setItem('staked_collections_expire', expire.toString());
    } catch (err) {
      console.error('Unable to call getStakedCollections', err);
    }
  };

  useEffect(() => {
    getStakedTokens();
  }, []);

  return stakedTokens;
};
