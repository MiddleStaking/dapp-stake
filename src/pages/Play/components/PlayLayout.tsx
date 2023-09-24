import React, { useState, useEffect } from 'react';
import './PoolCol.scss';
import {
  useGetIsLoggedIn,
  useGetAccountInfo
} from '@multiversx/sdk-dapp/hooks';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { contractPlay } from 'config';
import { routeNames } from 'routes';
import notFound from './../../../assets/img/notfoundc.svg';
import nft_preview_not_found from './../../../assets/img/notfoundnft.png';
import { Button } from './../../../components/Design';
import { useGetESDTInformations } from './../../../pages/Earn/components/Actions/helpers';
import { ActionMine, ActionEnd } from './Actions';
import {
  useGetWinner,
  useGetBlocksLeft,
  useGetIdentifier,
  useGetNonce,
  useGetNftInformations,
  useGetPayment,
  useGetPrice
} from './Actions/helpers';
import { network } from 'config';

export const PlayLayout = ({ children }: React.PropsWithChildren) => {
  //const { network } = useGetNetworkConfig();

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
  const [hideRules, setHideRules] = useState('hide');

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

  const handleHide = (event: React.MouseEvent) => {
    if (!hideRules) {
      setHideRules('hide');
    } else {
      setHideRules('');
    }
  };
  return (
    <div className='container-xxl py-4'>
      <div>
        <div className='col-12 col-md-10 mx-auto'>
          {/* <div className='card shadow-sm border-0 '>
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
          </div> */}
          <div
            className='border-0 center'
            style={{
              maxWidth: '600px'
            }}
          >
            <div className='p-1 '>
              <div className='border-0'>
                <div
                  className='text-center p-4 text-white'
                  // style={{
                  //   backgroundImage: `url(${image})`,
                  //   backgroundSize: 'cover',
                  //   backgroundRepeat: 'no-repeat',
                  //   opacity: 1
                  // }}
                >
                  <h1>Count down game</h1>
                  <div className='type-section'>
                    <div className='center cursor-pointer' onClick={handleHide}>
                      RULES{' '}
                      <svg
                        className='chevron-down3'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M12 15.5002C11.8684 15.5009 11.7379 15.4757 11.6161 15.426C11.4943 15.3762 11.3834 15.3029 11.29 15.2102L7.29 11.2102C7.19676 11.1169 7.1228 11.0063 7.07234 10.8844C7.02188 10.7626 6.99591 10.632 6.99591 10.5002C6.99591 10.3683 7.02188 10.2378 7.07234 10.1159C7.1228 9.99411 7.19676 9.88342 7.29 9.79018C7.38324 9.69695 7.49393 9.62299 7.61575 9.57253C7.73758 9.52206 7.86814 9.49609 8 9.49609C8.13186 9.49609 8.26243 9.52206 8.38425 9.57253C8.50607 9.62299 8.61676 9.69695 8.71 9.79018L12 13.1002L15.3 9.92019C15.392 9.8179 15.5041 9.73569 15.6293 9.6787C15.7545 9.62171 15.8902 9.59118 16.0277 9.589C16.1653 9.58682 16.3018 9.61304 16.4287 9.66603C16.5557 9.71903 16.6703 9.79764 16.7655 9.89697C16.8607 9.99629 16.9344 10.1142 16.9819 10.2433C17.0295 10.3724 17.0499 10.5099 17.0418 10.6472C17.0338 10.7846 16.9975 10.9188 16.9353 11.0414C16.873 11.1641 16.7861 11.2726 16.68 11.3602L12.68 15.2202C12.4971 15.3965 12.254 15.4966 12 15.5002Z'
                          fill='white'
                        ></path>
                      </svg>
                    </div>
                    <div className={'left ' + hideRules}>
                      <ol>
                        <li>
                          The NFT will be awarded to the last user who plays
                          before the timer ends.
                        </li>
                        <li>Every time a user plays, he gain 1 power.</li>
                        <li>Each time a user plays, the timer is reset.</li>
                        <li>
                          When the timer is reset, it randomly accelerates from
                          0 to X blocks, where X is the current power of the
                          player, with a maximum of 50 blocks.
                        </li>
                        <li>
                          The payment token may change each time the timer is
                          reset.
                        </li>
                        <li>
                          The winner will receive the NFT and lose his power.
                        </li>
                        <li>
                          There are no limitations on the number of plays per
                          account.
                        </li>
                      </ol>
                      Revenues from the game will be add as rewards to our
                      staking pools
                      <br />
                      <a
                        className='text-white'
                        href={
                          network.explorerAddress + '/accounts/' + contractPlay
                        }
                        target='_blank'
                        rel='noreferrer'
                      >
                        <u>Explore transactions</u>
                      </a>{' '}
                    </div>
                  </div>
                  {last_user ? (
                    <>
                      {/* <h2>Last user:</h2>
                      <div id='winnerDisplay'>{last_user.toString()}</div> */}
                      {/* <h2>NFT PREVIEW</h2> */}
                      <div className='card-body type-section text-center p-4 text-white'>
                        <h2 className='center'>
                          Timer:
                          <div className='timer' id='timerDisplay'>
                            ~{' '}
                            {new Date(time_out * 1000)
                              .toISOString()
                              .slice(11, 19)}
                          </div>{' '}
                        </h2>
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
                          <img
                            style={{ width: '100%' }}
                            className=''
                            src={nft_preview}
                          />
                        )}{' '}
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
                        </a>{' '}
                        <a
                          target='_BLANK'
                          rel='noreferrer'
                          className='text-white'
                          href={'https://twitter.com/MiddleStaking'}
                        >
                          <u>Learn more about the NFT on twitter</u>
                        </a>
                      </div>
                      {isLoggedIn &&
                        time_out > 0 &&
                        identifier &&
                        last_user.toString() != address && (
                          <div className='type-section center'>
                            <p className='center'>
                              You are not the last user! Trying your luck ?
                            </p>
                            <ActionMine
                              payment_esdt_info={payment_esdt_info}
                              price={price}
                            />
                            {payment_esdt_info?.assets?.description && (
                              <div className='center'>
                                <img
                                  width={20}
                                  className='smallInfoLogo'
                                  src={image_esdt}
                                />{' '}
                                {payment_esdt_info?.assets?.description}
                              </div>
                            )}
                          </div>
                        )}
                      {identifier &&
                        time_out > 0 &&
                        last_user.toString() == address && (
                          <div className='type-section '>
                            <div className='center'>
                              You are the last user but the game is still
                              running.
                              <br /> Will you stay the last and win the NFT ?
                            </div>
                          </div>
                        )}
                      {isLoggedIn &&
                        time_out == 0 &&
                        last_user.toString() == address &&
                        identifier && (
                          <div className='type-section '>
                            <div className='center'>
                              Game has ended.
                              <ActionEnd />
                            </div>
                          </div>
                        )}{' '}
                      {!isLoggedIn && identifier && (
                        <div className='type-section '>
                          <Link
                            className='center'
                            to={routeNames.unlock + '/play'}
                            data-testid='loginBtn'
                          >
                            <Button
                              borderRadius={40}
                              background={'#000000'}
                              borderColor={'black'}
                              text='Login to play'
                            />
                          </Link>
                        </div>
                      )}
                      {!identifier && time_out == 0 && <>Game ended</>}
                      {isLoggedIn &&
                        identifier &&
                        time_out == 0 &&
                        last_user.toString() != address && (
                          <div className='type-section '>
                            <div className='center'>This game has ended.</div>
                          </div>
                        )}
                      {/* <>
                        {token_list && (
                          <table>
                            {token_list.map((item) => (
                              <tr key={item}>
                                <td>{item}</td>
                                <td>
                                  {' '}
                                  <FormatAmount
                                    value={useGetPrice(item)}
                                    decimals={Number(esdt_informations)}
                                    egldLabel={payment_esdt_info?.identifier}
                                    data-testid='balance'
                                    digits={2}
                                  />
                                </td>
                              </tr>
                            ))}
                          </table>
                        )}
                      </> */}
                    </>
                  ) : (
                    <div className='type-section '>
                      <div className='center'>Loading</div>
                    </div>
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
