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
import { contractSwap } from 'config';
import json from 'swap-contract.abi.json';
import { BigNumber } from 'bignumber.js';

export const useGetAllLp = () => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const entrypoint = new DevnetEntrypoint({
    url: network.apiAddress
  });
  const contractAddress = Address.newFromBech32(contractSwap);
  const abi = Abi.create(json);
  const controller = entrypoint.createSmartContractController(abi);
  const pending = useGetPendingTransactions();
  const hasPendingTransactions = pending.length > 0;

  const [tokenPosition, setTokenPosition] = useState([
    {
      swaped_token: '',
      lp_token: '',
      first_token_amount: BigNumber(1),
      second_token_amount: BigNumber(1)
    }
  ]);
  const time = new Date();

  const getAllLp = async () => {
    const expire_test = Number(localStorage.getItem('all_lp_expire'));
    const item = localStorage.getItem('all_lp');
    const storage = item && item !== 'undefined' ? JSON.parse(item) : null;

    if (storage) {
      setTokenPosition(storage);
    }
    if (time.getTime() < expire_test) {
      return;
    }

    try {
      const response = await controller.query({
        contract: contractAddress,
        function: 'getAllLp',
        arguments: []
      });

      console.log('getAllLp response', response);
      setTokenPosition(response[0]);
      const expire = time.getTime() + 1000 * 15 * 1;
      localStorage.setItem('all_lp', JSON.stringify(response[0]));
      localStorage.setItem('all_lp_expire', expire.toString());
    } catch (err) {
      console.error('Unable to call getAllLp', err);
    }
  };

  useEffect(() => {
    getAllLp();
  }, []);

  return tokenPosition;
};
