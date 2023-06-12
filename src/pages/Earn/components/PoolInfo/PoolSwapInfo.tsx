import * as React from 'react';
import { useState } from 'react';
import SwapModal from './../SwapModal';
import { Button } from './../../../../components/Design';
import { useGetPoolPosition } from '../Actions/helpers';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { defaultToken } from 'config';

export const PoolSwapInfo = ({
  address,
  stakedToken,
  rewardedToken,
  userEsdtBalance,
  isDual
}: any) => {
  const [showStake, setShowStake] = useState(false);
  const { hasPendingTransactions } = useGetPendingTransactions();

  const firstPoolPosition = useGetPoolPosition(
    defaultToken,
    rewardedToken == defaultToken ? stakedToken : rewardedToken,
    showStake,
    hasPendingTransactions,
    true
  );
  const secondPoolPosition = useGetPoolPosition(
    defaultToken,
    stakedToken,
    showStake,
    hasPendingTransactions,
    isDual
  );

  return (
    <>
      <SwapModal
        userEsdtBalance={userEsdtBalance}
        firstPoolPosition={firstPoolPosition}
        secondPoolPosition={secondPoolPosition}
        first_token={stakedToken}
        second_token={rewardedToken}
        in_token={stakedToken}
        out_token={rewardedToken}
        onClose={() => setShowStake(false)}
        show={showStake}
        isDual={isDual}
      />

      {address && firstPoolPosition.first_token_amount > 100 && (
        <>
          <Button
            borderRadius={40}
            hasBorder={true}
            background={'black'}
            borderColor={['#BD37EC', '#1F67FF']}
            text={'Swap'}
            buttonWidth={'100%'}
            onClick={() => setShowStake(true)}
          />
        </>
      )}
    </>
  );
};
