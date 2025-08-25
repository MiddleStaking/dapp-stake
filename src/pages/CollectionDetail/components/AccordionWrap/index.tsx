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
  getCollectionInformations
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
    .map((item: any) => Number(item.staked_nft.pool_id))
    .filter(
      (value: string, index: number, self: string[]) =>
        self.indexOf(value) === index
    );
  // console.log(user_pools);
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
          />
        </div>
        {collection_identifier == 'DINOVOX-cb2297' && (
          <p className='alert alert-dark'>
            Dino&apos;s staking in this app is not official. Staking dinos may
            disqualify your nft for later rewards based on holding time.
          </p>
        )}

        {!verified.some((item) => item.c === collection_identifier) && (
          <p className='alert alert-danger'>
            Dyor : Collection listing is permissionless. Anyone can create a
            rewarding pool. We did not managed to verify this collection at this
            time. Proceed with care.
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
