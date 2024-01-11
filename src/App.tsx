import React from 'react';
//import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
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
import { RouteNamesEnum } from 'localConstants';
import { BatchTransactionsContextProvider } from 'wrappers';

const AppContent = () => {
  return (
    <ContextProvider>
      <DappProvider
        environment={network.id}
        customNetworkConfig={{
          name: 'customConfig',
          apiTimeout,
          walletConnectV2ProjectId,
          walletAddress: network.walletAddress,
          apiAddress: network.apiAddress,
          gatewayAddress: network.gatewayAddress,
          explorerAddress: network.explorerAddress
        }}
        dappConfig={{
          shouldUseWebViewProvider: true,
          logoutRoute: RouteNamesEnum.unlock
        }}
        customComponents={{
          transactionTracker: {
            // uncomment this to use the custom transaction tracker
            // component: TransactionsTracker,
            props: {
              onSuccess: (sessionId: string) => {
                console.log(`Session ${sessionId} successfully completed`);
              },
              onFail: (sessionId: string, errorMessage: string) => {
                console.log(
                  `Session ${sessionId} failed. ${errorMessage ?? ''}`
                );
              }
            }
          }
        }}
      >
        <AxiosInterceptorContext.Listener>
          <Layout>
            <TransactionsToastList />
            <NotificationModal />
            <SignTransactionsModals />
            <Routes>
              <Route path={RouteNamesEnum.unlock} element={<Unlock />} />
              {routes.map((route) => (
                <Route
                  path={route.path}
                  key={`route-key-'${route.path}`}
                  element={<route.component />}
                />
              ))}
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Layout>
        </AxiosInterceptorContext.Listener>
      </DappProvider>
    </ContextProvider>
  );
};

export const App = () => {
  return (
    <AxiosInterceptorContext.Provider>
      <AxiosInterceptorContext.Interceptor
        authenticatedDomains={sampleAuthenticatedDomains}
      >
        <Router>
          <BatchTransactionsContextProvider>
            <AppContent />
          </BatchTransactionsContextProvider>
        </Router>
      </AxiosInterceptorContext.Interceptor>
    </AxiosInterceptorContext.Provider>
  );
};
