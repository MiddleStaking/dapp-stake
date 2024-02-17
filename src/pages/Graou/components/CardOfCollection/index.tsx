import React, {
  CSSProperties,
  FC,
  JSXElementConstructor,
  ReactElement
} from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { useGetCollectionInformations } from '../Actions/helpers';
import TypeSection from './component/TypeSection';

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
  collection?: any;
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
  collection
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

  return (
    <div style={cardType}>
      <TypeSection
        collection={collection}
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
    </div>
  );
};

export default CardOfCollection;
