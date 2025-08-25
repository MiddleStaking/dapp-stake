import React, { useState } from 'react';
import { useGetAccountInfo } from 'lib';
import { useParams } from 'react-router-dom';
import { useWindowDimensions } from 'components/DimensionScreen';
import { useGetUserNFT } from 'pages/CollectionDetail/components/Actions/helpers';
import { useGetCollectionInformations } from 'pages/Collections/components/Actions/helpers';
import HexagoneGroupe from 'pages/Collections/components/Modal/AddCollection/hexagoneGroupe';
import { PoolAddCollection } from 'pages/Collections/components/Modal/AddCollection/PoolAddCollection';
import AccordionWrap from './AccordionWrap';
import { useGetUserRewards, useGetCollectionRewards } from './Actions/helpers';
import { useGetUserESDT } from 'pages/Earn/components/Actions/helpers/useGetUserESDT';
import { useGetUserStakedNft } from './Actions/helpers/useGetUserStakedNft';
import { ModalJump } from './Modal/ModalJump';

export const CollectionsLayout = () => {
  const { address } = useGetAccountInfo();
  const userEsdtBalance = useGetUserESDT();
  // const isPaused = useGetIsPaused();

  const { param } = useParams();
  const [url] = useState(param?.toString());

  const [openModalJump, setOpenModalJump] = useState(false);
  const [nftsJump, setNftsJump] = useState<any>('');

  const collectionRewards = useGetCollectionRewards(url ? url : '');
  const allRewardsForUser = useGetUserRewards(address, url ? url : '');
  const userNftBalance = useGetUserNFT(url ? url : '');
  const userStakedNft = useGetUserStakedNft(address);
  const getCollectionInformations = useGetCollectionInformations(
    url ? url : ''
  );

  // console.log(getCollectionInformations);
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
            {address && (
              <PoolAddCollection
                userEsdtBalance={userEsdtBalance}
                address={address}
              />
            )}
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
