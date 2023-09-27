import React, { FC, useEffect, useState } from 'react';
import { FormatAmount } from '@multiversx/sdk-dapp/UI';
import './accordion.scss';
import MyStakeSection from 'pages/CollectionDetail/components/CardOfCollection/component/MyStakeSection';
import MyNftSection from 'pages/CollectionDetail/components/CardOfCollection/component/MyNftSection';
import Countdown from 'pages/CollectionDetail/components/CountDown';
import { Button } from 'components/Design';
import { ModalStakeNft } from 'pages/CollectionDetail/components/Modal';
import { ActionClaimRewards } from 'pages/CollectionDetail/components/Actions';
import { useGetESDTInformations } from 'pages/Earn/components/Actions/helpers';
import { useWindowDimensions } from 'components/DimensionScreen';

interface CardPoolrops {
  collectionReward: any;
  allRewardsForUser: any[];
  userNftBalance: any;
  userStakedNft: any[];
  address: string;
}

const Accordion: FC<CardPoolrops> = ({
  collectionReward,
  allRewardsForUser,
  userNftBalance,
  userStakedNft,
  address
}) => {
  const [nFtCanStake, setNFtCanStake] = useState([]);
  const [showMoal, setShowMoal] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (
      userStakedNft.filter(
        (item) => item.staked_nft.pool_id == collectionReward?.pool_id
      ).length > 0
    ) {
      setIsOpen(true);
    }
  }, [userStakedNft]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const rewarded_esdt_info = useGetESDTInformations(
    collectionReward?.identifier
  );

  const rdecimals = rewarded_esdt_info?.decimals
    ? rewarded_esdt_info?.decimals
    : 0;

  const filteredData = allRewardsForUser
    .filter((item: any) => item.pool_id.toString() == collectionReward?.pool_id)
    .map((item: any) => item.rewards.toString());

  const { width } = useWindowDimensions();

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
                earn : {collectionReward?.identifier}
              </div>
              <div>
                Vesting : {collectionReward?.vesting.toString()} Days &
                Unbonding : {collectionReward?.unbounding.toString()} Days
              </div>
              <div className='svgAccordeons' onClick={toggleAccordion}>
                {/* ~ 1,5/NFT/Day{' '} */}
                <svg
                  width={'16px'}
                  height={'16px'}
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M2.96967 5.21967C3.26256 4.92678 3.73744 4.92678 4.03033 5.21967L8 9.18934L11.9697 5.21967C12.2626 4.92678 12.7374 4.92678 13.0303 5.21967C13.3232 5.51256 13.3232 5.98744 13.0303 6.28033L8.53033 10.7803C8.23744 11.0732 7.76256 11.0732 7.46967 10.7803L2.96967 6.28033C2.67678 5.98744 2.67678 5.51256 2.96967 5.21967Z'
                    fill={isOpen ? 'green' : '#fff'}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className={`accordion-contents ${isOpen ? 'open' : ''}`}>
          <div
            className='accordion-contents-buttons'
            style={{
              padding: '10px 5%',
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: width > 855 ? 'row' : 'column',
                gap: '10px',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'start'
              }}
            >
              {address && (
                <div
                  style={{
                    width: '100%',
                    textAlign: 'start'
                  }}
                >
                  my rewards :{' '}
                  <FormatAmount
                    value={filteredData ? filteredData.toString() : ''}
                    decimals={Number(rdecimals)}
                    egldLabel={rewarded_esdt_info?.name}
                    data-testid='balance'
                    digits={2}
                  />
                </div>
              )}
              <div
                style={{
                  width: '100%',
                  textAlign: 'start'
                }}
              >
                total staked :{' '}
                {collectionReward?.total_staked
                  ? collectionReward?.total_staked.toString()
                  : '...'}
              </div>
              <div
                style={{
                  width: '100%',
                  textAlign: 'start'
                }}
              >
                rewards :{' '}
                <FormatAmount
                  value={collectionReward?.rewards.toString()}
                  decimals={Number(rdecimals)}
                  egldLabel={rewarded_esdt_info?.name}
                  data-testid='balance'
                  digits={2}
                />
              </div>
              <div
                style={{
                  width: '100%',
                  textAlign: 'start'
                }}
              >
                total_rewarded :{' '}
                <FormatAmount
                  value={collectionReward?.total_rewarded.toString()}
                  decimals={Number(rdecimals)}
                  egldLabel={rewarded_esdt_info?.name}
                  data-testid='balance'
                  digits={2}
                />
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: width > 855 ? 'row' : 'column',
                gap: '10px'
              }}
            >
              {address && (
                <Button
                  fontSize='10px'
                  buttonWidth='100px'
                  hasBorder={true}
                  borderRadius={40}
                  background={'black'}
                  borderColor={['#BD37EC', '#1F67FF']}
                  text='Stake NFT'
                  boxShadow='0px 0px 20px 0px #8E44EB80 inset'
                  buttonHeight='33px'
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
              )}
              <ActionClaimRewards
                buttonWidth={'104px'}
                bottomHeight={'33px'}
                identifier={collectionReward}
                rewardsAmount={allRewardsForUser}
                filteredData={filteredData}
                pool_id={collectionReward?.pool_id}
              />
            </div>
          </div>

          <hr
            style={{
              width: '90%',
              height: '0px',
              marginTop: 0,
              marginBottom: 0,
              border: ' 1px solid #634ACB99'
            }}
          />
          {/* <div className={`accord-contents ${openAccordion ? 'open' : ''}`}> */}
          <div className={'NftWrapContent'}>
            {/* {userNftBalance && userNftBalance.length > 0 && (
              <MyNftSection
                pool_nonce={collectionReward?.nonce}
                pool_id={collectionReward?.pool_id}
                nft_balance={userNftBalance}
              />
            )} */}
            {userStakedNft && userStakedNft.length > 0 && (
              <MyStakeSection
                pool={collectionReward?.pool_id}
                unbounding={collectionReward?.unbounding}
                staked_balance={userStakedNft}
              />
            )}
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Accordion;
