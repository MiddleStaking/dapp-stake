import * as React from 'react';
import { useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractStake } from 'config';
import { Button } from './../../../../components/Design';

export const ActionClaimRewards = ({
  staked_token,
  rewarded_token,
  rewardsAmount
}: any) => {
  const { hasPendingTransactions } = useGetPendingTransactions();

  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendClaimTransaction = async () => {
    const claimTransaction = {
      value: 0,
      data:
        'claimRewards@' +
        Buffer.from(staked_token, 'utf8').toString('hex') +
        '@' +
        Buffer.from(rewarded_token, 'utf8').toString('hex'),
      receiver: contractStake,
      gasLimit: '5000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: claimTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing claimRewards transaction',
        errorMessage: 'An error has occured claimRewards transaction',
        successMessage: 'claimRewards transaction successful'
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
                borderRadius={40}
                background={['#BD37EC', '#1F67FF']}
                borderColor={'black'}
                text='Claim my rewards'
                onClick={sendClaimTransaction}
              />
            </>
          ) : (
            <>
              {' '}
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
