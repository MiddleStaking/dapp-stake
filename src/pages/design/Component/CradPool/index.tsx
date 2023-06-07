import React, {
  CSSProperties,
  FC,
  JSXElementConstructor,
  ReactElement
} from 'react';
import MyStakeSection from './component/MyStakeSection';
import RewardsSection from './component/RewardsSection';
import TypeSection from './component/TypeSection';

interface CardPoolrops {
  height: string;
  WindowDimensions: number;
  backgroundRewards?: string;
  image1: string;
  image2: string;
  width?: string;
  background?: string | [string, string];
  gradientDirection?: string;
  borderRadius?: string;
  EarnTitle: string;
  StakeTile: string;
  Apr: string;
  Rewards?: string;
  Rewards_value?: number;
  Speed?: string;
  Staked?: string;
  Staked_value?: number;
  Users?: string;
  decimals?: number;
  textColor?: string;
  fontFamily?: string;
  address: any;
  stakedToken: any;
  stakingPosition: any;
  staked_esdt_info: any;
  my_staked_value: any;
  rest: any;
  setShowStake: (show: boolean) => void;
  setShowUnstake: (show: boolean) => void;
  socialNetwork?: [
    {
      icon: ReactElement<any, string | JSXElementConstructor<any>>;
      url: string;
    }
  ];
  rdecimals: any;
  stakingPositionRewards: any;
  rewarded_esdt_info: any;
  my_rewards_value: any;
  rewardedToken: any;
}

const CradPool: FC<CardPoolrops> = ({
  height,
  width = '100%',
  background = 'linear-gradient(0deg, rgba(99, 74, 203, 0.32), rgba(99, 74, 203, 0.32)),linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)',
  gradientDirection = 'to right',
  borderRadius = '8px 8px 0px 0px',
  image1,
  image2,
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
  decimals = 0,
  textColor = '#ffffff',
  fontFamily = 'Plus Jakarta Sans',
  address,
  stakedToken,
  setShowStake,
  setShowUnstake,
  stakingPosition,
  staked_esdt_info,
  my_staked_value,
  stakingPositionRewards,
  rdecimals,
  rewarded_esdt_info,
  my_rewards_value,
  rewardedToken,
  rest,
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

  return (
    <div
      style={{
        width: WindowDimensions > 450 ? '288px' : '312px'
      }}
    >
      <div style={cardType}>
        <TypeSection
          borderRadius={borderRadius}
          gradientDirection={gradientDirection}
          background={background}
          height={height}
          WindowDimensions={WindowDimensions}
          width={width}
          image1={image1}
          image2={image2}
          StakeTile={StakeTile}
          EarnTitle={EarnTitle}
          Apr={Apr}
          decimals={decimals}
          Rewards={Rewards}
          Rewards_value={Rewards_value}
          Speed={Speed}
          Staked={Staked}
          Staked_value={Staked_value}
          Users={Users}
          socialNetwork={socialNetwork}
          textColor={textColor}
          fontFamily={fontFamily}
        />
        <MyStakeSection
          address={address}
          stakedToken={stakedToken}
          stakingPosition={stakingPosition}
          rest={rest}
          staked_esdt_info={staked_esdt_info}
          my_staked_value={my_staked_value}
          setShowStake={setShowStake}
          setShowUnstake={setShowUnstake}
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
      </div>
    </div>
  );
};

export default CradPool;
