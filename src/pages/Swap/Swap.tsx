import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PageTemplate } from 'components/PageTemplate';
import { SwapWidget, SwapConfigProvider } from '@dinovox/mx-swap-widget';
import '@dinovox/mx-swap-widget/styles.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetNetworkConfig, useGetAccount } from 'lib';
import { signAndSendTransactions } from 'helpers/signAndSendTransactions';

export const Swap = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { address } = useGetAccount();
  const { network } = useGetNetworkConfig();

  return (
    <PageTemplate
      title='Swap'
      subtitle='Swap your MultiversX tokens'
      maxWidth='640px'
    >
      <SwapConfigProvider
        config={{
          language: 'fr',
          theme: 'mid',
          onConnect: () =>
            navigate('/unlock', {
              state: { background: location, returnTo: location.pathname }
            })
        }}
      >
        <SwapWidget
          address={address}
          networkApiAddress={network.apiAddress}
          chainId={network.chainId}
          explorerAddress={network.explorerAddress}
          onSignTransactions={(txs, info) =>
            signAndSendTransactions({
              transactions: txs,
              transactionsDisplayInfo: info
            })
          }
          defaultFrom='EGLD'
          defaultTo='MID-ecb7bf'
        />
      </SwapConfigProvider>
    </PageTemplate>
  );
};
