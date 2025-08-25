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
import { local_network } from 'config';

export const useGetStakedTokens = () => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const entrypoint = new DevnetEntrypoint({
    url: local_network.gatewayCached
  });

  const contractAddress = Address.newFromBech32(contractStake);
  const abi = Abi.create(json);
  const controller = entrypoint.createSmartContractController(abi);
  const pending = useGetPendingTransactions();
  const hasPendingTransactions = pending.length > 0;

  const [stakedTokens, setStakedTokens] = useState<string[]>([]);
  const time = new Date();

  const getStakedTokens = async () => {
    //using storage to reduce calls
    const expire_test = Number(localStorage.getItem('staked_tokens_expire'));
    const storage = localStorage.getItem('staked_tokens');
    const tok = storage?.split(',');
    setStakedTokens(tok ? tok : []);
    if (time.getTime() < expire_test) {
      return;
    }

    try {
      const response = await controller.query({
        contract: contractAddress,
        function: 'getStakedTokens',
        arguments: []
      });
      // const response = await controller.query({
      //   contract: contractAddress,
      //   func: 'getStakedTokens',
      //   arguments: []
      // });
      console.log('response getStakedTokens', response);
      setStakedTokens(response);
      //storage of 15 minutes
      const expire = time.getTime() + 1000 * 60 * 15;
      //const expire = time.getTime() + 1000 * 60 * 15;
      localStorage.setItem('staked_tokens', response.toString());
      localStorage.setItem('staked_tokens_expire', expire.toString());
    } catch (err) {
      console.error('Unable to call getStakedTokens', err);
    }
  };

  useEffect(() => {
    getStakedTokens();
  }, []);

  return stakedTokens;
};
