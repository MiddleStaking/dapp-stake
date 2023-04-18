import React, { useState, useEffect } from 'react';
import './PoolCol.scss';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import image from './../../../assets/img/background2.png';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import notFound from './../../../assets/img/notfoundnft.png';

import {
  useGetWinner,
  useGetBlocksLeft,
  useGetHasPlayed,
  useGetIdentifier,
  useGetNonce,
  useGetESDTInformations,
  useGetPayment,
  useGetPrice
} from './Actions/helpers';
import { TopInfo } from './TopInfo';
import { ActionMine, ActionEnd } from './Actions';

export const PlayLayout = ({ children }: React.PropsWithChildren) => {
  const address = useGetAccountInfo().address;
  const last_user = useGetWinner();
  const payment = useGetPayment();
  const price = useGetPrice();
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

  const esdt_informations = useGetESDTInformations(identifier, nonce);
  const image1 = esdt_informations?.media?.[0]?.url
    ? esdt_informations?.media?.[0]?.url
    : notFound;
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
                  <h1>Count down claim Game</h1>
                  <p>
                    The last user to validate a transaction before the end of
                    the timer wins the NFT
                  </p>
                  <p>
                    Each time a user validates a transaction, the timer is reset
                  </p>
                  <p>
                    Each time the timer is reset, it accelerates by 6 seconds (1
                    block)
                  </p>
                  <p>An address can only validate one transaction.</p>

                  {last_user ? (
                    <>
                      <h2>Timer:</h2>
                      <div className='timer' id='timerDisplay'>
                        ~{' '}
                        {new Date(time_out * 1000).toISOString().slice(11, 19)}
                      </div>
                      <h2>Last user:</h2>
                      <div id='winnerDisplay'>{last_user.toString()}</div>
                      <h2>NFT PREVIEW</h2>
                      <div className='card-body text-center p-4 text-white'>
                        <img className='thirdPoolLogo' src={image1} />
                      </div>
                      <p>
                        The winner may have to do a second transaction to
                        finalize the transfert.
                      </p>
                      {isLoggedIn && !has_played && time_out > 0 && identifier && (
                        <>
                          <p>
                            Looks like you haven&apos;t played! Trying your luck
                            ?
                          </p>
                          <ActionMine payment={payment} price={price} />
                        </>
                      )}
                      {has_played &&
                        identifier &&
                        time_out > 0 &&
                        last_user.toString() == address && (
                          <p>
                            You are the last user but the game is still running.
                            Will you stay the last and win the NFT ?
                          </p>
                        )}
                      {isLoggedIn &&
                        has_played &&
                        time_out == 0 &&
                        last_user.toString() == address &&
                        identifier && (
                          <>
                            <p>
                              It seems that the game ended. If you are the lucky
                              winner please claim one last transaction to remove
                              NFT from contract.
                            </p>
                            <ActionEnd />
                          </>
                        )}{' '}
                      {isLoggedIn &&
                        has_played &&
                        last_user.toString() != address && (
                          <p>
                            Too bad :( You were not the last user. May be next
                            time ? Thank you for playing.
                          </p>
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
                      {isLoggedIn &&
                        identifier &&
                        time_out == 0 &&
                        !has_played && (
                          <>This game has ended and you did not played.</>
                        )}
                    </>
                  ) : (
                    <>Loading</>
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
