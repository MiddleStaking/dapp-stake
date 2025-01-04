import React, { CSSProperties, FC } from 'react';
import { FormatAmount } from '@multiversx/sdk-dapp/UI';
import { useWindowDimensions } from 'components/DimensionScreen';
import {
  ActionClaimRewards,
  ActionStakeRewards
} from 'pages/Earn/components/Actions';
import illustrationSvg from '../../../../../assets/img/Illustration.svg';
import ProgressBar from '../../progressBar';
import { BigNumber } from 'bignumber.js';

interface RewardsSectionProps {
  rdecimals: any;
  stakingPositionRewards: bigint;
  rewarded_esdt_info: any;
  my_rewards_value: any;
  staked_token: any;
  rewarded_token: any;
  backgroundRewards: string;
  currentBlockNonce: any;
  staking_position: any;
  token_position: any;
}

const RewardsSection: FC<RewardsSectionProps> = ({
  stakingPositionRewards,
  rdecimals,
  rewarded_esdt_info,
  my_rewards_value,
  staked_token,
  rewarded_token,
  backgroundRewards,
  currentBlockNonce,
  staking_position,
  token_position
}) => {
  // const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const rewardsSection: CSSProperties = {
    background: backgroundRewards,
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderImage: 'transparent',
    borderImageSlice: 1,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    flexShrink: 0,
    position: 'relative',
    marginTop: '8px'
  };

  const top5: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    flexShrink: 0,
    position: 'relative'
  };
  const availabledRewards: CSSProperties = {
    color: 'var(--neutral-white, #ffffff)',
    textAlign: 'left',
    fontSize: '300',
    fontFamily: 'Plus Jakarta Sans',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  };

  const illustration: CSSProperties = {
    flexShrink: 0,
    width: '123px',
    height: ' 105px',
    position: 'absolute',
    left: width > 450 ? '190px' : '185px',
    top: '-12px'
  };

  const elaspesed_blocks =
    currentBlockNonce - staking_position.last_action_block;
  const blocks_left = token_position.blocks_to_max - elaspesed_blocks;

  return (
    <>
      {stakingPositionRewards > BigInt(0) && (
        <div style={rewardsSection}>
          <div style={top5}>
            <div style={availabledRewards}>Available rewards</div>
            <div style={{ width: '18Opx' }}>
              <ProgressBar
                value={new BigNumber(elaspesed_blocks)}
                max={new BigNumber(token_position.blocks_to_max)}
              />
            </div>
            <div
              style={{
                width: '180px',
                display: 'flex',
                justifyContent: 'space-between', // ajoute de l'espace entre les éléments
                alignItems: 'center', // centre les éléments verticalement
                marginTop: '16px',
                color: 'white',
                margin: 0
              }}
            >
              <div>
                <FormatAmount
                  value={stakingPositionRewards.toString()}
                  decimals={Number(rdecimals)}
                  egldLabel={' '}
                  data-testid='balance'
                  digits={2}
                />
              </div>
              {rewarded_esdt_info?.price && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center', // ajoute de l'espace entre les éléments
                    alignItems: 'center',
                    border: '1px solid #695885',
                    borderRadius: '40px',
                    width: '61px',
                    height: '21px'
                  }}
                >
                  <div
                    style={{
                      fontSize: '12px'
                    }}
                  >
                    ${' '}
                    {my_rewards_value.toLocaleString('en-US', {
                      maximumFractionDigits: 2
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div style={illustration}>
            <img src={illustrationSvg} />
          </div>
          <ActionClaimRewards
            staked_token={staked_token}
            rewarded_token={rewarded_token}
            rewardsAmount={stakingPositionRewards}
          />{' '}
          {staked_token == rewarded_token && (
            <ActionStakeRewards
              staked_token={staked_token}
              rewardsAmount={stakingPositionRewards}
            />
          )}
        </div>
      )}
    </>
  );
};

export default RewardsSection;
