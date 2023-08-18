import * as React from 'react';
import { useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import Popover from 'react-bootstrap/Popover';
import notFound from './../../../assets/img/notfoundc.svg';
import { useGetESDTInformations, useGetESDTCompute } from './Actions/helpers';
import {
  useGetTokenPosition,
  useGetStakingPosition,
  useGetStakingPositionRewards
} from './Actions/helpers';
import { PoolStakeInfo } from './PoolInfo/PoolStakeInfo';
import { defaultToken } from 'config';
import { useGetPoolPosition } from './Actions/helpers';
import { Col, Row, Container } from 'react-bootstrap';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import LiquidModal from './LiquidModal';
import RemoveLpModal from './RemoveLpModal';
import { useGetPoolLpIdentifier } from './Actions/helpers';

export const LiquidInfo = ({ userEsdtBalance, second_token }: any) => {
  const [showLiquid, setShowLiquid] = useState(false);
  const [showRemoveLP, setShowRemoveLP] = useState(false);
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();
  const [showStake, setShowStake] = useState(false);
  const [showUnstake, setShowUnstake] = useState(false);
  const { hasPendingTransactions } = useGetPendingTransactions();
  const lp_token = useGetPoolLpIdentifier(defaultToken, second_token);

  const lp_balance = userEsdtBalance.find(
    (item: any) => item.identifier === lp_token.token_identifier
  );

  const firstPoolPosition = useGetPoolPosition(
    defaultToken,
    second_token,
    showStake,
    hasPendingTransactions,
    true
  );
  const first_esdt_info = useGetESDTInformations(defaultToken);
  const second_esdt_info = useGetESDTInformations(second_token);

  console.log(firstPoolPosition);
  const first_price = first_esdt_info.price
    ? BigInt((first_esdt_info.price * 1000000).toFixed())
    : BigInt(1000000);
  const first_value = BigInt(
    (BigInt(firstPoolPosition.first_token_amount) * BigInt(first_price)) /
      BigInt(1000000)
  );

  const second_price = second_esdt_info.price
    ? BigInt((second_esdt_info.price * 1000000).toFixed())
    : BigInt(1000000);
  const second_value = BigInt(
    (BigInt(firstPoolPosition.second_token_amount) * BigInt(second_price)) /
      BigInt(1000000)
  );

  const ecart = (first_value - second_value) / BigInt(2);
  const ecart2 = (second_value - first_value) / BigInt(2);
  return (
    <>
      <div className={'center text-white'}>
        <LiquidModal
          userEsdtBalance={userEsdtBalance}
          firstPoolPosition={firstPoolPosition}
          first_esdt_info={first_esdt_info}
          second_esdt_info={second_esdt_info}
          show={showLiquid}
          onClose={() => {
            setShowLiquid(false);
          }}
        />
        <RemoveLpModal
          userEsdtBalance={userEsdtBalance}
          firstPoolPosition={firstPoolPosition}
          first_esdt_info={first_esdt_info}
          second_esdt_info={second_esdt_info}
          show={showRemoveLP}
          onClose={() => {
            setShowRemoveLP(false);
          }}
        />

        <Container>
          <Row>
            <Col>${defaultToken.split('-')[0]}</Col>
            <Col>${second_token.split('-')[0]}</Col>
          </Row>
          <Row>
            <Col>
              {' '}
              <FormatAmount
                decimals={first_esdt_info.decimals}
                value={firstPoolPosition.first_token_amount.toString()}
                egldLabel={' '}
                data-testid='balance'
              />{' '}
            </Col>

            <Col>
              {' '}
              <FormatAmount
                decimals={first_esdt_info.decimals}
                value={firstPoolPosition.second_token_amount.toString()}
                egldLabel={' '}
                data-testid='balance'
              />{' '}
            </Col>
          </Row>
          <Row>
            <Col>
              <FormatAmount
                decimals={first_esdt_info.decimals}
                value={first_value.toString()}
                egldLabel={'$'}
                data-testid='balance'
              />
            </Col>
            <Col>
              <FormatAmount
                decimals={second_esdt_info.decimals}
                value={second_value.toString()}
                egldLabel={'$'}
                data-testid='balance'
              />
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              {ecart > 0 && (
                <>
                  SELL{' '}
                  <FormatAmount
                    decimals={second_esdt_info.decimals}
                    value={ecart.toString()}
                    egldLabel={'$'}
                    data-testid='balance'
                  />
                </>
              )}
              {ecart2 > 0 && (
                <>
                  BUY{' '}
                  <FormatAmount
                    decimals={second_esdt_info.decimals}
                    value={ecart2.toString()}
                    egldLabel={'$'}
                    data-testid='balance'
                  />{' '}
                  of MID with {second_token.split('-')[0]}
                </>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              {' '}
              <div
                className='button-icon-border  cursor-pointer'
                onClick={() => {
                  setShowLiquid(true);
                }}
              >
                <div className='button-icon'>
                  <svg
                    className='plus'
                    width='20'
                    height='20'
                    viewBox='0 0 32 32'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M17.3334 6.66683C17.3334 5.93045 16.7364 5.3335 16 5.3335C15.2637 5.3335 14.6667 5.93045 14.6667 6.66683V14.6668H6.66671C5.93033 14.6668 5.33337 15.2638 5.33337 16.0002C5.33337 16.7365 5.93033 17.3335 6.66671 17.3335H14.6667V25.3335C14.6667 26.0699 15.2637 26.6668 16 26.6668C16.7364 26.6668 17.3334 26.0699 17.3334 25.3335V17.3335H25.3334C26.0698 17.3335 26.6667 16.7365 26.6667 16.0002C26.6667 15.2638 26.0698 14.6668 25.3334 14.6668H17.3334V6.66683Z'
                      fill='white'
                    />
                  </svg>
                </div>
              </div>
            </Col>
            <Col>
              {lp_balance?.balance > 0 && (
                <div
                  className='button-icon-border  cursor-pointer'
                  onClick={() => {
                    setShowRemoveLP(true);
                  }}
                >
                  <div className='button-icon'>
                    <svg
                      className='plus'
                      width='20'
                      height='20'
                      viewBox='0 0 32 32'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M6 12L18 12'
                        stroke='#ffffff'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />{' '}
                    </svg>
                  </div>
                </div>
              )}
              {/* {lp_token.token_identifier}{' '}
              <FormatAmount
                decimals={0}
                value={lp_balance?.balance}
                egldLabel={' '}
                data-testid='balance'
                digits={0}
              />{' '}
              {} */}
            </Col>{' '}
            <Col></Col>
          </Row>
        </Container>
      </div>
      {/* 
      <div className={opacity}>
        <div className='text-black PoolCard' data-testid='poolInfo'>
          <div className='poolTop'></div>
        </div>
      </div> */}
    </>
  );
};