import * as React from 'react';
import { useEffect, useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractAddress } from 'config';

export const ActionStake = ({
  stakedToken,
  rewardedToken,
  user_stake
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

  const sendStakeTransaction = async () => {
    const stakeTransaction = {
      value: 0,
      data:
        'ESDTTransfer@' +
        Buffer.from(stakedToken, 'utf8').toString('hex') +
        '@' +
        bigToHexDec(BigInt(user_stake)) +
        '@' +
        Buffer.from('stake', 'utf8').toString('hex') +
        '@' +
        Buffer.from(rewardedToken, 'utf8').toString('hex'),

      receiver: contractAddress,
      gasLimit: '5000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: stakeTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Stake transaction',
        errorMessage: 'An error has occured Stake',
        successMessage: 'Stake transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const stakeAllowed = user_stake != '0' && !hasPendingTransactions;
  const notAllowedClass = stakeAllowed ? '' : 'not-allowed disabled';

  return (
    <div>
      {user_stake !== undefined && (
        <>
          {!hasPendingTransactions ? (
            <div onClick={sendStakeTransaction}>
              <button>Stake</button>
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
