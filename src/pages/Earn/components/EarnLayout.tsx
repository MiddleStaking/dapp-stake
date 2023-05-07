import React, { useState, useEffect } from 'react';
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
import FundModal from './FundModal';

export const EarnLayout = ({ children }: React.PropsWithChildren) => {
  const { network } = useGetNetworkConfig();
  const [showFund, setShowFund] = useState(false);
  const [myPools, setMyPools] = React.useState(false);
  const [mySearch, setMySearch] = React.useState('');
  const [orderBy, setOrderBy] = React.useState('value');

  const pairs =
    localStorage.getItem('pairs_') != null
      ? JSON.parse(localStorage.getItem('pairs_') as string)
      : [{ s: '', r: '' }];
  const handleChange = () => {
    setMyPools(!myPools);
  };

  const handleMySearch = (e: any) => {
    setMySearch(e.target.value);
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
  const orderedPairs = [];

  const esdt_info = useGetESDTInformations(stoken);
  for (const tok of rewardedTokens) {
    const load: any = localStorage.getItem(
      'token_position_' + stoken + '_' + tok
    );
    const info = JSON.parse(localStorage.getItem('esdt_' + tok) as string);
    const storage = JSON.parse(load);
    orderedTokens.push({
      identifier: tok,
      users: storage?.users ? storage?.users : 0,
      staked: storage?.total_stake ? storage?.total_stake : 1,
      price: info?.price ? info?.price : 0
    });
  }
  if (orderBy == 'users') {
    orderedTokens.sort((a, b) => b.users - a.users);
  } else {
    orderedTokens.sort((a, b) => b.users - a.users);
  }

  for (const par of pairs) {
    const load: any = localStorage.getItem(
      'token_position_' + par.s + '_' + par.r
    );
    const info = JSON.parse(localStorage.getItem('esdt_' + par.s) as string);
    const storage = JSON.parse(load);
    orderedPairs.push({
      s: par.s,
      r: par.r,
      users: storage?.users ? storage?.users : 0,
      value: Number(
        ((BigInt(storage?.total_stake ? storage?.total_stake : 1) *
          BigInt(10000000)) /
          BigInt(10 ** info?.decimals ? info?.decimals : 1)) *
          BigInt((info?.price ? info?.price * 10000000 : 1).toFixed())
      )
    });
  }
  orderedPairs.sort((a, b) => b.value - a.value);

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
    setMySearch('');
  }
  function setFOrderBy(e: React.ChangeEvent<any>) {
    setOrderBy(e.target.value);
  }

  return (
    <div className='center'>
      <FundModal show={showFund} onClose={() => setShowFund(false)} />
      <Row className='pb-4'>
        <Col
          className='subnav center'
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={4}
          xxl={4}
        >
          <div className='staked-token'>
            <div className='token'>
              <div className='logo'>
                <div className='logos'>
                  <img
                    className='image-3'
                    src={
                      esdt_info?.assets?.svgUrl
                        ? esdt_info?.assets?.svgUrl
                        : notFound
                    }
                  />
                </div>

                <svg
                  className='info'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M9.99999 1.6665C8.35182 1.6665 6.74065 2.15525 5.37024 3.07092C3.99983 3.9866 2.93173 5.28809 2.301 6.81081C1.67027 8.33353 1.50524 10.0091 1.82678 11.6256C2.14833 13.2421 2.942 14.727 4.10744 15.8924C5.27287 17.0578 6.75773 17.8515 8.37424 18.173C9.99075 18.4946 11.6663 18.3296 13.189 17.6988C14.7117 17.0681 16.0132 16 16.9289 14.6296C17.8446 13.2592 18.3333 11.648 18.3333 9.99984C18.3333 8.90549 18.1178 7.82186 17.699 6.81081C17.2802 5.79976 16.6664 4.8811 15.8925 4.10728C15.1187 3.33346 14.2001 2.71963 13.189 2.30084C12.178 1.88205 11.0943 1.6665 9.99999 1.6665V1.6665ZM10.8333 13.3332C10.8333 13.5542 10.7455 13.7661 10.5892 13.9224C10.433 14.0787 10.221 14.1665 9.99999 14.1665C9.77898 14.1665 9.56702 14.0787 9.41074 13.9224C9.25446 13.7661 9.16666 13.5542 9.16666 13.3332V9.1665C9.16666 8.94549 9.25446 8.73353 9.41074 8.57725C9.56702 8.42097 9.77898 8.33317 9.99999 8.33317C10.221 8.33317 10.433 8.42097 10.5892 8.57725C10.7455 8.73353 10.8333 8.94549 10.8333 9.1665V13.3332ZM9.99999 7.49984C9.83518 7.49984 9.67406 7.45096 9.53702 7.3594C9.39998 7.26783 9.29317 7.13768 9.23009 6.98541C9.16702 6.83314 9.15052 6.66558 9.18267 6.50393C9.21483 6.34228 9.29419 6.19379 9.41074 6.07725C9.52728 5.9607 9.67577 5.88134 9.83742 5.84918C9.99907 5.81703 10.1666 5.83353 10.3189 5.8966C10.4712 5.95968 10.6013 6.06649 10.6929 6.20353C10.7845 6.34057 10.8333 6.50169 10.8333 6.6665C10.8333 6.88752 10.7455 7.09948 10.5892 7.25576C10.433 7.41204 10.221 7.49984 9.99999 7.49984Z'
                    fill='white'
                  />
                </svg>
              </div>
            </div>

            <div className='input'>
              <div className='label'>
                <div className='label2'>Staked token</div>
              </div>

              <div className='input-default'>
                <svg
                  className='chevron-down'
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M2.96967 5.21967C3.26256 4.92678 3.73744 4.92678 4.03033 5.21967L8 9.18934L11.9697 5.21967C12.2626 4.92678 12.7374 4.92678 13.0303 5.21967C13.3232 5.51256 13.3232 5.98744 13.0303 6.28033L8.53033 10.7803C8.23744 11.0732 7.76256 11.0732 7.46967 10.7803L2.96967 6.28033C2.67678 5.98744 2.67678 5.51256 2.96967 5.21967Z'
                    fill='white'
                  />
                </svg>
                <Form.Control
                  as='select'
                  onChange={setFSToken}
                  value={stoken}
                  disabled={false}
                  className='search-select'
                >
                  {stakedTokens &&
                    stakedTokens.map((item) => (
                      <option
                        className=''
                        disabled={false}
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                </Form.Control>
              </div>
            </div>
          </div>
        </Col>
        <Col
          className='subnav  center'
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={4}
          xxl={4}
        >
          <div className='input2'>
            <div className='label3'>
              <div className='label4'>Sort by</div>
            </div>

            <div className='input-default2'>
              <Form.Control
                as='select'
                onChange={setFOrderBy}
                value={orderBy}
                disabled={false}
                className='search-select'
              >
                <option className='' value={'value'} disabled={false}>
                  Staked value
                </option>
                <option className='' value={'users'} disabled={false}>
                  Users
                </option>
              </Form.Control>
              <svg
                className='chevron-down2'
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M2.96967 5.21967C3.26256 4.92678 3.73744 4.92678 4.03033 5.21967L8 9.18934L11.9697 5.21967C12.2626 4.92678 12.7374 4.92678 13.0303 5.21967C13.3232 5.51256 13.3232 5.98744 13.0303 6.28033L8.53033 10.7803C8.23744 11.0732 7.76256 11.0732 7.46967 10.7803L2.96967 6.28033C2.67678 5.98744 2.67678 5.51256 2.96967 5.21967Z'
                  fill='white'
                />
              </svg>
            </div>
          </div>
          <label className='switch'>
            <input type='checkbox' checked={myPools} onChange={handleChange} />
            <span className='slider round'></span>
          </label>
          <div className='toggle'>
            <div className='staken-only'>Staked only</div>
          </div>
        </Col>

        <Col
          className='subnav center'
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={4}
          xxl={4}
        >
          <div className='search-bar'>
            <svg
              className='search'
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M14.2716 13.1684L11.3313 10.2281C12.0391 9.28573 12.4213 8.13865 12.42 6.96C12.42 3.94938 9.97063 1.5 6.96 1.5C3.94938 1.5 1.5 3.94938 1.5 6.96C1.5 9.97063 3.94938 12.42 6.96 12.42C8.13865 12.4213 9.28573 12.0391 10.2281 11.3313L13.1684 14.2716C13.3173 14.4046 13.5114 14.4756 13.711 14.47C13.9105 14.4645 14.1004 14.3827 14.2415 14.2415C14.3827 14.1004 14.4645 13.9105 14.47 13.711C14.4756 13.5114 14.4046 13.3173 14.2716 13.1684V13.1684ZM3.06 6.96C3.06 6.18865 3.28873 5.43463 3.71727 4.79328C4.14581 4.15192 4.7549 3.65205 5.46754 3.35687C6.18017 3.06169 6.96433 2.98446 7.72085 3.13494C8.47738 3.28542 9.17229 3.65686 9.71772 4.20228C10.2631 4.74771 10.6346 5.44262 10.7851 6.19915C10.9355 6.95567 10.8583 7.73983 10.5631 8.45247C10.2679 9.1651 9.76808 9.77419 9.12673 10.2027C8.48537 10.6313 7.73135 10.86 6.96 10.86C5.92604 10.8588 4.93478 10.4475 4.20365 9.71635C3.47253 8.98522 3.06124 7.99396 3.06 6.96V6.96Z'
                fill='white'
              />
            </svg>
            <input
              className='search-input'
              value={mySearch}
              onChange={handleMySearch}
              type='input'
              placeholder='Search pool'
            />
          </div>
          <div
            className='button-icon-border  cursor-pointer'
            onClick={() => setShowFund(true)}
          >
            <div className='button-icon'>
              <svg
                className='plus'
                width='20'
                height='20'
                viewBox='0 0 32 32'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M17.3334 6.66683C17.3334 5.93045 16.7364 5.3335 16 5.3335C15.2637 5.3335 14.6667 5.93045 14.6667 6.66683V14.6668H6.66671C5.93033 14.6668 5.33337 15.2638 5.33337 16.0002C5.33337 16.7365 5.93033 17.3335 6.66671 17.3335H14.6667V25.3335C14.6667 26.0699 15.2637 26.6668 16 26.6668C16.7364 26.6668 17.3334 26.0699 17.3334 25.3335V17.3335H25.3334C26.0698 17.3335 26.6667 16.7365 26.6667 16.0002C26.6667 15.2638 26.0698 14.6668 25.3334 14.6668H17.3334V6.66683Z'
                  fill='white'
                />
              </svg>
            </div>
          </div>
        </Col>
      </Row>
      <div className='col-12'>
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
                  <Form
                    style={{ verticalAlign: 'middle' }}
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
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
                        </Row>{' '}
                        <Row className='mx-auto'>
                          {' '}
                          <label>
                            {' '}
                            Search pools{' '}
                            <input
                              checked={myPools}
                              onChange={handleMySearch}
                              type='input'
                            />{' '}
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
          </div> */}
        {mySearch != '' && orderedPairs ? (
          <Row className='pt-4 pb-4'>
            {rewardedTokens[0] != '' &&
              orderedPairs
                .filter(
                  (p: any) =>
                    p.s.toLowerCase().includes(mySearch.toLowerCase()) ||
                    p.r.toLowerCase().includes(mySearch.toLowerCase())
                )
                .map((p: any) => (
                  <Col
                    xs={12}
                    sm={12}
                    md={6}
                    lg={4}
                    xl={3}
                    xxl={3}
                    key={p.s + p.r}
                    className='pb-4'
                  >
                    {' '}
                    <PoolInfo
                      myPools={myPools}
                      stakedToken={p.s}
                      rewardedToken={p.r}
                      balance={balance}
                      canBeStaked={false}
                      isPaused={isPaused}
                      tokens_extra_informations={tokens_extra_informations
                        .filter((token) => {
                          return token.identifier === p.r;
                        })
                        .map((token) => (token.identifier ? token : ''))}
                    />
                  </Col>
                ))}{' '}
            <Col xs={12} sm={12} md={6} lg={4} xl={3} xxl={3}>
              <div className='card-type'></div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={4} xl={3} xxl={3}>
              <div className='card-type'></div>
            </Col>{' '}
            <Col xs={12} sm={12} md={6} lg={4} xl={3} xxl={3}>
              <div className='card-type'></div>
            </Col>
          </Row>
        ) : (
          <Row className='pt-4'>
            {rewardedTokens[0] != '' &&
              orderedTokens.map((rtoken) => (
                <Col
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  xxl={3}
                  key={stoken + rtoken.identifier}
                  className='pb-4'
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
                </Col>
              ))}
            <Col xs={12} sm={12} md={6} lg={4} xl={3} xxl={3}>
              <div className='card-type'></div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={4} xl={3} xxl={3}>
              <div className='card-type'></div>
            </Col>{' '}
            <Col xs={12} sm={12} md={6} lg={4} xl={3} xxl={3}>
              <div className='card-type'></div>
            </Col>
          </Row>
        )}
        {/* <div className={styles.transactions}>{children}</div> */}
      </div>{' '}
      <div className='col-12'>
        <div className='text-white text-center'>
          The staking pool listing is permissionless. Anyone can add tokens as a
          reward. Be sure to do your research before investing in a token.{' '}
        </div>
      </div>
    </div>
  );
};
