//NOTE - collone vertébrale 
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
  collectionIdentifier?: any;
  balance?: any;
  canBeStaked?: any;
  isPaused?: any;
  tokens_extra_informations?: any;
  userEsdtBalance?: any;
  swapedTokens?: any;
}

const CardOfCollection: FC<CardPoolrops> = ({
  height,
  width = '100%',
  background = 'linear-gradient(0deg, rgba(99, 74, 203, 0.32), rgba(99, 74, 203, 0.32)),linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)',
  gradientDirection = 'to right',
  borderRadius = '8px 8px 0px 0px',
  WindowDimensions,
  textColor = '#ffffff',
  fontFamily = 'sans-serif',
  collectionIdentifier,
  tokens_extra_informations,
  swapedTokens,
  userEsdtBalance,
  balance,
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

  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();
  const [showStake, setShowStake] = useState(false);
  const [showUnstake, setShowUnstake] = useState(false);
  const { hasPendingTransactions } = useGetPendingTransactions();

  const staked_esdt_info = useGetESDTInformations(collectionIdentifier);

  const rewarded_esdt_info = useGetESDTInformations(rewardedToken);

  return (
    <div
      style={{
        width: WindowDimensions > 450 ? '300px' : '300px'
      }}
    >
      <div style={cardType}>
        {collectionIdentifier}
        {/* <TypeSection
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
        /> */}
        {/* <MyStakeSection
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
        /> */}

        {/* {address && (
          <RewardsSection
            backgroundRewards={backgroundRewards}
            stakingPositionRewards={stakingPositionRewards}
            rdecimals={rdecimals}
            rewarded_esdt_info={rewarded_esdt_info}
            my_rewards_value={my_rewards_value}
            stakedToken={stakedToken}
            rewardedToken={rewardedToken}
          />
        )} */}
      </div>
    </div>
  );
};

// .search-bar {
//   background: var(--neutral-black, #000000);
//   border-radius: 100px;
//   border-style: solid;
//     border-color: var(--neutral-light, #695885);
//     border-width: 1px;
//     padding: 16px 16px 16px 16px;
//     display: flex;
//     flex-direction: row;
//     gap: 10px;
//     align-items: center;
//     justify-content: flex-start;
//     flex-shrink: 0;
//     width: 260px;
//     position: relative;
//   height: 40px;
//   }

export default CardOfCollection;
