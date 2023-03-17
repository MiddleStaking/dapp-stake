import React, { FC, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { walletConnectV2ProjectId } from 'config';
import imageWalletDefi from '../../assets/téléchargement.png';

import imagePartalConnexion from '../../assets/multiversxPortal.png';
import legerImage from '../../assets/legerImage.png';

import styles from './styles.module.scss';
import {
  useGetAccountInfo,
  useGetNetworkConfig
} from '@multiversx/sdk-dapp/hooks';
import {
  ExtensionLoginButton,
  LedgerLoginButton,
  OperaWalletLoginButton,
  WalletConnectLoginButton,
  WebWalletLoginButton
} from '@multiversx/sdk-dapp/UI';
import { routeNames } from 'routes';

// multiversxPortal

interface ConnectionType {
  title: string;
  name: string;
  background: string;
  image: any;
  component: any;
}

const Unlock: FC = (props: any) => {
  const { address } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();
  const route = useParams();

  const navigate = useNavigate();
  const connects: Array<ConnectionType> = [
    {
      title: 'Desktop',
      name: 'MultiversX Web Wallet',
      background: '#000000',
      image: (
        <div className={styles.logos}>
          <span>
            <img
              className={styles.img}
              src={imagePartalConnexion}
              alt='Grapefruit slice atop a pile of other slices'
            ></img>
          </span>
        </div>
      ),
      component: WebWalletLoginButton
    },
    {
      title: 'Hardware',
      name: 'Ledger',
      background: '#000000',
      image: legerImage,
      component: LedgerLoginButton
    },
    {
      title: 'Mobile',
      name: 'xPortal App',
      background: '#000000',
      image: imagePartalConnexion,
      component: WalletConnectLoginButton
    },
    {
      title: 'Browser',
      name: 'MultiversX DeFi Wallet',
      background: 'linear-gradient(225deg, #2C58DA 0%, #1A2ABA 100%)',
      image: imageWalletDefi,
      component: ExtensionLoginButton
    },
    {
      title: 'Browser',
      name: 'Opera Crypto Wallet - Beta',
      background: 'linear-gradient(225deg, #2C58DA 0%, #1A2ABA 100%)',
      image: imagePartalConnexion,
      component: OperaWalletLoginButton
    }
  ];

  const redirectConditionally = () => {
    if (Boolean(address)) {
      navigate('/earn');
    }
  };

  useEffect(redirectConditionally, [address]);

  console.log(route?.route);

  const commonProps = {
    callbackRoute:
      route?.param !== undefined
        ? '/' + route?.route + '/' + route?.param
        : '/' + route?.route !== undefined
        ? route?.route
        : 'earn'
    // nativeAuth: true // optional
  };

  return (
    <div className={styles.unlock}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <div className={styles.logo2}>
            <span>
              <img
                className={styles.imgRewards}
                src={imagePartalConnexion}
                alt='Grapefruit slice atop a pile of other slices'
              ></img>
            </span>
          </div>
        </div>

        <strong className={styles.heading}>
          MultiversX Delegation Manager
        </strong>

        <div className={styles.description}>
          {`Delegate MultiversX (${network.egldLabel}) and earn up to 25% APY!`}
        </div>

        <div className={styles.connects}>
          {connects.map((connect: ConnectionType) => (
            <connect.component
              key={connect.name}
              {...commonProps}
              {...(walletConnectV2ProjectId
                ? {
                    isWalletConnectV2: true
                  }
                : {})}
            >
              <span className={styles.connect}>
                <span className={styles.title}>{connect.title}</span>

                <span className={styles.icon}>
                  {connect.title === 'Desktop' ? (
                    connect.image
                  ) : (
                    <img
                      src={connect.image}
                      alt='Grapefruit slice atop a pile of other slices'
                    ></img>
                  )}
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
