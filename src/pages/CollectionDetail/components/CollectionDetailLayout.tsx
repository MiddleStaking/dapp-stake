import React, { useState, useEffect } from 'react';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { Col, Form, Row } from 'react-bootstrap';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { defaultToken } from 'config';
import notFound from './../../../assets/img/notfoundc.svg';
import { useGetIsPaused, useGetUserRewards } from './Actions/helpers';
import { useGetCollections, useGetCollectionRewards } from './Actions/helpers';
import { useGetESDTInformations } from './Actions/helpers';
import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
import FundModal from '../../Collections/components/FundModal';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { Button, ToggleSwitch } from '../../../components/Design';
import { HeaderMenuContext } from 'context/Header/HeaderMenuContext';
import CardOfCollection from './CardOfCollection';
import { useWindowDimensions } from 'components/DimensionScreen';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';
import { ActionStakeNft } from './Actions/ActionStakeNFT';
import { ActionClaimRewards } from './Actions/ActionClaimRewards';
import { useGetUserStakedNft } from './Actions/helpers/useGetUserStakedNft';
import { ActionUnstakeNFT } from './Actions';
import MyNftSection from './CardOfCollection/component/MyNftSection';
import { useGetUserNFT } from 'pages/CollectionDetail/components/Actions/helpers';
import MyStakeSection from './CardOfCollection/component/MyStakeSection';
import { PoolAddCollection } from 'pages/Collections/components/Modal/AddCollection/PoolAddCollection';
import AccordionWrap from './AccordionWrap';
import { useGetCollectionInformations } from 'pages/Collections/components/Actions/helpers';
import HexagoneGroupe from 'pages/Collections/components/Modal/AddCollection/hexagoneGroupe';

export const CollectionsLayout = ({ children }: React.PropsWithChildren) => {
  const [showFund, setShowFund] = useState(false);
  const { address } = useGetAccountInfo();
  const userEsdtBalance = useGetUserESDT();
  const isLoggedIn = useGetIsLoggedIn();
  const isPaused = useGetIsPaused();

  const navigate = useNavigate();
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
      {/* <FundModal
        userEsdtBalance={userEsdtBalance}
        show={showFund}
        onClose={() => {
          setHeaderMenu(true), setShowFund(false);
        }}
      /> */}
      <Link
        to={routeNames.collections}
        // className='butLine bouton-visiter'
        data-testid='loginBtn'
      >
        Back to Collections
      </Link>

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
            <div>
              {getCollectionInformations.length > 0 && (
                <HexagoneGroupe
                  orientationEscalier={'reverse'}
                  width={width > 450 ? 80 : 60}
                  collectionInfo={getCollectionInformations}
                />
              )}
            </div>
            <div>{url ? url : ''}</div>
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
        allRewardsForUser={allRewardsForUser}
        collectionRewards={collectionRewards}
        userNftBalance={userNftBalance}
        userStakedNft={userStakedNft}
      />
    </div>
  );
};
