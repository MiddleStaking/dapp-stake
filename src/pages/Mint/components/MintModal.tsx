import React, { useEffect } from 'react';
import './StakeModal.scss';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks';
import Input from 'components/Design/Input';
import { defaultToken, midGiftToken, sftCollection } from 'config';
import { useGetUserNFT } from 'pages/CollectionDetail/components/Actions/helpers';
import { useGetCollectionInformations } from 'pages/Collections/components/Actions/helpers';
import HexagoneNFT from 'pages/Collections/components/hexagoneNFT';
import HexagoneGroupe from 'pages/Collections/components/Modal/AddCollection/hexagoneGroupe';
import { Button } from '../../../components/Design';
import { ActionMint } from './Actions';
import { useGetMinted, useGetNonces } from './Actions/helpers';

const MintModal = (props: any) => {
  // const tokenPosition = useGetTokenPosition(stoken, rtoken);
  // const [egldAmount] = React.useState(0.2);
  // const [egldBig] = React.useState(BigInt('200000000000000000'));

  const [egldAmount] = React.useState(0.01);
  const [egldBig] = React.useState(BigInt('10000000000000000'));

  const [midAmount] = React.useState(100);
  const [midBig] = React.useState(BigInt('100000000000000000000'));

  //index du gift dans la collection
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [selectedGift, setSelectedGift] = React.useState<any>({});

  const getCollectionInformations = useGetCollectionInformations(sftCollection);
  const userNftBalance: any = useGetUserNFT(midGiftToken);

  const { hasPendingTransactions } = useGetPendingTransactions();

  const nonces = useGetNonces();

  const getMinted = useGetMinted();

  const mid_balance =
    props.userEsdtBalance.find(
      (item: any) => item.identifier === defaultToken
    ) ?? { balance: BigInt(0) }?.balance;

  const egld_balance = props.userEgldBalance
    ? BigInt(props.userEgldBalance)
    : BigInt(0);

  //on pre-selectionne le premier nft du tableau
  useEffect(() => {
    setSelectedGift(userNftBalance[0]);
    setCurrentIndex(0);
  }, [userNftBalance]);

  const handleBeforeClick = () => {
    const myCurrentIndex = userNftBalance.findIndex(
      (item: any) => item.identifier === selectedGift?.identifier
    );

    if (myCurrentIndex > 0) {
      const previousItem = userNftBalance[myCurrentIndex - 1];
      setCurrentIndex(myCurrentIndex - 1);
      setSelectedGift(previousItem);
    }
  };

  const handleAfterClick = () => {
    const myCurrentIndex = userNftBalance.findIndex(
      (item: any) => item.identifier === selectedGift?.identifier
    );

    if (myCurrentIndex < userNftBalance.length - 1) {
      const newItem = userNftBalance[myCurrentIndex + 1];
      setCurrentIndex(myCurrentIndex + 1);
      setSelectedGift(newItem);
    }
  };

  if (!props.show) {
    return null;
  }

  return (
    <>
      <div className='centerStakeModal'>
        <div className='backgroundStakeModal'>
          <div className='modalStakeModal'>
            <div className='contentStakeModal'>
              <div className='modalLabelStakeModal'>OPEN GIFT</div>
              {getMinted?.media && !hasPendingTransactions ? (
                <>
                  {' '}
                  <div>Your last opening :</div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0px 0px'
                    }}
                  >
                    {getMinted?.media && (
                      <HexagoneNFT
                        format={
                          getMinted?.media[0]?.fileType == 'video/mp4'
                            ? 'video/mp4'
                            : 'image'
                        }
                        url={
                          getMinted.length != 0 ? getMinted?.media[0]?.url : ''
                        }
                        width={200}
                        withBorder={true}
                        borderWidth={2.5}
                        borderColor='linear-gradient(to bottom, #1f67ff, #5e5ffe, #8356fa, #a249f4, #bd37ec)'
                        withShadow={true}
                      />
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '30px 0px'
                    }}
                  >
                    {getCollectionInformations &&
                      Object.keys(getCollectionInformations).length > 0 && (
                        <HexagoneGroupe
                          collectionInfo={getCollectionInformations}
                        />
                      )}
                  </div>
                </>
              )}

              <div className='staked-rewarded-tokens-StakeModal'>
                <div
                  className='do-you-want-to-add-it-rewarded-tokens-StakeModal'
                  style={{ margin: 'auto' }}
                >
                  Reveal one random NFT from collection with a MIDGIFT
                </div>

                <div>
                  {/* with EGLD */}
                  {/* <div className='AmountInputGroupe'>
                    <Input
                      inputHeight='40px'
                      inputWidth='180px'
                      borderColor='rgb(105, 88, 133)'
                      value={egldAmount}
                      type='number'
                      placeholder={'number'}
                      fontSize={14}
                      disabled={true}
                      rightHtml={'EGLD'}
                    />
                    <ActionMint
                      staked_token={props.staked_token}
                      rewarded_token={props.rewarded_token}
                      method={'egld'}
                      bigValue={egldBig}
                      disabled={
                        nonces.length == 0
                          ? true
                          : egld_balance < egldBig
                          ? true
                          : false
                      }
                    />
                  </div> */}

                  {/* with MID */}
                  {/* <div
                    className='AmountInputGroupe'
                    style={{ marginTop: '10px' }}
                  >
                    <Input
                      inputHeight='40px'
                      inputWidth='180px'
                      borderColor='rgb(105, 88, 133)'
                      value={midAmount}
                      type='number'
                      placeholder={'number'}
                      fontSize={14}
                      disabled={true}
                      rightHtml={'MID'}
                    />
                    <ActionMint
                      staked_token={props.staked_token}
                      rewarded_token={props.rewarded_token}
                      method={'mid'}
                      bigValue={midBig}
                      disabled={
                        nonces.length == 0
                          ? true
                          : mid_balance < midBig
                          ? true
                          : false
                      }
                    />
                  </div> */}

                  {/* with GIFT */}
                  {userNftBalance.length > 0 && (
                    <div
                      className='wrapperTT'
                      style={{ margin: 'auto', maxWidth: '200px' }}
                    >
                      <div
                        className='arrow arrow-before'
                        onClick={handleBeforeClick}
                        style={{
                          cursor: currentIndex > 0 ? 'pointer' : 'default',
                          filter: currentIndex <= 0 ? 'grayscale(0.80)' : 'none'
                        }}
                      ></div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '30px 0px'
                        }}
                      >
                        {selectedGift?.media && (
                          <HexagoneNFT
                            format={
                              selectedGift?.media[0]?.fileType == 'video/mp4'
                                ? 'video/mp4'
                                : 'image'
                            }
                            url={
                              selectedGift.length != 0
                                ? selectedGift?.media[0]?.url
                                : ''
                            }
                            width={200}
                            withBorder={true}
                            borderWidth={2.5}
                            borderColor='linear-gradient(to bottom, #1f67ff, #5e5ffe, #8356fa, #a249f4, #bd37ec)'
                            withShadow={true}
                          />
                        )}
                      </div>
                      <div
                        className='arrow arrow-after'
                        onClick={handleAfterClick}
                        style={{
                          cursor:
                            currentIndex < userNftBalance.length - 1
                              ? 'pointer'
                              : 'default',
                          filter:
                            currentIndex >= userNftBalance.length - 1
                              ? 'grayscale(0.80)'
                              : 'none'
                        }}
                      ></div>
                    </div>
                  )}
                  <div
                    className='AmountInputGroupe'
                    style={{ marginTop: '10px' }}
                  >
                    <Input
                      inputHeight='40px'
                      inputWidth='180px'
                      borderColor='rgb(105, 88, 133)'
                      value={1}
                      type='number'
                      placeholder={'number'}
                      fontSize={14}
                      disabled={true}
                      rightHtml={'MIDGIFT'}
                    />
                    <ActionMint
                      staked_token={props.staked_token}
                      rewarded_token={props.rewarded_token}
                      method={'gift'}
                      collection={selectedGift?.collection}
                      nonce={selectedGift?.nonce}
                      disabled={
                        nonces.length == 0
                          ? true
                          : userNftBalance.length > 0
                          ? false
                          : true
                      }
                    />
                  </div>

                  <div className='bottomGroupeModal' onClick={props.onClose}>
                    <div className='bottomModal'>
                      <Button
                        buttonWidth='100%'
                        hasBorder={true}
                        borderRadius={40}
                        background={'black'}
                        borderColor={['#BD37EC', '#1F67FF']}
                        text='Cancel'
                        onClick={props.onClose}
                      />
                    </div>
                    {/* <div className='bottomModal'>
                      <ActionMint
                        staked_token={props.staked_token}
                        rewarded_token={props.rewarded_token}
                        user_fund={bigAmount}
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <svg
              className='closeStakeModal'
              onClick={props.onClose}
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M13.4099 12.0002L17.7099 7.71019C17.8982 7.52188 18.004 7.26649 18.004 7.00019C18.004 6.73388 17.8982 6.47849 17.7099 6.29019C17.5216 6.10188 17.2662 5.99609 16.9999 5.99609C16.7336 5.99609 16.4782 6.10188 16.2899 6.29019L11.9999 10.5902L7.70994 6.29019C7.52164 6.10188 7.26624 5.99609 6.99994 5.99609C6.73364 5.99609 6.47824 6.10188 6.28994 6.29019C6.10164 6.47849 5.99585 6.73388 5.99585 7.00019C5.99585 7.26649 6.10164 7.52188 6.28994 7.71019L10.5899 12.0002L6.28994 16.2902C6.19621 16.3831 6.12182 16.4937 6.07105 16.6156C6.02028 16.7375 5.99414 16.8682 5.99414 17.0002C5.99414 17.1322 6.02028 17.2629 6.07105 17.3848C6.12182 17.5066 6.19621 17.6172 6.28994 17.7102C6.3829 17.8039 6.4935 17.8783 6.61536 17.9291C6.73722 17.9798 6.86793 18.006 6.99994 18.006C7.13195 18.006 7.26266 17.9798 7.38452 17.9291C7.50638 17.8783 7.61698 17.8039 7.70994 17.7102L11.9999 13.4102L16.2899 17.7102C16.3829 17.8039 16.4935 17.8783 16.6154 17.9291C16.7372 17.9798 16.8679 18.006 16.9999 18.006C17.132 18.006 17.2627 17.9798 17.3845 17.9291C17.5064 17.8783 17.617 17.8039 17.7099 17.7102C17.8037 17.6172 17.8781 17.5066 17.9288 17.3848C17.9796 17.2629 18.0057 17.1322 18.0057 17.0002C18.0057 16.8682 17.9796 16.7375 17.9288 16.6156C17.8781 16.4937 17.8037 16.3831 17.7099 16.2902L13.4099 12.0002Z' />
            </svg>
            <div className='neon-border-stack'></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MintModal;
