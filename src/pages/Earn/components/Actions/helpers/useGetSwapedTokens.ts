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
import { contractSwap, local_network } from 'config';
import json from 'swap-contract.abi.json';
import { BigNumber } from 'bignumber.js';
import { defaultToken } from 'config';

export const useGetSwapedTokens = () => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const entrypoint = new DevnetEntrypoint({
    url: local_network.gatewayCached
  });
  const contractAddress = Address.newFromBech32(contractSwap);
  const abi = Abi.create(json);
  const controller = entrypoint.createSmartContractController(abi);
  const pending = useGetPendingTransactions();
  const hasPendingTransactions = pending.length > 0;

  const [swapedTokens, setSwapedTokens] = useState<string[]>([]);
  const time = new Date();

  const getSwapedTokens = async () => {
    //using storage to reduce calls
    const expire_test = Number(localStorage.getItem('swaped_tokens_expire'));
    const storage = localStorage.getItem('swaped_tokens');
    const tok = storage?.split(',');
    setSwapedTokens(tok ? tok : []);
    if (time.getTime() < expire_test) {
      return;
    }

    try {
      const response = await controller.query({
        contract: contractAddress,
        function: 'getSwapedTokens',
        arguments: []
      });

      const temp = defaultToken + ',' + response.toString();
      setSwapedTokens(temp.split(','));
      //storage of 15 minutes
      const expire = time.getTime() + 1000 * 60 * 15;
      //const expire = time.getTime() + 1000 * 60 * 15;
      localStorage.setItem('swaped_tokens', temp);
      localStorage.setItem('swaped_tokens_expire', expire.toString());
    } catch (err) {
      console.error('Unable to call getSwapedTokens', err);
    }
  };

  useEffect(() => {
    getSwapedTokens();
  }, []);

  return swapedTokens;
};
