import React, { FC } from 'react';
import { FormatAmount } from '@multiversx/sdk-dapp/UI';
import './accordeons.scss';
import Accordion from './component/Accordion';
import { BigNumber } from 'bignumber.js';
import AccordionEmpty from './component/AccordionEmpty';

interface CardPoolrops {
  collectionRewards: any[];
  allRewardsForUser: any[];
  userNftBalance: any;
  userStakedNft: any;
  address: string;
  collection_identifier: string;
  getCollectionInformations: any;
}

const AccordionWrap: FC<CardPoolrops> = ({
  collectionRewards,
  allRewardsForUser,
  userNftBalance,
  userStakedNft,
  address,
  collection_identifier,
  getCollectionInformations
}) => {
  const pools_id: any[] = [];
  for (const pools of collectionRewards) {
    pools_id.push(BigNumber(pools.pool_id).toFixed());
  }

  const nftNumberStakePool = collectionRewards
    ? collectionRewards
        .map((item) => Number(item.total_staked))
        .reduce((prev, curr) => prev + curr, 0)
    : '...';

  return (
    <div className='AccordeonsCards'>
      <div className='backgroundAccordeonsCards'>
        <div
          style={{
            padding: '0px 44px'
          }}
        >
          {'Nfts staked in this collection: '}
          {nftNumberStakePool}
        </div>

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
              {collectionRewards &&
                collectionRewards.map((item) => (
                  // <>
                  //   <div
                  //     key={item.pool_id}
                  //     // style={{ backgroundColor: 'red', margin: '3px' }}
                  //   >
                  //     pool_id: {item?.pool_id.toString()} <br />
                  //     {item?.identifier} <br />
                  //     vesting: {item?.vesting.toString()} <br />
                  //     rewards: {item?.rewards.toString()}
                  //     <br />
                  //     unbounding: {item?.unbounding.toString()}
                  //     <br />
                  //     speed: {item?.blocks_to_max.toString()}
                  //     <br /> nonce: {item?.nonce.toString()}
                  //   </div>
                  //   <br />
                  // </>
                  <div style={{ width: '100%' }} key={item.pool_id}>
                    <Accordion
                      address={address}
                      allRewardsForUser={allRewardsForUser}
                      userNftBalance={userNftBalance}
                      collectionReward={item}
                      userStakedNft={userStakedNft}
                      getCollectionInformations={getCollectionInformations}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className='neon-border-AccordeonsCard'></div>
        </div>
      </div>
    </div>
  );
};

export default AccordionWrap;
