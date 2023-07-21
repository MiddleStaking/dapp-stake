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
import { PoolTopInfo } from './PoolInfo/PoolTopInfo';
import { PoolStakeInfo } from './PoolInfo/PoolStakeInfo';
import { defaultToken } from 'config';
import { useGetPoolPosition } from './Actions/helpers';
import { Col, Row, Container } from 'react-bootstrap';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';

export const LiquidInfo = ({ userEsdtBalance, second_token }: any) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();
  const [showStake, setShowStake] = useState(false);
  const [showUnstake, setShowUnstake] = useState(false);
  const { hasPendingTransactions } = useGetPendingTransactions();

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
  const first_price = first_esdt_info.price ? first_esdt_info.price : BigInt(0);
  const first_value = BigInt(
    firstPoolPosition.first_token_amount * first_price
  );

  const second_price = second_esdt_info.price
    ? second_esdt_info.price
    : BigInt(1);
  const second_value = BigInt(
    firstPoolPosition.second_token_amount * second_price
  );

  const ecart = (first_value - second_value) / BigInt(2);
  const ecart2 = (second_value - first_value) / BigInt(2);

  return (
    <>
      <div className={'center text-white'}>
        <Container>
          <Row>
            <Col>
              ${defaultToken.split('-')[0]} {first_price}
            </Col>
            <Col>
              ${second_token.split('-')[0]} {second_price}
            </Col>
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
