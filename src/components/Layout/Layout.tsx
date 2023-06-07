import React from 'react';
import { AuthenticatedRoutesWrapper } from '@multiversx/sdk-dapp/wrappers';
import { useLocation } from 'react-router-dom';
import { routes, routeNames } from 'routes';
import BackgroundMobile from './../../assets/img/MobileBackground.svg';
import BackgroundDekstopTopLeft from './../../assets/img/DekstopTopLeft.svg';
import BackgroundDekstopBottomRigh from './../../assets/img/DekstopBottomRigh.svg';
import HeaderDekstop from 'pages/design/Component/Header.tsx';
import FooterDekstop from 'pages/design/Component/Footer';
import { useWindowDimensions } from 'pages/design/Component/Header.tsx/DimensionScreen.tsx';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { search } = useLocation();
  const { width } = useWindowDimensions();

  const backgroundMobileStyle = `url(${BackgroundMobile}),#000000`;
  const backgroundDekstopStyle = `url(${BackgroundDekstopTopLeft}) top left,url(${BackgroundDekstopBottomRigh}) bottom right, #000000`;
  // '79px',
  return (
    <div
      style={{
        background:
          width > 450 ? backgroundDekstopStyle : backgroundMobileStyle,
        backgroundSize: width > 450 ? '' : 'cover',
        backgroundRepeat: width > 450 ? 'no-repeat' : 'repeat',
        minHeight: '100vh',
        width: '100%',
        margin: 0,
        display: 'flex',
        flexDirection: 'column'
      }}
      // className='d-flex flex-column flex-fill wrapper'
    >
      <HeaderDekstop />

      <main
        style={{
          marginBottom: width > 450 ? 0 : '84px'
        }}
        className='d-flex flex-column flex-grow-1'
      >
        <AuthenticatedRoutesWrapper
          routes={routes}
          unlockRoute={`${routeNames.unlock}${search}`}
        >
          {children}
        </AuthenticatedRoutesWrapper>
      </main>
      <FooterDekstop />
    </div>
  );
};
