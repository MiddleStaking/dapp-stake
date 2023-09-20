import React, {
  CSSProperties,
  FC,
  JSXElementConstructor,
  ReactElement,
  useState
} from 'react';
import MyStakeSection from './component/MyStakeSection';
import RewardsSection from './component/RewardsSection';
import TypeSection from './component/TypeSection';
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetPendingTransactions
} from '@multiversx/sdk-dapp/hooks';
import { defaultToken } from 'config';
import {
  useGetESDTCompute,
  useGetESDTInformations,
  useGetStakingPosition,
  useGetStakingPositionRewards
} from '../Actions/helpers';
import notFound from './../../../../assets/img/notfoundc.svg';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';
import { network } from 'config';
import { BigNumber } from 'bignumber.js';

interface CardPoolrops {
  staked_token?: any;
  rewarded_token: string;
  token_position: {
    balance: BigNumber;
    total_stake: BigNumber;
    blocks_to_max: BigNumber;
  };
  all_staking_position: any;
  all_user_rewards: any;
  staking_position?: {
    stake_amount: BigNumber;
    last_action_block: BigNumber;
  };
  users: number;
  height: string;
  WindowDimensions: number;
  backgroundRewards?: string;
  image1?: string;
  image2?: string;
  width?: string;
  background?: string | [string, string];
  gradientDirection?: string;
  borderRadius?: string;
  EarnTitle?: string;
  StakeTile?: string;
  Apr?: string;
  rewards_amount?: string;
  rewards_value?: number;
  Speed?: string;
  Staked?: string;
  Staked_value?: number;
  decimals?: number;
  textColor?: string;
  fontFamily?: string;
  address?: any;
  staked_esdt_info?: any;
  my_staked_value?: any;
  rest?: any;
  setShowStake?: (show: boolean) => void;
  setShowUnstake?: (show: boolean) => void;
  socialNetwork?: [
    {
      icon: ReactElement<any, string | JSXElementConstructor<any>>;
      url: string;
    }
  ];
  rdecimals?: any;
  stakingPositionRewards?: any;
  rewarded_esdt_info?: any;
  my_rewards_value?: any;
  myPools?: any;
  balance?: any;
  canBeStaked?: any;
  isPaused?: any;
  tokens_extra_informations?: any;
  userEsdtBalance?: any;
  swapedTokens?: any;
}

