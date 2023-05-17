import React, {
  CSSProperties,
  FC,
  JSXElementConstructor,
  ReactElement
} from 'react';
import { FormatAmount } from '@multiversx/sdk-dapp/UI';
import notFound from '../../../../../assets/img/notfoundc.svg';
interface TypeSectionProps {
  Rewards?: string;
  Rewards_value?: number;
  Speed?: string;
  Staked?: string;
  Staked_value?: number;
  Users?: string;
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

const SwowHideDetails: FC<TypeSectionProps> = ({
  Rewards,
  Rewards_value,
  Speed,
  Staked,
  Staked_value,
  Users,
  socialNetwork,
  decimals = 0,
  textColor = '#ffffff',
  fontFamily = 'Plus Jakarta Sans'
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

  const notFoundStyle: CSSProperties = {
    width: '20px',
    height: '20px'
  };

  return (
    <>
      <div
        style={{
          width: '100%'
        }}
      >
        {Rewards && (
          <div style={detailsRow}>
            <div>Rewards</div>
            <div>
              <FormatAmount
                value={Rewards}
                decimals={decimals}
                egldLabel={' '}
                data-testid='balance'
                digits={2}
              />
            </div>
          </div>
        )}
        {Rewards_value && (
          <div style={detailsRow}>
            <div>Rewards value</div>

            <div>
              {Rewards_value.toLocaleString('en-US', {
                maximumFractionDigits: 2
              })}{' '}
              $
            </div>
          </div>
        )}
        {Speed && (
          <div style={detailsRow}>
            <div className='speed'>Speed</div>

            <div className='_365-days'>{Speed.toString()} days</div>
          </div>
        )}

        {Staked && (
          <div style={detailsRow}>
            <div className='total-staked'>Staked</div>

            <div className='_135-492-65'>
              <FormatAmount
                value={Staked}
                decimals={decimals}
                egldLabel={' '}
                data-testid='staked'
                digits={2}
              />
            </div>
          </div>
        )}

        {Staked_value && (
          <div style={detailsRow}>
            <div className='total-staked'>Staked value</div>

            <div className='_135-492-65'>
              {Staked_value.toLocaleString('en-US', {
                maximumFractionDigits: 2
              })}{' '}
              $
            </div>
          </div>
        )}

        {Users && (
          <div style={detailsRow}>
            <div className='total-staked'>Staked value</div>

            <div className='_135-492-65'>
              <FormatAmount
                value={Users}
                decimals={Number(0)}
                egldLabel={' '}
                data-testid='staked'
                digits={0}
              />
            </div>
          </div>
        )}
      </div>
      <div>
        {socialNetwork && (
          <div style={detailsRowIcons}>
            {socialNetwork.map((item, index) => (
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
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SwowHideDetails;
