import { useEffect, useState } from 'react';
import { Abi, Address, DevnetEntrypoint } from '@multiversx/sdk-core/out';
import { useGetNetworkConfig, useGetPendingTransactions } from 'lib';
import { contractNftStakeV2 } from 'config';
import json from '../../../../../mx-staking-nft-sc.abi.json';

export const useGetWhitelistedTokens = () => {
  const { network } = useGetNetworkConfig();
  const pending = useGetPendingTransactions();
  const hasPendingTransactions = pending.length > 0;
  const [whitelistedTokens, setWhitelistedTokens] = useState<string[]>([]);

  const getWhitelisted = async () => {
    try {
      const entrypoint = new DevnetEntrypoint({
        url: network.apiAddress
      });
      const contractAddress = Address.newFromBech32(contractNftStakeV2);
      const abi = Abi.create(json);
      const controller = entrypoint.createSmartContractController(abi);

      const whitelistedTokensRaw: any[] = await controller.query({
        contract: contractAddress,
        function: 'getWhitelistedTokens',
        arguments: []
      });

      console.log('useGetWhitelistedTokens raw:', whitelistedTokensRaw);

      const tokens = (whitelistedTokensRaw || [])
        .reduce((acc: string[], i: any) => {
          if (Array.isArray(i)) {
            return [...acc, ...i.map((s) => s.toString())];
          }
          if (i && typeof i.getItems === 'function') {
            return [...acc, ...i.getItems().map((s: any) => s.toString())];
          }
          return [...acc, i.toString()];
        }, [])
        .filter((id: string) => id !== '');

      console.log('useGetWhitelistedTokens parsed:', tokens);
      setWhitelistedTokens(tokens);
    } catch (err) {
      console.error('Unable to fetch Whitelisted Tokens', err);
    }
  };

  useEffect(() => {
    if (network.apiAddress) {
      getWhitelisted();
    }
  }, [network.apiAddress, hasPendingTransactions]);

  return whitelistedTokens;
};
