import React from 'react';
import { defaultToken } from 'config';
import { SwapLayout } from './components';
import { useGetAllLp } from './components/Actions/helpers';
import { useGetUserESDT } from 'pages/Earn/components/Actions/helpers/useGetUserESDT';
import { Outlet, useLocation } from 'react-router-dom';
import { PageWrapper } from 'wrappers';

export const Swap = () => {
  const userEsdtBalance = useGetUserESDT();
  const all_lp: any[] = useGetAllLp();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const firstToken = searchParams.get('firstToken') || 'EGLD-000000';
  const secondToken = searchParams.get('secondToken') || defaultToken;
  // /swap?firstToken=KWAK-469ab0&secondToken=UTK-2f80e9

  return (
    <SwapLayout
      firstToken={firstToken ? firstToken : 'EGLD-000000'}
      secondToken={secondToken ? secondToken : defaultToken}
      defaultToken={defaultToken}
      userEsdtBalance={userEsdtBalance}
      all_lp={all_lp}
      // firstToken='EGLD-000000'
    />
  );
};
