import * as React from 'react';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';

import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import { contractAddress } from 'config';
import {
  useGetTokenPosition,
  useGetStakingPosition,
  useGetStakingPositionRewards
} from './Actions/helpers';
import { ActionClaimRewards, ActionStake, ActionUnstake } from './Actions';

export const PoolInfo = ({
  stakedToken,
  rewardedToken,
  userEsdtBalance
}: any) => {
  const { address, account } = useGetAccountInfo();
  const tokenPosition = useGetTokenPosition(stakedToken, rewardedToken);

  const stakingPosition = useGetStakingPosition(stakedToken, rewardedToken);
  const stakingPositionRewards = useGetStakingPositionRewards(
    stakedToken,
    rewardedToken
  );

  let apr = BigInt(100);
  if (tokenPosition.total_stake > BigInt(0)) {
    apr =
      (BigInt(tokenPosition.balance) * apr) / BigInt(tokenPosition.total_stake);
  }
  let share = BigInt(10000);
  if (tokenPosition.total_stake > BigInt(0)) {
    share =
      (BigInt(stakingPosition) * share) / BigInt(tokenPosition.total_stake);
  }
  const rest = Number(share) / Number(100);

  return (
    <div className='text-white' data-testid='poolInfo'>
      <h3>POOL INFORMATIONS</h3>
      <div>
        <h3>Stake : {stakedToken}</h3>
        <h4>
          (i) staked :{' '}
          <FormatAmount
            value={tokenPosition.total_stake.toString()}
            egldLabel={' '}
            data-testid='staked'
          />
        </h4>
      </div>
      <div>
        <h3>Earn : {rewardedToken}</h3>{' '}
        <h4>
          (i) left :{' '}
          <FormatAmount
            value={tokenPosition.balance.toString()}
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
            egldLabel={' '}
            data-testid='balance'
          />
        </h4>
      </div>
      <div>
        <h4>(i) APR : {apr.toString()} %</h4>
      </div>
      {!address ? (
        <Link
          to={routeNames.unlock}
          className='btn btn-primary mt-3 text-white'
          data-testid='loginBtn'
        >
          Login
        </Link>
      ) : (
        <div className='text-white' data-testid='myPosition'>
          {!stakingPosition ? (
            <div>
              <h3>NO POSITION</h3>
              <div>
                <button>STAKE</button>
              </div>
            </div>
          ) : (
            <div>
              {' '}
              <h3>MY POSITION</h3>{' '}
              <div>
                <h4>(i) Share of the pool : {rest} %</h4>
              </div>
              <div>
                <h4>
                  (i) My stake :{' '}
                  <FormatAmount
                    value={stakingPosition.toString()}
                    egldLabel={' '}
                    data-testid='balance'
                  />
                </h4>
              </div>{' '}
              <div>
                <h4>
                  (i) Available rewards :{' '}
                  <FormatAmount
                    value={stakingPositionRewards.toString()}
                    egldLabel={' '}
                    data-testid='balance'
                  />
                </h4>
              </div>
              <div>
                <ActionStake
                  stakedToken={stakedToken}
                  rewardedToken={rewardedToken}
                  user_stake={userEsdtBalance}
                />{' '}
                <ActionUnstake
                  stakedToken={stakedToken}
                  rewardedToken={rewardedToken}
                  user_stake={stakingPosition}
                  user_unstake={stakingPosition}
                />{' '}
              </div>
              <ActionClaimRewards
                stakedToken={stakedToken}
                rewardedToken={rewardedToken}
                rewardsAmount={stakingPositionRewards}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
