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

export const useGetFeePercent = () => {
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

  const [stakedTokens, setStakedTokens] = useState<string[]>([]);
  const time = new Date();

  const getFeePercent = async () => {
    try {
      const response = await controller.query({
        contract: contractAddress,
        function: 'getFeePercent',
        arguments: []
      });

      setStakedTokens(response);
    } catch (err) {
      console.error('Unable to call getStakedTokens', err);
    }
  };

  useEffect(() => {
    getFeePercent();
  }, []);

  return stakedTokens;
};
