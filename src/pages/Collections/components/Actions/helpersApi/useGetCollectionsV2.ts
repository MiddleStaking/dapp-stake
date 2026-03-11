import { useEffect, useState } from 'react';
import {
  Abi,
  Address,
  ContractFunction,
  DevnetEntrypoint,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import { useGetNetworkConfig } from 'lib';
import { contractNftStakeV2 } from 'config';
import json from '../../../../../mx-staking-nft-sc.abi.json';
import axios from 'axios';

// Interface matching the UI expectation (CardOfCollection / TypeSection)
interface CollectionV2 {
  identifier: string;
  rewards: { rewarded_token: string; svgUrl?: string }[];
  media: { url: string; fileType: string; frameitUrl?: string };
}

export const useGetCollectionsV2 = () => {
  const { network } = useGetNetworkConfig();
  const [collections, setCollections] = useState<CollectionV2[]>([]);

  const getV2Collections = async () => {
    try {
      const entrypoint = new DevnetEntrypoint({
        url: network.apiAddress
      });
      const contractAddress = Address.newFromBech32(contractNftStakeV2);
      const abi = Abi.create(json);
      const controller = entrypoint.createSmartContractController(abi);

      // 1. Get Staked Collections (Collections with active pools)
      const stakedNftsRaw: any[] = await controller.query({
        contract: contractAddress,
        function: 'getStakedNfts',
        arguments: []
      });

      const stakedCollections = (stakedNftsRaw || [])
        .reduce((acc: string[], i: any) => {
          if (Array.isArray(i)) {
            return [...acc, ...i.map((s: any) => s.toString())];
          }
          if (i && typeof i.getItems === 'function') {
            return [...acc, ...i.getItems().map((s: any) => s.toString())];
          }
          return [...acc, i.toString()];
        }, [])
        .filter((id: string) => id !== '');

      if (!stakedCollections || stakedCollections.length === 0) {
        setCollections([]);
        return;
      }

      // 2. Hydrate data (Rewards & Media)
      const hydratedCollections: CollectionV2[] = await Promise.all(
        stakedCollections.map(async (collectionId: string) => {
          // Fetch Rewards from SC
          let rewards: { rewarded_token: string }[] = [];
          try {
            // Query getRewards(collectionId)
            // Expected return: Array of objects matching RewardPosition struct
            const rValue = await controller.query({
              contract: contractAddress,
              function: 'getRewards',
              arguments: [new TokenIdentifierValue(collectionId)]
            });

            if (rValue && Array.isArray(rValue)) {
              rewards = rValue.map((pos: any) => ({
                // Assuming the ABI parsing returns an object with fields matching the struct
                // RewardPosition has field 'identifier' (index 3 or 4) which is the reward token
                rewarded_token: pos.identifier?.name || pos.identifier || ''
              }));
            }
          } catch (e) {
            console.error(`Failed to fetch rewards for ${collectionId}`, e);
          }

          // Fetch Media from API (first NFT)
          let media = { url: '', fileType: 'image', frameitUrl: '' };
          try {
            const { data: nfts } = await axios.get(
              `${network.apiAddress}/collections/${collectionId}/nfts?size=1&withMedia=true`
            );
            if (nfts && nfts.length > 0) {
              const nft = nfts[0];
              // Prefer video/image
              if (nft.media) {
                media = {
                  url: nft.media[0]?.url || nft.url,
                  fileType: nft.media[0]?.fileType || 'image',
                  frameitUrl: ''
                };
              } else if (nft.url) {
                media.url = nft.url;
              }
            }
          } catch (e) {
            console.error(`Failed to fetch media for ${collectionId}`, e);
          }

          return {
            identifier: collectionId,
            rewards,
            media
          };
        })
      );

      setCollections(hydratedCollections);
    } catch (err) {
      console.error('Unable to fetch V2 Collections', err);
    }
  };

  useEffect(() => {
    if (network.apiAddress) {
      getV2Collections();
    }
  }, [network.apiAddress]);

  return collections;
};
