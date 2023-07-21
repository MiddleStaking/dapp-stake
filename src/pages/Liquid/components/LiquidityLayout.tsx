import React, { useState, useEffect } from 'react';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { Col, Form, Row } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { defaultToken } from 'config';
import notFound from './../../../assets/img/notfoundc.svg';
import { useGetRewardedTokens } from './Actions/helpers';
import { useGetIsPaused } from './Actions/helpers';
import { useGetStakedTokens, useGetSwapedTokens } from './Actions/helpers';
import { useGetESDTInformations } from './Actions/helpers';
import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
import { LiquidInfo } from './LiquidInfo';
import FundModal from './FundModal';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { ToggleSwitch } from './../../../components/Design';
import { HeaderMenuContext } from 'context/Header/HeaderMenuContext';

export const LiquidityLayout = ({ children }: React.PropsWithChildren) => {
  const { network } = useGetNetworkConfig();
  const swapedTokens: string[] = useGetSwapedTokens();
  const navigate = useNavigate();
  const isLoggedIn = useGetIsLoggedIn();
  const userEsdtBalance = useGetUserESDT();

  return (
    <div className='center'>
      <div className='col-12'>
        <Row className='pt-4'>
          {swapedTokens[0] != '' &&
            swapedTokens
              .filter((token) => {
                return token != defaultToken;
              })
              .map((token) => (
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  xxl={12}
                  key={token}
                  className='pb-4'
                >
                  {' '}
                  <LiquidInfo
                    userEsdtBalance={userEsdtBalance}
                    second_token={token}
                  />
                </Col>
              ))}
        </Row>

        {/* <div className={styles.transactions}>{children}</div> */}
      </div>{' '}
    </div>
  );
};
