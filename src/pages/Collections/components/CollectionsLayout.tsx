import React, { useState, useEffect } from 'react';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { Col, Form, Row } from 'react-bootstrap';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { defaultToken } from 'config';
import notFound from './../../../assets/img/notfoundc.svg';
import { useGetRewardedTokens } from './Actions/helpers';
import { useGetIsPaused } from './Actions/helpers';
import { useGetCollections, useGetSwapedTokens } from './Actions/helpers';
import { useGetESDTInformations } from './Actions/helpers';
import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
import FundModal from './FundModal';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { ToggleSwitch } from './../../../components/Design';
import { HeaderMenuContext } from 'context/Header/HeaderMenuContext';
import CardOfCollection from './CardOfCollection';
import { useWindowDimensions } from 'components/DimensionScreen';

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
    <div className='center'>
      <FundModal
        userEsdtBalance={userEsdtBalance}
        show={showFund}
        onClose={() => {
          setHeaderMenu(true), setShowFund(false);
        }}
      />
      <div className='col-12'>
        {stakedCollections &&
          stakedCollections.map((item) => (
            <Col key={item}>
              <CardOfCollection
                height={heightComponentTypeSection}
                WindowDimensions={width}
                textColor='#ffffff'
                fontFamily='sans-serif'
                collectionIdentifier={item}
              />
            </Col>
          ))}
      </div>
    </div>
  );
};
