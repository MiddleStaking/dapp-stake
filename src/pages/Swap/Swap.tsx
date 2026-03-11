import React from 'react';
// import { defaultToken } from 'config';
// import { SwapLayout } from './components';
// import { useGetAllLp } from './components/Actions/helpers';
// import { useGetUserESDT } from 'pages/Earn/components/Actions/helpers/useGetUserESDT';
// import { Outlet, useLocation } from 'react-router-dom';
// import { PageWrapper } from 'wrappers';

export const Swap = () => {
  // const userEsdtBalance = useGetUserESDT();
  // const all_lp: any[] = useGetAllLp();

  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);

  // const firstToken = searchParams.get('firstToken') || 'EGLD-000000';
  // const secondToken = searchParams.get('secondToken') || defaultToken;
  // /swap?firstToken=KWAK-469ab0&secondToken=UTK-2f80e9

  // return (
  //   <SwapLayout
  //     firstToken={firstToken ? firstToken : 'EGLD-000000'}
  //     secondToken={secondToken ? secondToken : defaultToken}
  //     defaultToken={defaultToken}
  //     userEsdtBalance={userEsdtBalance}
  //     all_lp={all_lp}
  //     // firstToken='EGLD-000000'
  //   />
  // );

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        padding: '48px 64px',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.05)',
        boxShadow: '0 4px 32px rgba(0,0,0,0.2)'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>Under Maintenance</h2>
        <p style={{ color: '#888', margin: 0 }}>We will be back soon.</p>
      </div>
    </div>
  );
};
