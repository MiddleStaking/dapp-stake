import React, { useState, useEffect } from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { useParams, useNavigate } from 'react-router-dom';
import { useWindowDimensions } from 'components/DimensionScreen';
import { defaultToken } from 'config';
import { HeaderMenuContext } from 'context/Header/HeaderMenuContext';
import notFound from './../../../assets/img/notfoundc.svg';
import { ToggleSwitch } from './../../../components/Design';
import { useGetAllLp } from './../../Swap/components/Actions/helpers';
import {
  useGetAllStakingPosition,
  useGetAllTokenPosition,
  useGetAllUserRewards,
  useGetIsPaused,
  useGetStakedTokens,
  useGetESDTInformations
} from './Actions/helpers';
import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
import CardPool from './CardPool';
import FundModal from './FundModal';
import DropdownMenu from 'components/Design/DropdownMenu';

export const EarnLayout = () => {
  const [showFund, setShowFund] = useState(false);
  const [myPools, setMyPools] = React.useState(false);
  const [mySearch, setMySearch] = React.useState('');
  const [orderBy, setOrderBy] = React.useState('value');
  const { address } = useGetAccountInfo();

  const handleChange = () => {
    setMyPools(!myPools);
  };

  const handleMySearch = (e: any) => {
    setMySearch(e.target.value);
  };
  const navigate = useNavigate();
  const isPaused = useGetIsPaused();

  const stakedTokens: string[] = useGetStakedTokens();
  //const swapedTokens: string[] = useGetSwapedTokens();(wip)
  const swapedTokens: string[] = [];
  const { param } = useParams();
  const [url] = useState(param ? param.toString() : defaultToken);

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

  const balance = userEsdtBalance
    .filter((token) => {
      return token.identifier === stoken;
    })
    .map((token) => token.balance);

  function setFSToken(value: any) {
    navigate(`/stake/${value}`);
    setStoken(value);
    setMySearch('');
  }
  function setFOrderBy(value: any) {
    setOrderBy(value);
  }
  const { setHeaderMenu } = React.useContext(HeaderMenuContext);
  const { width } = useWindowDimensions();
  const heightComponentTypeSection = width > 450 ? '162px' : '114px';
  // const socialNetworks: any = [
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
  // ];

  //const stakedToken = path.split('/')[2];
  //const rewardedToken = path.split('/')[2];

  return (
    <div
      style={{
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      <FundModal
        userEsdtBalance={userEsdtBalance}
        setShow={setShowFund}
        show={showFund}
        onClose={() => {
          setHeaderMenu(true), setShowFund(false);
        }}
      />
      <div
        className='pb-4'
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)'
        }}
      >
        <div className='subnav center headcol'>
          {' '}
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
              </div>
            </div>

            <div className='input'>
              <div className='label'>
                <div className='label2'>Staked token</div>
              </div>
              <DropdownMenu
                BoxShadowActive={false}
                BoxShadowActiveColor='none'
                BoxShadowColor='none'
                inputHeight={'40px'}
                inputWidth='179px'
                borderRadius='54'
                hasBorder={true}
                borderRadiusOptions='5px'
                borderColor='#695885'
                options={
                  stakedTokens
                    ? stakedTokens
                        .filter((token) => {
                          return token != 'MIDUSDC-3d93f4';
                        })
                        .map((item: any) => ({
                          text: item,
                          value: item
                        }))
                    : [
                        {
                          text: stoken,
                          value: stoken
                        }
                      ]
                }
                defaultValue={stoken}
                disableOption={false}
                onSelect={function (value: any): void {
                  setFSToken(value);
                }}
              />
            </div>
          </div>
        </div>
        <div className='subnav  center headcol'>
          <div className='input2'>
            <div className='label3'>
              <div className='label4'>Sort by</div>
            </div>
            <DropdownMenu
              BoxShadowActive={false}
              BoxShadowActiveColor='none'
              BoxShadowColor='none'
              inputHeight={'40px'}
              inputWidth='179px'
              borderRadius='54'
              hasBorder={true}
              borderRadiusOptions='5px'
              borderColor='#695885'
              options={[
                {
                  text: 'Staked value',
                  value: 'svalue'
                },
                {
                  text: 'Reward value',
                  value: 'rvalue'
                },
                {
                  text: 'Users',
                  value: 'users'
                },
                {
                  text: 'Yields',
                  value: 'yields'
                }
              ]}
              defaultValue={'Staked value'}
              disableOption={false}
              onSelect={function (value: any): void {
                setFOrderBy(value);
              }}
            />
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
        </div>

        <div className='subnav center headcol'>
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
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '10px',
          placeItems: 'start center'
        }}
      >
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
              <div
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  maxWidth: '300px'
                }}
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
                  />
                )}
              </div>
            ))}
      </div>
      <div className='col-12'>
        <div className='text-white text-center'>
          The staking rewards listing is permissionless. Anyone can add tokens
          as a reward. Be sure to do your research before investing in a token.{' '}
        </div>
      </div>
    </div>
  );
};
