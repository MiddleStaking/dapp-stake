import React, { useState } from 'react';
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
import jexchange from './../../../assets/img/jexchange.svg';
import notFound from './../../../assets/img/notfoundc.svg';
import twitter from './../../../assets/img/twitter.svg';
import { useGetRewardedTokens } from './Actions/helpers';
import { useGetStakedTokens } from './Actions/helpers';
import { useGetESDTInformations } from './Actions/helpers';
import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
import { PoolInfo } from './PoolInfo';
import { TopInfo } from './TopInfo';

export const EarnLayout = ({ children }: React.PropsWithChildren) => {
  const { network } = useGetNetworkConfig();

  const navigate = useNavigate();
  const isLoggedIn = useGetIsLoggedIn();

  const stakedTokens: string[] = useGetStakedTokens();
  const { param } = useParams();
  const [url] = useState(param ? param.toString() : defaultToken);
  // const [test, setTest] = useState(
  //   stakedTokens.includes(url) ? url : defaultToken + ':' + url + ':'
  // );

  const userEsdtBalance = useGetUserESDT();
  const [stoken, setStoken] = React.useState(url);
  const rewardedTokens = useGetRewardedTokens(stoken);
  const esdt_info = useGetESDTInformations(stoken);

  const tokens_extra_informations = [
    {
      identifier: 'MID-7f1d59',
      charts: 'https://e-compass.io/maiars/chart-jex/mid/wegld',
      market:
        'https://app.jexchange.io/pairTrading?token_a=MID-ecb7bf&token_b=WEGLD-bd4d79'
    },
    {
      identifier: 'MID-ecb7bf',
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
                            {Number(esdt_info?.accounts).toLocaleString()}
                          </div>
                        ) : (
                          ''
                        )}

                        {esdt_info?.supply ? (
                          <div className='col-6 float-left'>
                            <FontAwesomeIcon icon={faChartSimple} /> Supply :{' '}
                            {Number(esdt_info?.supply).toLocaleString()}
                          </div>
                        ) : (
                          ''
                        )}

                        {esdt_info?.price ? (
                          <div className='col-6 float-left'>
                            <FontAwesomeIcon icon={faDollar} />{' '}
                            {Number(esdt_info?.price).toLocaleString()}
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
                            token.charts ? (
                              <div key={stoken} className='col-6 float-left'>
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
                              <div key={stoken} className='col-6 float-left'>
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
                  key={stoken + rtoken}
                >
                  {' '}
                  <PoolInfo
                    stakedToken={stoken}
                    rewardedToken={rtoken}
                    balance={balance}
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
