import React, { useState } from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { useWindowDimensions } from 'components/DimensionScreen';
import { HeaderMenuContext } from 'context/Header/HeaderMenuContext';
import { useGetUserStakedNft } from 'pages/CollectionDetail/components/Actions/helpers/useGetUserStakedNft';
import {
  useGetCollectionInformations,
  useGetCollections,
  useGetLocked
} from './Actions/helpers';
import { useGetUserNFT } from 'pages/CollectionDetail/components/Actions/helpers';
import HexagoneNFT from './hexagoneNFT';
import toHex from 'helpers/toHex';
import { Button } from 'react-bootstrap';
import { lockedCollection } from 'config';
import { ActionLock } from './Actions';
import { useGetRewarded } from './Actions/helpers/useGetRewarded';
import { cpSync } from 'fs';
export const CollectionsLayout = () => {
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
  // console.log(userNftBalance);

  const { width } = useWindowDimensions();

  const minted = useGetRewarded();
  console.log('35', minted);
  return (
    <div
      style={{
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      <div className='alert alert-warning center'>
        Acquire an extra Dino Gazette and try your luck for a dinovoucher with a{' '}
        <b>{percent > 100 ? 100 : percent}%</b> chance of success 🍀. The
        Gazettes will remain locked until there are no more vouchers in the
        contract.
      </div>

      {minted?.identifer != '' && minted?.media?.[0]?.url ? (
        <>
          {/* <HexagoneNFT
            format={minted?.media?.[0]?.fileType}
            url={minted?.media?.[0]?.url}
            width={200}
            withBorder={true}
            borderWidth={1}
            borderColor='linear-gradient(to bottom, #1f67ff, #5e5ffe, #8356fa, #a249f4, #bd37ec)'
          />
          <Button onClick={() => setMinted({})}>BACK</Button> */}
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
                        <Button style={{ width: '100px' }}>{item?.name}</Button>
                      </a>
                    </div>
                    {/* <img src={item?.media[0]?.url} width='200px' /> */}
                    <HexagoneNFT
                      format={item?.media[0]?.fileType}
                      url={item?.media[0]?.url}
                      width={200}
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
                          <ActionLock
                            text={'Lock'}
                            disabled={false}
                            collection={item?.collection}
                            nonce={item?.nonce}
                          />
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
    </div>
  );
};
