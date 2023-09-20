import React, { FC } from 'react';
import { FormatAmount } from '@multiversx/sdk-dapp/UI';
import './accordeons.scss';
import Accordion from './component/Accordion';

interface CardPoolrops {
  collectionRewards: any[];
  allRewardsForUser: any[];
  userNftBalance: any;
  userStakedNft: any;
}

const AccordionWrap: FC<CardPoolrops> = ({
  collectionRewards,
  allRewardsForUser,
  userNftBalance,
  userStakedNft
}) => {
  return (
    <div className='AccordeonsCards'>
      <div className='backgroundAccordeonsCards'>
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
                      allRewardsForUser={allRewardsForUser}
                      userNftBalance={userNftBalance}
                      collectionReward={item}
                      userStakedNft={userStakedNft}
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