const CardPool: FC<CardPoolrops> = ({
  staked_esdt_info,
  rewarded_token,
  token_position,
  all_staking_position,
  all_user_rewards,
  users,
  height,
  width = '100%',
  background = 'linear-gradient(0deg, rgba(99, 74, 203, 0.32), rgba(99, 74, 203, 0.32)),linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)',
  gradientDirection = 'to right',
  borderRadius = '8px 8px 0px 0px',
  //   image1,
  //   image2,
  WindowDimensions,
  EarnTitle,
  StakeTile,
  Apr,
  rewards_amount,
  rewards_value,
  Speed,
  Staked,
  Staked_value,
  socialNetwork,
  myPools,
  canBeStaked,
  decimals = 0,
  textColor = '#ffffff',
  fontFamily = 'sans-serif',
  //   address,
  staked_token,
  tokens_extra_informations,
  swapedTokens,
  userEsdtBalance,
  balance,
  backgroundRewards = 'var(--linear-primary-light, linear-gradient(156.86deg, rgba(189, 55, 236, 0.26) 0%, rgba(31, 103, 255, 0.00) 100%), linear-gradient(to left, rgba(99, 74, 203, 0.32), rgba(99, 74, 203, 0.32)))'
}) => {
  const cardType: CSSProperties = {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    position: 'relative'
  };

  // const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();
  const [showStake, setShowStake] = useState(false);
  const [showUnstake, setShowUnstake] = useState(false);
  const { hasPendingTransactions } = useGetPendingTransactions();

  let isDual = false;
  if (staked_token != defaultToken && rewarded_token != defaultToken) {
    isDual = true;
  }

  // const firstPoolPosition = useGetPoolPosition(
  //   defaultToken,
  //   rewardedToken == defaultToken ? stakedToken : rewardedToken,
  //   showStake,
  //   hasPendingTransactions,
  //   true
  // );
  // const secondPoolPosition = useGetPoolPosition(
  //   defaultToken,
  //   stakedToken,
  //   showStake,
  //   hasPendingTransactions,
  //   isDual
  // );

  const stakedCompute = useGetESDTCompute(staked_token);

  const rewarded_esdt_info = useGetESDTInformations(rewarded_token);

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

  //const tokenPosition = useGetTokenPosition(stakedToken, rewardedToken);
  let staking_position = {
    stake_amount: BigNumber(0),
    last_action_block: BigNumber(1)
  };

  if (all_staking_position) {
    const foundPosition = all_staking_position.find((position: any) => {
      return position.rewarded_token === rewarded_token;
    });
    if (foundPosition) {
      staking_position = foundPosition.staking_position;
    }
  }
  let rewards_position = BigNumber(0);

  if (all_user_rewards) {
    const foundPosition = all_user_rewards.find((position: any) => {
      return position.rewarded_token === rewarded_token;
    });
    if (foundPosition) {
      console.log(foundPosition);
      rewards_position = foundPosition.rewards;
    }
  }

  // const stakingPosition = useGetStakingPosition(
  //   staked_token,
  //   rewarded_token,
  //   hasPendingTransactions
  // );
  // console.log(stakingPosition);

  //Information de staking pour l'utilisateur à condenser
  // const stakingPosition = useGetStakingPosition(
  //   stakedToken,
  //   rewarded_token,
  //   hasPendingTransactions
  // );
  //Information de rewards pour l'utilisateur à condenser
  // const stakingPositionRewards = useGetStakingPositionRewards(
  //   staked_token,
  //   rewarded_token,
  //   staking_position.stake_amount
  //     ? BigInt(staking_position.stake_amount.toFixed())
  //     : BigInt(0),
  //   hasPendingTransactions
  // );

  const speed =
    (BigInt(token_position?.blocks_to_max.toFixed()) * BigInt(6)) /
    BigInt(24) /
    BigInt(60) /
    BigInt(60);
  const staked_value =
    stakedCompute?.price > 0
      ? Number(BigInt(token_position.total_stake.toFixed())) *
        stakedCompute?.price
      : staked_esdt_info?.price > 0
      ? Number(
          BigInt(token_position.total_stake.toFixed()) / BigInt(10 ** sdecimals)
        ) * staked_esdt_info?.price
      : 0;

  const my_staked_value =
    stakedCompute?.price > 0
      ? Number(BigInt(staking_position.stake_amount.toFixed())) *
        stakedCompute?.price
      : staked_esdt_info?.price > 0
      ? Number(
          BigInt(staking_position.stake_amount.toFixed()) /
            BigInt(10 ** sdecimals)
        ) * staked_esdt_info?.price
      : 0;

  //Montant user
  const my_rewards_value = rewarded_esdt_info?.price
    ? Number(
        (BigInt(rewards_position.toFixed()) *
          BigInt((rewarded_esdt_info.price * 10000000).toFixed())) /
          BigInt(10 ** rdecimals)
      ) / 10000000
    : 0;

  const rewarded_value =
    rewarded_esdt_info?.price && token_position.balance
      ? Number(
          BigInt(token_position.balance.toFixed()) / BigInt(10 ** sdecimals)
        ) * rewarded_esdt_info?.price
      : 0;

  // (valeur finale - valeur initial) / valeur initiale * 100
  // rewards Value / initial value * 100 * 365 / speed
  let priced_apr = BigInt(0);
  let n_apr = 0;
  const fixed_speed = speed > 0 ? Number(speed) : 1;
  const vi = Number(
    BigInt(token_position.total_stake.toFixed()) / BigInt(10 ** sdecimals)
  );
  const rw = Number(
    BigInt(token_position.balance.toFixed()) / BigInt(10 ** sdecimals)
  );
  if (staked_token == rewarded_token) {
    n_apr = ((rw / vi) * 100 * 365) / fixed_speed;
  } else if (
    (staked_esdt_info?.price > 0 || stakedCompute?.price > 0) &&
    rewarded_esdt_info?.price > 0 &&
    BigInt(token_position.total_stake.toFixed()) > BigInt(1) &&
    token_position.balance > BigNumber(0)
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
      price_fixed1 > 0 && BigInt(token_position.total_stake.toFixed())
        ? price_fixed1 * BigInt(token_position.total_stake.toFixed())
        : 1
    );
    const rewards_value = BigInt(
      price_fixed2 > 0 && BigInt(token_position.balance.toFixed())
        ? price_fixed2 * BigInt(token_position.balance.toFixed())
        : 1
    );
    priced_apr = BigInt(
      (
        ((Number(rewards_value) / Number(initial_value)) * 100 * 365) /
        Number(speed)
      ).toFixed()
    );
  }

  // if (
  //   Number(priced_apr) == 0 &&
  //   firstPoolPosition.first_token_amount > 1 &&
  //   !isDual
  // ) {
  //   //fake mid price
  //   const first_pooled_price = BigInt(10000000000000);
  //   //second token value
  //   const second_pooled_price = BigInt(
  //     (BigInt(firstPoolPosition.first_token_amount) * BigInt(10000000000000)) /
  //       BigInt(firstPoolPosition.second_token_amount)
  //   );

  //   let pooled_initial_value = BigInt(
  //     first_pooled_price > 0 && BigInt(token_position.total_stake)
  //       ? first_pooled_price * BigInt(token_position.total_stake)
  //       : 1
  //   );

  //   // let pooled_reward_value = BigInt(
  //   //   second_pooled_price > 0 && BigInt(token_position.balance)
  //   //     ? second_pooled_price * BigInt(token_position.balance)
  //   //     : 1
  //   // );
  //   let pooled_reward_value = BigInt(0);

  //   //Si mid en second on inverse
  //   if (rewardedToken == defaultToken) {
  //     pooled_initial_value = BigInt(
  //       first_pooled_price > 0 && BigInt(token_position.balance)
  //         ? first_pooled_price * BigInt(token_position.balance)
  //         : 1
  //     );
  //     pooled_reward_value = BigInt(
  //       second_pooled_price > 0 && BigInt(token_position.total_stake)
  //         ? second_pooled_price * BigInt(token_position.total_stake)
  //         : 1
  //     );
  //   }

  //   priced_apr = BigInt(
  //     (
  //       ((Number(pooled_reward_value) / Number(pooled_initial_value)) *
  //         100 *
  //         365) /
  //       Number(speed)
  //     ).toFixed()
  //   );

  //   // priced_apr = tokenPosition.paused
  //   //   ? BigInt(0)
  //   //   : BigInt(
  //   //       (
  //   //         ((Number(pooled_reward_value) / Number(pooled_initial_value)) *
  //   //           100 *
  //   //           365) /
  //   //         Number(speed ? speed : 1)
  //   //       ).toFixed()
  //   //     );
  // }

  localStorage.setItem(
    'apr_' + staked_token + '_' + rewarded_token,
    priced_apr.toString()
  );

  let share = BigInt(10000);
  if (BigInt(token_position.total_stake.toFixed()) > BigInt(0)) {
    share =
      (BigInt(
        staking_position.stake_amount
          ? staking_position.stake_amount.toFixed()
          : 0
      ) *
        share) /
      BigInt(token_position.total_stake.toFixed());
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

  if (myPools && BigInt(staking_position.stake_amount.toFixed()) == BigInt(0)) {
    opacity = 'card ghost';
  }
  return (
    <div
      style={{
        width: WindowDimensions > 450 ? '300px' : '300px',
        margin: 'auto'
      }}
    >
      <div style={cardType}>
        <TypeSection
          users={users}
          //   image1={image1}
          //   image2={image2}
          //   StakeTile={StakeTile}
          //   EarnTitle={EarnTitle}
          //   Apr={Apr}
          //   decimals={decimals}
          rewards_amount={token_position.balance}
          rewards_value={rewards_value}
          //   Speed={Speed}
          //   Staked={Staked}
          //   Staked_value={Staked_value}
          //   socialNetwork={socialNetwork}
          rewarded_token={rewarded_token}
          staked_token={staked_token}
          pool_apr={n_apr ? n_apr.toFixed(2) : priced_apr}
          rewarded_esdt_info={rewarded_esdt_info}
          staked_esdt_info={staked_esdt_info}
          image1={image1}
          image2={image2}
          token_position={token_position}
          staked_value={staked_value}
          speed={speed}
          tokens_extra_informations={tokens_extra_informations}
          swapedTokens={swapedTokens}
          width={width}
          textColor={textColor}
          fontFamily={fontFamily}
          height={height}
          WindowDimensions={WindowDimensions}
          borderRadius={borderRadius}
          gradientDirection={gradientDirection}
          background={background}
        />
        <MyStakeSection
          address={address}
          swapedTokens={swapedTokens}
          userEsdtBalance={userEsdtBalance}
          staked_token={staked_token}
          rewarded_token={rewarded_token}
          token_position={token_position}
          staking_position={staking_position}
          staked_esdt_info={staked_esdt_info}
          rewarded_esdt_info={rewarded_esdt_info}
          my_staked_value={my_staked_value}
          rest={rest}
          balance={balance}
          image1={image1}
          image2={image2}
          sdecimals={sdecimals}
          rdecimals={rdecimals}
          my_rewards_value={my_rewards_value}
          canBeStaked={canBeStaked}
          isDual={isDual}
          firstPoolPosition={'firstPoolPosition'}
          secondPoolPosition={'secondPoolPosition'}
          balanc={balance}
        />

        {address && (
          <RewardsSection
            backgroundRewards={backgroundRewards}
            stakingPositionRewards={BigInt(rewards_position.toFixed())}
            rdecimals={rdecimals}
            rewarded_esdt_info={rewarded_esdt_info}
            my_rewards_value={my_rewards_value}
            staked_token={staked_token}
            rewarded_token={rewarded_token}
          />
        )}
        {canBeStaked && (
          <>
            {' '}
            <Link
              to={routeNames.stake + `/${rewarded_token}`}
              className='butLine bouton-visiter'
              data-testid='loginBtn'
            >
              Stake {rewarded_token}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default CardPool;
