import React, { useState, CSSProperties } from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { useWindowDimensions } from 'components/DimensionScreen';
import { network } from 'config';
import { HeaderMenuContext } from 'context/Header/HeaderMenuContext';
import { useGetUserStakedNft } from 'pages/CollectionDetail/components/Actions/helpers/useGetUserStakedNft';
import MintModal from '../../../pages/Mint/components/MintModal';
import { Button } from './../../../components/Design';
import { useGetCollections } from './Actions/helpers';
import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
import { useGetCollectionsApi } from './Actions/helpersApi';
import CardOfCollection from './CardOfCollection';
import { PoolAddCollection } from './Modal/AddCollection/PoolAddCollection';
import HexagoneNFT from './hexagoneNFT';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
export const CollectionsLayout = () => {
  const { setHeaderMenu } = React.useContext(HeaderMenuContext);
  const [mySearch, setMySearch] = React.useState('');
  const [showMint, setShowMint] = useState(false);
  const { account, address } = useGetAccountInfo();
  const userEsdtBalance = useGetUserESDT();
  const stakedCollections: string[] = useGetCollections();

  const callCollectionApi: any[] = useGetCollectionsApi();
  const userStakedNft = useGetUserStakedNft(address);

  //for unbond nft with no more pool in array
  for (const userNft of userStakedNft) {
    stakedCollections.indexOf(userNft.staked_nft.identifier) === -1 &&
      userNft.staked_nft.identifier != '' &&
      stakedCollections.push(userNft.staked_nft.identifier);
  }

  const { width } = useWindowDimensions();
  const heightComponentTypeSection = width > 450 ? '162px' : '114px';

  const handleMySearch = (e: any) => {
    setMySearch(e.target.value);
  };
  const top: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexShrink: 0,
    margin: '11px'
  };

  const left: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexShrink: 0
  };

  const title: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    alignItems: 'flex-start',
    justifyContent: 'flex-star',
    flexShrink: 0
  };

  const earnMex: CSSProperties = {
    color: 'white',
    textAlign: 'left',
    fontWeight: 700,
    fontSize: '22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  };

  const stakeMex: CSSProperties = {
    color: 'white',
    textAlign: 'left',
    fontWeight: 300,
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  };
  return (
    <div
      style={{
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      <MintModal
        userEsdtBalance={userEsdtBalance}
        userEgldBalance={
          account.balance != '...' ? BigInt(account.balance) : BigInt(0)
        }
        show={showMint}
        onClose={() => {
          setHeaderMenu(true), setShowMint(false);
        }}
      />
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: width < 600 ? 'center' : 'space-around',
            flexDirection: width < 600 ? 'column' : 'row',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <div className='search-bar'>
            <svg
              className='search'
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M14.2716 13.1684L11.3313 10.2281C12.0391 9.28573 12.4213 8.13865 12.42 6.96C12.42 3.94938 9.97063 1.5 6.96 1.5C3.94938 1.5 1.5 3.94938 1.5 6.96C1.5 9.97063 3.94938 12.42 6.96 12.42C8.13865 12.4213 9.28573 12.0391 10.2281 11.3313L13.1684 14.2716C13.3173 14.4046 13.5114 14.4756 13.711 14.47C13.9105 14.4645 14.1004 14.3827 14.2415 14.2415C14.3827 14.1004 14.4645 13.9105 14.47 13.711C14.4756 13.5114 14.4046 13.3173 14.2716 13.1684V13.1684ZM3.06 6.96C3.06 6.18865 3.28873 5.43463 3.71727 4.79328C4.14581 4.15192 4.7549 3.65205 5.46754 3.35687C6.18017 3.06169 6.96433 2.98446 7.72085 3.13494C8.47738 3.28542 9.17229 3.65686 9.71772 4.20228C10.2631 4.74771 10.6346 5.44262 10.7851 6.19915C10.9355 6.95567 10.8583 7.73983 10.5631 8.45247C10.2679 9.1651 9.76808 9.77419 9.12673 10.2027C8.48537 10.6313 7.73135 10.86 6.96 10.86C5.92604 10.8588 4.93478 10.4475 4.20365 9.71635C3.47253 8.98522 3.06124 7.99396 3.06 6.96V6.96Z'
                fill='white'
              />
            </svg>
            <input
              className='search-input'
              value={mySearch}
              onChange={handleMySearch}
              type='input'
              placeholder='Search pool'
            />
          </div>
          <div className='centered-element'>
            {address && (
              <PoolAddCollection
                userEsdtBalance={userEsdtBalance}
                address={address}
              />
            )}
          </div>
          {network.id != 'mainnet' && (
            <div className='centered-element'>
              <Button
                fontSize='16px'
                buttonHeight={'44px'}
                buttonWidth={'90px'}
                borderRadius={40}
                background={['#BD37EC', '#1F67FF']}
                borderColor={'black'}
                text='Mint SFT'
                onClick={() => {
                  setHeaderMenu(false), setShowMint(true);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '10px',
          placeItems: 'start center'
        }}
      >
        {/* {stakedCollections &&
          stakedCollections
            .filter((token) => {
              return (
                token.toLowerCase().includes(mySearch.toLowerCase()) ||
                mySearch == ''
              );
            })
            .map((item) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  maxWidth: '300px'
                }}
              >
                <CardOfCollection
                  height={heightComponentTypeSection}
                  WindowDimensions={width}
                  textColor='#ffffff'
                  fontFamily='sans-serif'
                  collectionIdentifier={item}
                />
              </div>
            ))} */}

        {/* div Vouchers */}
        {/* <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '300px',
            cursor: 'pointer'
          }}
        >
          {' '}
          <div
            style={{
              width: '300px',
              // height: '300px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1px',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flex: 1,
              position: 'relative'
            }}
          >
            <div
              onClick={() => (window.location.href = `/graou`)}
              style={{
                minHeight: '171px',
                width: '100%',
                background:
                  'linear-gradient(0deg, rgba(99, 74, 203, 0.32), rgba(99, 74, 203, 0.32)),linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)',
                borderRadius: '8px 8px 8px 8px',
                borderWidth: '1px',
                // borderStyle: 'solid',
                borderStyle: '',
                borderImage:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.00) 100%) 1',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                alignSelf: 'stretch',
                flexShrink: 0,
                overflow: 'hidden'
              }}
            >
              <div style={top}>
                <div style={left}>
                  <div style={title}>
                    <div style={earnMex}>
                      Lock {'DINOGAZ-c723ac'.split('-')[0]}{' '}
                      <FontAwesomeIcon
                        icon={faCertificate}
                        style={{ color: '#66bf1d' }}
                        size={'sm'}
                      />
                    </div>
                    <div style={stakeMex}>Earn #graou Vouchers</div>
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gridGap: '70px'
                    }}
                  >
                    <div className='imgCheminCard'>
                      <div>
                        <HexagoneNFT
                          format={'image'}
                          url={
                            'https://media.elrond.com/nfts/asset/bafybeihmudwr67z66ghteqbchkesdddvnmeo2psop3xyicznkbgyu6xpu4/item.png'
                          }
                          width={100}
                          withBorder={true}
                          borderWidth={2.5}
                          borderColor='linear-gradient(to bottom, #1f67ff, #5e5ffe, #8356fa, #a249f4, #bd37ec)'
                        />
                      </div>
                    </div>
                    <div className='imgCheminCard'>
                      <HexagoneNFT
                        format={'video/mp4'}
                        url={
                          'https://media.elrond.com/nfts/asset/bafybeia2xgpmdfphy74bvw5x4um6ogy5rtpydu6xujwaley7m4i3ltlj4m/item.mp4'
                        }
                        width={100}
                        withBorder={true}
                        borderWidth={2.5}
                        borderColor='linear-gradient(to bottom, #1f67ff, #5e5ffe, #8356fa, #a249f4, #bd37ec)'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* end div Vouchers */}
        {callCollectionApi &&
          callCollectionApi
            .filter((item) => {
              return (
                item.identifier
                  .toLowerCase()
                  .includes(mySearch.toLowerCase()) || mySearch == ''
              );
            })
            .map((item) => (
              <div
                key={item.identifier}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  maxWidth: '300px',
                  cursor: 'pointer'
                }}
              >
                <CardOfCollection
                  collection={item}
                  height={heightComponentTypeSection}
                  WindowDimensions={width}
                  textColor='#ffffff'
                  fontFamily='sans-serif'
                  collectionIdentifier={item.identifier}
                />
              </div>
            ))}
      </div>
    </div>
  );
};
