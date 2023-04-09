import React, { useState, useEffect } from 'react';
import './PoolCol.scss';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import image from './../../../assets/img/background2.png';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';

import {
  useGetWinner,
  useGetBlocksLeft,
  useGetHasPlayed,
  useGetIdentifier,
  useGetNonce
} from './Actions/helpers';
import { TopInfo } from './TopInfo';
import { ActionMine } from './Actions';

export const PlayLayout = ({ children }: React.PropsWithChildren) => {
  const { network } = useGetNetworkConfig();
  const address = useGetAccountInfo().address;

  const last_user = useGetWinner();
  const has_played = useGetHasPlayed();
  const blocks_left = Number(useGetBlocksLeft() * 6);
  const identifier = useGetIdentifier();
  const nonce = useGetNonce();
  const [time, setTime] = useState(new Date());
  const [time_out, setTimeOut] = useState(0);

  const isLoggedIn = useGetIsLoggedIn();
  useEffect(() => {
    setTimeOut(blocks_left);
  }, [blocks_left]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time_out <= 0 || time_out + 15 < blocks_left) {
        const time_left = blocks_left;
        setTime(new Date());
        setTimeOut(time_left);
      } else {
        const time_left = time_out - 1;
        setTime(new Date());
        setTimeOut(time_left);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time, blocks_left]);
  function bigToHexDec(d: bigint) {
    let result = '';
    result = d.toString(16);
    if (Math.abs(result.length % 2) == 1) {
      result = '0' + result;
    }
    return result;
  }
  console.log(isLoggedIn);
  console.log(has_played);
  console.log(time_out);
  console.log(last_user.toString());
  console.log(address);
  console.log(identifier);
  console.log(nonce.toString());
  const nft_identifier = identifier + '-' + bigToHexDec(nonce);
  console.log(nft_identifier);
  return (
    <div className='container-xxl py-4'>
      <div>
        <div className='col-12 col-md-10 mx-auto'>
          <div className='card shadow-sm border-0 '>
            <div className='card-body p-1 '>
              <div className='card border-0 bg-primary'>
                <div
                  className='card-body text-center p-4 text-white'
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    opacity: 1
                  }}
                >
                  <TopInfo />
                </div>
              </div>
            </div>
          </div>
          <div className='card shadow-sm border-0 '>
            <div className='card-body p-1 '>
              <div className='card border-0 bg-primary'>
                <div
                  className='card-body text-center p-4 text-white'
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    opacity: 1
                  }}
                >
                  The rules are simple: The last user to validate a transaction
                  before the end of the timer wins the NFT
                  <ul>
                    <li>
                      Each time a user validates a transaction the timer is
                      reset
                    </li>
                    <li>
                      Each time the timer is reset, it accelerates by 6 seconds
                      (1 block)
                    </li>
                    <li>An address can only validate one transaction.</li>
                  </ul>{' '}
                  - Devnet: the contest takes place on the devnet but the
                  winner&apos;s address will receive this magnificent NFT on the
                  mainnet.{' '}
                </div>

                <div
                  className='card-body text-center p-4 text-white'
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    opacity: 1
                  }}
                >
                  Last user (and winner ?) : {last_user.toString()} <br />
                  Time left : {time_out}
                  <br />
                  {isLoggedIn && !has_played && time_out > 0 && identifier && (
                    <ActionMine />
                  )}
                  {isLoggedIn &&
                    has_played &&
                    time_out == 0 &&
                    last_user.toString() == address &&
                    identifier && <ActionMine />}{' '}
                  {isLoggedIn &&
                    has_played &&
                    last_user.toString() != address && (
                      <>You were not the last user</>
                    )}
                  {!isLoggedIn && identifier && (
                    <>
                      {' '}
                      <Link
                        style={{ width: 'auto' }}
                        to={routeNames.unlock + '/play'}
                        className='butLineBig goldButton'
                        data-testid='loginBtn'
                      >
                        Login to play
                      </Link>
                    </>
                  )}
                  {!identifier && <>Game ended</>}
                  {isLoggedIn && identifier && !has_played && (
                    <>This game has ended and you did not played.</>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='row pt-4'></div>

          {/* <div className={styles.transactions}>{children}</div> */}
        </div>
      </div>
    </div>
  );
};
