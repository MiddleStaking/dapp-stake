import React from 'react';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal
} from '@multiversx/sdk-dapp/UI';
import {
  DappProvider,
  AxiosInterceptorContext // using this is optional
} from '@multiversx/sdk-dapp/wrappers';

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'components';
import {
  apiTimeout,
  walletConnectV2ProjectId,
  sampleAuthenticatedDomains
} from 'config';
import { PageNotFound } from 'pages';
import { routeNames } from 'routes';
import { routes } from 'routes';
import Unlock from 'pages/Unlock';
import neon1 from './assets/img/neon1.svg';

export const App = () => {
  return (
    <AxiosInterceptorContext.Provider>
      <AxiosInterceptorContext.Interceptor
        authenticatedDomanis={sampleAuthenticatedDomains}
      >
        {' '}
        <svg
          className='neon1'
          height='100%'
          width='100%'
          xmlns='http://www.w3.org/2000/svg'
          preserveAspectRatio='none'
        >
          <image
            className='neon1'
            x='0'
            y='0'
            height='100%'
            width='100%'
            href={neon1}
            preserveAspectRatio='none'
          />
        </svg>
        <Router>
          <DappProvider
            environment={EnvironmentsEnum.devnet}
            customNetworkConfig={{
              name: 'customConfig',
              apiTimeout,
              walletConnectV2ProjectId
            }}
          >
            <Layout>
              <AxiosInterceptorContext.Listener />
              <TransactionsToastList />
              <NotificationModal />
              <SignTransactionsModals className='custom-class-for-modals' />
              <Routes>
                <Route
                  path={routeNames.unlock + '/:route' + '/:param'}
                  element={<Unlock />}
                />
                <Route
                  path={routeNames.unlock + '/:route'}
                  element={<Unlock />}
                />
                <Route path={routeNames.unlock} element={<Unlock />} />

                {routes.map((route, index) => (
                  <Route
                    path={route.path}
                    key={'route-key-' + index}
                    element={<route.component />}
                  />
                ))}
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </Layout>
          </DappProvider>
        </Router>
      </AxiosInterceptorContext.Interceptor>
    </AxiosInterceptorContext.Provider>
  );
};
