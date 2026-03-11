import React, { useState } from 'react';
import { useGetAccountInfo } from 'lib';
import { useParams } from 'react-router-dom';
import { useWindowDimensions } from 'components/DimensionScreen';
import { useGetUserNFT } from 'pages/CollectionDetail/components/Actions/helpers';
import { useGetCollectionInformations } from 'pages/Collections/components/Actions/helpers';
import HexagoneGroupe from 'pages/Collections/components/Modal/AddCollection/hexagoneGroupe';
import { PoolAddCollection } from 'pages/Collections/components/Modal/AddCollection/PoolAddCollection';
import { PoolAddCollectionV2 } from 'pages/Collections/components/Modal/AddCollection/PoolAddCollectionV2';
import AccordionWrap from './AccordionWrap';
import { useGetUserRewards, useGetCollectionRewards } from './Actions/helpers';
import { useGetUserRewardsV2 } from './Actions/helpers/useGetUserRewardsV2';
import { useGetCollectionRewardsV2 } from './Actions/helpers/useGetCollectionRewardsV2';
import { useGetUserESDT } from 'pages/Earn/components/Actions/helpers/useGetUserESDT';
import { useGetUserStakedNft } from './Actions/helpers/useGetUserStakedNft';
// import { useGetUserStakedNftV2 } from './Actions/helpers/useGetUserStakedNftV2';
import { useCheckIsV2 } from 'pages/Collections/components/Actions/helpersApi/useCheckIsV2';
import { ModalJump } from './Modal/ModalJump';

export const CollectionsLayout = () => {
  const { address } = useGetAccountInfo();
  const userEsdtBalance = useGetUserESDT();
  // const isPaused = useGetIsPaused();

  const { param } = useParams();
  const [url] = useState(param?.toString());

  const [openModalJump, setOpenModalJump] = useState(false);
  const [nftsJump, setNftsJump] = useState<any>('');

  /* V2 Detection Logic */
  const isV2 = useCheckIsV2(url);

  // V1 Hooks
  const collectionRewardsV1 = useGetCollectionRewards(url ? url : '');
  const allRewardsForUserV1 = useGetUserRewards(address, url ? url : '');
  const userStakedNftV1 = useGetUserStakedNft(address);

  // V2 Hooks
  // const collectionRewardsV2 = useGetCollectionRewardsV2(url ? url : '');
  // const allRewardsForUserV2 = useGetUserRewardsV2(address, url ? url : '');
  // const userStakedNftV2 = useGetUserStakedNftV2(address);

  // Unified Data
  // Tag V1 data
  const collectionRewardsV1Tagged = Array.isArray(collectionRewardsV1)
    ? collectionRewardsV1.map((item: any) => ({ ...item, isV2: false }))
    : [];
  const allRewardsForUserV1Tagged = Array.isArray(allRewardsForUserV1)
    ? allRewardsForUserV1.map((item: any) => ({ ...item, isV2: false }))
    : [];
  // For userStakedNft, items are inside.
  // V1 structure: { staked_nft: {...}, current_block: ... }
  // We attach isV2 to the wrapper or the staked_nft?
  // Accordion accesses item.staked_nft.pool_id.
  // AccordionWRAP constructs user_pools from userStakedNft.
  // We need to know which version the staked nft belongs to.
  const userStakedNftV1Tagged = Array.isArray(userStakedNftV1)
    ? userStakedNftV1.map((item: any) => ({
        ...item,
        isV2: false,
        staked_nft: { ...item.staked_nft, isV2: false }
      }))
    : [];

  // Tag V2 data
  // const collectionRewardsV2Tagged = Array.isArray(collectionRewardsV2)
  //   ? collectionRewardsV2.map((item: any) => ({ ...item, isV2: true }))
  //   : [];
  // const allRewardsForUserV2Tagged = Array.isArray(allRewardsForUserV2)
  //   ? allRewardsForUserV2.map((item: any) => ({ ...item, isV2: true }))
  //   : [];
  // const userStakedNftV2Tagged = Array.isArray(userStakedNftV2)
  //   ? userStakedNftV2.map((item: any) => ({
  //       ...item,
  //       isV2: true,
  //       staked_nft: { ...item.staked_nft, isV2: true }
  //     }))
  //   : [];

  // Merge
  const collectionRewards = [
    ...collectionRewardsV1Tagged
    // ...collectionRewardsV2Tagged
  ];
  const allRewardsForUser = [
    ...allRewardsForUserV1Tagged
    // ...allRewardsForUserV2Tagged
  ];
  const userStakedNft = [
    ...userStakedNftV1Tagged /* ...userStakedNftV2Tagged */
  ];

  const userNftBalance = useGetUserNFT(url ? url : '');
  const getCollectionInformations = useGetCollectionInformations(
    url ? url : ''
  );

  const { width } = useWindowDimensions();

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '9px 24px',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '9px 24px',
            alignItems: 'center',
            width: '100%',
            gap: '10px'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '10px',
              color: 'white'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {getCollectionInformations?.length > 0 && (
                <>
                  <HexagoneGroupe
                    orientationEscalier={'reverse'}
                    width={width > 450 ? 80 : 60}
                    collectionInfo={getCollectionInformations}
                  />

                  <div
                    style={{
                      textAlign: 'center'
                    }}
                  >
                    <a
                      style={{ color: 'white' }}
                      target='_blank'
                      rel='noreferrer'
                      href={
                        'https://xoxno.com/collection/' +
                        getCollectionInformations[0]?.collection
                      }
                    >
                      <u>
                        {getCollectionInformations[0]?.collection
                          ? getCollectionInformations[0]?.collection
                          : ''}
                      </u>
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>

          <div
            //  className='col-12'
            style={{ width: '44px' }}
          >
            {address &&
              (isV2 ? (
                <PoolAddCollectionV2
                  userEsdtBalance={userEsdtBalance}
                  address={address}
                />
              ) : (
                <PoolAddCollection
                  userEsdtBalance={userEsdtBalance}
                  address={address}
                />
              ))}
            {openModalJump && (
              <ModalJump
                getCollectionInformations={getCollectionInformations}
                openModalJump={openModalJump}
                nftsJump={nftsJump}
                setOpenModalJump={setOpenModalJump}
                showMoal={openModalJump}
                onClose={() => setOpenModalJump(false)}
              />
            )}
          </div>
        </div>
      </div>
      <br />
      {getCollectionInformations?.length > 0 ? (
        <AccordionWrap
          key={getCollectionInformations[0]?.collection}
          uniqueKey={getCollectionInformations[0]?.collection}
          setNftsJump={setNftsJump}
          setOpenModalJump={setOpenModalJump}
          userEsdtBalance={userEsdtBalance}
          collection_identifier={
            getCollectionInformations[0]?.collection
              ? getCollectionInformations[0]?.collection
              : ''
          }
          address={address}
          allRewardsForUser={allRewardsForUser}
          collectionRewards={collectionRewards}
          userNftBalance={userNftBalance}
          userStakedNft={userStakedNft}
          getCollectionInformations={getCollectionInformations}
          isV2={isV2}
        />
      ) : (
        <div
          className='text-white'
          style={{ margin: '0', width: '100%', textAlign: 'center' }}
        >
          Could not load collection informations. Try to reload the page and
          check url
        </div>
      )}
    </div>
  );
};
