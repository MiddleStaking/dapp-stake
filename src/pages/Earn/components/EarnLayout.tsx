import React, { useState, useEffect } from 'react';
import './PoolCol.scss';
import {
  faEarth,
  faChartSimple,
  faDollar
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import { Col, Form, Row } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { defaultToken } from 'config';
import image from './../../../assets/img/background2.png';
import eCompass from './../../../assets/img/ecompass.svg';
import jungle from './../../../assets/img/jungle.svg';
import jexchange from './../../../assets/img/jexchange.svg';
import notFound from './../../../assets/img/notfoundc.svg';
import twitter from './../../../assets/img/twitter.svg';
import { useGetRewardedTokens } from './Actions/helpers';
import { useGetIsPaused } from './Actions/helpers';
import { useGetStakedTokens } from './Actions/helpers';
import { useGetESDTInformations } from './Actions/helpers';
import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
import { PoolInfo } from './PoolInfo';
import { TopInfo } from './TopInfo';

export const EarnLayout = ({ children }: React.PropsWithChildren) => {
  const { network } = useGetNetworkConfig();
  const [myPools, setMyPools] = React.useState(false);
  const handleChange = () => {
    setMyPools(!myPools);
  };
  const navigate = useNavigate();
  const isLoggedIn = useGetIsLoggedIn();
  const isPaused = useGetIsPaused();
  //const isPaused = 0;

  const stakedTokens: string[] = useGetStakedTokens();
  const { param } = useParams();
  const [url] = useState(param ? param.toString() : defaultToken);

  // const [test, setTest] = useState(
  //   stakedTokens.includes(url) ? url : defaultToken + ':' + url + ':'
  // );

  const userEsdtBalance = useGetUserESDT();
  const [stoken, setStoken] = React.useState(url);
  const rewardedTokens = useGetRewardedTokens(stoken);
  const orderedTokens = [];

  const esdt_info = useGetESDTInformations(stoken);

  console.log(rewardedTokens);

  for (const tok of rewardedTokens) {
    console.log(tok);
    const load: any = localStorage.getItem(
      'token_position_' + stoken + '_' + tok
    );
    const storage = JSON.parse(load);
    orderedTokens.push({
      identifier: tok,
      staked: storage?.total_stake ? storage?.total_stake : 0
    });
    console.log(storage?.total_stake);
    console.log(orderedTokens);
  }
  orderedTokens.sort((a, b) => b.staked - a.staked);
  console.log(orderedTokens);

  useEffect(() => {
    setStoken(param ? param.toString() : defaultToken);
  }, [param]);

  const tokens_extra_informations = [
    {
      identifier: 'MID-7f1d59',
      ecompass: 'https://e-compass.io/maiars/chartJungle/mid/usdc',
      jexchange:
        'https://app.jexchange.io/?paymentToken=EGLD&buyToken=MID-ecb7bf',
      jungle: 'https://jungledex.com/analytics/tokens/MID-ecb7bf'
    },
    {
      identifier: 'MID-ecb7bf',
      ecompass: 'https://e-compass.io/maiars/chartJungle/mid/usdc',
      jexchange:
        'https://app.jexchange.io/?paymentToken=EGLD&buyToken=MID-ecb7bf',
      jungle: 'https://jungledex.com/analytics/tokens/MID-ecb7bf'
    },
    {
      identifier: 'MEX-455c57',
      ecompass: 'https://e-compass.io/maiars/chart/mex/usdc',
      jexchange:
        'https://app.jexchange.io/?paymentToken=EGLD&buyToken=MEX-455c57'
    },
    {
      identifier: 'VITAL-ab7917',
      ecompass: 'https://e-compass.io/exrond/chart/vital/usdc',
      jexchange:
        'https://app.jexchange.io/?paymentToken=EGLD&buyToken=VITAL-ab7917'
    }
  ];

  const balance = userEsdtBalance
    .filter((token) => {
      return token.identifier === stoken;
    })
    .map((token) => token.balance);

  // const decimals = userEsdtBalance
  //   .filter((token) => {
  //     return token.identifier === stoken;
  //   })
  //   .map((token) => token.decimals);

  function setFSToken(e: React.ChangeEvent<any>) {
    //setParam(e.target.value);
    navigate(`/stake/${e.target.value}`);

    // const index = stakedTokens
    //   .filter(({ identifier }) => identifier === identifier)
    //   .findIndex((tokens) => tokens === e.target.value);
    setStoken(e.target.value);
  }

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
                        <Row className='mx-auto'>
                          {' '}
                          <label>
                            <input
                              checked={myPools}
                              onChange={handleChange}
                              type='checkbox'
                            />{' '}
                            Highlight my positions
                          </label>
                        </Row>
                      </Col>{' '}
                      <Col className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 m-auto'>
                        {' '}
                        <img
                          className='mediumInfoLogo'
                          src={
                            esdt_info?.assets?.svgUrl
                              ? esdt_info?.assets?.svgUrl
                              : notFound
                          }
                        />
                      </Col>
                      <Col className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 m-auto token-card text-center'>
                        {esdt_info?.identifier ? (
                          <div className='col-12 float-left'>
                            <a
                              href={
                                network.explorerAddress +
                                '/tokens/' +
                                esdt_info?.identifier
                              }
                              target={'_blank'}
                              rel={'noreferrer'}
                            >
                              <img
                                className='smallInfoLogo'
                                src={
                                  esdt_info?.assets?.svgUrl
                                    ? esdt_info?.assets?.svgUrl
                                    : notFound
                                }
                              />{' '}
                              Explorer
                            </a>
                          </div>
                        ) : (
                          ''
                        )}
                        {esdt_info?.accounts ? (
                          <div className='col-6 float-left'>
                            <FontAwesomeIcon icon={faChartSimple} /> Accounts :{' '}
                            {Number(esdt_info?.accounts).toLocaleString(
                              'en-US',
                              {
                                maximumFractionDigits: 2
                              }
                            )}
                          </div>
                        ) : (
                          ''
                        )}
                        {esdt_info?.circulatingSupply ? (
                          <div className='col-6 float-left'>
                            <FontAwesomeIcon icon={faChartSimple} /> Circulating
                            :{' '}
                            {Number(
                              esdt_info?.circulatingSupply
                            ).toLocaleString('en-US', {
                              maximumFractionDigits: 2
                            })}
                          </div>
                        ) : (
                          ''
                        )}
                        {esdt_info?.price ? (
                          <div className='col-6 float-left'>
                            <FontAwesomeIcon icon={faDollar} />{' '}
                            {Number(esdt_info?.price).toLocaleString('en-US', {
                              maximumFractionDigits: 2
                            })}
                          </div>
                        ) : (
                          ''
                        )}
                        {esdt_info?.marketCap ? (
                          <div className='col-6 float-left'>
                            <FontAwesomeIcon icon={faDollar} /> Market Cap :{' '}
                            {Number(esdt_info?.marketCap).toLocaleString(
                              'en-US',
                              {
                                maximumFractionDigits: 2
                              }
                            )}
                          </div>
                        ) : (
                          ''
                        )}
                        {esdt_info?.assets?.website ? (
                          <div className='col-6 float-left'>
                            <a
                              href={esdt_info?.assets?.website}
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
                        )}
                        {esdt_info?.assets?.social?.twitter ? (
                          <div className='col-6 float-left'>
                            <a
                              href={esdt_info?.assets?.social?.twitter}
                              target={'_blank'}
                              rel={'noreferrer'}
                            >
                              <img className='smallInfoLogo' src={twitter} />{' '}
                              Twitter
                            </a>
                          </div>
                        ) : (
                          ''
                        )}
                        {tokens_extra_informations
                          .filter((token) => {
                            return token.identifier === stoken;
                          })
                          .map((token) =>
                            token.ecompass ? (
                              <div key={stoken} className='col-6 float-left'>
                                <a
                                  href={token.ecompass}
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
                            token.jexchange ? (
                              <div key={stoken} className='col-6 float-left'>
                                <a
                                  href={token.jexchange}
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
                          )}{' '}
                        {tokens_extra_informations
                          .filter((token) => {
                            return token.identifier === stoken;
                          })
                          .map((token) =>
                            token.jungle ? (
                              <div key={stoken} className='col-6 float-left'>
                                <a
                                  href={token.jungle}
                                  target={'_blank'}
                                  rel={'noreferrer'}
                                >
                                  <img className='smallInfoLogo' src={jungle} />{' '}
                                  Jungle
                                </a>
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
              orderedTokens.map((rtoken) => (
                <div
                  className='PoolCol col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4'
                  key={stoken + rtoken.identifier}
                >
                  {' '}
                  <PoolInfo
                    myPools={myPools}
                    stakedToken={stoken}
                    rewardedToken={rtoken.identifier}
                    balance={balance}
                    canBeStaked={
                      stakedTokens.includes(rtoken.identifier) &&
                      stoken != rtoken.identifier
                    }
                    isPaused={isPaused}
                    tokens_extra_informations={tokens_extra_informations
                      .filter((token) => {
                        return token.identifier === rtoken.identifier;
                      })
                      .map((token) => (token.identifier ? token : ''))}
                  />
                </div>
              ))
            ) : (
              <>No pool to load</>
            )}
          </div>

          {/* <div className={styles.transactions}>{children}</div> */}
        </div>{' '}
      </div>{' '}
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
                <div className='text-white text-center'>
                  The staking pool listing is permissionless. Anyone can add
                  tokens as a reward. Be sure to do your research before
                  investing in a token.{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
