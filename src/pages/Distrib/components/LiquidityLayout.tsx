import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { defaultToken } from 'config';
import { useGetSwapedTokens } from './Actions/helpers';
import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
import { LiquidInfo } from './LiquidInfo';
import { useGetAllLp } from 'pages/Swap/components/Actions/helpers';

export const LiquidityLayout = () => {
  //const { network } = useGetNetworkConfig();
  const userEsdtBalance = useGetUserESDT();

  // console.log(allLp);
  return (
    <div className='center'>
      <div className='col-12'>
        <LiquidInfo userEsdtBalance={userEsdtBalance} />
      </div>{' '}
    </div>
  );
};
