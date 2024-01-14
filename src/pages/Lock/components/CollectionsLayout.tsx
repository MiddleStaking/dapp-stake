import React, { useState } from 'react';
import {
  useGetAccountInfo,
  useGetPendingTransactions
} from '@multiversx/sdk-dapp/hooks';
import { useWindowDimensions } from 'components/DimensionScreen';
import { HeaderMenuContext } from 'context/Header/HeaderMenuContext';
import { useGetUserStakedNft } from 'pages/CollectionDetail/components/Actions/helpers/useGetUserStakedNft';
import {
  useGetCollectionInformations,
  useGetCollections,
  useGetLocked,
  useGetScNFT
} from './Actions/helpers';
import { useGetUserNFT } from 'pages/CollectionDetail/components/Actions/helpers';
import HexagoneNFT from './hexagoneNFT';
import toHex from 'helpers/toHex';
import { Button } from 'react-bootstrap';
import { contracts, lockedCollection, vouchersCollection } from 'config';
import { ActionLock } from './Actions';
import { useGetRewarded } from './Actions/helpers/useGetRewarded';
import { cpSync } from 'fs';
import lostVoucher from '../../../assets/img/lostVoucher.png';
import pendingVoucher from '../../../assets/img/voucherRun.png';

export const CollectionsLayout = () => {
  const [mint, setMint] = useState(0);
  const { account, address } = useGetAccountInfo();
  const stakedCollections: string[] = useGetCollections();
  const collection_info = useGetCollectionInformations(lockedCollection, 30);
  const userStakedNft = useGetLocked(address);
  //console.log('locked', userStakedNft, userStakedNft.length);
  // const userStakedNft = [2, 3];
  let percent = 40;
  if (userStakedNft.length > 0) {
    percent += 10 * userStakedNft.length;
  }
  const userNftBalance = useGetUserNFT(lockedCollection);
  const ScNftBalance = useGetScNFT(vouchersCollection, contracts.lockGraou);
  console.log('ScNftBalance', ScNftBalance);

  const minted = useGetRewarded();
  const { hasPendingTransactions } = useGetPendingTransactions();

  // const minted: any = {
  //   identifier: 'fail'
  // };
  // const minted = userNftBalance[0];
  console.log('35', minted);
  console.log('mint', mint);
  console.log('hasPendingTransactions', hasPendingTransactions);

  return (
    <div
      style={{
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      <div className='alert alert-warning text-center'>
        Acquire an extra Dino Gazette and try your luck to win a dinovoucher.
        <br /> The Gazettes will remain locked until there are no more vouchers
        in the contract. <br />
        Current chance of success :<br />
        <b>🍀 {percent > 100 ? 100 : percent}% </b>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '10px',
            placeItems: 'start center'
          }}
        >
          {ScNftBalance.map((item: any) => (
            <div>
              {item?.name}
              <HexagoneNFT
                format={item?.media?.[0]?.fileType}
                url={item?.media?.[0]?.url}
                width={100}
                withBorder={true}
                borderWidth={1}
                borderColor='linear-gradient(to bottom, #1f67ff, #5e5ffe, #8356fa, #a249f4, #bd37ec)'
              />
              {item?.identifier} : {item?.balance}{' '}
            </div>
          ))}
        </div>
      </div>

      {!hasPendingTransactions && mint == 1 && minted?.identifer != '' ? (
        <>
          {minted?.media?.[0]?.url ? (
            <>
              <div style={{ margin: 'auto', color: 'white' }}>Yo Won !</div>
              <HexagoneNFT
                format={minted?.media?.[0]?.fileType}
                url={minted?.media?.[0]?.url}
                width={300}
                withBorder={true}
                borderWidth={1}
                borderColor='linear-gradient(to bottom, #1f67ff, #5e5ffe, #8356fa, #a249f4, #bd37ec)'
              />
              <Button onClick={() => setMint(0)}>BACK</Button>
            </>
          ) : (
            <>
              <div style={{ margin: 'auto' }}>
                <img width='400px' src={lostVoucher} />
              </div>
              <Button onClick={() => setMint(0)}>BACK</Button>
            </>
          )}
        </>
      ) : (
        <>
          {' '}
          {hasPendingTransactions && mint == 1 ? (
            <>
              <div style={{ margin: 'auto' }}>
                <img width='400px' src={pendingVoucher} />
              </div>
              <Button>PENDING TRANSACTION</Button>
            </>
          ) : (
            <>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '10px',
                  placeItems: 'start center'
                }}
              >
                {collection_info &&
                  collection_info.map((item: any) => (
                    <div
                      key={item?.identifier}
                      style={{
                        // display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        maxWidth: '300px'
                      }}
                    >
                      <div style={{ margin: 'auto' }}>
                        <div style={{ width: '100px', margin: 'auto' }}>
                          <a
                            style={{ color: 'white', display: 'flex' }}
                            target='_blank'
                            rel='noreferrer'
                            href={
                              'https://www.frameit.gg/marketplace/nft/' +
                              item.collection +
                              '-' +
                              toHex(item.nonce)
                            }
                          >
                            <Button style={{ width: '100px' }}>
                              {item?.name}
                            </Button>
                          </a>
                        </div>
                        {/* <img src={item?.media[0]?.url} width='200px' /> */}
                        <HexagoneNFT
                          format={item?.media[0]?.fileType}
                          url={item?.media[0]?.url}
                          width={300}
                          withBorder={true}
                          borderWidth={1}
                          borderColor='linear-gradient(to bottom, #1f67ff, #5e5ffe, #8356fa, #a249f4, #bd37ec)'
                        />
                      </div>
                      <div style={{ width: '100px', margin: 'auto' }}>
                        {userStakedNft.includes(item?.nonce.toString()) ? (
                          <Button style={{ width: '100px' }}>Locked 🔒</Button>
                        ) : (
                          <>
                            {userNftBalance.some(
                              (nft: any) => nft.nonce === item?.nonce
                            ) ? (
                              <div onClick={() => setMint(1)}>
                                <ActionLock
                                  text={'Lock'}
                                  disabled={false}
                                  collection={item?.collection}
                                  nonce={item?.nonce}
                                />{' '}
                              </div>
                            ) : (
                              <a
                                style={{ color: 'white', display: 'flex' }}
                                target='_blank'
                                rel='noreferrer'
                                href={
                                  'https://www.frameit.gg/marketplace/nft/' +
                                  item.collection +
                                  '-' +
                                  toHex(item.nonce)
                                }
                              >
                                <Button>Get it on framit.gg</Button>
                              </a>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
