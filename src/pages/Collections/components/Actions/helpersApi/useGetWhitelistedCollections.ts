import { useEffect, useState } from 'react';
import { Abi, Address, DevnetEntrypoint } from '@multiversx/sdk-core/out';
import { useGetNetworkConfig, useGetPendingTransactions } from 'lib';
import { contractNftStakeV2 } from 'config';
import json from '../../../../../mx-staking-nft-sc.abi.json';

export const useGetWhitelistedCollections = () => {
  const { network } = useGetNetworkConfig();
  const pending = useGetPendingTransactions();
  const hasPendingTransactions = pending.length > 0;
  const [whitelistedCollections, setWhitelistedCollections] = useState<
    string[]
  >([]);

  const getWhitelisted = async () => {
    try {
      const entrypoint = new DevnetEntrypoint({
        url: network.apiAddress
      });
      const contractAddress = Address.newFromBech32(contractNftStakeV2);
      const abi = Abi.create(json);
      const controller = entrypoint.createSmartContractController(abi);

      const whitelistedCollectionsRaw: any[] = await controller.query({
        contract: contractAddress,
        function: 'getWhitelistedCollections',
        arguments: []
      });

      console.log(
        'useGetWhitelistedCollections raw:',
        whitelistedCollectionsRaw
      );

      const collections = (whitelistedCollectionsRaw || [])
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

      console.log('useGetWhitelistedCollections parsed:', collections);
      setWhitelistedCollections(collections);
    } catch (err) {
      console.error('Unable to fetch Whitelisted Collections', err);
    }
  };

  useEffect(() => {
    if (network.apiAddress) {
      getWhitelisted();
    }
  }, [network.apiAddress, hasPendingTransactions]);

  return whitelistedCollections;
};
