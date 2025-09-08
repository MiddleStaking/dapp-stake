import React, { CSSProperties, FC, useState } from 'react';
import { FormatAmount } from 'lib';
import { BigNumber } from 'bignumber.js';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'components/Design';
import { defaultToken } from 'config';
import { HeaderMenuContext } from 'context/Header/HeaderMenuContext';
import { routeNames } from 'routes';
import StakeModal from '../../StakeModal';
import UnstakeModal from '../../UnstakeModal';
import ProgressBar from '../../progressBar';
import { ConnectButton } from 'components/Button/ConnectButton';

interface MyStakeSectionProps {
  address: any;
  staked_token: any;
  staking_position: any;
  staked_esdt_info: any;
  my_staked_value: any;
  rest: any;
  token_position: any;
  rewarded_token: any;
  swapedTokens: any;
  userEsdtBalance: any;
  isDual: any;
  firstPoolPosition: any;
  secondPoolPosition: any;
  rewarded_esdt_info: any;
  balanc: any;
  image1: any;
  image2: any;
  sdecimals: any;
  rdecimals: any;
  balance: any;
  my_rewards_value: any;
  canBeStaked: any;
  currentBlockNonce: any;
}
const MyStakeSection: FC<MyStakeSectionProps> = ({
  address,
  staked_token,
  rewarded_token,
  token_position,
  staking_position,
  staked_esdt_info,
  rewarded_esdt_info,
  my_staked_value,
  rest,
  balance,
  image1,
  image2,
  sdecimals,
  userEsdtBalance,
  canBeStaked,
  currentBlockNonce
}) => {
  const navigate = useNavigate();
  const [showStake, setShowStake] = useState(false);
  const [showUnstake, setShowUnstake] = useState(false);
  const { setHeaderMenu } = React.useContext(HeaderMenuContext);

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
    // height: '202px'
  };

  const MyStackedStyle: CSSProperties = {
    color: '#FFFFFF',
    fontFamily: '',
    fontSize: '14px',
    fontWeight: '300',
    lineHeight: '18px',
    letterSpacing: '0em',
    textAlign: 'left'
  };

  const Content: CSSProperties = {
    background: '#634ACB52',
    borderRadius: '8px',
    width: '100%',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '12px',
    marginTop: '12px',
    color: '#FFFFFF',
    fontSize: '10px'
    // justifyContent: 'center'
  };

  const MyStackedContentStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%'
  };

  // const elaspesed_blocks =
  //   currentBlockNonce - staking_position.last_action_block;
  // const blocks_left = token_position.blocks_to_max - elaspesed_blocks;

  // {staking_position.last_action_block.toFixed()}
  // <br />
  // {token_position.blocks_to_max.toFixed()}
  // <br />
  // {currentBlockNonce.toFixed()}

  return (
    <div style={sectionStyle}>
      {canBeStaked && (
        <Link
          to={routeNames.stake + `/${rewarded_token}`}
          className='canBeStaked'
          data-testid='loginBtn'
        >
          {' '}
          <div className='icon-container'>
            <div className='half-circle'>
              {' '}
              Stake {rewarded_token.split('-')[0]}{' '}
            </div>
          </div>
        </Link>
      )}
      <StakeModal
        userEsdtBalance={userEsdtBalance}
        staked_esdt_info={staked_esdt_info}
        rewarded_esdt_info={rewarded_esdt_info}
        rewarded_token={rewarded_token}
        staked_token={staked_token}
        balance={balance}
        decimals={sdecimals}
        onClose={() => {
          setHeaderMenu(true), setShowStake(false);
        }}
        show={showStake}
        setShow={setShowStake}
        image1={image1}
        image2={image2}
        token_position={token_position}
      />
      <UnstakeModal
        userEsdtBalance={userEsdtBalance}
        rewarded_token={rewarded_token}
        staked_token={staked_token}
        staked_esdt_info={staked_esdt_info}
        rewarded_esdt_info={rewarded_esdt_info}
        balance={staking_position?.stake_amount}
        decimals={sdecimals}
        onClose={() => {
          setHeaderMenu(true), setShowUnstake(false);
        }}
        show={showUnstake}
        setShow={setShowUnstake}
        token_position={token_position}
      />
      {!address ? (
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ConnectButton />
        </div>
      ) : (
        <>
          {staking_position?.stake_amount == 0 ? (
            <div style={MyStackedContentStyle}>
              <div
                style={{
                  height: '60px',
                  width: '100%'
                }}
              >
                <div style={MyStackedStyle}>My Stake</div>

                <div style={Content}>Stake now to earn {staked_token}</div>
              </div>

              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {token_position?.paused == 1 ? (
                  <Button
                    borderRadius={40}
                    buttonHeight='31px'
                    buttonWidth='240px'
                    textColor='#ffffff'
                    text='Paused'
                    background={'#000000'}
                    disabled={true}
                  />
                ) : (
                  <Button
                    borderRadius={40}
                    buttonHeight='31px'
                    buttonWidth='100%'
                    textColor='#ffffff'
                    background={'#000000'}
                    onClick={() => {
                      setHeaderMenu(false);
                      setShowStake(true);
                    }}
                    text={`Stake ${staked_token}`}
                  />
                )}
              </div>
            </div>
          ) : (
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              {' '}
              <div
                style={{
                  width: '100%',
                  height: '60px'
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
                      {Number(
                        new BigNumber(staking_position?.stake_amount)
                          .dividedBy(10 ** 18)
                          .toFixed(2)
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
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
                            {my_staked_value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}{' '}
                          </>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    {rest.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}{' '}
                    %
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between', // ajoute de l'espace entre les éléments
                  alignItems: 'center', // centre les éléments verticalement
                  color: 'white'
                  // margin: 0
                }}
              >
                <div>
                  {token_position?.paused == 1 ? (
                    <Button
                      borderRadius={40}
                      buttonHeight='31px'
                      textColor='#ffffff'
                      text='Paused'
                      background={'#000000'}
                      disabled={true}
                    />
                  ) : (
                    <Button
                      borderRadius={40}
                      buttonHeight='31px'
                      // buttonWidth='240px'
                      textColor='#ffffff'
                      background={'#000000'}
                      onClick={() => setShowStake(true)}
                      text={'Stake'}
                    />
                  )}
                </div>
                <div>
                  <Button
                    borderRadius={40}
                    buttonHeight='31px'
                    textColor='#ffffff'
                    background={'#000000'}
                    onClick={() => setShowUnstake(true)}
                    text={'Unstake'}
                  />
                </div>
              </div>{' '}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyStakeSection;
