import React from 'react';
import { FormatAmount } from 'lib';
import BigNumber from 'bignumber.js';
import { RadioButton } from 'components/Design/RadioButton';
import { useWindowDimensions } from 'components/DimensionScreen';
import toHex from 'helpers/toHex';
import { useGetNft } from 'pages/Collections/components/Actions/helpers/useGetNft';
import HexagoneNFT from 'pages/Collections/components/hexagoneNFT';
import HexagoneGroupe from 'pages/Collections/components/Modal/AddCollection/hexagoneGroupe';
import notFound from '../../../../../assets/img/notfoundc.svg';
import { useGetESDTInformations } from '../../Actions/helpers';

export const RowJumpPool = (props: any) => {
  const { width } = useWindowDimensions();
  //   <div>{props.inforamtion.identifier}</div>;

  const rewarded_esdt_info = useGetESDTInformations(
    props.inforamtion?.identifier
  );

  const rdecimals = rewarded_esdt_info?.decimals
    ? rewarded_esdt_info?.decimals
    : 0;

  const nft = useGetNft(
    props.inforamtion.collection.toString(),
    Number(props.inforamtion.nonce),
    true
  );

  return (
    <div className='pool-details_Collection'>
      <div className={'Groupe_Details_Collection'}>
        <div
          className='Pool_Details_Collection'
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div className='Details_Collection' style={{ width: '100%' }}>
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
                      {props.inforamtion &&
                      props.inforamtion?.total_staked &&
                      Number(props.inforamtion?.blocks_to_max) !== 0 ? (
                        <FormatAmount
                          value={(
                            BigInt(
                              BigNumber(props.inforamtion?.rewards).toFixed()
                            ) /
                            (BigInt(props.inforamtion?.total_staked) > BigInt(0)
                              ? BigInt(props.inforamtion?.total_staked)
                              : BigInt(1)) /
                            BigInt(props.inforamtion?.speed)
                          ).toString()}
                          data-testid='balance'
                        />
                      ) : (
                        <p>error</p>
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
                  Vesting : {props.inforamtion?.vesting.toString()} Days
                </div>

                <div>
                  Unbonding : {props.inforamtion?.unbounding.toString()} Days
                </div>
                <div>
                  Speed : {props.inforamtion?.speed?.toString() + ' '}
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
                  {nft?.media ? (
                    <a
                      style={{ color: 'white', display: 'flex' }}
                      target='_blank'
                      rel='noreferrer'
                      href={
                        'https://xoxno.com/nft/' +
                        props.inforamtion?.collection +
                        '-' +
                        toHex(props.inforamtion?.nonce)
                      }
                    >
                      <u>
                        <HexagoneNFT
                          format={nft?.media[0]?.fileType}
                          url={nft?.media[0]?.url}
                          width={35}
                          withBorder={true}
                          borderWidth={1}
                          borderColor='linear-gradient(to bottom, #1f67ff, #5e5ffe, #8356fa, #a249f4, #bd37ec)'
                        />{' '}
                      </u>
                    </a>
                  ) : (
                    <a
                      style={{ color: 'white', display: 'flex' }}
                      target='_blank'
                      rel='noreferrer'
                      href={
                        'https://xoxno.com/collection/' +
                        props.inforamtion?.collection
                      }
                    >
                      <u>
                        <HexagoneGroupe
                          orientationEscalier={'reverse'}
                          width={width > 450 ? 40 : 40}
                          collectionInfo={props.getCollectionInformations}
                        />
                      </u>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          {props.RadioButton && (
            <div
              style={{ width: '50px', display: 'flex', justifyContent: 'end' }}
            >
              <RadioButton
                onClick={() => props.setPoolSelected(props.inforamtion.pool_id)}
                selected={props.PoolSelected === props.inforamtion.pool_id}
                borderColor={['#BD37EC', '#1F67FF']}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
