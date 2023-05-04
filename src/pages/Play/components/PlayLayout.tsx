import React, { useState, useEffect } from 'react';
import './PoolCol.scss';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import image from './../../../assets/img/background2.png';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import nft_preview_not_found from './../../../assets/img/notfoundnft.png';
import { useGetESDTInformations } from './../../../pages/Earn/components/Actions/helpers';
import notFound from './../../../assets/img/notfoundc.svg';
import ReactPlayer from 'react-player';

import {
  useGetWinner,
  useGetBlocksLeft,
  useGetIdentifier,
  useGetNonce,
  useGetNftInformations,
  useGetPayment,
  useGetPrice
} from './Actions/helpers';
import { TopInfo } from './TopInfo';
import { ActionMine, ActionEnd } from './Actions';

export const PlayLayout = ({ children }: React.PropsWithChildren) => {
  const address = useGetAccountInfo().address;
  const last_user = useGetWinner();
  const payment = useGetPayment(last_user);
  const price = useGetPrice(payment);

  const payment_esdt_info = useGetESDTInformations(payment);
  const blocks_left = Number(useGetBlocksLeft() * 6);
  const identifier = useGetIdentifier(last_user);
  const nonce = useGetNonce(last_user);
  const [time, setTime] = useState(new Date());
  const [time_out, setTimeOut] = useState(0);

  const image_esdt = payment_esdt_info?.assets?.svgUrl
    ? payment_esdt_info?.assets?.svgUrl
    : notFound;

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

  const esdt_informations = useGetNftInformations(identifier, nonce);
  const nft_preview = esdt_informations?.media?.[0]?.url
    ? esdt_informations?.media?.[0]?.url
    : nft_preview_not_found;
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
                    NEW : Each time the timer is reset, it accelerates by 1 to X
                    blocks <br />
                    (where X = number of payment token in list)
                  </p>{' '}
                  <p>
                    NEW : Each time the timer is reset payment token can change
                  </p>
                  <p>NEW : No more limit by account</p>
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
                        {nft_preview.endsWith('.mp4') ? (
                          <ReactPlayer
                            width='auto'
                            height='400px'
                            playing={true}
                            loop={true}
                            volume={0}
                            muted={true}
                            url={nft_preview}
                          />
                        ) : (
                          <img className='thirdPoolLogo' src={nft_preview} />
                        )}
                        <br />
                        <a
                          target='_BLANK'
                          rel='noreferrer'
                          className='text-white'
                          href={
                            'https://www.frameit.gg/marketplace/nft/' +
                            esdt_informations?.identifier +
                            '/'
                          }
                        >
                          <u>{esdt_informations?.identifier}</u>
                        </a>
                      </div>
                      {isLoggedIn &&
                        time_out > 0 &&
                        identifier &&
                        last_user.toString() != address && (
                          <>
                            <p>You are not the last user! Trying your luck ?</p>
                            <ActionMine
                              payment_esdt_info={payment_esdt_info}
                              price={price}
                            />
                            {payment_esdt_info?.assets?.description && (
                              <div className='PoolCard butLineBig'>
                                <img
                                  className='smallInfoLogo'
                                  src={image_esdt}
                                />{' '}
                                {payment_esdt_info?.assets?.description}
                              </div>
                            )}
                          </>
                        )}
                      {isLoggedIn && time_out > 0 && identifier && (
                        <>
                          <p>
                            The winner may have to do a second transaction to
                            finalize the transfert.
                          </p>
                        </>
                      )}
                      {identifier &&
                        time_out > 0 &&
                        last_user.toString() == address && (
                          <p>
                            You are the last user but the game is still running.
                            Will you stay the last and win the NFT ?
                          </p>
                        )}
                      {isLoggedIn &&
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
                      {!identifier && time_out == 0 && <>Game ended</>}
                      {isLoggedIn &&
                        identifier &&
                        time_out == 0 &&
                        last_user.toString() != address && (
                          <>This game has ended.</>
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
