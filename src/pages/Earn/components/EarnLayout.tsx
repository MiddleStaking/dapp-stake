import React, { useState, useEffect } from 'react';
import {
  useGetIsLoggedIn,
  useGetPendingTransactions
} from '@multiversx/sdk-dapp/hooks';
import { Col, Form, Row } from 'react-bootstrap';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { defaultToken } from 'config';
import notFound from './../../../assets/img/notfoundc.svg';
import {
  useGetAllStakingPosition,
  useGetAllTokenPosition,
  useGetAllUserRewards
} from './Actions/helpers';
import { useGetAllLp } from './../../Swap/components/Actions/helpers';
import { useGetIsPaused } from './Actions/helpers';
import { useGetStakedTokens, useGetSwapedTokens } from './Actions/helpers';
import { useGetESDTInformations } from './Actions/helpers';
import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
import FundModal from './FundModal';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { CheckBox, ToggleSwitch } from './../../../components/Design';
import { HeaderMenuContext } from 'context/Header/HeaderMenuContext';
import CardPool from './CardPool';
import { useWindowDimensions } from 'components/DimensionScreen';
import { network } from 'config';
import { BigNumber } from 'bignumber.js';

export const EarnLayout = ({ children }: React.PropsWithChildren) => {
  // const { network } = useGetNetworkConfig();
  const [showFund, setShowFund] = useState(false);
  const [myPools, setMyPools] = React.useState(false);
  const [mySearch, setMySearch] = React.useState('');
  const [orderBy, setOrderBy] = React.useState('value');
  const { address } = useGetAccountInfo();

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
  //const swapedTokens: string[] = useGetSwapedTokens();
  const swapedTokens: string[] = [];
  const { param } = useParams();
  const [url] = useState(param ? param.toString() : defaultToken);

  // const [test, setTest] = useState(
  //   stakedTokens.includes(url) ? url : defaultToken + ':' + url + ':'
  // );
  const { hasPendingTransactions } = useGetPendingTransactions();

  const userEsdtBalance = useGetUserESDT();
  const [stoken, setStoken] = React.useState(url);
  const allTokenPosition = useGetAllTokenPosition(stoken);
  const allStakingPosition = useGetAllStakingPosition(stoken);
  const allUserRewards = useGetAllUserRewards(stoken);
  const allLp = useGetAllLp();
  const orderedTokens = [];

  const esdt_info = useGetESDTInformations(stoken);
  for (const tok of allTokenPosition) {
    const load: any = localStorage.getItem(
      'token_position_' + stoken + '_' + tok
    );
    const rinfo = JSON.parse(localStorage.getItem('esdt_' + tok) as string);
    // const sinfo = JSON.parse(localStorage.getItem('esdt_' + stoken) as string);
    const storage = JSON.parse(load);

    const load_apr: any = localStorage.getItem('apr_' + stoken + '_' + tok);
    const apr = JSON.parse(load_apr);

    const reward_value =
      rinfo?.price > 0
        ? Number(
            ((BigInt(storage?.balance ? storage?.balance : 1) *
              BigInt(10000000)) /
              BigInt(10 ** rinfo?.decimals ? rinfo?.decimals : 1)) *
              BigInt((rinfo?.price ? rinfo?.price * 10000000 : 1).toFixed())
          )
        : 0;
    orderedTokens.push({
      identifier: tok,
      rewarded_token: tok.rewarded_token,
      token_position: tok.token_position,
      staked_addresses: tok?.staked_addresses ? tok?.staked_addresses : 0,
      balance: tok.token_position.balance,
      staked: tok?.token_position?.total_stake
        ? Number(tok?.token_position?.total_stake)
        : 1,
      reward: reward_value,
      apr: apr
    });
  }

  if (orderBy == 'users') {
    orderedTokens.sort((a, b) => b.staked_addresses - a.staked_addresses);
  } else if (orderBy == 'yields') {
    orderedTokens.sort((a, b) => b.apr - a.apr);
  } else if (orderBy == 'rvalue') {
    orderedTokens.sort((a, b) => b.reward - a.reward);
  } else {
    orderedTokens.sort((a, b) => b.staked - a.staked);
  }

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

  function setFSToken(e: React.ChangeEvent<any>) {
    navigate(`/stake/${e.target.value}`);
    setStoken(e.target.value);
    setMySearch('');
  }
  function setFOrderBy(e: React.ChangeEvent<any>) {
    setOrderBy(e.target.value);
  }
  const { setHeaderMenu } = React.useContext(HeaderMenuContext);
  const [showStake, setShowStake] = useState(false);
  const [showUnstake, setShowUnstake] = useState(false);
  const { width } = useWindowDimensions();
  const heightComponentTypeSection = width > 450 ? '162px' : '114px';
  const socialNetworks: any = [
    // {
    //   icon: <IconGlobe />,
    //   url: 'https://www.middlestaking.fr'
    // },
    // {
    //   icon: <IconTwitter />,
    //   url: 'https://twitter.com/MiddleStaking'
    // },
    // {
    //   icon: <IconFlash />,
    //   url: 'https://explorer.multiversx.com/tokens/MEX-455c57'
    // }
  ];

  const path = useLocation().pathname;
  //const stakedToken = path.split('/')[2];
  //const rewardedToken = path.split('/')[2];

  return (
    <div className='center'>
      <FundModal
        userEsdtBalance={userEsdtBalance}
        show={showFund}
        onClose={() => {
          setHeaderMenu(true), setShowFund(false);
        }}
      />
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
                    stakedTokens
                      .filter((token) => {
                        return token != 'MIDUSDC-3d93f4';
                      })
                      .map((item, key) => (
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
                <option className='' value={'svalue'} disabled={false}>
                  Staked value
                </option>{' '}
                <option className='' value={'rvalue'} disabled={false}>
                  Reward value
                </option>
                <option className='' value={'users'} disabled={false}>
                  Users
                </option>
                <option className='' value={'yields'} disabled={false}>
                  Yields
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

          <ToggleSwitch
            id='switch-1'
            onChange={handleChange}
            checked={myPools}
            thumbColor='#fff'
            borderColor={['#BD37EC', '#1F67FF']}
            hasBorder={myPools ? false : true}
            trackColor={myPools ? ['#BD37EC', '#1F67FF'] : 'black'}
          />
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
          {address && (
            <div
              className='button-icon-border  cursor-pointer'
              onClick={() => {
                setShowFund(true), setHeaderMenu(false);
              }}
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
          )}
        </Col>
      </Row>
      <div className='col-12'>
        <Row className='pt-4'>
          {allTokenPosition &&
            orderedTokens
              .filter((token) => {
                return (
                  token.rewarded_token
                    .toLowerCase()
                    .includes(mySearch.toLowerCase()) || mySearch == ''
                );
              })
              .map((rtoken, key) => (
                // CardPool
                <Col
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  xxl={3}
                  key={key}
                  className='pb-4'
                >
                  {rtoken && allTokenPosition[0]?.rewarded_token != '' && (
                    <CardPool
                      staked_token={stoken}
                      staked_esdt_info={esdt_info}
                      rewarded_token={rtoken?.rewarded_token}
                      token_position={rtoken?.token_position}
                      all_staking_position={allStakingPosition}
                      all_user_rewards={allUserRewards}
                      all_lp={allLp}
                      users={rtoken?.staked_addresses}
                      height={heightComponentTypeSection}
                      WindowDimensions={width}
                      textColor='#ffffff'
                      fontFamily='sans-serif'
                      userEsdtBalance={userEsdtBalance}
                      swapedTokens={swapedTokens}
                      myPools={myPools}
                      balance={balance}
                      isPaused={isPaused}
                      canBeStaked={
                        stakedTokens.includes(rtoken.rewarded_token) &&
                        stoken != rtoken.rewarded_token
                      }
                      tokens_extra_informations={tokens_extra_informations
                        .filter((token) => {
                          return token.identifier === rtoken.rewarded_token;
                        })
                        .map((token) => (token.identifier ? token : ''))}
                    />
                  )}
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

        {/* <div className={styles.transactions}>{children}</div> */}
      </div>{' '}
      <div className='col-12'>
        <div className='text-white text-center'>
          The staking rewards listing is permissionless. Anyone can add tokens
          as a reward. Be sure to do your research before investing in a token.{' '}
        </div>
      </div>
    </div>
  );
};
