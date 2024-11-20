import React from 'react';
import { AuthenticatedRoutesWrapper } from '@multiversx/sdk-dapp/wrappers';
import { useLocation } from 'react-router-dom';
import { useWindowDimensions } from 'components/DimensionScreen';
import FooterDekstop from 'components/Footer';
import HeaderDekstop from 'components/Header';
import { routes, routeNames } from 'routes';
import './Layout.scss';
// import RegisterForm from './../../helpers/api_v2/register';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { search } = useLocation();
  const { width } = useWindowDimensions();

  return (
    <div
      className={`d-flex flex-column flex-fill wrapper ${
        width <= 450 ? 'neon-background-mobile' : ''
      }`}
    >
      <HeaderDekstop />
      {/* <RegisterForm /> */}
      <main className={'d-flex flex-column flex-grow-1 main-content'}>
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
