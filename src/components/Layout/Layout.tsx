import React from 'react';
import type { PropsWithChildren } from 'react';
import { AuthRedirectWrapper } from 'wrappers';
import { useLocation } from 'react-router-dom';
import { useWindowDimensions } from 'components/DimensionScreen';
import FooterMobile from 'components/Footer';
import HeaderDekstop from 'components/Header';
import './Layout.scss';
// import RegisterForm from './../../helpers/api_v2/register';

export const Layout = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  const { width } = useWindowDimensions();
  const isUnlock = pathname === '/unlock'; // 👈 test

  return (
    <div
      className={`d-flex flex-column flex-fill wrapper ${
        width <= 450 ? 'neon-background-mobile' : ''
      }`}
    >
      <HeaderDekstop />
      {/* <RegisterForm /> */}
      <main className={'d-flex flex-column flex-grow-1 main-content'}>
        <AuthRedirectWrapper>{children}</AuthRedirectWrapper>
      </main>
      {!isUnlock && <FooterMobile />}
    </div>
  );
};
