import { useEffect, useState } from 'react';
import {
  Abi,
  Address,
  DevnetEntrypoint,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import { useGetNetworkConfig } from 'lib';
import { contractNftStakeV2, local_network } from 'config';
import json from '../../../../../mx-staking-nft-sc.abi.json';

export const useCheckIsV2 = (collectionIdentifier: string | undefined) => {
  const { network } = useGetNetworkConfig();
  const [isV2, setIsV2] = useState<boolean>(false);

  useEffect(() => {
    const checkV2 = async () => {
      if (!collectionIdentifier || !network.apiAddress) {
        return;
      }

      try {
        const entrypoint = new DevnetEntrypoint({
          url: local_network.gatewayCached
        });
        const contractAddress = Address.newFromBech32(contractNftStakeV2);
        const abi = Abi.create(json);
        const controller = entrypoint.createSmartContractController(abi);

        const response = await controller.query({
          contract: contractAddress,
          function: 'getRewards',
          arguments: [new TokenIdentifierValue(collectionIdentifier)]
        });

        if (response && response.length > 0) {
          setIsV2(true);
        } else {
          setIsV2(false);
        }
      } catch (err) {
        setIsV2(false);
      }
    };

    checkV2();
  }, [collectionIdentifier, network.apiAddress]);

  return isV2;
};
