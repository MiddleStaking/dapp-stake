import React, { FC, useEffect, useState } from 'react';
import { FormatAmount } from '@multiversx/sdk-dapp/UI';
import './accordion.scss';
import MyStakeSection from 'pages/CollectionDetail/components/CardOfCollection/component/MyStakeSection';
import MyNftSection from 'pages/CollectionDetail/components/CardOfCollection/component/MyNftSection';
import Countdown from 'pages/CollectionDetail/components/CountDown';
import { Button } from 'components/Design';
import { ModalStakeNft } from 'pages/CollectionDetail/components/Modal';
import { ActionClaimRewards } from 'pages/CollectionDetail/components/Actions';
import notFound from '../../../../../../assets/img/notfoundc.svg';
import { useWindowDimensions } from 'components/DimensionScreen';
import { useGetESDTInformations } from 'pages/Earn/components/Actions/helpers';
import { BigNumber } from 'bignumber.js';
import SandClock from 'pages/CollectionDetail/components/AccordionWrap/component/SandClock';
import { useGetNft } from 'pages/Collections/components/Actions/helpers/useGetNft';
import HexagoneNFT from 'pages/Collections/components/hexagoneNFT';
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
  const [myTokenStakedNumber, setMyTokenStakedNumber] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   if (
  //     userStakedNft.filter(
  //       (item) =>
  //         item.staked_nft.pool_id.toString() ==
  //         collectionReward?.pool_id.toString()
  //     ).length > 0
  //   ) {
  //     setIsOpen(true);
  //   }
  // }, [userStakedNft]);

  // const rewarded_esdt_info = useGetESDTInformations(rtoken);

  useEffect(() => {
    // const my_token_staked_number = userStakedNft.filter(
    //   (item: any) =>
    //     item?.staked_nft?.pool_id?.toString() ==
    //       collectionReward?.pool_id?.toString() &&
    //     item?.staked_nft?.unbound?.toString() == '0'
    // ).length;
    const my_token_staked_number = userStakedNft
      ? userStakedNft
          .filter(
            (item: any) =>
              item?.staked_nft?.pool_id?.toString() ==
                collectionReward?.pool_id?.toString() &&
              item?.staked_nft?.unbound?.toString() == '0'
          )
          .map((item) => Number(item.staked_nft.qty))
          .reduce((prev, curr) => prev + curr, 0)
      : 0;

    setMyTokenStakedNumber(my_token_staked_number);
  }, []);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const rewarded_esdt_info = useGetESDTInformations(
    collectionReward?.identifier
  );

  const rdecimals = rewarded_esdt_info?.decimals
    ? rewarded_esdt_info?.decimals
    : 0;

  const Availablerewards = allRewardsForUser
    .filter(
      (item) => item.pool_id.toString() == collectionReward?.pool_id.toString()
    )
    .map((item: any) => item?.rewards);

  // const my_token_staked_number = userStakedNft.filter(
  //   (item: any) =>
  //     item?.staked_nft?.pool_id.toString() ==
  //     collectionReward?.pool_id.toString()
  // ).length;

  // in collectionReward : {
  // block_to_max
  // identifier : token rewards
  // last_fund_block : ne sert a rien
  // nonce : all nfts if token == 0 else nonce token == nonce
  // paused : false ou true (empeche les personnes de staked)
  // pool_id : id unique de la pool
  // rewards : nombre de token qui en attente de destribution
  // total_rewarded : nombre de token destrib
  // total_staked : nombre de nft au total stake dans la pool
  // unbounding
  // vesting
  //}

  const { width } = useWindowDimensions();

  const nft = useGetNft(
    collectionReward.collection.toString(),
    Number(collectionReward.nonce),
    true
  );

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
        {userStakedNft
          .filter(
            (item: any) =>
              item?.staked_nft?.pool_id?.toString() ==
                collectionReward?.pool_id?.toString() &&
              item?.staked_nft?.unbound > 0
          )
          .map((item) => Number(item.staked_nft.unbound)).length > 0 && (
          <div
            style={{
              position: 'relative',
              width: '120px',
              backgroundColor: 'black',
              borderRadius: '8px',
              border: '1px solid #695885',
              height: '32px',
              marginBottom: '-10px',
              marginLeft: '10px',
              paddingLeft: '11px'
            }}
          >
            Unbounding{' '}
            {userStakedNft
              .filter(
                (item: any) =>
                  item?.staked_nft?.pool_id?.toString() ==
                    collectionReward?.pool_id?.toString() &&
                  item?.staked_nft?.unbound < item?.current_block
              )
              .map((item) => Number(item.staked_nft.unbound)).length > 0 ? (
              <>✅</>
            ) : (
              <SandClock />
            )}
          </div>
        )}

        <div className={`Groupe_Details_Collection ${isOpen ? 'open' : ''}`}>
          <div className='Pool_Details_Collection'>
            <div className='Details_Collection'>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: width > 855 ? 'calc(100% - 10px)' : '100%',
                  gap: '10px',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: width > 855 ? 'row' : 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '12px',
                    gap: '10px'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px'
                    }}
                    className='Label_Details_Collection'
                  >
                    <div
                      style={{
                        borderRadius: '50px',
                        width: '28px',
                        height: '28px',
                        background: 'black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <img
                        style={{
                          borderRadius: '50px',
                          width: '28px',
                          height: '28px'
                        }}
                        src={
                          rewarded_esdt_info?.assets?.svgUrl
                            ? rewarded_esdt_info.assets.svgUrl
                            : notFound
                        }
                        alt=''
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
                      }}
                      className='Label_Details_Collection'
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: width > 855 ? 'row' : 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '2px'
                        }}
                        className='Label_Details_Collection'
                      >
                        earn :
                        {collectionReward &&
                        collectionReward.total_staked &&
                        Number(collectionReward.blocks_to_max) !== 0 ? (
                          <FormatAmount
                            value={(
                              BigInt(
                                BigNumber(collectionReward?.rewards).toFixed()
                              ) /
                              (BigInt(collectionReward.total_staked) > BigInt(0)
                                ? BigInt(collectionReward.total_staked)
                                : BigInt(1)) /
                              BigInt(collectionReward.speed)
                            ).toString()}
                            decimals={Number(rdecimals)}
                            egldLabel={`${
                              collectionReward?.identifier.split('-')[0]
                            } / NFT / DAY`}
                            data-testid='balance'
                            digits={
                              (
                                BigInt(
                                  BigNumber(collectionReward?.rewards).toFixed()
                                ) /
                                (BigInt(collectionReward.total_staked) >
                                BigInt(0)
                                  ? BigInt(collectionReward.total_staked)
                                  : BigInt(1)) /
                                BigInt(collectionReward.speed)
                              ).toString().length >= rdecimals
                                ? 2
                                : rdecimals -
                                  (
                                    BigInt(
                                      BigNumber(
                                        collectionReward?.rewards
                                      ).toFixed()
                                    ) /
                                    (BigInt(collectionReward.total_staked) >
                                    BigInt(0)
                                      ? BigInt(collectionReward.total_staked)
                                      : BigInt(1)) /
                                    BigInt(collectionReward.speed)
                                  ).toString().length +
                                  2
                            }
                          />
                        ) : (
                          <p>probleme</p>
                        )}
                      </div>
                      {/* <div>
                        {collectionReward &&
                        collectionReward.total_staked &&
                        Number(collectionReward.blocks_to_max) !== 0 ? (
                          <FormatAmount
                            value={(
                              BigInt(collectionReward?.rewards) /
                              (BigInt(collectionReward.total_staked) > BigInt(0)
                                ? BigInt(collectionReward.total_staked)
                                : BigInt(1)) /
                              BigInt(collectionReward.speed)
                            ).toString()}
                            decimals={Number(rdecimals)}
                            egldLabel={' / NFT / DAY'}
                            data-testid='balance'
                            digits={2}
                          />
                        ) : (
                          <p>probleme</p>
                        )}
                      </div> */}
                    </div>
                  </div>
                  <div>
                    Vesting : {collectionReward?.vesting.toString()} Days
                  </div>

                  <div>
                    Unbonding : {collectionReward?.unbounding.toString()} Days
                  </div>
                  <div>
                    Speed : {collectionReward?.speed?.toString() + ' '}
                    days
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: width > 450 ? 'row' : 'column',
                      gap: '10px'
                    }}
                  >
                    {/* {nft?.media && (
                      <div
                        style={{
                          width: '100%',
                          textAlign: width > 855 ? 'center' : 'center'
                        }}
                      >
                        <HexagoneNFT
                          format={nft?.media[0]?.fileType}
                          url={nft?.media[0]?.url}
                          width={35}
                          withBorder={true}
                          borderWidth={1}
                          borderColor='linear-gradient(to bottom, #1f67ff, #5e5ffe, #8356fa, #a249f4, #bd37ec)'
                        />
                      </div>
                    )} */}
                    {address && (
                      <Button
                        fontSize='10px'
                        buttonWidth='120px'
                        hasBorder={true}
                        borderRadius={40}
                        background={'black'}
                        borderColor={['#BD37EC', '#1F67FF']}
                        text='Stake NFT'
                        boxShadow='0px 0px 20px 0px #8E44EB80 inset'
                        buttonHeight='31px'
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
                        rightHtml={
                          nft?.media && (
                            <HexagoneNFT
                              format={nft?.media[0]?.fileType}
                              url={nft?.media[0]?.url}
                              width={30}
                              withBorder={true}
                              borderWidth={1}
                              borderColor='linear-gradient(to bottom, #1f67ff, #5e5ffe, #8356fa, #a249f4, #bd37ec)'
                            />
                          )
                        }
                      />
                    )}
                    <ActionClaimRewards
                      buttonWidth='120px'
                      bottomHeight={'30px'}
                      identifier={collectionReward}
                      rewardsAmount={allRewardsForUser}
                      Availablerewards={Availablerewards}
                      pool_id={collectionReward?.pool_id}
                    />
                  </div>
                </div>
                <hr
                  style={{
                    margin: '5px 0 ',
                    width: '100%',
                    height: '0px',
                    marginTop: 0,
                    marginBottom: 0,
                    border: ' 1px solid #634ACB99'
                  }}
                />
                <div
                  className='accordion-contents-buttons'
                  style={{
                    display: 'flex',
                    flexDirection: width > 855 ? 'row' : 'column',
                    gap: '10px',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      textAlign: width > 855 ? 'start' : 'center'
                    }}
                  >
                    rewards :{' '}
                    <FormatAmount
                      value={BigNumber(collectionReward?.rewards).toFixed()}
                      decimals={Number(rdecimals)}
                      egldLabel={' '}
                      data-testid='balance'
                      digits={2}
                    />
                  </div>
                  <div
                    style={{
                      width: '100%',
                      textAlign: width > 855 ? 'center' : 'center'
                    }}
                  >
                    {address ? (
                      <>
                        your stake : {myTokenStakedNumber}/
                        {collectionReward?.total_staked
                          ? collectionReward?.total_staked.toString()
                          : '...'}
                      </>
                    ) : (
                      <>
                        total staked :{' '}
                        {collectionReward?.total_staked
                          ? collectionReward?.total_staked.toString()
                          : '...'}
                      </>
                    )}
                  </div>
                  {address && (
                    <div
                      style={{
                        width: '100%',
                        textAlign: width > 855 ? 'end' : 'center'
                      }}
                    >
                      my rewards :{' '}
                      <FormatAmount
                        value={
                          Availablerewards
                            ? BigNumber(Availablerewards[0])?.toFixed()
                            : ''
                        }
                        decimals={Number(rdecimals)}
                        egldLabel={' '}
                        data-testid='balance'
                        // digits={2}
                        digits={
                          BigNumber(Availablerewards[0])?.toFixed().length >=
                          rdecimals
                            ? 2
                            : rdecimals -
                              BigNumber(Availablerewards[0])?.toFixed().length +
                              2
                        }
                      />
                    </div>
                  )}
                </div>
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
                isOpen={isOpen}
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
