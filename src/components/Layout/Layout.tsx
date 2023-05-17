import React from 'react';
import { AuthenticatedRoutesWrapper } from '@multiversx/sdk-dapp/wrappers';
import { useLocation } from 'react-router-dom';
import { routes, routeNames } from 'routes';
import { Footer } from './Footer';
import { MyNavbar } from './Navbar';
import image from './../../assets/img/background4.png';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeaderDekstop from 'pages/design/Component/Header.tsx';
import FooterDekstop from 'pages/design/Component/Footer';
import { useWindowDimensions } from 'pages/design/Component/Header.tsx/DimensionScreen.tsx';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { search } = useLocation();
  const { width } = useWindowDimensions();

  // '79px',
  return (
    <div
      style={{
        background: '#151515',
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
