import * as React from 'react';
import { useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import Popover from 'react-bootstrap/Popover';
import notFound from './../../../assets/img/notfoundc.svg';
import { useGetESDTInformations, useGetESDTCompute } from './Actions/helpers';
import {
  useGetTokenPosition,
  useGetStakingPosition,
  useGetStakingPositionRewards
} from './Actions/helpers';
import { PoolTopInfo } from './PoolInfo/PoolTopInfo';
import { PoolStakeInfo } from './PoolInfo/PoolStakeInfo';
import { defaultToken } from 'config';
import { useGetPoolPosition } from './Actions/helpers';

export const PoolInfo = ({
  myPools,
  stakedToken,
  rewardedToken,
  balance,
  canBeStaked,
  isPaused,
  tokens_extra_informations,
  userEsdtBalance,
  swapedTokens
}: any) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();
  const [showStake, setShowStake] = useState(false);
  const [showUnstake, setShowUnstake] = useState(false);
  const { hasPendingTransactions } = useGetPendingTransactions();

  let isDual = false;
  if (stakedToken != defaultToken && rewardedToken != defaultToken) {
    isDual = true;
  }

  const firstPoolPosition = useGetPoolPosition(
    defaultToken,
    rewardedToken == defaultToken ? stakedToken : rewardedToken,
    showStake,
    hasPendingTransactions,
    true
  );
  const secondPoolPosition = useGetPoolPosition(
    defaultToken,
    stakedToken,
    showStake,
    hasPendingTransactions,
    isDual
  );

  const staked_esdt_info = useGetESDTInformations(stakedToken);
  const stakedCompute = useGetESDTCompute(stakedToken);

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

  const speed =
    (BigInt(tokenPosition.blocks_to_max) * BigInt(6)) /
    BigInt(24) /
    BigInt(60) /
    BigInt(60);
  const staked_value =
    stakedCompute?.price > 0
      ? Number(BigInt(tokenPosition.total_stake)) * stakedCompute?.price
      : staked_esdt_info?.price > 0
      ? Number(BigInt(tokenPosition.total_stake) / BigInt(10 ** sdecimals)) *
        staked_esdt_info?.price
      : 0;

  const my_staked_value =
    stakedCompute?.price > 0
      ? Number(BigInt(stakingPosition.stake_amount)) * stakedCompute?.price
      : staked_esdt_info?.price > 0
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

  // (valeur finale - valeur initial) / valeur initiale * 100
  let priced_apr = BigInt(0);
  if (
    (staked_esdt_info?.price > 0 || stakedCompute?.price > 0) &&
    rewarded_esdt_info?.price > 0 &&
    tokenPosition?.total_stake > BigInt(1) &&
    tokenPosition?.balance > BigInt(0)
  ) {
    const price_fixed1 = BigInt(
      stakedCompute?.price > 0
        ? BigInt((stakedCompute?.price * 10 ** 18).toFixed()) *
            BigInt(10 ** sdecimals)
        : staked_esdt_info?.price > 0
        ? (staked_esdt_info?.price * 10 ** 18).toFixed()
        : 1
    );
    const price_fixed2 = BigInt(
      rewarded_esdt_info.price > 0
        ? (rewarded_esdt_info.price * 10 ** 18).toFixed()
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

    priced_apr = BigInt(
      (
        ((Number(reward_value) / Number(initial_value)) * 100 * 365) /
        Number(speed)
      ).toFixed()
    );
  } else if (stakedToken == rewardedToken) {
    const fixed_speed = speed > 0 ? speed : BigInt(1);
    priced_apr =
      (((BigInt(tokenPosition.balance > 0 ? tokenPosition.balance : 1) *
        BigInt(10 ** sdecimals) *
        BigInt(100)) /
        (BigInt(tokenPosition.total_stake > 0 ? tokenPosition.total_stake : 1) *
          BigInt(10 ** rdecimals))) *
        BigInt(365)) /
      fixed_speed;
  }
  if (
    Number(priced_apr) == 0 &&
    firstPoolPosition.first_token_amount > 1 &&
    !isDual
  ) {
    console.log('CALC ' + rewardedToken);

    //fake mid price
    const first_pooled_price = BigInt(10000000000000);
    //second token value
    const second_pooled_price = BigInt(
      (BigInt(firstPoolPosition.first_token_amount) * BigInt(10000000000000)) /
        BigInt(firstPoolPosition.second_token_amount)
    );

    let pooled_initial_value = BigInt(
      first_pooled_price > 0 && BigInt(tokenPosition.total_stake)
        ? first_pooled_price * BigInt(tokenPosition.total_stake)
        : 1
    );
    console.log(pooled_initial_value);

    let pooled_reward_value = BigInt(
      second_pooled_price > 0 && BigInt(tokenPosition.balance)
        ? second_pooled_price * BigInt(tokenPosition.balance)
        : 1
    );
    console.log(pooled_reward_value);

    //Si mid en second on inverse
    if (rewardedToken == defaultToken) {
      pooled_initial_value = BigInt(
        first_pooled_price > 0 && BigInt(tokenPosition.balance)
          ? first_pooled_price * BigInt(tokenPosition.balance)
          : 1
      );
      pooled_reward_value = BigInt(
        second_pooled_price > 0 && BigInt(tokenPosition.total_stake)
          ? second_pooled_price * BigInt(tokenPosition.total_stake)
          : 1
      );
    }

    priced_apr = BigInt(
      (
        ((Number(pooled_reward_value) / Number(pooled_initial_value)) *
          100 *
          365) /
        Number(speed)
      ).toFixed()
    );

    // priced_apr = tokenPosition.paused
    //   ? BigInt(0)
    //   : BigInt(
    //       (
    //         ((Number(pooled_reward_value) / Number(pooled_initial_value)) *
    //           100 *
    //           365) /
    //         Number(speed ? speed : 1)
    //       ).toFixed()
    //     );
    console.log(pooled_reward_value);
    console.log(pooled_initial_value);
  }

  localStorage.setItem(
    'apr_' + stakedToken + '_' + rewardedToken,
    priced_apr.toString()
  );

  let share = BigInt(10000);
  if (tokenPosition.total_stake > BigInt(0)) {
    share =
      (BigInt(stakingPosition.stake_amount) * share) /
      BigInt(tokenPosition.total_stake);
  }
  const rest = Number(share) / Number(100);

  // Pas bon j'ai besoin de connaitre le block courant pour connaitre la prgression
  // let rewardsLoading = BigInt(0);
  // if (stakingPosition.last_action_block > BigInt(0)) {
  //   rewardsLoading = BigInt(
  //     (BigInt(stakingPosition.last_action_block) /
  //       BigInt(tokenPosition.blocks_to_max)) *
  //       BigInt(100)
  //   );
  // }
  let opacity = '';

  if (myPools && stakingPosition.stake_amount == BigInt(0)) {
    opacity = 'card ghost';
  }

  return (
    <>
      <div className={'card-type center' + opacity}>
        <PoolTopInfo
          rewardedToken={rewardedToken}
          stakedToken={stakedToken}
          pool_apr={priced_apr}
          rewarded_esdt_info={rewarded_esdt_info}
          staked_esdt_info={staked_esdt_info}
          image1={image1}
          image2={image2}
          tokenPosition={tokenPosition}
          rewarded_value={rewarded_value}
          staked_value={staked_value}
          speed={speed}
          tokens_extra_informations={tokens_extra_informations}
          swapedTokens={swapedTokens}
        />

        <PoolStakeInfo
          address={address}
          swapedTokens={swapedTokens}
          userEsdtBalance={userEsdtBalance}
          stakedToken={stakedToken}
          rewardedToken={rewardedToken}
          tokenPosition={tokenPosition}
          stakingPosition={stakingPosition}
          staked_esdt_info={staked_esdt_info}
          rewarded_esdt_info={rewarded_esdt_info}
          my_staked_value={my_staked_value}
          rest={rest}
          balance={balance}
          image1={image1}
          image2={image2}
          sdecimals={sdecimals}
          rdecimals={rdecimals}
          stakingPositionRewards={stakingPositionRewards}
          my_rewards_value={my_rewards_value}
          canBeStaked={canBeStaked}
          isDual={isDual}
          firstPoolPosition={firstPoolPosition}
          secondPoolPosition={secondPoolPosition}
        />
      </div>
      {/* 
      <div className={opacity}>
        <div className='text-black PoolCard' data-testid='poolInfo'>
          <div className='poolTop'></div>
        </div>
      </div> */}
    </>
  );
};