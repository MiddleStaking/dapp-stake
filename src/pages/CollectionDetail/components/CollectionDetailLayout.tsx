import React, { useState } from 'react';
// import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { useParams } from 'react-router-dom';
import {
  // useGetIsPaused,
  useGetUserRewards
} from './Actions/helpers';
import { useGetCollectionRewards } from './Actions/helpers';
// import { useGetESDTInformations } from './Actions/helpers';
import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { useWindowDimensions } from 'components/DimensionScreen';
import { useGetUserStakedNft } from './Actions/helpers/useGetUserStakedNft';
import { useGetUserNFT } from 'pages/CollectionDetail/components/Actions/helpers';
import { PoolAddCollection } from 'pages/Collections/components/Modal/AddCollection/PoolAddCollection';
import AccordionWrap from './AccordionWrap';
import { useGetCollectionInformations } from 'pages/Collections/components/Actions/helpers';
import HexagoneGroupe from 'pages/Collections/components/Modal/AddCollection/hexagoneGroupe';

export const CollectionsLayout = ({ children }: React.PropsWithChildren) => {
  const { address } = useGetAccountInfo();
  const userEsdtBalance = useGetUserESDT();
  // const isLoggedIn = useGetIsLoggedIn();
  // const isPaused = useGetIsPaused();

  const { param } = useParams();
  const [url] = useState(param?.toString());

  const collectionRewards = useGetCollectionRewards(url ? url : '');
  const allRewardsForUser = useGetUserRewards(address, url ? url : '');
  const userNftBalance = useGetUserNFT(url ? url : '');
  const userStakedNft = useGetUserStakedNft(address);
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
                <HexagoneGroupe
                  orientationEscalier={'reverse'}
                  width={width > 450 ? 80 : 60}
                  collectionInfo={getCollectionInformations}
                />
              )}
              <div
                style={{
                  textAlign: 'center'
                }}
              >
                {url ? url : ''}
              </div>{' '}
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
          </div>
        </div>
      </div>

      <br />
      <AccordionWrap
        collection_identifier={url ? url : ''}
        address={address}
        allRewardsForUser={allRewardsForUser}
        collectionRewards={collectionRewards}
        userNftBalance={userNftBalance}
        userStakedNft={userStakedNft}
      />
    </div>
  );
};
