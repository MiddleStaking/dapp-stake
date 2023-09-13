// NOTE : mep card

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
        <Col
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={3}
          xxl={3}
          className='pb-4 center'
        >
          search
        </Col>
        <Col
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={3}
          xxl={3}
          className='pb-4 center'
        >
          {/* ---- bouton + ---- */}
          <div style={{ width: '44px' }} className='centered-element'>
            {address && (
              <div
                className='button-icon-border  cursor-pointer'
                onClick={() => {
                  setShowFund(true), setHeaderMenu(false);
                }}
              >
                <div className='button-icon'>
                  <svg
                    className='plus'
                    width='20'
                    height='20'
                    viewBox='0 0 32 32'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M17.3334 6.66683C17.3334 5.93045 16.7364 5.3335 16 5.3335C15.2637 5.3335 14.6667 5.93045 14.6667 6.66683V14.6668H6.66671C5.93033 14.6668 5.33337 15.2638 5.33337 16.0002C5.33337 16.7365 5.93033 17.3335 6.66671 17.3335H14.6667V25.3335C14.6667 26.0699 15.2637 26.6668 16 26.6668C16.7364 26.6668 17.3334 26.0699 17.3334 25.3335V17.3335H25.3334C26.0698 17.3335 26.6667 16.7365 26.6667 16.0002C26.6667 15.2638 26.0698 14.6668 25.3334 14.6668H17.3334V6.66683Z'
                      fill='white'
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </Col>
      </div>
      <div className='col-12'>
        <Row className=''>
          {stakedCollections &&
            stakedCollections.map((item) => (
              <Col
                xs={12}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                xxl={3}
                key={item}
                className='pb-4 center'
              >
                <CardOfCollection
                  height={heightComponentTypeSection}
                  WindowDimensions={width}
                  textColor='#ffffff'
                  fontFamily='sans-serif'
                  collectionIdentifier={item}
                />
              </Col>
            ))}
          <Col xs={12} sm={12} md={6} lg={4} xl={3} xxl={3}>
            <div className='card-type'></div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={3} xxl={3}>
            <div className='card-type'></div>
          </Col>{' '}
          <Col xs={12} sm={12} md={6} lg={4} xl={3} xxl={3}>
            <div className='card-type'></div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
