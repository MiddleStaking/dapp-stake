import * as React from 'react';
import { Link } from 'react-router-dom';
import { AuthRedirectWrapper } from 'components';
import { dAppName } from 'config';
import { routeNames } from 'routes';
import msLogo from './../assets/img/middlestaking.svg';

const HomePage = () => {
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
            <div className='card-body text-center'>
              <h2 className='mb-3' data-testid='title'>
                {dAppName}
              </h2>

              <p className='mb-3'>
                This is an MultiversX dapp.
                <br /> Login using your wallet.
              </p>

              <Link
                to={routeNames.unlock}
                className='btn btn-primary mt-3 text-white'
                data-testid='loginBtn'
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Home = () => (
  <AuthRedirectWrapper>
    <HomePage />
  </AuthRedirectWrapper>
);
