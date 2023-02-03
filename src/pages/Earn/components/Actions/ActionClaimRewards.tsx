import * as React from 'react';
import { useEffect, useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractAddress } from 'config';

export const ActionClaimRewards = ({
  stakedToken,
  rewardedToken,
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
        Buffer.from(stakedToken, 'utf8').toString('hex') +
        '@' +
        Buffer.from(rewardedToken, 'utf8').toString('hex'),
      receiver: contractAddress,
      gasLimit: '4000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: claimTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Claim transaction',
        errorMessage: 'An error has occured Claim Ping',
        successMessage: 'Claim transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const claimAllowed = rewardsAmount != '0' && !hasPendingTransactions;
  const notAllowedClass = claimAllowed ? '' : 'not-allowed disabled';

  return (
    <div>
      {rewardsAmount !== undefined && rewardsAmount > 0 && (
        <>
          {!hasPendingTransactions ? (
            <div>
              <button onClick={sendClaimTransaction} className='butLineBig'>
                Claim Rewards
              </button>
            </div>
          ) : (
            <div className={notAllowedClass}>
              <button className='butLineBig'>Processing</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
