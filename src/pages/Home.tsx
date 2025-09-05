import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { dAppName } from 'config';
import { routeNames } from 'routes';
import msLogo from './../assets/img/middlestaking.svg';
import { ConnectButton } from 'components/Button/ConnectButton';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAccountInfo, useGetIsLoggedIn } from 'lib';

const HomePage = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const { address } = useGetAccountInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if (address) {
      navigate('/stake', { replace: true });
    }
  }, [address, isLoggedIn, navigate]);
  return (
    <div className='d-flex flex-fill align-items-center container'>
      <div className='row w-100' style={{ marginBottom: '200px' }}>
        <div className='col-12 col-md-8 col-lg-5 mx-auto '>
          <img
            src={msLogo}
            className='multiversx-logo'
            style={{
              width: '100%',
              height: '150px',
              margin: '0px',
              padding: '0px'
            }}
          />
          <div className='card shadow-sm rounded p-4 border-0'>
            <div className='card-body d-flex flex-column justify-content-center align-items-center text-center'>
              <h2 className='mb-3' data-testid='title'>
                {dAppName}
              </h2>

              <p className='mb-3 text-center'>
                This is an MultiversX dapp.
                <br /> Login using your wallet.
              </p>
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export const Home = () => <HomePage />;
