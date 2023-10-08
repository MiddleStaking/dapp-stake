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
  sampleAuthenticatedDomains,
  network
} from 'config';
import { ContextProvider } from 'context';
import { HeaderMenuProvider } from 'context/Header/HeaderMenuProvider';
import { PageNotFound } from 'pages';
import Unlock from 'pages/Unlock';
import { routeNames } from 'routes';
import { routes } from 'routes';

export const App = () => {
  return (
    <AxiosInterceptorContext.Provider>
      <AxiosInterceptorContext.Interceptor
        authenticatedDomanis={sampleAuthenticatedDomains}
      >
        <Router>
          <DappProvider
            environment={EnvironmentsEnum.devnet}
            customNetworkConfig={{
              name: 'customConfig',
              apiTimeout,
              walletConnectV2ProjectId,
              walletAddress: network.walletAddress,
              apiAddress: network.apiAddress,
              gatewayAddress: network.gatewayAddress,
              explorerAddress: network.explorerAddress
            }}
          >
            {' '}
            <ContextProvider>
              <HeaderMenuProvider>
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
              </HeaderMenuProvider>{' '}
            </ContextProvider>
          </DappProvider>
        </Router>
      </AxiosInterceptorContext.Interceptor>
    </AxiosInterceptorContext.Provider>
  );
};
