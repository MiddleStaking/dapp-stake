import * as React from 'react';
import { useEffect, useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractAddress } from 'config';

export const ActionUnstake = ({
  stakedToken,
  rewardedToken,
  user_fund
}: any) => {
  const { hasPendingTransactions } = useGetPendingTransactions();

  function bigToHexDec(d: bigint) {
    let result = '';
    result = d.toString(16);
    if (Math.abs(result.length % 2) == 1) {
      result = '0' + result;
    }
    return result;
  }

  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendUnstakeTransaction = async () => {
    const unstakeTransaction = {
      value: 0,
      data:
        'unstake@' +
        Buffer.from(stakedToken, 'utf8').toString('hex') +
        '@' +
        Buffer.from(rewardedToken, 'utf8').toString('hex') +
        '@' +
        bigToHexDec(BigInt(user_fund)),

      receiver: contractAddress,
      gasLimit: '5000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: unstakeTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Unstake transaction',
        errorMessage: 'An error has occured Unstake',
        successMessage: 'Unstake transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const unstakeAllowed =
    user_fund != '0' && user_fund > 0 && !hasPendingTransactions;
  const notAllowedClass = unstakeAllowed ? '' : 'not-allowed disabled';

  return (
    <div>
      {user_fund !== undefined && (
        <>
          {!hasPendingTransactions ? (
            <div>
              <button
                style={{ width: 'auto' }}
                className='silverButton butLineBig'
                onClick={sendUnstakeTransaction}
              >
                Unstake
              </button>
            </div>
          ) : (
            <div className={notAllowedClass}>
              <button className='btn'>Processing</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
