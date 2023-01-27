import * as React from 'react';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';

import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import { useGetTokenPosition } from './Actions/helpers';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import FundModal from './FundModal';

export const PoolInfo = ({
  stakedToken,
  rewardedToken,
  balance,
  decimals
}: any) => {
  const { address } = useGetAccountInfo();
  const [show, setShow] = useState(false);

  const tokenPosition = useGetTokenPosition(stakedToken, rewardedToken);

  let apr = BigInt(100);
  if (tokenPosition.total_stake > BigInt(0)) {
    apr =
      (BigInt(tokenPosition.balance) * apr) / BigInt(tokenPosition.total_stake);
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
            </Col>
          </Row>{' '}
          <Row>
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
