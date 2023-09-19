import React, {
  CSSProperties,
  FC,
  JSXElementConstructor,
  ReactElement
} from 'react';
import SwowHideDetails from './SwowHideDetails';
// import { IconFacebook } from "module";
import { BigNumber } from 'bignumber.js';

interface TypeSectionProps {
  height: string;
  width?: string;
  background?: string | [string, string];
  gradientDirection?: string;
  borderRadius?: string;
  WindowDimensions: number;

  swapedTokens: any;
  stakedToken: any;
  rewarded_token: any;
  pool_apr: any;
  rewarded_esdt_info: any;
  staked_esdt_info: any;
  image1: any;
  image2: any;
  token_position: any;
  staked_value: any;
  speed: any;
  tokens_extra_informations: any;

  EarnTitle?: string;
  StakeTile?: string;
  Apr?: string;
  rewards_amount?: BigNumber;
  rewards_value?: number;
  Speed?: string;
  Staked?: string;
  users?: number;
  decimals?: number;
  textColor?: string;
  fontFamily?: string;
  socialNetwork?: [
    {
      icon: ReactElement<any, string | JSXElementConstructor<any>>;
      url: string;
    }
  ];
}

// heightComponentTypeSection
const TypeSection: FC<TypeSectionProps> = ({
  height,
  width = '100%',
  background = 'linear-gradient(0deg, rgba(99, 74, 203, 0.32), rgba(99, 74, 203, 0.32)),linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)',
  gradientDirection = 'to right',
  borderRadius = '8px 8px 0px 0px',
  image1,
  image2,
  WindowDimensions,
  EarnTitle,
  rewarded_token,
  stakedToken,
  token_position,
  pool_apr,
  speed,
  StakeTile,
  Apr,
  rewards_amount = BigNumber('0'),
  rewards_value = 0,
  rewarded_esdt_info,
  tokens_extra_informations,
  Speed,
  Staked,
  staked_value,
  users,
  socialNetwork,
  decimals = 0,
  textColor = '#ffffff',
  fontFamily = 'sans-serif'
}) => {
  const isGradient = (
    value: string | [string, string]
  ): value is [string, string] => {
    return Array.isArray(value);
  };
  const [showDetails, setShowDetails] = React.useState(false);
  const handleChange = () => {
    setShowDetails(!showDetails);
  };

  // WindowDimensions > 450 ? dekstop : mobile
  const TypeSectionStyle: CSSProperties = {
    minHeight: height,
    width: width,
    background: isGradient(background)
      ? `linear-gradient(${gradientDirection}, ${background[0]}, ${background[1]})`
      : background,
    borderRadius: borderRadius,
    borderWidth: '1px',
    // borderStyle: 'solid',
    borderStyle: '',
    borderImage:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.00) 100%) 1',
    padding: WindowDimensions > 450 ? '24px 24px 12px 24px' : '16px 16px 10px',
    display: 'flex',
    flexDirection: 'column',
    gap: WindowDimensions > 450 ? '18px' : '14px',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    flexShrink: 0,
    position: 'relative',
    overflow: 'hidden'
    // marginTop: '15px'
  };

  const top: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexShrink: 0,
    position: 'relative'
  };

  const left: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexShrink: 0,
    position: 'relative'
  };

  const title: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    alignItems: 'flex-start',
    justifyContent: 'flex-star',
    flexShrink: 0,
    position: 'relative'
  };

  const earnMex: CSSProperties = {
    color: textColor,
    textAlign: 'left',
    fontFamily: fontFamily,
    fontWeight: 700,
    fontSize: WindowDimensions > 450 ? '22px' : '14px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  };

  const stakeMex: CSSProperties = {
    color: textColor,
    textAlign: 'left',
    fontFamily: fontFamily,
    fontWeight: 300,
    fontSize: '12px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  };

  const apr: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexShrink: 0,
    position: 'relative'
  };

  const apr2: CSSProperties = {
    color: textColor,
    textAlign: 'left',
    fontFamily: fontFamily,
    fontWeight: 400,
    fontSize: '11px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  };

  const rate: CSSProperties = {
    background:
      'linear-gradient(-90deg, rgba(92, 76, 241, 1.00) 0%, rgba(150, 64, 203, 1.00) 100%)',
    borderRadius: '30px',
    padding: '4px 8px',
    display: 'flex',
    flexDirection: 'row',
    gap: '2px',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    position: 'relative'
  };

  const rateApr: CSSProperties = {
    color: textColor,
    textAlign: 'center',
    fontFamily: fontFamily,
    fontWeight: 500,
    fontSize: '12px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const logos: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: '0px',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexShrink: 0,
    position: 'relative'
  };

  const image_2: CSSProperties = {
    background: 'none',
    borderRadius: '132.6px',
    display: 'flex',
    flexDirection: 'row',
    gap: '13.26px',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '72px',
    height: '72px',
    position: 'relative'
  };

  const logo2: CSSProperties = {
    flexShrink: 0,
    width: '70px',
    height: '70px',
    position: 'relative'
  };

  const img_2: CSSProperties = {
    width: '70px',
    height: '70px',
    position: 'absolute',
    left: '0px',
    top: '0px'
  };

  const logo1: CSSProperties = {
    background: 'none',
    borderRadius: '44.2px',
    borderStyle: 'solid',
    borderColor: 'var(--neutral-light, #695885)',
    borderWidth: '1px',
    padding: '8.84px',
    display: 'flex',
    flexDirection: 'row',
    gap: '4.42px',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '32px',
    height: '32px',
    position: 'absolute',
    left: '-15.98px',
    top: '52px'
  };

  const image_1: CSSProperties = {
    flexShrink: 0,
    width: '30px',
    height: '30px',
    position: 'relative'
  };

  const img_1: CSSProperties = {
    width: '30px',
    height: '30px',
    position: 'absolute',
    left: '0px',
    top: '0px'
  };

  const detailsStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexShrink: 0,
    position: 'relative',
    cursor: 'pointer',
    color: 'white'
  };

  return (
    <div style={TypeSectionStyle}>
      <div style={top}>
        <div style={left}>
          <div style={title}>
            <div style={earnMex}>Earn {rewarded_token.split('-')[0]}</div>

            <div style={stakeMex}>Stake {stakedToken.split('-')[0]}</div>
          </div>

          <div style={apr}>
            <div style={apr2}>APR</div>
            <div style={rate}>
              <div style={rateApr}>
                {token_position.paused == 1
                  ? 'Paused'
                  : pool_apr > 0
                  ? pool_apr.toString() + ' %'
                  : ''}
                {pool_apr == 0 && 'N/A'}
              </div>
            </div>
          </div>
        </div>

        <div style={logos}>
          <div style={logo2}>
            <div style={image_2}>
              <img style={img_2} src={image2} />
            </div>
          </div>

          <div style={logo1}>
            <div style={image_1}>
              <img style={img_1} src={image1} />
            </div>
          </div>
        </div>

        {/* {!showDetails ? ( */}
      </div>
      <div style={detailsStyle} onClick={handleChange}>
        <div style={{ fontSize: '10px' }}>
          {!showDetails ? 'Show details' : 'Hide details'}
        </div>
        {!showDetails ? (
          <svg
            className='chevron-down3'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 15.5002C11.8684 15.5009 11.7379 15.4757 11.6161 15.426C11.4943 15.3762 11.3834 15.3029 11.29 15.2102L7.29 11.2102C7.19676 11.1169 7.1228 11.0063 7.07234 10.8844C7.02188 10.7626 6.99591 10.632 6.99591 10.5002C6.99591 10.3683 7.02188 10.2378 7.07234 10.1159C7.1228 9.99411 7.19676 9.88342 7.29 9.79018C7.38324 9.69695 7.49393 9.62299 7.61575 9.57253C7.73758 9.52206 7.86814 9.49609 8 9.49609C8.13186 9.49609 8.26243 9.52206 8.38425 9.57253C8.50607 9.62299 8.61676 9.69695 8.71 9.79018L12 13.1002L15.3 9.92019C15.392 9.8179 15.5041 9.73569 15.6293 9.6787C15.7545 9.62171 15.8902 9.59118 16.0277 9.589C16.1653 9.58682 16.3018 9.61304 16.4287 9.66603C16.5557 9.71903 16.6703 9.79764 16.7655 9.89697C16.8607 9.99629 16.9344 10.1142 16.9819 10.2433C17.0295 10.3724 17.0499 10.5099 17.0418 10.6472C17.0338 10.7846 16.9975 10.9188 16.9353 11.0414C16.873 11.1641 16.7861 11.2726 16.68 11.3602L12.68 15.2202C12.4971 15.3965 12.254 15.4966 12 15.5002Z'
              fill='white'
            />
          </svg>
        ) : (
          <svg
            className='chevron-up'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M16 14.5C15.8684 14.5008 15.7379 14.4756 15.6161 14.4258C15.4943 14.376 15.3834 14.3027 15.29 14.21L12 10.9L8.7 14.08C8.51264 14.2663 8.25919 14.3708 7.995 14.3708C7.73081 14.3708 7.47736 14.2663 7.29 14.08C7.19627 13.9871 7.12188 13.8765 7.07111 13.7546C7.02034 13.6327 6.9942 13.502 6.9942 13.37C6.9942 13.238 7.02034 13.1073 7.07111 12.9854C7.12188 12.8636 7.19627 12.753 7.29 12.66L11.29 8.80002C11.4769 8.61679 11.7282 8.51416 11.99 8.51416C12.2518 8.51416 12.5031 8.61679 12.69 8.80002L16.69 12.8C16.7837 12.893 16.8581 13.0036 16.9089 13.1254C16.9597 13.2473 16.9858 13.378 16.9858 13.51C16.9858 13.642 16.9597 13.7727 16.9089 13.8946C16.8581 14.0165 16.7837 14.1271 16.69 14.22C16.5046 14.3987 16.2575 14.499 16 14.5V14.5Z'
              fill='white'
            />
          </svg>
        )}
      </div>
      <div style={{ display: !showDetails ? 'none' : 'block', width: '100%' }}>
        <SwowHideDetails
          rewarded_esdt_info={rewarded_esdt_info}
          decimals={Number(
            rewarded_esdt_info?.decimals ? rewarded_esdt_info?.decimals : 0
          )}
          rewards_amount={rewards_amount}
          rewards_value={rewards_value}
          speed={speed.toString()}
          staked_amount={
            token_position.total_stake
              ? token_position.total_stake.toFixed()
              : 0
          }
          staked_value={staked_value}
          users={users ? users : 0}
          socialNetwork={tokens_extra_informations}
          textColor={textColor}
          fontFamily={fontFamily}
        />
      </div>
    </div>
  );
};

export default TypeSection;
