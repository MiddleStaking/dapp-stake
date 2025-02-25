import React, { useEffect, useState } from 'react';
import {
  useGetAccountInfo,
  useGetPendingTransactions
} from '@multiversx/sdk-dapp/hooks';
import { useWindowDimensions } from 'components/DimensionScreen';
import { HeaderMenuContext } from 'context/Header/HeaderMenuContext';
import { useGetUserStakedNft } from 'pages/CollectionDetail/components/Actions/helpers/useGetUserStakedNft';
import {
  useGetCollectionInformations,
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
import { ActionUnlock } from './Actions/ActionUnlock';
import { ActionUnlockAll } from './Actions/ActionUnlockAll';
import DinoDyor from '../../../assets/img/DinoVoxDyor.jpg';
import SmallVox from '../../../assets/img/vox-s.png';

export const CollectionsLayout = () => {
  const [mint, setMint] = useState(0);
  const { account, address } = useGetAccountInfo();
  // const stakedCollections: string[] = useGetCollections();
  const collection_info = useGetCollectionInformations(lockedCollection, 30);
  const userStakedNft = useGetLocked(address);
  // const userStakedNft = [2, 3];
  let percent = 20;
  if (userStakedNft.length > 0) {
    percent += 10 * userStakedNft.length;
  }
  const userNftBalance = useGetUserNFT(lockedCollection);
  const ScNftBalance = useGetScNFT(vouchersCollection, contracts.lockGraou);
  //const ScNftBalance: any = [];

  const minted = useGetRewarded();
  const { hasPendingTransactions } = useGetPendingTransactions();

  // const minted: any = {
  //   identifier: 'fail'
  // };
  // const minted = userNftBalance[0];

  useEffect(() => {
    if (mint == 1 && hasPendingTransactions) {
      setMint(2);
    }
  }, [hasPendingTransactions, mint]);

  return (
    <div
      style={{
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      <div
        className='text-center text-white'
        style={{
          minHeight: '171px',
          width: '100%',
          background:
            'linear-gradient(0deg, rgba(99, 74, 203, 0.32), rgba(99, 74, 203, 0.32)), linear-gradient(rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)',
          borderRadius: '8px',
          borderWidth: '1px',
          borderImage:
            'linear-gradient(rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%) 1 / 1 / 0 stretch'
        }}
      >
        {ScNftBalance.length > 0 ? (
          <>
            <div
              style={{ fontFamily: 'Arial, sans-serif', marginBottom: '20px' }}
            >
              <h2>Unlock Rewards with Dino Gazette</h2>
              <div style={{ margin: 'auto' }}>
                <img width='500px' src={DinoDyor} />
              </div>{' '}
              <p>
                Acquire an extra Dino Gazette and try your luck to win a
                dinovoucher. Each locked gazette increases your chance to win
                from a pool of exclusive vouchers.
              </p>
              <p>
                The Gazettes will remain locked until there are no more vouchers
                in the contract, ensuring continuous excitement and rewards for
                participants.
              </p>
              Lock your Gazette now! Current chance to unlock a voucher :{' '}
              <b>🍀 {percent > 100 ? 100 : percent}% </b>
            </div>

            {/* Acquire an extra Dino Gazette and try your luck to win a
            dinovoucher.
            <br /> The Gazettes will remain locked until there are no more
            vouchers in the contract. <br />
            Current chance of success :<br />
            <b>🍀 {percent > 100 ? 100 : percent}% </b> */}
          </>
        ) : (
          <>
            <h2>Unlock Rewards with Dino Gazette</h2>{' '}
            <div style={{ margin: 'auto' }}>
              <img width='500px' src={DinoDyor} />
            </div>
            <p>No vouchers left in contract. All Gazettes are now unlockable</p>
          </>
        )}

        <div
          className=''
          style={{
            display: 'inline-flex',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            placeItems: 'start center',
            borderWidth: '1px',
            borderStyle: 'solid',
            padding: '5px'
          }}
        >
          {ScNftBalance.map((item: any) => (
            <div key={item?.name}>
              {item?.name}
              <HexagoneNFT
                format={item?.media?.[0]?.fileType}
                url={item?.media?.[0]?.url}
                width={150}
                withBorder={true}
                borderWidth={1}
                borderColor='linear-gradient(to bottom, #1f67ff, #5e5ffe, #8356fa, #a249f4, #bd37ec)'
                nft_qty={item?.balance}
              />
              {item?.identifier}
            </div>
          ))}
        </div>
        <div style={{ padding: '3px' }}>
          <a
            className='text-white'
            href='https://www.dinovox.com/'
            target='_blank'
            rel='noreferrer'
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Learn more about the Dinovox
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <img width='50px' src={SmallVox} />
            </div>
          </a>
        </div>
      </div>

      {userStakedNft.length > 0 && (
        <ActionUnlockAll
          text={'Unlock'}
          disabled={false}
          nonces={userStakedNft}
        />
      )}
      {!hasPendingTransactions && mint > 0 && minted?.identifer != '' ? (
        <>
          {minted?.media?.[0]?.url ? (
            <>
              <div style={{ margin: 'auto', color: 'white' }}>
                🦖 You Won !{' '}
              </div>
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
              {mint == 1 ? (
                <>
                  <div style={{ margin: 'auto' }}>
                    <img width='400px' src={pendingVoucher} />
                  </div>
                  <Button onClick={() => setMint(0)}>
                    Awaiting Transaction
                  </Button>
                </>
              ) : (
                <>
                  {' '}
                  <div style={{ margin: 'auto' }}>
                    <img width='400px' src={lostVoucher} />
                  </div>
                  <Button onClick={() => setMint(0)}>BACK</Button>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {' '}
          {hasPendingTransactions && mint > 0 ? (
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
                              'https://xoxno.com/nft/' +
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
                          <>
                            {ScNftBalance.length > 0 ? (
                              <Button style={{ width: '100px' }}>
                                Locked 🔒
                              </Button>
                            ) : (
                              <ActionUnlock
                                text={'Unlock'}
                                disabled={false}
                                nonce={item?.nonce}
                              />
                            )}
                          </>
                        ) : (
                          <>
                            {userNftBalance.some(
                              (nft: any) => nft.nonce === item?.nonce
                            ) ? (
                              <>
                                {ScNftBalance.length > 0 ? (
                                  <div onClick={() => setMint(1)}>
                                    <ActionLock
                                      text={'Lock'}
                                      disabled={false}
                                      collection={item?.collection}
                                      nonce={item?.nonce}
                                    />{' '}
                                  </div>
                                ) : (
                                  <>no</>
                                )}
                              </>
                            ) : (
                              <>
                                {address ? (
                                  <a
                                    style={{ color: 'white', display: 'flex' }}
                                    target='_blank'
                                    rel='noreferrer'
                                    href={
                                      'https://xoxno.com/nft/' +
                                      item.collection +
                                      '-' +
                                      toHex(item.nonce)
                                    }
                                  >
                                    <Button>Get it on framit.gg</Button>
                                  </a>
                                ) : (
                                  <a
                                    style={{
                                      color: 'white',
                                      display: 'flex'
                                    }}
                                    rel='noreferrer'
                                    href={'unlock'}
                                  >
                                    <Button style={{ width: '130px' }}>
                                      Login
                                    </Button>
                                  </a>
                                )}
                              </>
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
