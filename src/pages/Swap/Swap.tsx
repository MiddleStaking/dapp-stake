import React from 'react';
import { defaultToken } from 'config';
import { SwapLayout } from './components';
import { useGetAllLp } from './components/Actions/helpers';
import { useGetUserESDT } from './components/Actions/helpers/useGetUserESDT';

export const Swap = () => {
  const userEsdtBalance = useGetUserESDT();
  const all_lp: any[] = useGetAllLp();
  return (
    <SwapLayout
      userEsdtBalance={userEsdtBalance}
      all_lp={all_lp}
      firstToken={'WEGLD-bd4d79'}
      secondToken={defaultToken}
      defaultToken={defaultToken}
    />
  );
};
