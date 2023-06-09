import * as React from 'react';
import { useState } from 'react';
import SwapModal from './../SwapModal';
import { Button } from './../../../../components/Design';
import { useGetPoolPosition } from '../Actions/helpers';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { HeaderMenuContext } from 'context/Header/HeaderMenuContext';

export const PoolSwapInfo = ({
  address,
  stakedToken,
  rewardedToken,
  userEsdtBalance
}: any) => {
  const [showStake, setShowStake] = useState(false);
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { setHeaderMenu } = React.useContext(HeaderMenuContext);

  const poolPosition = useGetPoolPosition(
    stakedToken,
    rewardedToken,
    showStake,
    hasPendingTransactions
  );

  return (
    <>
      <SwapModal
        userEsdtBalance={userEsdtBalance}
        poolPosition={poolPosition}
        first_token={stakedToken}
        second_token={rewardedToken}
        in_token={stakedToken}
        out_token={rewardedToken}
        onClose={() => {
          setHeaderMenu(true), setShowStake(false);
        }}
        show={showStake}
      />

      {address && poolPosition.first_token_amount > 100 && (
        <>
          <div className='my-stake-section3'>
            <div className='my-stake5'>
              <Button
                borderRadius={40}
                hasBorder={true}
                background={'black'}
                borderColor={['#BD37EC', '#1F67FF']}
                text={'Swap'}
                buttonWidth={'100%'}
                onClick={() => {
                  setHeaderMenu(false), setShowStake(true);
                }}
              />
            </div>

            <div className='buttons'></div>
          </div>
        </>
      )}
    </>
  );
};
