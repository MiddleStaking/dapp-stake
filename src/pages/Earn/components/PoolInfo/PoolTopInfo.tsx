import { FormatAmount } from '@multiversx/sdk-dapp/UI';
import * as React from 'react';
import eCompass from './../../../../assets/img/ecompass.svg';
import jexchange from './../../../../assets/img/jexchange.svg';

export const PoolTopInfo = ({
  stakedToken,
  rewardedToken,
  pool_apr,
  rewarded_esdt_info,
  staked_esdt_info,
  image1,
  image2,
  tokenPosition,
  rewarded_value,
  staked_value,
  speed,
  tokens_extra_informations
}: any) => {
  const [showDetails, setShowDetails] = React.useState(false);
  const handleChange = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className='type-section'>
      <div className='top2'>
        <div className='left2'>
          <div className='title'>
            <div className='earn-mex'>Earn {rewardedToken.split('-')[0]}</div>

            <div className='stake-mex'>Stake {stakedToken.split('-')[0]}</div>
          </div>

          <div className='apr'>
            <div className='apr2'>APR</div>

            <div className='rate'>
              <div className='_14'>{pool_apr.toString()} %</div>
            </div>
          </div>
        </div>

        <div className='right2'>
          <div className='image'>
            <div className='logos'>
              <img className='image-3' src={image2} />
            </div>
          </div>

          <div className='logo2'>
            <div className='logos2'>
              <img className='image-32' src={image1} />
            </div>
          </div>
        </div>
      </div>
      {!showDetails ? (
        <div className='details cursor-pointer' onClick={handleChange}>
          <div className='show-details'>Show details</div>

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
        </div>
      ) : (
        <>
          <div className='details2'>
            <div className='details3 cursor-pointer' onClick={handleChange}>
              <div className='hide-details'>Hide details</div>

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
            </div>

            <div className='specs'>
              <div className='frame-4'>
                <div className='rewards'>Rewards</div>

                <div className='_18-853-742'>
                  <FormatAmount
                    value={tokenPosition.balance.toString()}
                    decimals={Number(
                      rewarded_esdt_info?.decimals
                        ? rewarded_esdt_info?.decimals
                        : 0
                    )}
                    egldLabel={' '}
                    data-testid='balance'
                    digits={2}
                  />
                </div>
              </div>

              <div className='frame-6'>
                <div className='value2'>Rewards value</div>

                <div className='_723-37'>
                  {rewarded_value.toLocaleString('en-US', {
                    maximumFractionDigits: 2
                  })}{' '}
                  $
                </div>
              </div>

              {/* <div className='frame-7'>
                <div className='all-time-rewarded'>All time rewarded</div>

                <div className='_98-752'>
                  {' '}
                  <FormatAmount
                    value={tokenPosition.total_rewards.toString()}
                    decimals={Number(
                      rewarded_esdt_info?.decimals
                        ? rewarded_esdt_info?.decimals
                        : 0
                    )}
                    egldLabel={' '}
                    data-testid='balance'
                    digits={2}
                  />
                </div>
              </div> */}

              <div className='frame-8'>
                <div className='speed'>Speed</div>

                <div className='_365-days'>{speed.toString()} days</div>
              </div>

              <div className='frame-9'>
                <div className='total-staked'>Staked</div>

                <div className='_135-492-65'>
                  <FormatAmount
                    value={tokenPosition.total_stake.toString()}
                    decimals={Number(
                      staked_esdt_info?.decimals
                        ? staked_esdt_info?.decimals
                        : 0
                    )}
                    egldLabel={' '}
                    data-testid='staked'
                    digits={2}
                  />
                </div>
              </div>

              <div className='frame-10'>
                <div className='total-value'>Staked value</div>

                <div className='_5-198-9'>
                  {staked_value.toLocaleString('en-US', {
                    maximumFractionDigits: 2
                  })}{' '}
                  $
                </div>
              </div>

              <div className='frame-11'>
                <div className='users'>Users</div>

                <div className='_6'>
                  <FormatAmount
                    value={
                      tokenPosition.users ? tokenPosition.users.toString() : '0'
                    }
                    decimals={Number(0)}
                    egldLabel={' '}
                    data-testid='staked'
                    digits={0}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='icons'>
            {rewarded_esdt_info?.assets?.social?.twitter && (
              <div className='frame-53'>
                <a
                  href={rewarded_esdt_info?.assets?.social?.twitter}
                  target={'_blank'}
                  rel={'noreferrer'}
                >
                  <svg
                    className='twitter'
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M5.38666 13.3335C6.37246 13.3665 7.35487 13.2015 8.27582 12.8484C9.19678 12.4952 10.0376 11.961 10.7486 11.2774C11.4596 10.5938 12.0263 9.77452 12.4153 8.86811C12.8043 7.96171 13.0076 6.98652 13.0133 6.00019C13.4651 5.44113 13.8006 4.79741 14 4.10686C14.0149 4.0523 14.0137 3.9946 13.9965 3.94071C13.9794 3.88682 13.947 3.83903 13.9034 3.8031C13.8597 3.76718 13.8065 3.74464 13.7504 3.73821C13.6942 3.73178 13.6373 3.74173 13.5867 3.76686C13.3503 3.88063 13.0842 3.91738 12.8259 3.87193C12.5676 3.82648 12.33 3.70113 12.1467 3.51353C11.9126 3.25724 11.6295 3.05055 11.3142 2.90568C10.9988 2.76081 10.6575 2.68072 10.3106 2.67015C9.96373 2.65958 9.61824 2.71875 9.29463 2.84415C8.97101 2.96955 8.67586 3.15863 8.42666 3.40019C8.08546 3.73063 7.83554 4.14372 7.7012 4.59931C7.56686 5.0549 7.55267 5.53749 7.66 6.00019C5.42666 6.13353 3.89333 5.07353 2.66666 3.62019C2.62981 3.57846 2.58161 3.54836 2.52793 3.53357C2.47426 3.51878 2.41744 3.51994 2.36441 3.53691C2.31139 3.55388 2.26445 3.58592 2.22933 3.62912C2.19422 3.67233 2.17244 3.72482 2.16666 3.78019C1.93298 5.07647 2.10155 6.41322 2.64974 7.61091C3.19793 8.80859 4.09949 9.80984 5.23333 10.4802C4.47309 11.3521 3.40547 11.8966 2.25333 12.0002C2.19161 12.0104 2.13462 12.0397 2.09036 12.0839C2.0461 12.1282 2.01678 12.1851 2.00649 12.2468C1.99621 12.3085 2.00547 12.3719 2.033 12.4281C2.06052 12.4843 2.10493 12.5305 2.16 12.5602C3.16234 13.0611 4.26615 13.3257 5.38666 13.3335'
                      fill='white'
                    />
                  </svg>
                </a>
              </div>
            )}
            {rewarded_esdt_info?.assets?.website && (
              <div className='frame-53'>
                <a
                  href={rewarded_esdt_info?.assets?.website}
                  target={'_blank'}
                  rel={'noreferrer'}
                >
                  <svg
                    className='globe-2'
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M7.99998 1.3335C6.68144 1.3335 5.39251 1.72449 4.29618 2.45703C3.19985 3.18957 2.34537 4.23077 1.84079 5.44894C1.3362 6.66711 1.20418 8.00756 1.46141 9.30076C1.71865 10.594 2.35359 11.7819 3.28594 12.7142C4.21829 13.6466 5.40617 14.2815 6.69938 14.5387C7.99259 14.796 9.33303 14.6639 10.5512 14.1594C11.7694 13.6548 12.8106 12.8003 13.5431 11.704C14.2757 10.6076 14.6666 9.31871 14.6666 8.00016C14.6666 7.12468 14.4942 6.25778 14.1592 5.44894C13.8241 4.6401 13.3331 3.90517 12.714 3.28612C12.095 2.66706 11.36 2.176 10.5512 1.84097C9.74237 1.50593 8.87546 1.3335 7.99998 1.3335V1.3335ZM3.33332 10.5335C3.76894 10.6467 4.2166 10.7072 4.66665 10.7135C5.41971 10.7342 6.15759 10.4992 6.75998 10.0468C7.89998 9.1535 7.89998 8.00683 7.89998 7.08683C7.84942 6.55435 7.93427 6.01773 8.14665 5.52683C8.33959 5.26411 8.59666 5.05524 8.89332 4.92016C9.10528 4.7963 9.31005 4.66053 9.50665 4.5135C9.92095 4.18625 10.2427 3.75653 10.44 3.26683C11.378 3.74674 12.1528 4.49371 12.6666 5.4135C11.7133 5.54683 10.36 5.86016 10.0933 7.10016C10.0331 7.39643 10.0019 7.69785 9.99998 8.00016C10.0216 8.33806 9.95494 8.67577 9.80665 8.98016L9.73998 9.0935C9.30665 9.8135 8.81998 10.6335 9.47998 11.7602C9.55998 11.9002 9.64665 12.0335 9.73332 12.1668C9.91075 12.3718 10.0304 12.6203 10.08 12.8868C9.42431 13.1758 8.7165 13.3278 7.99998 13.3335C7.0424 13.3287 6.10376 13.0662 5.28263 12.5735C4.4615 12.0808 3.78816 11.3762 3.33332 10.5335V10.5335Z'
                      fill='white'
                    />
                  </svg>
                </a>
              </div>
            )}

            {tokens_extra_informations?.[0]?.ecompass && (
              <>
                {' '}
                <div className='frame-53'>
                  <a
                    href={tokens_extra_informations?.[0]?.ecompass}
                    target={'_blank'}
                    rel={'noreferrer'}
                  >
                    <img width='16' className='smallInfoLogo' src={eCompass} />
                  </a>
                </div>
              </>
            )}

            {tokens_extra_informations?.[0]?.jexchange && (
              <>
                {' '}
                <div className='frame-53'>
                  <a
                    href={tokens_extra_informations?.[0]?.jexchange}
                    target={'_blank'}
                    rel={'noreferrer'}
                  >
                    <img width='16' className='smallInfoLogo' src={jexchange} />
                  </a>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
