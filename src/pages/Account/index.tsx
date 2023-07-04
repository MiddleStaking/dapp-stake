import * as React from 'react';
import {
  faExternalLinkAlt,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { logout } from '@multiversx/sdk-dapp/utils';
// import { Button } from 'components/Design/Button';
import { useNavigate } from 'react-router-dom';
import { routeNames } from 'routes';
import { useGetUserESDT } from './../Earn/components/Actions/helpers/useGetUserESDT';
import styles from './account.module.scss';

const Account = () => {
  const userEsdtBalance = useGetUserESDT();

  const handleLogout = () => {
    logout(`${window.location.origin}/unlock`);
  };
  const navigate = useNavigate();
  const handleNavigate = (path: any) => {
    navigate(path);
  };
  const accountInfo = useGetAccountInfo();
  const address = accountInfo.address;
  const { network } = useGetNetworkConfig();
  const [
    ,
    // faddress
    setAddress
  ] = React.useState(address === null ? '' : address);
  // const [amount, setAmount] = React.useState(1);
  // const [error, setError] = React.useState('');
  // const [success, setSuccess] = React.useState('');

  React.useEffect(() => {
    setAddress(address === null ? '' : address);
  }, [address]);

  console.log(accountInfo);
  console.log(userEsdtBalance);
  const explorer =
    network.id == 'devnet'
      ? 'https://devnet-explorer.multiversx.com/accounts/'
      : 'https://explorer.multiversx.com/accounts/';

  React.useEffect(() => {
    const squares = document.querySelectorAll('.' + styles.square);
    squares.forEach((square) => {
      square.classList.add('hovered');
    });
  }, []);
  return (
    <div className={styles.container}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%'
        }}
      >
        <div className={`${styles.heading}`}>
          <div className={styles.meta}>
            <div className={styles.label}>Address</div>
            <div className={styles.contractWrape}>
              {/* className='d-flex align-items-center' */}
              <span className={styles.contract}>{address}</span>
              <a
                onClick={() => open(explorer + address)}
                className={styles.icon}
                style={{ cursor: 'pointer' }}
                rel='noreferrer'
                target='_blank'
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.squareContainerCenter}>
          <div className={styles.squareContainerCenter2}>
            <div className={styles.squareContainer}>
              <div
                className={styles.square}
                onClick={() =>
                  open('https://docs.middlestaking.fr/welcome/presentation')
                }
              >
                <div className={styles.labelIconSquare}>
                  <span className={styles.labelSquare}>Docs</span>{' '}
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
                <div className={styles.InfoSquare}>
                  <p className={styles.PInfoSquare}>
                    This documentation intend to explain our Decentralized
                    Application.
                  </p>
                </div>
              </div>
              <div
                className={styles.square}
                onClick={() => open('https://devnet-app.middlestaking.fr/')}
              >
                <div className={styles.labelIconSquare}>
                  <span className={styles.labelSquare}>Devnet</span>{' '}
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
                <div className={styles.InfoSquare}>
                  <p className={styles.PInfoSquare}>
                    Open this application on the Devnet
                  </p>
                </div>
              </div>
              <div>
                <div
                  className={styles.square}
                  onClick={() => handleNavigate(routeNames.tokenomics)}
                >
                  <div className={styles.labelIconSquare}>
                    <span className={styles.labelSquare}>Tokenomics</span>{' '}
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                  <div className={styles.InfoSquare}>
                    <p className={styles.PInfoSquare}>
                      Redirects to Tokenomics page
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div
                  className={styles.square}
                  onClick={() => handleNavigate(routeNames.rewards)}
                >
                  <div className={styles.labelIconSquare}>
                    <span className={styles.labelSquare}>Rewards</span>{' '}
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                  <div className={styles.InfoSquare}>
                    <p className={styles.PInfoSquare}>
                      Redirects to Rewards page
                    </p>
                  </div>
                </div>
              </div>
              {network.id === 'devnet' && (
                <div>
                  <div
                    className={styles.square}
                    onClick={() => handleNavigate(routeNames.faucet)}
                  >
                    <div className={styles.labelIconSquare}>
                      <span className={styles.labelSquare}>Faucet</span>{' '}
                      <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                    <div className={styles.InfoSquare}>
                      <p className={styles.PInfoSquare}>
                        Redirects to Rewards page
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <div className={styles.squareDisconect} onClick={handleLogout}>
                  <div className={styles.labelIconSquare}>
                    <span className={styles.labelSquare}>Disconnect</span>{' '}
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                  <div className={styles.InfoSquare}>
                    <p className={styles.PInfoSquare}>Log out of the app?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className='container py-4 text-white'>
    //   <Button
    //     buttonWidth='100%'
    //     buttonHeight='52px'
    //     fontSize='20px'
    //     borderWidth='2px'
    //     borderRadius={40}
    //     background='black'
    //     borderColor={['#BD37EC', '#1F67FF']}
    //     text={address}
    //     hasBorder={true}
    //     onClick={() => open(explorer + address)}
    //   />
    // <Button
    //   buttonHeight='52px'
    //   fontSize='20px'
    //   borderWidth='2px'
    //   borderRadius={40}
    //   background='black'
    //   borderColor={['#BD37EC', '#1F67FF']}
    //   text='Disconnect'
    //   hasBorder={true}
    //   onClick={handleLogout}
    // />
    //   {network.id == 'devnet' && (
    //     <Button
    //       boxShadow='0px 0px 44px 0px #8E44EB80 inset'
    //       borderWidth='2px'
    //       borderRadius={40}
    //       background='black'
    //       borderColor={['#BD37EC', '#1F67FF']}
    //       text={'Faucet'}
    //       hasBorder={true}
    //       onClick={() => handleNavigate(routeNames.faucet)}
    //       fontFamily=''
    //       buttonHeight='52px'
    //       fontSize='20px'
    //     />
    //   )}
    //   <Button
    //     boxShadow='0px 0px 44px 0px #8E44EB80 inset'
    //     borderWidth='2px'
    //     borderRadius={40}
    //     background='black'
    //     borderColor={['#BD37EC', '#1F67FF']}
    //     text={'Rewards'}
    //     hasBorder={true}
    //     onClick={() => handleNavigate(routeNames.rewards)}
    //     fontFamily=''
    //     buttonHeight='52px'
    //     fontSize='20px'
    //   />
    //   <Button
    //     boxShadow='0px 0px 44px 0px #8E44EB80 inset'
    //     borderWidth='2px'
    //     borderRadius={40}
    //     background='black'
    //     borderColor={['#BD37EC', '#1F67FF']}
    //     text={'Tokenomics'}
    //     hasBorder={true}
    //     onClick={() => handleNavigate(routeNames.tokenomics)}
    //     fontFamily=''
    //     buttonHeight='52px'
    //     fontSize='20px'
    //   />
    //   <Button
    //     boxShadow='0px 0px 44px 0px #8E44EB80 inset'
    //     borderWidth='2px'
    //     borderRadius={40}
    //     background='black'
    //     borderColor={['#BD37EC', '#1F67FF']}
    //     text={'Docs'}
    //     hasBorder={true}
    // onClick={() =>
    //   open('https://docs.middlestaking.fr/welcome/presentation')
    // }
    //     fontFamily=''
    //     buttonHeight='52px'
    //     fontSize='20px'
    //   />
    //   {network.id != 'devnet' && (
    //     <Button
    //       boxShadow='0px 0px 44px 0px #8E44EB80 inset'
    //       borderWidth='2px'
    //       borderRadius={40}
    //       background='black'
    //       borderColor={['#BD37EC', '#1F67FF']}
    //       text={'Devnet'}
    //       hasBorder={true}
    //       onClick={() => open('https://devnet-app.middlestaking.fr/')}
    //       fontFamily=''
    //       buttonHeight='52px'
    //       fontSize='20px'
    //     />
    //   )}
    // </div>
  );
};

export default Account;
