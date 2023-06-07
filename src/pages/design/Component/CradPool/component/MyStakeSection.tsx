import React, { CSSProperties, FC } from 'react';
import { FormatAmount } from '@multiversx/sdk-dapp/UI';
import { useNavigate } from 'react-router-dom';
import { defaultToken } from 'config';
import { routeNames } from 'routes';
import Button from '../../Button';

interface MyStakeSectionProps {
  address: any;
  stakedToken: any;
  stakingPosition: any;
  staked_esdt_info: any;
  my_staked_value: any;
  rest: any;
  setShowStake: (show: boolean) => void;
  setShowUnstake: (show: boolean) => void;
}
const MyStakeSection: FC<MyStakeSectionProps> = ({
  address,
  stakedToken,
  setShowStake,
  setShowUnstake,
  stakingPosition,
  staked_esdt_info,
  my_staked_value,
  rest
}) => {
  const navigate = useNavigate();

  const sectionStyle: CSSProperties = {
    background: 'var(--bgtransparency, rgba(99, 74, 203, 0.32))',
    borderRadius: '0px 0px 8px 8px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    flexShrink: 0,
    position: 'relative',
    overflow: 'hidden',
    width: '100%'
  };

  const MyStackedStyle: CSSProperties = {
    color: '#FFFFFF',
    fontFamily: 'Plus Jakarta Sans',
    fontSize: '14px',
    fontWeight: '300',
    lineHeight: '18px',
    letterSpacing: '0em',
    textAlign: 'left'
  };

  const Content: CSSProperties = {
    background: '#634ACB52',
    borderRadius: '8px',
    width: '240px',
    height: '37px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '12px',
    marginTop: '12px',
    color: '#FFFFFF'
    // justifyContent: 'center'
  };

  return (
    // <>
    <div style={sectionStyle}>
      {!address ? (
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Button
            borderRadius={40}
            buttonHeight='31px'
            buttonWidth='240px'
            textColor='#ffffff'
            background={'#000000'}
            onClick={() =>
              navigate(
                routeNames.unlock +
                  `/stake/${
                    stakedToken !== undefined ? stakedToken : defaultToken
                  }`
              )
            }
            text={'Login'}
          />
        </div>
      ) : (
        <>
          {stakingPosition.stake_amount < 1 ? (
            <div className='my-stake-section3'>
              <div className='my-stake5'>
                <div style={MyStackedStyle}>My Stake</div>

                <div style={Content}>Stake now to earn {stakedToken}</div>
              </div>

              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '16px'
                }}
              >
                <Button
                  borderRadius={40}
                  buttonHeight='31px'
                  buttonWidth='240px'
                  textColor='#ffffff'
                  background={'#000000'}
                  onClick={() => setShowStake(true)}
                  text={`Stake ${stakedToken}`}
                />
              </div>
            </div>
          ) : (
            <div
              style={{
                width: '100%'
              }}
            >
              <div
                style={{
                  width: '100%'
                }}
              >
                <div style={MyStackedStyle}>My Stake</div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between', // ajoute de l'espace entre les éléments
                    alignItems: 'center', // centre les éléments verticalement
                    marginTop: '16px',
                    color: 'white'
                  }}
                >
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
                    <div className='_18-853-74'>
                      <FormatAmount
                        value={stakingPosition.stake_amount.toString()}
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

                    {my_staked_value > 0 && (
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
                          <>
                            {my_staked_value.toLocaleString('en-US', {
                              maximumFractionDigits: 2
                            })}{' '}
                          </>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='_1-42'>{rest} %</div>
                </div>
              </div>

              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between', // ajoute de l'espace entre les éléments
                  alignItems: 'center', // centre les éléments verticalement
                  marginTop: '16px',
                  color: 'white'
                  // margin: 0
                }}
              >
                <div>
                  <Button
                    borderRadius={40}
                    buttonHeight='31px'
                    // buttonWidth='240px'
                    textColor='#ffffff'
                    background={'#000000'}
                    onClick={() => setShowStake(true)}
                    text={'Stake'}
                  />
                </div>

                <div>
                  <Button
                    borderRadius={40}
                    buttonHeight='31px'
                    // buttonWidth='240px'
                    textColor='#ffffff'
                    background={'#000000'}
                    onClick={() => setShowUnstake(true)}
                    text={'Unstake'}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyStakeSection;
