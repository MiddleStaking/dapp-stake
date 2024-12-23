import { useEffect } from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';
import { ExtensionLoginButton } from '@multiversx/sdk-dapp/UI/extension/ExtensionLoginButton';
import { LedgerLoginButton } from '@multiversx/sdk-dapp/UI/ledger/LedgerLoginButton';
import { WalletConnectLoginButton } from '@multiversx/sdk-dapp/UI/walletConnect/WalletConnectLoginButton';
import { WebWalletLoginButton } from '@multiversx/sdk-dapp/UI/webWallet/WebWalletLoginButton';
import { useNavigate, useParams } from 'react-router-dom';

import { Extension } from './../../assets/Extension';
import { Ledger } from './../../assets/Ledger';
import { MultiversX } from 'assets/MultiversX';
import { Wallet } from './../../assets/Wallet';
import { xPortal } from './../../assets/xPortal';
import { Metamask } from './../../assets/Metamask';
import { network } from 'config';

import { MetamaskLoginButton } from '@multiversx/sdk-dapp/UI';

import styles from './styles.module.scss';

import type { ConnectionType } from './types';

export const Unlock = () => {
  const { address } = useGetAccountInfo();
  const route = useParams();

  const navigate = useNavigate();
  const connects: ConnectionType[] = [
    {
      title: 'Desktop',
      name: 'MultiversX Web Wallet',
      background: '#000000',
      icon: Wallet,
      component: WebWalletLoginButton,
      nativeAuth: true
    },
    {
      title: 'Hardware',
      name: 'Ledger',
      nativeAuth: true,
      background: '#000000',
      icon: Ledger,
      component: LedgerLoginButton,
      innerLedgerComponentsClasses: {
        ledgerScamPhishingAlertClassName: styles.phishing,
        ledgerProgressBarClassNames: {},
        ledgerConnectClassNames: {
          ledgerModalTitleClassName: styles.title,
          ledgerModalSubtitleClassName: styles.subtitle,
          ledgerModalIconClassName: styles.icon
        },
        confirmAddressClassNames: {
          ledgerModalTitleClassName: styles.title,
          ledgerModalConfirmDescriptionClassName: styles.description,
          ledgerModalConfirmFooterClassName: styles.footer
        },
        addressTableClassNames: {
          ledgerModalTitleClassName: styles.title,
          ledgerModalSubtitleClassName: styles.subtitle,
          ledgerModalTableHeadClassName: styles.head,
          ledgerModalTableNavigationButtonClassName: styles.navigation,
          ledgerModalTableSelectedItemClassName: styles.selected
        },
        ledgerLoadingClassNames: {
          ledgerModalTitleClassName: styles.title,
          ledgerModalSubtitleClassName: styles.subtitle
        }
      }
    },
    {
      title: 'Mobile',
      name: 'xPortal Mobile Wallet',
      background: 'linear-gradient(225deg, #2C58DA 0%, #1A2ABA 100%)',
      nativeAuth: true,
      icon: xPortal,
      isWalletConnectV2: true,
      component: WalletConnectLoginButton,
      innerWalletConnectComponentsClasses: {
        containerContentClassName: styles.content,
        containerTitleClassName: styles.title,
        containerButtonClassName: styles.button,
        containerSubtitleClassName: styles.subtitle,
        containerScamPhishingAlertClassName: styles.phishing,
        walletConnectPairingListClassNames: {
          leadClassName: styles.lead,
          buttonClassName: styles.pairing
        }
      }
    },
    {
      title: 'Browser',
      name: 'MultiversX DeFi Wallet',
      background: 'linear-gradient(225deg, #2C58DA 0%, #1A2ABA 100%)',
      nativeAuth: true,
      icon: Extension,
      component: ExtensionLoginButton
    },
    {
      title: 'Metamask',
      name: 'Metamask ',
      background:
        'linear-gradient(351deg, rgb(254 254 254) 0%, rgb(255 255 255) 100%)',
      nativeAuth: true,
      icon: Metamask,
      component: MetamaskLoginButton
    }
  ];

  const redirectConditionally = () => {
    if (address) {
      navigate('/dashboard');
    }
  };

  useEffect(redirectConditionally, [address]);

  return (
    <div className={styles.unlock}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <MultiversX />
        </div>

        <strong className={styles.heading}>Middle Staking Dapp</strong>

        <div className={styles.description}>{`MultiversX dapp`}</div>

        <div className={styles.connects}>
          {connects.map((connect) => (
            <connect.component
              key={connect.name}
              callbackRoute={
                route?.param !== undefined
                  ? '/' + route?.route + '/' + route?.param
                  : route?.route !== undefined
                  ? route?.route
                  : '/stake'
              }
              logoutRoute='/unlock'
              {...connect}
            >
              <span className={styles.connect}>
                <span className={styles.title}>{connect.title}</span>

                <span
                  className={styles.icon}
                  style={{ background: connect.background }}
                >
                  <connect.icon />
                </span>

                <span className={styles.name}>{connect.name}</span>
              </span>
            </connect.component>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Unlock;
