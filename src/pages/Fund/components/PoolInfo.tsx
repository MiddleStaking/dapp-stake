import * as React from 'react';
import { useState } from 'react';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import { Col, Row } from 'react-bootstrap';
import { useGetTokenPosition } from './Actions/helpers';
import FundModal from './FundModal';
import PayFeesModal from './PayFeesModal';

export const PoolInfo = ({
  stakedToken,
  rewardedToken,
  balance,
  decimals
}: any) => {
  const [show, setShow] = useState(false);
  const [showFees, setShowFees] = useState(false);
  const tokenPosition = useGetTokenPosition(stakedToken, rewardedToken);

  let apr = BigInt(100);
  if (tokenPosition.total_stake > BigInt(0)) {
    apr =
      (BigInt(tokenPosition.balance) * apr) / BigInt(tokenPosition.total_stake);
  }

  let fees = BigInt(10);
  if (tokenPosition.fee_percentage) {
    fees = BigInt(tokenPosition.fee_percentage) / BigInt(100);
  }

  const speed =
    (BigInt(tokenPosition.blocks_to_max) * BigInt(6)) /
    BigInt(24) /
    BigInt(60) /
    BigInt(60);

  return (
    <>
      <FundModal
        rewardedToken={rewardedToken}
        stakedToken={stakedToken}
        balance={balance}
        decimals={decimals}
        onClose={() => setShow(false)}
        show={show}
        fees={fees}
      />
      <PayFeesModal
        rewardedToken={rewardedToken}
        stakedToken={stakedToken}
        onClose={() => setShowFees(false)}
        showFees={showFees}
      />
      {tokenPosition.blocks_to_max ? (
        <div className='text-white text-center' data-testid='poolInfo'>
          <Row>
            <Col>
              <h3>Pool Informations</h3>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col>
              {' '}
              <div>
                <h3>Stake : {stakedToken}</h3>
                <h4>
                  (i) staked :{' '}
                  <FormatAmount
                    value={tokenPosition.total_stake.toString()}
                    decimals={Number(decimals)}
                    egldLabel={' '}
                    data-testid='staked'
                  />
                </h4>
              </div>
            </Col>
            <Col>
              <div>
                <h3>Earn : {rewardedToken}</h3>{' '}
                <h4>
                  (i) left :{' '}
                  <FormatAmount
                    value={tokenPosition.balance.toString()}
                    decimals={Number(decimals)}
                    egldLabel={' '}
                    data-testid='balance'
                  />
                </h4>
              </div>
              <div>
                <h4>
                  (i) Rewarded :{' '}
                  <FormatAmount
                    value={tokenPosition.total_rewards.toString()}
                    decimals={Number(decimals)}
                    egldLabel={' '}
                    data-testid='balance'
                  />
                </h4>
              </div>{' '}
              <div>
                <h4>(i) Speed : {speed.toString()} days</h4>
              </div>
              <div>
                <h4>(i) APR : {apr.toString()} %</h4>
              </div>{' '}
              <div>
                <h4>(i) Deposit Fees : {fees.toString()} %</h4>
              </div>{' '}
            </Col>
          </Row>{' '}
          <Row>
            <Col>
              {fees > 0 ? (
                <>
                  {' '}
                  <button onClick={() => setShowFees(true)}>
                    PAY TO REMOVE FEES
                  </button>
                </>
              ) : (
                <>
                  {' '}
                  <button disabled={true}>FEES PAID</button>
                </>
              )}
            </Col>
            <Col>
              <button onClick={() => setShow(true)}>
                ADD LOCKED TOKEN TO EXISTING POOL
              </button>{' '}
            </Col>
          </Row>
        </div>
      ) : (
        <>
          <div className='text-white text-center' data-testid='poolInfo'>
            <Row>
              <Col>
                <h3>PAIR POOL NOT FOUND</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                {' '}
                <div>
                  <h3>Stake : {stakedToken}</h3>
                </div>
              </Col>
              <Col>
                {' '}
                <div>
                  <h3>Earn : {rewardedToken}</h3>{' '}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                {fees > 0 ? (
                  <>
                    {' '}
                    <button onClick={() => setShowFees(true)}>
                      PAY TO REMOVE FEES BEFORE FIRST DEPOSIT
                    </button>
                  </>
                ) : (
                  <>
                    {' '}
                    <button disabled={true}>FEES PAID</button>
                  </>
                )}
              </Col>{' '}
              <Col>
                <button onClick={() => setShow(true)}>
                  LOCK TOKEN TO NEW POOL
                </button>
              </Col>
            </Row>{' '}
          </div>
        </>
      )}
    </>
  );
};
