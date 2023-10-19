import React, {
  CSSProperties,
  FC,
  JSXElementConstructor,
  ReactElement
} from 'react';
import TypeSection from './component/TypeSection';
import {
  useGetAccountInfo
  // useGetNetworkConfig
} from '@multiversx/sdk-dapp/hooks';
import { defaultToken } from 'config';
import { useGetCollectionInformations } from '../Actions/helpers';
import notFound from './../../../../assets/img/notfoundc.svg';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';
import ReactPlayer from 'react-player';
import HexagoneNFT from '../hexagoneNFT';

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
  borderRadius = '8px 8px 8px 8px',
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
    // height: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    position: 'relative'
    // backgroundColor: '#FFFFFF'
  };

  // const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const collectionInfo = useGetCollectionInformations(collectionIdentifier);

  // const rewarded_esdt_info = useGetESDTInformations(rewardedToken);
  // console.log(collectionInfo);

  return (
    <div style={cardType}>
      {/* ---- THE CARD ---- */}
      {/* => topCardPool */}
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
        collectionIdentifier={collectionIdentifier}
        collectionInfo={collectionInfo}
        width={width}
        textColor={textColor}
        fontFamily={fontFamily}
        height={height}
        WindowDimensions={WindowDimensions}
        borderRadius={borderRadius}
        gradientDirection={gradientDirection}
        background={background}
        address={address}
      />
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
  );
};

export default CardOfCollection;
