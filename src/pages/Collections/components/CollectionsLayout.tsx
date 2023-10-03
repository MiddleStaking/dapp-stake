// NOTE : mep card

import React, { useState, useEffect } from 'react';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { Col, Form, Row } from 'react-bootstrap';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { defaultToken } from 'config';
import notFound from './../../../assets/img/notfoundc.svg';
import { useGetIsPaused } from './Actions/helpers';
import { useGetCollections } from './Actions/helpers';
import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
import FundModal from './FundModal';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { ToggleSwitch } from './../../../components/Design';
import { HeaderMenuContext } from 'context/Header/HeaderMenuContext';
import CardOfCollection from './CardOfCollection';
import { useWindowDimensions } from 'components/DimensionScreen';
import { PoolAddCollection } from './Modal/AddCollection/PoolAddCollection';

export const CollectionsLayout = ({ children }: React.PropsWithChildren) => {
  const [showFund, setShowFund] = useState(false);
  const { address } = useGetAccountInfo();
  const userEsdtBalance = useGetUserESDT();
  const isLoggedIn = useGetIsLoggedIn();
  const isPaused = useGetIsPaused();

  const stakedCollections: string[] = useGetCollections();
  const navigate = useNavigate();
  const { param } = useParams();
  const [url] = useState(param ? param.toString() : defaultToken);

  const { setHeaderMenu } = React.useContext(HeaderMenuContext);

  const { width } = useWindowDimensions();
  const heightComponentTypeSection = width > 450 ? '162px' : '114px';

  return (
    <div
      style={{
        padding: '10px'
      }}
    >
      <FundModal
        userEsdtBalance={userEsdtBalance}
        show={showFund}
        onClose={() => {
          setHeaderMenu(true), setShowFund(false);
        }}
      />
      <div>
        {/* <Col
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={3}
          xxl={3}
          className='pb-4 center'
        >
          search
        </Col> */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div style={{ width: '44px' }} className='centered-element'>
            {address && (
              <PoolAddCollection
                userEsdtBalance={userEsdtBalance}
                address={address}
              />
            )}
          </div>
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
        {stakedCollections &&
          stakedCollections.map((item) => (
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
          ))}
      </div>
    </div>
  );
};
