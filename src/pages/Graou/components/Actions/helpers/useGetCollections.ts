// import { useEffect, useState } from 'react';
// import { ContractFunction, ResultsParser } from '@multiversx/sdk-core/out';
// import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
// import { local_network } from 'config';
// import { smartContract } from './smartContract';

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
import { contracts, local_network } from 'config';
import json from 'lock-graou.abi.json';
import { BigNumber } from 'bignumber.js';
import { defaultToken } from 'config';

export const useGetCollections = () => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const entrypoint = new DevnetEntrypoint({
    url: local_network.gatewayCached
  });
  const contractAddress = Address.newFromBech32(contracts.lockGraou);
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
        arguments: []
      });

      setStakedTokens(response[0]);
      // tokens?.valueOf()?.toString(10).split(',')
      //storage of 15 minutes
      const expire = time.getTime() + 1000 * 60 * 1;
      //const expire = time.getTime() + 1000 * 60 * 15;
      localStorage.setItem('staked_collections', response[0].toString());
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
