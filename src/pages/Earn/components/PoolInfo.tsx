import * as React from 'react';
import { useState } from 'react';
import {
  faCircleInfo,
  faDollar,
  faEarth
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import { Col, Row } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';
import image from './../../../assets/img/background2.png';
import notFound from './../../../assets/img/notfoundc.svg';
import { ActionClaimRewards, ActionStakeRewards } from './Actions';
import { useGetESDTInformations } from './Actions/helpers';
import {
  useGetTokenPosition,
  useGetStakingPosition,
  useGetStakingPositionRewards
} from './Actions/helpers';
import StakeModal from './StakeModal';
import UnstakeModal from './UnstakeModal';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import eCompass from './../../../assets/img/ecompass.svg';
import jungle from './../../../assets/img/jungle.svg';
import jexchange from './../../../assets/img/jexchange.svg';
import twitter from './../../../assets/img/twitter.svg';
import styles from './../earn.module.scss';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';

export const PoolInfo = ({
  stakedToken,
  rewardedToken,
  balance,
  canBeStaked,
  isPaused,
  tokens_extra_informations
}: any) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();
  const [showStake, setShowStake] = useState(false);
  const [showUnstake, setShowUnstake] = useState(false);
  const { hasPendingTransactions } = useGetPendingTransactions();

  const staked_esdt_info = useGetESDTInformations(stakedToken);
  const rewarded_esdt_info = useGetESDTInformations(rewardedToken);
  const sdecimals = staked_esdt_info?.decimals ? staked_esdt_info?.decimals : 0;
  const rdecimals = rewarded_esdt_info?.decimals
    ? rewarded_esdt_info?.decimals
    : 0;

  const image1 = staked_esdt_info?.assets?.svgUrl
    ? staked_esdt_info?.assets?.svgUrl
    : notFound;
  const image2 = rewarded_esdt_info?.assets?.svgUrl
    ? rewarded_esdt_info?.assets?.svgUrl
    : notFound;

  const tokenPosition = useGetTokenPosition(stakedToken, rewardedToken);
  const stakingPosition = useGetStakingPosition(
    stakedToken,
    rewardedToken,
    hasPendingTransactions
  );
  const stakingPositionRewards = useGetStakingPositionRewards(
    stakedToken,
    rewardedToken,
    stakingPosition.stake_amount,
    hasPendingTransactions
  );

  const staked_value = staked_esdt_info?.price
    ? Number(BigInt(tokenPosition.total_stake) / BigInt(10 ** sdecimals)) *
      staked_esdt_info?.price
    : 0;

  const my_staked_value = staked_esdt_info?.price
    ? Number(BigInt(stakingPosition.stake_amount) / BigInt(10 ** sdecimals)) *
      staked_esdt_info?.price
    : 0;

  //Montant user
  const my_rewards_value = rewarded_esdt_info?.price
    ? Number(
        (BigInt(stakingPositionRewards) *
          BigInt((rewarded_esdt_info.price * 10000000).toFixed())) /
          BigInt(10 ** rdecimals)
      ) / 10000000
    : 0;

  //montant global
  const rewarded_value = rewarded_esdt_info?.price
    ? Number(BigInt(tokenPosition.balance) / BigInt(10 ** sdecimals)) *
      rewarded_esdt_info?.price
    : 0;

  const stakedPopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>Staked in pool</Popover.Header>
      <Popover.Body>
        This is the total amount of tokens staked in pools by users.
      </Popover.Body>
    </Popover>
  );

  const leftPopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>Tokens left in pool</Popover.Header>
      <Popover.Body>
        This is the amount of tokens left in pool to be claimed by users.
      </Popover.Body>
    </Popover>
  );

  const speedPopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>Time before max rewards</Popover.Header>
      <Popover.Body>
        This is the time users have to stay in pool before they can get a full
        share of the pool.
      </Popover.Body>
    </Popover>
  );

  const aprPopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>APR (calulated)</Popover.Header>
      <Popover.Body>
        This is an estimation of the APR based on the Total staked and token
        left in the reward pool. <br />
        It does not take in count the value of each token (one is not priced)
      </Popover.Body>
    </Popover>
  );
  const pricedAprPopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>APR (calulated)</Popover.Header>
      <Popover.Body>
        This is an estimation of the APR based on the Total staked and token
        left in the reward pool. <br />
        Using the price of both tokens
      </Popover.Body>
    </Popover>
  );
  const allTimeRewardsPopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>All time rewarded</Popover.Header>
      <Popover.Body>
        This is the number of token this pool have rewarded since its creation
      </Popover.Body>
    </Popover>
  );

  const myStakePopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>Your staked tokens in pool</Popover.Header>
      <Popover.Body>
        This is the number of token you have staked in pool.
      </Popover.Body>
    </Popover>
  );

  const mySharePopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>Your share of the pool</Popover.Header>
      <Popover.Body>
        This is the percentage of token you have in this pool.
      </Popover.Body>
    </Popover>
  );

  const myRewardsPopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>Your rewards</Popover.Header>
      <Popover.Body>
        This is an estimation of the rewards you can claim NOW based on the
        rewards left in pool, your staked tokens and the time spent in pool.
        <br />
        Time spent in pool is reseted after claim or stake.
      </Popover.Body>
    </Popover>
  );

  const pausedPopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>Pool is paused</Popover.Header>
      <Popover.Body>
        When a pool is paused, users can only claim rewards or unstake their
        deposit.
      </Popover.Body>
    </Popover>
  );

  let apr = BigInt(100);
  if (
    tokenPosition.total_stake > BigInt(0) &&
    tokenPosition.balance > BigInt(0)
  ) {
    apr =
      (BigInt(tokenPosition.balance) * BigInt(10 ** sdecimals) * apr) /
      (BigInt(tokenPosition.total_stake) * BigInt(10 ** rdecimals));
  }

  // (valeur finale - valeur initial) / valeur initiale * 100
  let priced_apr = BigInt(100);
  if (
    staked_esdt_info.price > 0 &&
    rewarded_esdt_info.price > 0 &&
    tokenPosition.total_stake > BigInt(1) &&
    tokenPosition.balance > BigInt(0)
  ) {
    const price_fixed1 = BigInt(
      staked_esdt_info.price * 100000000000 > 0
        ? (staked_esdt_info.price * 100000000000).toFixed()
        : 1
    );
    const price_fixed2 = BigInt(
      rewarded_esdt_info.price * 100000000000 > 0
        ? (rewarded_esdt_info.price * 100000000000).toFixed()
        : 1
    );

    const initial_value = BigInt(
      price_fixed1 > 0 && BigInt(tokenPosition.total_stake)
        ? price_fixed1 * BigInt(tokenPosition.total_stake)
        : 1
    );
    const reward_value = BigInt(
      price_fixed2 > 0 && BigInt(tokenPosition.balance)
        ? price_fixed2 * BigInt(tokenPosition.balance)
        : 1
    );

    const final_value = BigInt(initial_value + reward_value);
    console.log('------');
    console.log(rewardedToken);
    console.log(initial_value);
    console.log(reward_value);
    console.log(final_value);
    console.log('------');
    priced_apr = BigInt(
      (
        ((Number(final_value) - Number(initial_value)) /
          Number(initial_value)) *
        100
      ).toFixed()
    );
  }

  let share = BigInt(10000);
  if (tokenPosition.total_stake > BigInt(0)) {
    share =
      (BigInt(stakingPosition.stake_amount) * share) /
      BigInt(tokenPosition.total_stake);
  }
  const rest = Number(share) / Number(100);

  const speed =
    (BigInt(tokenPosition.blocks_to_max) * BigInt(6)) /
    BigInt(24) /
    BigInt(60) /
    BigInt(60);

  // Pas bon j'ai besoin de connaitre le block courant pour connaitre la prgression
  // let rewardsLoading = BigInt(0);
  // if (stakingPosition.last_action_block > BigInt(0)) {
  //   rewardsLoading = BigInt(
  //     (BigInt(stakingPosition.last_action_block) /
  //       BigInt(tokenPosition.blocks_to_max)) *
  //       BigInt(100)
  //   );
  // }

  return (
    <div className='card'>
      {' '}
      <StakeModal
        rewardedToken={rewardedToken}
        stakedToken={stakedToken}
        balance={balance}
        decimals={sdecimals}
        onClose={() => setShowStake(false)}
        show={showStake}
        image1={image1}
        image2={image2}
      />
      <UnstakeModal
        rewardedToken={rewardedToken}
        stakedToken={stakedToken}
        balance={stakingPosition.stake_amount}
        decimals={sdecimals}
        onClose={() => setShowUnstake(false)}
        show={showUnstake}
      />
      <div
        className='text-black PoolCard'
        data-testid='poolInfo'
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          opacity: 1
        }}
      >
        <div className='poolTop'>
          <Row className='topLogo'>
            <Col className='col-4 '>
              <img className='firstPoolLogo' src={image1} />
              <img className='secondPoolLogo' src={image2} />
            </Col>
            <Col className='col-8 topName'>
              <h4>Earn : {rewardedToken}</h4>
              <div className='rewardedInfo'>
                <div className='col-6 float-left '>
                  <a
                    className='text-white'
                    href={
                      network.explorerAddress +
                      '/tokens/' +
                      rewarded_esdt_info?.identifier
                    }
                    target={'_blank'}
                    rel={'noreferrer'}
                  >
                    <img
                      className='smallInfoLogo'
                      src={
                        rewarded_esdt_info?.assets?.svgUrl
                          ? rewarded_esdt_info?.assets?.svgUrl
                          : notFound
                      }
                    />{' '}
                    <br />
                    Explorer
                  </a>
                </div>
                {rewarded_esdt_info?.price ? (
                  <div className='col-6 float-left'>
                    <FontAwesomeIcon icon={faDollar} /> <br />
                    {Number(rewarded_esdt_info?.price).toLocaleString('en-US', {
                      maximumFractionDigits: 2
                    })}
                  </div>
                ) : (
                  ''
                )}
                {rewarded_esdt_info?.assets?.website ? (
                  <div className='col-6 float-left'>
                    <a
                      className='text-white'
                      href={rewarded_esdt_info?.assets?.website}
                      target={'_blank'}
                      rel={'noreferrer'}
                    >
                      <FontAwesomeIcon icon={faEarth} className='text-muted' />{' '}
                      <br /> Website
                    </a>
                  </div>
                ) : (
                  ''
                )}
                {rewarded_esdt_info?.assets?.social?.twitter ? (
                  <div className='col-6 float-left'>
                    <a
                      className='text-white'
                      href={rewarded_esdt_info?.assets?.social?.twitter}
                      target={'_blank'}
                      rel={'noreferrer'}
                    >
                      {' '}
                      <img className='smallInfoLogo' src={twitter} />
                      <br /> Twitter
                    </a>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </Col>

            <Col className='col-12'>
              {tokens_extra_informations?.[0]?.ecompass && (
                <>
                  {' '}
                  <div className='col-4 float-left'>
                    <a
                      className='text-white'
                      href={tokens_extra_informations?.[0]?.ecompass}
                      target={'_blank'}
                      rel={'noreferrer'}
                    >
                      <img className='smallInfoLogo' src={eCompass} /> <br />
                      E-Compass
                    </a>
                  </div>
                </>
              )}

              {tokens_extra_informations?.[0]?.jexchange && (
                <>
                  {' '}
                  <div className='col-4 float-left'>
                    <a
                      className='text-white'
                      href={tokens_extra_informations?.[0]?.jexchange}
                      target={'_blank'}
                      rel={'noreferrer'}
                    >
                      <img className='smallInfoLogo' src={jexchange} /> <br />
                      Jexchange
                    </a>
                  </div>
                </>
              )}

              {tokens_extra_informations?.[0]?.jungle && (
                <>
                  {' '}
                  <div className='col-4 float-left'>
                    <a
                      className='text-white'
                      href={tokens_extra_informations?.[0]?.jungle}
                      target={'_blank'}
                      rel={'noreferrer'}
                    >
                      <img className='smallInfoLogo' src={jungle} />
                      <br /> Jungle
                    </a>
                  </div>
                </>
              )}
            </Col>

            <Col className='col-12'>
              {' '}
              <div className='blueButton leftInPoolInfo'>
                <OverlayTrigger placement='right' overlay={leftPopover}>
                  <a>
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className='text-muted'
                    />
                  </a>
                </OverlayTrigger>{' '}
                Rewards :{' '}
                <FormatAmount
                  value={tokenPosition.balance.toString()}
                  decimals={Number(rdecimals)}
                  egldLabel={' '}
                  data-testid='balance'
                  digits={2}
                />{' '}
                {rewarded_esdt_info?.price && (
                  <>
                    {' '}
                    <br />
                    {rewarded_value.toLocaleString('en-US', {
                      maximumFractionDigits: 2
                    })}{' '}
                    <FontAwesomeIcon icon={faDollar} />
                  </>
                )}
                <br />
                <OverlayTrigger
                  placement='right'
                  overlay={allTimeRewardsPopover}
                >
                  <a>
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className='text-muted'
                    />
                  </a>
                </OverlayTrigger>{' '}
                All time rewarded :{' '}
                <FormatAmount
                  value={tokenPosition.total_rewards.toString()}
                  decimals={Number(rdecimals)}
                  egldLabel={' '}
                  data-testid='balance'
                  digits={2}
                />
              </div>{' '}
            </Col>
            <Col className='col-6 sub2'>
              {' '}
              <OverlayTrigger placement='right' overlay={speedPopover}>
                <a>
                  <FontAwesomeIcon icon={faCircleInfo} className='text-muted' />
                </a>
              </OverlayTrigger>{' '}
              speed : {speed.toString()} days
            </Col>
            <Col className='col-6 sub2'>
              {' '}
              {rewarded_esdt_info.price && staked_esdt_info.price ? (
                <>
                  {' '}
                  <OverlayTrigger placement='right' overlay={pricedAprPopover}>
                    <a>
                      <FontAwesomeIcon
                        icon={faCircleInfo}
                        className='text-muted'
                      />
                    </a>
                  </OverlayTrigger>{' '}
                  priced apr : {priced_apr.toString()} %
                </>
              ) : (
                <>
                  <OverlayTrigger placement='right' overlay={aprPopover}>
                    <a>
                      <FontAwesomeIcon
                        icon={faCircleInfo}
                        className='text-muted'
                      />
                    </a>
                  </OverlayTrigger>{' '}
                  unpriced apr : {apr.toString()} %{' '}
                </>
              )}
            </Col>
            <Col>
              {' '}
              <div className='blueButton leftInPoolInfo'>
                <OverlayTrigger placement='right' overlay={stakedPopover}>
                  <a>
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className='text-muted'
                    />
                  </a>
                </OverlayTrigger>{' '}
                Total Staked :{' '}
                <FormatAmount
                  value={tokenPosition.total_stake.toString()}
                  decimals={Number(sdecimals)}
                  egldLabel={' '}
                  data-testid='staked'
                  digits={2}
                />{' '}
                <br />
                {staked_esdt_info?.price && (
                  <>
                    {staked_value.toLocaleString('en-US', {
                      maximumFractionDigits: 2
                    })}{' '}
                    <FontAwesomeIcon icon={faDollar} />
                  </>
                )}{' '}
                Users:{' '}
                <FormatAmount
                  value={
                    tokenPosition.users ? tokenPosition.users.toString() : '0'
                  }
                  decimals={Number(0)}
                  egldLabel={' '}
                  data-testid='staked'
                  digits={0}
                />{' '}
              </div>{' '}
            </Col>
          </Row>
          {canBeStaked && (
            <>
              {' '}
              <Row>
                <Col>
                  <Link
                    to={routeNames.stake + `/${rewardedToken}`}
                    className='butLine bouton-visiter'
                    data-testid='loginBtn'
                  >
                    Stake {rewardedToken}
                  </Link>
                </Col>
              </Row>
            </>
          )}
        </div>

        <div className='poolPosition'>
          {!address ? (
            <Link
              to={routeNames.unlock + `/stake/${stakedToken}`}
              className='butLine goldButton'
              data-testid='loginBtn'
            >
              Login
            </Link>
          ) : (
            <div className='text-black' data-testid='myPosition'>
              {stakingPosition.stake_amount < 1 ? (
                <div>
                  <h3>NO STAKE</h3>
                  <div>
                    {tokenPosition.paused > 0 || isPaused == 'true' ? (
                      <>
                        <button className='butLine'>
                          <OverlayTrigger
                            placement='right'
                            overlay={pausedPopover}
                          >
                            <a>
                              <FontAwesomeIcon
                                icon={faCircleInfo}
                                className='text-muted'
                              />
                            </a>
                          </OverlayTrigger>{' '}
                          PAUSED
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className='butLine goldButton'
                          onClick={() => setShowStake(true)}
                        >
                          STAKE
                        </button>{' '}
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  {' '}
                  <h3>MY STAKE</h3>
                  <Row>
                    <Col className='col-12'>
                      {' '}
                      <div className='blueButton leftInPoolInfo'>
                        <OverlayTrigger
                          placement='right'
                          overlay={myStakePopover}
                        >
                          <a>
                            <FontAwesomeIcon
                              icon={faCircleInfo}
                              className='text-muted'
                            />
                          </a>
                        </OverlayTrigger>{' '}
                        Staked :{' '}
                        <FormatAmount
                          value={stakingPosition.stake_amount.toString()}
                          decimals={Number(sdecimals)}
                          egldLabel={' '}
                          data-testid='staked'
                          digits={6}
                        />{' '}
                        {staked_esdt_info?.price && (
                          <>
                            {my_staked_value.toLocaleString('en-US', {
                              maximumFractionDigits: 2
                            })}{' '}
                            <FontAwesomeIcon icon={faDollar} />{' '}
                          </>
                        )}
                        <br />
                      </div>{' '}
                    </Col>
                    <Col>
                      {' '}
                      <OverlayTrigger
                        placement='right'
                        overlay={mySharePopover}
                      >
                        <a>
                          <FontAwesomeIcon
                            icon={faCircleInfo}
                            className='text-muted'
                          />
                        </a>
                      </OverlayTrigger>{' '}
                      Share : {rest} %
                    </Col>
                  </Row>
                  {stakingPosition.stake_amount < 1 ? (
                    <Row>
                      <div>
                        {tokenPosition.paused > 0 || isPaused == 'true' ? (
                          <>
                            <button className='butLine'>
                              <OverlayTrigger
                                placement='right'
                                overlay={pausedPopover}
                              >
                                <a>
                                  <FontAwesomeIcon
                                    icon={faCircleInfo}
                                    className='text-muted'
                                  />
                                </a>
                              </OverlayTrigger>{' '}
                              PAUSED
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className='butLine goldButton'
                              onClick={() => setShowStake(true)}
                            >
                              STAKE
                            </button>{' '}
                          </>
                        )}
                      </div>
                    </Row>
                  ) : (
                    <></>
                  )}
                  {stakingPosition.stake_amount > 0 ? (
                    <div className='col'>
                      {tokenPosition.paused > 0 || isPaused == 'true' ? (
                        <>
                          <button className='butLine'>
                            <OverlayTrigger
                              placement='right'
                              overlay={pausedPopover}
                            >
                              <a>
                                <FontAwesomeIcon
                                  icon={faCircleInfo}
                                  className='text-muted'
                                />
                              </a>
                            </OverlayTrigger>{' '}
                            PAUSED
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className='butLine goldButton'
                            onClick={() => setShowStake(true)}
                          >
                            STAKE
                          </button>{' '}
                        </>
                      )}
                      <button
                        className='row butLine silverButton'
                        onClick={() => setShowUnstake(true)}
                      >
                        UNSTAKE
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                  {stakingPositionRewards > 0 ? (
                    <div>
                      <ActionClaimRewards
                        stakedToken={stakedToken}
                        rewardedToken={rewardedToken}
                        rewardsAmount={stakingPositionRewards}
                      />{' '}
                      {stakedToken == rewardedToken ? (
                        <ActionStakeRewards
                          stakedToken={stakedToken}
                          rewardedToken={rewardedToken}
                          rewardsAmount={stakingPositionRewards}
                        />
                      ) : (
                        <></>
                      )}
                      <h4>
                        <OverlayTrigger
                          placement='right'
                          overlay={myRewardsPopover}
                        >
                          <a>
                            <FontAwesomeIcon
                              icon={faCircleInfo}
                              className='text-muted'
                            />
                          </a>
                        </OverlayTrigger>{' '}
                        Available rewards : ~
                        <FormatAmount
                          value={stakingPositionRewards.toString()}
                          decimals={Number(rdecimals)}
                          egldLabel={' '}
                          data-testid='balance'
                          digits={6}
                        />
                      </h4>{' '}
                      {rewarded_esdt_info?.price && (
                        <>
                          ~
                          {my_rewards_value.toLocaleString('en-US', {
                            maximumFractionDigits: 6
                          })}{' '}
                          <FontAwesomeIcon icon={faDollar} />
                        </>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
