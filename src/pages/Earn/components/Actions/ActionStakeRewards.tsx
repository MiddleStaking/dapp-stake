import * as React from 'react';
import { useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractStake } from 'config';
import { Button } from './../../../../components/Design';

export const ActionStakeRewards = ({ staked_token, rewardsAmount }: any) => {
  const { hasPendingTransactions } = useGetPendingTransactions();

  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendStakeRewardsTransaction = async () => {
    const stakeRewardsTransaction = {
      value: 0,
      data: 'stakeRewards@' + Buffer.from(staked_token, 'utf8').toString('hex'),
      receiver: contractStake,
      gasLimit: '4000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: stakeRewardsTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Stake Rewards transaction',
        errorMessage: 'An error has occured Stake Rewards transaction',
        successMessage: 'Stake Rewards transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  return (
    <div className='center' style={{ width: '100%' }}>
      {rewardsAmount !== undefined && rewardsAmount > 0 && (
        <>
          {!hasPendingTransactions ? (
            <>
              <Button
                buttonWidth='100%'
                hasBorder={true}
                borderRadius={40}
                background={'black'}
                borderColor={['#BD37EC', '#1F67FF']}
                text='Reinvest my rewards'
                onClick={sendStakeRewardsTransaction}
              />
            </>
          ) : (
            <>
              <Button
                buttonWidth='100%'
                borderRadius={40}
                background={['#BD37EC', '#1F67FF']}
                borderColor={'black'}
                text='Processing'
                disabled={true}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};
