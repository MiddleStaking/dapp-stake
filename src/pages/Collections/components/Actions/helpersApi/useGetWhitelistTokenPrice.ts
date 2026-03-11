import { useEffect, useState } from 'react';
import { Abi, Address, DevnetEntrypoint } from '@multiversx/sdk-core/out';
import { useGetNetworkConfig } from 'lib';
import { contractNftStakeV2 } from 'config';
import json from '../../../../../mx-staking-nft-sc.abi.json';
import { BigNumber } from 'bignumber.js';

export const useGetWhitelistTokenPrice = () => {
  const { network } = useGetNetworkConfig();
  const [price, setPrice] = useState<BigNumber>(new BigNumber(0));

  const getPrice = async () => {
    try {
      const entrypoint = new DevnetEntrypoint({
        url: network.apiAddress
      });
      const contractAddress = Address.newFromBech32(contractNftStakeV2);
      const abi = Abi.create(json);
      const controller = entrypoint.createSmartContractController(abi);

      const priceRaw: any = await controller.query({
        contract: contractAddress,
        function: 'getWhitelistTokenCost',
        arguments: []
      });

      if (priceRaw && priceRaw[0]) {
        setPrice(new BigNumber(priceRaw[0].toString()));
      }
    } catch (err) {
      console.error('Unable to fetch Whitelist Token Price', err);
    }
  };

  useEffect(() => {
    if (network.apiAddress) {
      getPrice();
    }
  }, [network.apiAddress]);

  return price;
};
