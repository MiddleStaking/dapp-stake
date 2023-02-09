import React, { useState } from 'react';
import styles from './../earn.module.scss';
import { Col, Form, Row } from 'react-bootstrap';
import { TopInfo } from './TopInfo';
import { PoolInfo } from './PoolInfo';
import { defaultToken } from 'config';
import { useGetRewardedTokens } from './Actions/helpers';
import { useGetStakedTokens } from './Actions/helpers';
import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import './PoolCol.scss';
import { useParams, useNavigate } from 'react-router-dom';
import image from './../../../assets/img/background2.png';
import notFound from './../../../assets/img/notfound.svg';
import eCompass from './../../../assets/img/ecompass.svg';
import jexchange from './../../../assets/img/jexchange.svg';
import twitter from './../../../assets/img/twitter.svg';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { faEarth, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const EarnLayout = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate();
  const isLoggedIn = useGetIsLoggedIn();

  const stakedTokens: string[] = useGetStakedTokens();
  const { param } = useParams();
  const [url, setUrl] = useState(param ? param.toString() : defaultToken);
  const [test, setTest] = useState(
    stakedTokens.includes(url) ? url : defaultToken + ':' + url + ':'
  );

  const userEsdtBalance = useGetUserESDT();
  const [stoken, setStoken] = React.useState(url);
  const rewardedTokens = useGetRewardedTokens(stoken);

  //TODO Remplacer ce tableau par un storage/api
  const tokens_informations = [
    {
      type: 'FungibleESDT',
      identifier: 'STAKE-1c6362',
      name: 'MiddleStaking',
      ticker: 'MID',
      owner: 'erd1c3nfhvj5jgulw62yndr6fgh0fcmut34fful733tl998zpt9s2k5qrxumhs',
      minted: '0',
      burnt: '243400000000000000000000000',
      initialMinted: '250000000000000000000000000',
      decimals: 18,
      isPaused: false,
      assets: {
        website: 'https://middlestaking.fr',
        description:
          'The $MID is a service Token allowing users to get involved into staking without a full EGLD.',
        status: 'active',
        pngUrl: 'https://media.elrond.com/tokens/asset/MID-ecb7bf/logo.png',
        svgUrl: 'https://media.elrond.com/tokens/asset/MID-ecb7bf/logo.svg',
        social: {
          email: 'esdt@middlestaking.fr',
          twitter: 'https://twitter.com/MiddleStaking',
          whitepaper: 'https://files.middlestaking.fr/mid-whitepaper.pdf'
        }
      },
      transactions: 4210,
      accounts: 5989,
      canUpgrade: true,
      canMint: true,
      canBurn: true,
      canChangeOwner: true,
      canPause: true,
      canFreeze: true,
      canWipe: true,
      supply: '6600000',
      circulatingSupply: '6600000',
      roles: [
        {
          canLocalMint: true,
          canLocalBurn: true,
          roles: ['ESDTRoleLocalBurn', 'ESDTRoleLocalMint'],
          address:
            'erd1c3nfhvj5jgulw62yndr6fgh0fcmut34fful733tl998zpt9s2k5qrxumhs'
        }
      ]
    },
    {
      type: 'FungibleESDT',
      identifier: '777DEV-0ddfcf',
      decimals: 18
    },
    {
      type: 'FungibleESDT',
      identifier: 'ASH-4ce444',
      decimals: 18,
      image: 'https://media.elrond.com/tokens/asset/ASH-a642d1/logo.svg'
    },
    {
      type: 'FungibleESDT',
      identifier: 'BKT-6561e8',
      decimals: 18
    },
    {
      type: 'FungibleESDT',
      identifier: 'BUILDO-890d14',
      decimals: 18
    },
    {
      type: 'FungibleESDT',
      identifier: 'BURN-94a071',
      decimals: 6
    },
    {
      type: 'FungibleESDT',
      identifier: 'DJOY-ae20c0',
      decimals: 18
    },
    {
      type: 'FungibleESDT',
      identifier: 'DSUPER-9af8df',
      decimals: 18
    },
    {
      type: 'FungibleESDT',
      identifier: 'EFOO-8e80a5',
      decimals: 18
    },
    {
      type: 'FungibleESDT',
      identifier: 'RENBTC-0b6973',
      decimals: 8
    },
    {
      type: 'FungibleESDT',
      identifier: 'USDC-79d9a4',
      decimals: 18,
      image: 'https://media.elrond.com/tokens/asset/USDC-c76f1f/logo.svg'
    },
    {
      type: 'FungibleESDT',
      identifier: 'USDC-d5181d',
      decimals: 6,
      image: 'https://media.elrond.com/tokens/asset/USDC-c76f1f/logo.svg'
    },
    {
      type: 'FungibleESDT',
      identifier: 'USDT-a55fa7',
      decimals: 6
    },
    {
      type: 'FungibleESDT',
      identifier: 'VITAL-058fd5',
      decimals: 8,
      image: 'https://media.elrond.com/tokens/asset/VITAL-ab7917/logo.svg'
    },
    {
      type: 'FungibleESDT',
      identifier: 'WBTC-3a02ea',
      decimals: 6
    },
    {
      type: 'FungibleESDT',
      identifier: 'WBTC-9bdb9b',
      decimals: 8
    },
    {
      type: 'FungibleESDT',
      identifier: 'WUSDC-3124eb',
      decimals: 6
    },
    {
      type: 'FungibleESDT',
      identifier: 'WUSDC-c01108',
      decimals: 6
    },
    {
      type: 'FungibleEsdt',
      identifier: 'EGLDUSDC-842a92',
      decimals: 18
    }
  ];

  const tokens_extra_informations = [
    {
      identifier: 'STAKE-1c6362',
      charts: 'https://e-compass.io/maiars/chart-jex/mid/wegld',
      market:
        'https://app.jexchange.io/pairTrading?token_a=MID-ecb7bf&token_b=WEGLD-bd4d79'
    }
  ];

  const balance = userEsdtBalance
    .filter((token) => {
      return token.identifier === stoken;
    })
    .map((token) => token.balance);

  const decimals = userEsdtBalance
    .filter((token) => {
      return token.identifier === stoken;
    })
    .map((token) => token.decimals);

  function setFSToken(e: React.ChangeEvent<any>) {
    //setParam(e.target.value);
    navigate(`/earn/${e.target.value}`);

    // const index = stakedTokens
    //   .filter(({ identifier }) => identifier === identifier)
    //   .findIndex((tokens) => tokens === e.target.value);
    setStoken(e.target.value);
  }

  return (
    <div className='container-xxl py-4'>
      <div className='row'>
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
                  <Form style={{ verticalAlign: 'middle' }}>
                    <Row className='mx-auto'>
                      <Col className='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 m-auto'>
                        <Row>
                          <Form.Group as={Col} md='12' controlId='network'>
                            <Form.Label>Staked Token</Form.Label>
                            <Form.Control
                              as='select'
                              onChange={setFSToken}
                              value={stoken}
                              disabled={false}
                            >
                              {stakedTokens &&
                                stakedTokens.map((item) => (
                                  <option
                                    disabled={false}
                                    className='text-center not-allowed disabled'
                                    key={item}
                                    value={item}
                                  >
                                    {item}
                                  </option>
                                ))}
                            </Form.Control>
                          </Form.Group>
                        </Row>
                        <Row className='mx-auto'>
                          {' '}
                          {isLoggedIn && (
                            <>
                              Balance :{' '}
                              <FormatAmount
                                value={balance.toString()}
                                egldLabel={stoken}
                                data-testid='balance'
                                digits={2}
                              />{' '}
                            </>
                          )}
                        </Row>
                      </Col>{' '}
                      <Col className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 m-auto'>
                        {' '}
                        <img
                          className='mediumInfoLogo'
                          src={tokens_informations
                            .filter((token) => {
                              return token.identifier === stoken;
                            })
                            .map((token) =>
                              token?.assets?.svgUrl
                                ? token?.assets?.svgUrl
                                : notFound
                            )
                            .toString()}
                        />
                      </Col>
                      <Col className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 m-auto token-card text-center'>
                        {tokens_informations
                          .filter((token) => {
                            return token.identifier === stoken;
                          })
                          .map((token) =>
                            token.identifier ? (
                              <div className='col-12 float-left'>
                                <a
                                  href={
                                    'https://explorer.multiversx.com/tokens/' +
                                    token.identifier
                                  }
                                  target={'_blank'}
                                  rel={'noreferrer'}
                                >
                                  <img
                                    className='smallInfoLogo'
                                    src={tokens_informations
                                      .filter((token) => {
                                        return token.identifier === stoken;
                                      })
                                      .map((token) =>
                                        token?.assets?.svgUrl
                                          ? token?.assets?.svgUrl
                                          : notFound
                                      )
                                      .toString()}
                                  />{' '}
                                  Explorer
                                </a>
                              </div>
                            ) : (
                              ''
                            )
                          )}

                        {tokens_informations
                          .filter((token) => {
                            return token.identifier === stoken;
                          })
                          .map((token) =>
                            token?.assets?.website ? (
                              <div className='col-6 float-left'>
                                <a
                                  href={token.assets.website}
                                  target={'_blank'}
                                  rel={'noreferrer'}
                                >
                                  <FontAwesomeIcon
                                    icon={faEarth}
                                    className='text-muted'
                                  />{' '}
                                  Website
                                </a>
                              </div>
                            ) : (
                              ''
                            )
                          )}

                        {tokens_informations
                          .filter((token) => {
                            return token.identifier === stoken;
                          })
                          .map((token) =>
                            token?.assets?.social?.twitter ? (
                              <div className='col-6 float-left'>
                                <a
                                  href={token?.assets?.social?.twitter}
                                  target={'_blank'}
                                  rel={'noreferrer'}
                                >
                                  <img
                                    className='smallInfoLogo'
                                    src={twitter}
                                  />{' '}
                                  Twitter
                                </a>
                              </div>
                            ) : (
                              ''
                            )
                          )}

                        {tokens_extra_informations
                          .filter((token) => {
                            return token.identifier === stoken;
                          })
                          .map((token) =>
                            token.charts ? (
                              <div className='col-6 float-left'>
                                <a
                                  href={token.charts}
                                  target={'_blank'}
                                  rel={'noreferrer'}
                                >
                                  <img
                                    className='smallInfoLogo'
                                    src={eCompass}
                                  />{' '}
                                  E-Compass
                                </a>
                              </div>
                            ) : (
                              ''
                            )
                          )}
                        {tokens_extra_informations
                          .filter((token) => {
                            return token.identifier === stoken;
                          })
                          .map((token) =>
                            token.market ? (
                              <div className='col-6 float-left'>
                                <a
                                  href={token.market}
                                  target={'_blank'}
                                  rel={'noreferrer'}
                                >
                                  <img
                                    className='smallInfoLogo'
                                    src={jexchange}
                                  />{' '}
                                  Jexchange
                                </a>
                              </div>
                            ) : (
                              ''
                            )
                          )}

                        {tokens_informations
                          .filter((token) => {
                            return token.identifier === stoken;
                          })
                          .map((token) =>
                            token.accounts ? (
                              <div className='col-6 float-left'>
                                <FontAwesomeIcon icon={faChartSimple} />{' '}
                                Accounts :{' '}
                                {Number(token.accounts).toLocaleString()}
                              </div>
                            ) : (
                              ''
                            )
                          )}

                        {tokens_informations
                          .filter((token) => {
                            return token.identifier === stoken;
                          })
                          .map((token) =>
                            token.supply ? (
                              <div className='col-6 float-left'>
                                <FontAwesomeIcon icon={faChartSimple} /> Supply
                                : {Number(token.supply).toLocaleString()}
                              </div>
                            ) : (
                              ''
                            )
                          )}
                      </Col>
                    </Row>
                  </Form>
                </div>
              </div>
            </div>
          </div>
          <div className='row pt-4'>
            {rewardedTokens[0] != '' ? (
              rewardedTokens.map((rtoken) => (
                <div
                  className='PoolCol col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4'
                  key={rtoken}
                >
                  {' '}
                  <PoolInfo
                    stakedToken={stoken}
                    rewardedToken={rtoken}
                    balance={balance}
                    sdecimals={tokens_informations
                      .filter((token) => {
                        return token.identifier === stoken;
                      })
                      .map((token) => (token.decimals ? token.decimals : 0))}
                    rdecimals={tokens_informations
                      .filter((token) => {
                        return token.identifier === rtoken;
                      })
                      .map((token) => (token.decimals ? token.decimals : 0))}
                    image1={tokens_informations
                      .filter((token) => {
                        return token.identifier === stoken;
                      })
                      .map((token) =>
                        token?.assets?.svgUrl ? token?.assets?.svgUrl : notFound
                      )}
                    image2={tokens_informations
                      .filter((token) => {
                        return token.identifier === rtoken;
                      })
                      .map((token) =>
                        token?.assets?.svgUrl ? token?.assets?.svgUrl : notFound
                      )}
                  />
                </div>
              ))
            ) : (
              <>No pool to load</>
            )}
          </div>

          {/* <div className={styles.transactions}>{children}</div> */}
        </div>
      </div>
    </div>
  );
};
