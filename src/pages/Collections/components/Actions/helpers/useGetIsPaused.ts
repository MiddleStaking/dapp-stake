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

export const useGetIsPaused = () => {
  const { network } = useGetNetworkConfig();

  const entrypoint = new DevnetEntrypoint({
    url: network.apiAddress
  });
  const contractAddress = Address.newFromBech32(contractNftStake);
  const abi = Abi.create(json);
  const controller = entrypoint.createSmartContractController(abi);
  const pending = useGetPendingTransactions();
  const hasPendingTransactions = pending.length > 0;

  const [isPaused, setIsPaused] = useState<string[]>([]);
  const getIsPaused = async () => {
    try {
      const response = await controller.query({
        contract: contractAddress,
        function: 'isPaused',
        arguments: []
      });

      setIsPaused(response);
    } catch (err) {
      console.error('Unable to call getIsPaused', err);
    }
  };

  useEffect(() => {
    getIsPaused();
  }, []);

  return isPaused;
};
