import React, { FC } from 'react';
import './accordeons.scss';
import { BigNumber } from 'bignumber.js';
import { verified } from 'verified-collections';
import Accordion from './component/Accordion';
import AccordionEmpty from './component/AccordionEmpty';
import { ActionClaimPools } from '../Actions/ActionClaimPools';

interface CardPoolrops {
  uniqueKey: string | number;
  collectionRewards: any[];
  allRewardsForUser: any[];
  userNftBalance: any;
  userStakedNft: any;
  address: string;
  collection_identifier: string;
  getCollectionInformations: any;
  userEsdtBalance: any;
  setOpenModalJump: any;
  setNftsJump: any;
  isV2?: boolean;
}

const AccordionWrap: FC<CardPoolrops> = ({
  uniqueKey,
  collectionRewards,
  allRewardsForUser,
  userEsdtBalance,
  userNftBalance,
  userStakedNft,
  address,
  setNftsJump,
  setOpenModalJump,
  collection_identifier,
  getCollectionInformations,
  isV2
}) => {
  const pools_id: any[] = [];
  for (const pools of collectionRewards) {
    pools_id.push(BigNumber(pools.pool_id).toFixed());
  }

  const nftNumberStakePool =
    Array.isArray(collectionRewards) && collectionRewards.length > 0
      ? collectionRewards
          .map((item) => Number(item.total_staked))
          .reduce((prev, curr) => prev + curr, 0)
      : '...';

  const user_pools = userStakedNft
    .filter(
      (item: any) =>
        item?.staked_nft?.unbound == 0 &&
        item?.staked_nft?.identifier == collection_identifier
    )
    .map((item: any) => ({
      pool_id: Number(item.staked_nft.pool_id),
      isV2: item.isV2 // Use the tag we added in CollectionDetailLayout
    }))
    .filter(
      (value: any, index: number, self: any[]) =>
        index ===
        self.findIndex(
          (t) => t.pool_id === value.pool_id && t.isV2 === value.isV2
        )
    );
  return (
    <div className='AccordeonsCards' key={uniqueKey}>
      <div className='backgroundAccordeonsCards'>
        <div
          style={{
            padding: '0px 44px'
          }}
        >
          {'Nfts staked in this collection: '}
          {nftNumberStakePool}
          <ActionClaimPools
            buttonWidth='120px'
            bottomHeight={'30px'}
            user_pools={user_pools}
            isV2={isV2}
          />
        </div>
        {collection_identifier == 'DINOVOX-cb2297' && (
          <p className='alert alert-dark'>
            Dino&apos;s staking in this app is not official. Staking dinos may
            disqualify your nft for later rewards based on holding time.
          </p>
        )}

        {verified.some(
          (item) => item.c === collection_identifier && item.s === 'scam'
        ) && (
          <p className='alert alert-danger'>
            This collection has been reported by many users as a scam
            collection.
          </p>
        )}
        <div className='AccordeonsCardStake'>
          <div className='contentStakeModal_Collection'>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                width: '100%'
              }}
            >
              {/* View Orphans pools_id inside collection to show unboundable nfts */}
              {userStakedNft &&
                userStakedNft
                  .filter(
                    (obj: any) =>
                      obj?.staked_nft?.identifier == collection_identifier &&
                      !pools_id.includes(
                        BigNumber(obj?.staked_nft?.pool_id).toFixed()
                      )
                  )
                  .filter((obj: any, index: any, arr: any[]) => {
                    if (
                      !arr.includes(
                        BigNumber(obj?.staked_nft?.pool_id).toFixed()
                      )
                    ) {
                      arr.push(BigNumber(obj?.staked_nft?.pool_id).toFixed());
                      return true;
                    }
                  })
                  .map((item: any) => (
                    <div style={{ width: '100%' }} key={item.pool_id}>
                      <AccordionEmpty
                        address={address}
                        userStakedNft={userStakedNft}
                        collection_identifier={collection_identifier}
                        pool_id={item.staked_nft.pool_id}
                      />
                    </div>
                  ))}
              {/* View all pools still active  */}
              {Array.isArray(collectionRewards) &&
                collectionRewards.map((item) => (
                  <div style={{ width: '100%' }} key={item.pool_id}>
                    <Accordion
                      key={item.pool_id}
                      collectionRewards={collectionRewards}
                      setNftsJump={setNftsJump}
                      setOpenModalJump={setOpenModalJump}
                      address={address}
                      userEsdtBalance={userEsdtBalance}
                      allRewardsForUser={allRewardsForUser}
                      userNftBalance={userNftBalance}
                      collectionReward={item}
                      userStakedNft={userStakedNft}
                      getCollectionInformations={getCollectionInformations}
                      isV2={item.isV2}
                    />
                  </div>
                ))}
              {collectionRewards.length == 0 && (
                <>
                  We found no rewards for this collection. Try to refresh the
                  page or deposit some token to be harvested by NFT&apos;s
                  owners.
                  {!address && (
                    <div>Rewards deposit only availaible after login.</div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className='neon-border-AccordeonsCard'></div>
        </div>
      </div>
    </div>
  );
};

export default AccordionWrap;
