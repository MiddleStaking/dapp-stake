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
  useGetPoolPosition,
  useGetStakingPosition,
  useGetStakingPositionRewards,
  useGetTokenPosition
} from '../Actions/helpers';
import notFound from './../../../../assets/img/notfoundc.svg';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';
import { network } from 'config';

interface CardPoolrops {
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
  Rewards?: string;
  Rewards_value?: number;
  Speed?: string;
  Staked?: string;
  Staked_value?: number;
  Users?: string;
  decimals?: number;
  textColor?: string;
  fontFamily?: string;
  address?: any;
  stakingPosition?: any;
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
  rewardedToken?: any;
  myPools?: any;
  stakedToken?: any;
  balance?: any;
  canBeStaked?: any;
  isPaused?: any;
  tokens_extra_informations?: any;
  userEsdtBalance?: any;
  swapedTokens?: any;
}

const CardPool: FC<CardPoolrops> = ({
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
  Rewards,
  Rewards_value,
  Speed,
  Staked,
  Staked_value,
  Users,
  socialNetwork,
  myPools,
  canBeStaked,
  decimals = 0,
  textColor = '#ffffff',
  fontFamily = 'sans-serif',
  //   address,
  stakedToken,
  tokens_extra_informations,
  swapedTokens,
  userEsdtBalance,
  balance,
  //   setShowStake,
  //   setShowUnstake,
  //   stakingPosition,
  //   staked_esdt_info,
  //   my_staked_value,
  //   stakingPositionRewards,
  //   rdecimals,
  //   rewarded_esdt_info,
  //   my_rewards_value,
  rewardedToken,
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

    let pooled_reward_value = BigInt(
      second_pooled_price > 0 && BigInt(tokenPosition.balance)
        ? second_pooled_price * BigInt(tokenPosition.balance)
        : 1
    );

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
    <div
      style={{
        width: WindowDimensions > 450 ? '300px' : '300px',
        margin: 'auto'
      }}
    >
      <div style={cardType}>
        <TypeSection
          //   image1={image1}
          //   image2={image2}
          //   StakeTile={StakeTile}
          //   EarnTitle={EarnTitle}
          //   Apr={Apr}
          //   decimals={decimals}
          //   Rewards={Rewards}
          //   Rewards_value={Rewards_value}
          //   Speed={Speed}
          //   Staked={Staked}
          //   Staked_value={Staked_value}
          //   Users={Users}
          //   socialNetwork={socialNetwork}
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
          balanc={balance}
        />

        {address && (
          <RewardsSection
            backgroundRewards={backgroundRewards}
            stakingPositionRewards={stakingPositionRewards}
            rdecimals={rdecimals}
            rewarded_esdt_info={rewarded_esdt_info}
            my_rewards_value={my_rewards_value}
            stakedToken={stakedToken}
            rewardedToken={rewardedToken}
          />
        )}
        {canBeStaked && (
          <>
            {' '}
            <Link
              to={routeNames.stake + `/${rewardedToken}`}
              className='butLine bouton-visiter'
              data-testid='loginBtn'
            >
              Stake {rewardedToken}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default CardPool;
