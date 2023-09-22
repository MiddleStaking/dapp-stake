import React, { FC, useState } from 'react';
import { FormatAmount } from '@multiversx/sdk-dapp/UI';
import './accordion.scss';
import MyStakeSection from 'pages/CollectionDetail/components/CardOfCollection/component/MyStakeSection';
import MyNftSection from 'pages/CollectionDetail/components/CardOfCollection/component/MyNftSection';
import { ActionClaimRewards } from 'pages/CollectionDetail/components/Actions';
import Countdown from 'pages/CollectionDetail/components/CountDown';
import { Button } from 'components/Design';
import { ModalStakeNft } from 'pages/CollectionDetail/components/Modal';

interface CardPoolrops {
  collectionReward: any;
  allRewardsForUser: any[];
  userNftBalance: any;
  userStakedNft: any[];
}

const Accordion: FC<CardPoolrops> = ({
  collectionReward,
  allRewardsForUser,
  userNftBalance,
  userStakedNft
}) => {
  const [openAccordion, closeAccordion] = useState(false);

  const [nFtCanStake, setNFtCanStake] = useState([]);
  const [showMoal, setShowMoal] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    closeAccordion(!openAccordion);
    setIsOpen(!isOpen);
  };

  console.log(collectionReward);

  return (
    <>
      {showMoal && (
        <ModalStakeNft
          userNFTBalance={nFtCanStake}
          pool_id={collectionReward?.pool_id}
          onClose={() => {
            setShowMoal(false);
          }}
        />
      )}
      <div className='pool-details_Collection'>
        <div className={`Groupe_Details_Collection ${isOpen ? 'open' : ''}`}>
          <div className='Pool_Details_Collection'>
            <div className='Details_Collection'>
              <div className='Label_Details_Collection'>
                earn : {collectionReward.identifier}
              </div>
              <div>
                Vesting : {collectionReward?.vesting.toString()} Days &
                Unbonding : {collectionReward?.unbounding.toString()} Days
              </div>
              <div className='svgAccordeons' onClick={toggleAccordion}>
                ~ 1,5/NFT/Day{' '}
                <svg
                  width={'16px'}
                  height={'16px'}
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  style={{
                    transform: openAccordion ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M2.96967 5.21967C3.26256 4.92678 3.73744 4.92678 4.03033 5.21967L8 9.18934L11.9697 5.21967C12.2626 4.92678 12.7374 4.92678 13.0303 5.21967C13.3232 5.51256 13.3232 5.98744 13.0303 6.28033L8.53033 10.7803C8.23744 11.0732 7.76256 11.0732 7.46967 10.7803L2.96967 6.28033C2.67678 5.98744 2.67678 5.51256 2.96967 5.21967Z'
                    fill={openAccordion ? 'green' : '#fff'}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className={`accordion-contents ${isOpen ? 'open' : ''}`}>
          {/* <div className={`accord-contents ${openAccordion ? 'open' : ''}`}> */}
          <div className={'NftWrapContent'}>
            {userNftBalance && userNftBalance.length > 0 && (
              <MyNftSection
                pool_nonce={collectionReward?.nonce}
                pool_id={collectionReward?.pool_id}
                nft_balance={userNftBalance}
              />
            )}
            {userStakedNft && userStakedNft.length > 0 && (
              <MyStakeSection
                pool={collectionReward?.pool_id}
                unbounding={collectionReward?.unbounding}
                staked_balance={userStakedNft}
              />
            )}
          </div>
          <div
            className='accordion-contents-buttons'
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <Button
              fontSize='10px'
              buttonWidth='100px'
              hasBorder={true}
              borderRadius={40}
              background={'black'}
              borderColor={['#BD37EC', '#1F67FF']}
              text='Stake NFT'
              boxShadow='0px 0px 20px 0px #8E44EB80 inset'
              buttonHeight='35px'
              onClick={() => {
                const nFtCanStake = userNftBalance
                  .filter(
                    (item: any) =>
                      item.nonce == collectionReward?.nonce ||
                      collectionReward?.nonce == BigInt(0)
                  )
                  .map((item: any) => item);

                setNFtCanStake(nFtCanStake);
                setShowMoal(true);
              }}
            />
            <Button
              fontSize='10px'
              buttonWidth='100px'
              borderRadius={40}
              background={['#BD37EC', '#1F67FF']}
              text='CLAIM REWARD'
              buttonHeight='35px'
            />
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Accordion;
