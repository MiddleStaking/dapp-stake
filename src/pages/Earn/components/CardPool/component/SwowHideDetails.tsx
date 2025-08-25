import React, { CSSProperties, FC } from 'react';
import { FormatAmount } from 'lib';
import { BigNumber } from 'bignumber.js';
import { local_network } from 'config';
import eCompass from './../../../../../assets/img/ecompass.svg';
import jexchange from './../../../../../assets/img/jexchange.svg';
import notFound from './../../../../../assets/img/notfoundc.svg';

interface TypeSectionProps {
  rewards_amount: BigNumber;
  rewards_value: BigNumber;
  speed?: string;
  staked_amount?: string;
  staked_value: BigNumber;
  users?: BigNumber;
  rewarded_esdt_info: any;
  staked_esdt_info: any;
  textColor?: string;
  fontFamily?: string;
}

const SwowHideDetails: FC<TypeSectionProps> = ({
  rewards_amount,
  rewards_value = new BigNumber(0),
  speed,
  staked_amount,
  staked_value = new BigNumber(0),
  users,
  staked_esdt_info,
  rewarded_esdt_info,
  textColor = '#ffffff',
  fontFamily = 'sans-serif'
  //styleName: Text/12px/Light;
}) => {
  const detailsRow: CSSProperties = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: textColor,
    fontFamily: fontFamily,
    fontSize: '12px',
    fontWeight: '300',
    lineHeight: '15px',
    letterSpacing: '0em',
    marginBottom: '6px',
    minWidth: '110px'
  };

  const detailsRowIcons: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexShrink: 0,
    position: 'relative'
  };

  const icon: CSSProperties = {
    border: '1px solid #695885',
    background: '#695885',
    borderRadius: '40px',
    height: '30px',
    width: '30px',
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const detailsRowResult: CSSProperties = {
    fontWeight: '600',
    fontSize: '12px'
  };
  return (
    <>
      <div
        style={{
          width: '100%'
        }}
      >
        <div style={detailsRow}>
          <div>Rewards</div>
          <div style={detailsRowResult}>
            {Number(
              rewards_amount
                .dividedBy(10 ** rewarded_esdt_info?.decimals)
                .toFixed(2)
            ).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}{' '}
          </div>
        </div>
        {rewards_value.isGreaterThan(0) && (
          <div style={detailsRow}>
            <div>Rewards value</div>

            <div style={detailsRowResult}>
              {Number(rewards_value.toFixed(2)).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}{' '}
              $
            </div>
          </div>
        )}

        {speed && (
          <div style={detailsRow}>
            <div>Speed</div>

            <div style={detailsRowResult}>{speed.toString()} days</div>
          </div>
        )}
        {staked_amount && (
          <div style={detailsRow}>
            <div>Staked</div>

            <div style={detailsRowResult}>
              <FormatAmount value={staked_amount} data-testid='staked' />
            </div>
          </div>
        )}
        {staked_value.isGreaterThan(0) && (
          <div style={detailsRow}>
            <div>Staked value</div>

            <div style={detailsRowResult}>{staked_value.toFixed(2)} $</div>
          </div>
        )}
        {users && (
          <div style={detailsRow}>
            <div>Users</div>

            <div style={detailsRowResult}>
              <FormatAmount
                value={users.multipliedBy(10 ** 18).toString()}
                data-testid='staked'
              />
            </div>
          </div>
        )}
      </div>
      <div>
        <div style={detailsRowIcons}>
          {/* {socialNetwork.map((item, index) => (
              //   <div key={index} style={icon}>
              <a
                key={index}
                style={icon}
                href={item.url}
                target='_blank'
                rel='noopener noreferrer'
              >
                {item.icon &&
                  React.cloneElement(item.icon, {
                    style: { width: '20px', height: '20px' }
                  })}
                {!item.icon && <img style={notFoundStyle} src={notFound} />}
              </a>
              //   </div>
            ))} */}
          <a
            style={icon}
            href={
              local_network.explorerAddress +
              '/tokens/' +
              rewarded_esdt_info?.identifier
            }
            target={'_blank'}
            rel={'noreferrer'}
          >
            <img
              width='16'
              className='smallInfoLogo'
              src={
                rewarded_esdt_info?.assets?.svgUrl
                  ? rewarded_esdt_info?.assets?.svgUrl
                  : notFound
              }
            />
          </a>

          <a
            style={icon}
            href={
              'https://e-compass.io/token/' + rewarded_esdt_info?.identifier
            }
            target={'_blank'}
            rel={'noreferrer'}
          >
            <img width='16' className='smallInfoLogo' src={eCompass} />
          </a>
          <a
            style={icon}
            href={
              'https://app.jexchange.io/?paymentToken=EGLD&buyToken=' +
              rewarded_esdt_info?.identifier
            }
            target={'_blank'}
            rel={'noreferrer'}
          >
            <img width='16' className='smallInfoLogo' src={jexchange} />
          </a>
          {rewarded_esdt_info?.assets?.social?.twitter && (
            <a
              style={icon}
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
          )}
          {rewarded_esdt_info?.assets?.website && (
            <a
              style={icon}
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
          )}
        </div>
      </div>
    </>
  );
};

export default SwowHideDetails;
