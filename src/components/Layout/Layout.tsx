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

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { search } = useLocation();
  return (
    <div
      style={{ background: '#151515' }}
      className='d-flex flex-column flex-fill wrapper'
    >
      <HeaderDekstop />
      {/* <footer className='text-center mt-2 mb-3'>
        <div>
          Help us to improve the website with your{' '}
          <a
            {...{
              target: '_blank'
            }}
            className='align-items-center'
            href='https://forms.gle/zpdty8Eik9jnow1c9'
          >
            <u>feedback</u>
          </a>{' '}
          or{' '}
          <a
            {...{
              target: '_blank'
            }}
            className='align-items-center'
            href='https://t.me/MiddleStaking'
          >
            <u>Join telegram</u>{' '}
            <FontAwesomeIcon icon={faPaperPlane} size='1x' />
          </a>
        </div>
      </footer> */}
      <main className='d-flex flex-column flex-grow-1'>
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
