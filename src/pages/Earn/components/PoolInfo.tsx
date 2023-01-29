import * as React from 'react';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';
import { useState } from 'react';

import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import {
  useGetTokenPosition,
  useGetStakingPosition,
  useGetStakingPositionRewards
} from './Actions/helpers';
import { ActionClaimRewards } from './Actions';
import StakeModal from './StakeModal';
import UnstakeModal from './UnstakeModal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

export const PoolInfo = ({
  stakedToken,
  rewardedToken,
  balance,
  sdecimals,
  rdecimals
}: any) => {
  const { address, account } = useGetAccountInfo();
  const [showStake, setShowStake] = useState(false);
  const [showUnstake, setShowUnstake] = useState(false);

  const tokenPosition = useGetTokenPosition(stakedToken, rewardedToken);
  const stakingPosition = useGetStakingPosition(stakedToken, rewardedToken);
  const stakingPositionRewards = useGetStakingPositionRewards(
    stakedToken,
    rewardedToken
  );

  const stakedPopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>Staked in pool</Popover.Header>
      <Popover.Body>
        This is the total amount of tokens staked in pools by users.
      </Popover.Body>
    </Popover>
  );

  const leftPopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>Left in pool</Popover.Header>
      <Popover.Body>
        This is the amount of tokens left in pool to be claimed by users.
      </Popover.Body>
    </Popover>
  );

  const speedPopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>Time before max rewards</Popover.Header>
      <Popover.Body>
        This is the time users have to stay in pool before they can get a full
        share of the pool.
      </Popover.Body>
    </Popover>
  );

  const aprPopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>APR (calulated)</Popover.Header>
      <Popover.Body>
        This is an estimation of the APR based on the Total staked an token left
        in the reward pool. <br />
        It does not take in count the value of each token (yet)
      </Popover.Body>
    </Popover>
  );

  const allTimeRewardsPopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>All time rewarded</Popover.Header>
      <Popover.Body>
        This is the number of token this pool have rewarded since its creation
      </Popover.Body>
    </Popover>
  );

  const myStakePopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>Your staked tokens in pool</Popover.Header>
      <Popover.Body>
        This is the number of token you have staked in pool.
      </Popover.Body>
    </Popover>
  );

  const mySharePopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>Your share of the pool</Popover.Header>
      <Popover.Body>
        This is the percentage of token you have in this pool.
      </Popover.Body>
    </Popover>
  );

  const myRewardsPopover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>Your rewards</Popover.Header>
      <Popover.Body>
        This is an estimation of the rewards you can claim NOW based on the
        rewards left in pool, your staked tokens and the time spent in pool.
        <br />
        Time spent in pool is reseted after claim or stake.
      </Popover.Body>
    </Popover>
  );

  // console.log('PoolInfo');
  // console.log(stakedToken + ' ' + rewardedToken);
  // console.log(sdecimals + ' ' + rdecimals);
  // console.log('user balance : ' + balance);
  // console.log(tokenPosition);
  // console.log(stakingPosition);
  // console.log(stakingPositionRewards);

  let apr = BigInt(100);
  if (
    tokenPosition.total_stake > BigInt(0) &&
    tokenPosition.balance > BigInt(0)
  ) {
    apr =
      (BigInt(tokenPosition.balance) * BigInt(10 ** sdecimals) * apr) /
      (BigInt(tokenPosition.total_stake) * BigInt(10 ** rdecimals));
  }
  let share = BigInt(10000);
  if (tokenPosition.total_stake > BigInt(0)) {
    share =
      (BigInt(stakingPosition) * share) / BigInt(tokenPosition.total_stake);
  }
  const rest = Number(share) / Number(100);

  const speed =
    (BigInt(tokenPosition.blocks_to_max) * BigInt(6)) /
    BigInt(24) /
    BigInt(60) /
    BigInt(60);

  return (
    <>
      {' '}
      <StakeModal
        rewardedToken={rewardedToken}
        stakedToken={stakedToken}
        balance={balance}
        decimals={sdecimals}
        onClose={() => setShowStake(false)}
        show={showStake}
      />
      <UnstakeModal
        rewardedToken={rewardedToken}
        stakedToken={stakedToken}
        balance={stakingPosition}
        decimals={sdecimals}
        onClose={() => setShowUnstake(false)}
        show={showUnstake}
      />
      <div className='text-black PoolCard' data-testid='poolInfo'>
        <div className='poolTop'>
          <div>
            <h4>Stake : {stakedToken}</h4>
            <h4>Earn : {rewardedToken}</h4>{' '}
          </div>
        </div>
        <div className='row'>
          <h4 className='col'>
            <OverlayTrigger placement='right' overlay={stakedPopover}>
              <a>
                <FontAwesomeIcon icon={faCircleInfo} className='text-muted' />
              </a>
            </OverlayTrigger>{' '}
            staked :{' '}
            <FormatAmount
              value={tokenPosition.total_stake.toString()}
              decimals={Number(sdecimals)}
              egldLabel={' '}
              data-testid='staked'
              digits={2}
            />
          </h4>{' '}
          <h4 className='col'>
            <OverlayTrigger placement='right' overlay={leftPopover}>
              <a>
                <FontAwesomeIcon icon={faCircleInfo} className='text-muted' />
              </a>
            </OverlayTrigger>{' '}
            left :{' '}
            <FormatAmount
              value={tokenPosition.balance.toString()}
              decimals={Number(rdecimals)}
              egldLabel={' '}
              data-testid='balance'
              digits={2}
            />
          </h4>
        </div>
        <div className='row'>
          <h4 className='col'>
            {' '}
            <OverlayTrigger placement='right' overlay={speedPopover}>
              <a>
                <FontAwesomeIcon icon={faCircleInfo} className='text-muted' />
              </a>
            </OverlayTrigger>{' '}
            speed : {speed.toString()} days
          </h4>

          <h4 className='col'>
            {' '}
            <OverlayTrigger placement='right' overlay={aprPopover}>
              <a>
                <FontAwesomeIcon icon={faCircleInfo} className='text-muted' />
              </a>
            </OverlayTrigger>{' '}
            apr : {apr.toString()} %
          </h4>
        </div>{' '}
        <div>
          <h4>
            <OverlayTrigger placement='right' overlay={allTimeRewardsPopover}>
              <a>
                <FontAwesomeIcon icon={faCircleInfo} className='text-muted' />
              </a>
            </OverlayTrigger>{' '}
            All time rewarded :{' '}
            <FormatAmount
              value={tokenPosition.total_rewards.toString()}
              decimals={Number(rdecimals)}
              egldLabel={' '}
              data-testid='balance'
              digits={2}
            />
          </h4>
        </div>
        <div className='poolPosition'>
          {!address ? (
            <Link
              to={routeNames.unlock}
              className='btn btn-primary mt-3 text-white'
              data-testid='loginBtn'
            >
              Login
            </Link>
          ) : (
            <div className='text-black' data-testid='myPosition'>
              {stakingPosition < 1 ? (
                <div>
                  <h3>NO STAKE</h3>
                  <div>
                    <button
                      className='butLine'
                      onClick={() => setShowStake(true)}
                    >
                      STAKE
                    </button>{' '}
                  </div>
                </div>
              ) : (
                <div>
                  {' '}
                  <h3>MY STAKE</h3>
                  <div className='row'>
                    <h4 className='col'>
                      <OverlayTrigger
                        placement='right'
                        overlay={myStakePopover}
                      >
                        <a>
                          <FontAwesomeIcon
                            icon={faCircleInfo}
                            className='text-muted'
                          />
                        </a>
                      </OverlayTrigger>{' '}
                      Staked :{' '}
                      <FormatAmount
                        value={stakingPosition.toString()}
                        decimals={Number(sdecimals)}
                        egldLabel={' '}
                        data-testid='balance'
                        digits={2}
                      />
                    </h4>{' '}
                    <h4 className='col'>
                      {' '}
                      <OverlayTrigger
                        placement='right'
                        overlay={mySharePopover}
                      >
                        <a>
                          <FontAwesomeIcon
                            icon={faCircleInfo}
                            className='text-muted'
                          />
                        </a>
                      </OverlayTrigger>{' '}
                      Share of the pool : {rest} %
                    </h4>
                  </div>
                  {stakingPosition < 1 ? (
                    <>
                      <div>
                        <button
                          className='butLine'
                          onClick={() => setShowStake(true)}
                        >
                          STAKE
                        </button>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {stakingPosition > 0 ? (
                    <div className='col'>
                      <button
                        className='row butLine'
                        onClick={() => setShowStake(true)}
                      >
                        STAKE
                      </button>

                      <button
                        className='row butLine'
                        onClick={() => setShowUnstake(true)}
                      >
                        UNSTAKE
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                  {stakingPositionRewards > 0 ? (
                    <div>
                      <h4>
                        <OverlayTrigger
                          placement='right'
                          overlay={myRewardsPopover}
                        >
                          <a>
                            <FontAwesomeIcon
                              icon={faCircleInfo}
                              className='text-muted'
                            />
                          </a>
                        </OverlayTrigger>{' '}
                        Available rewards :{' '}
                        <FormatAmount
                          value={stakingPositionRewards.toString()}
                          decimals={Number(rdecimals)}
                          egldLabel={' '}
                          data-testid='balance'
                          digits={2}
                        />
                      </h4>
                      <ActionClaimRewards
                        stakedToken={stakedToken}
                        rewardedToken={rewardedToken}
                        rewardsAmount={stakingPositionRewards}
                      />{' '}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
