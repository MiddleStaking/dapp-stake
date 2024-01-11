import * as React from 'react';
import { useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractNftStake } from 'config';
import bigToHex from 'helpers/bigToHex';
import toHex from 'helpers/toHex';
import { Button } from './../../../../components/Design';

export const ActionFund = ({
  stakedToken,
  rewardedToken,
  user_fund,
  speed,
  nonce,
  vesting,
  unbounding,
  agreement
}: any) => {
  const { hasPendingTransactions } = useGetPendingTransactions();

  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendFundTransaction = async () => {
    const fundTransaction = {
      value: 0,
      data:
        'ESDTTransfer@' +
        Buffer.from(rewardedToken, 'utf8').toString('hex') +
        '@' +
        bigToHex(BigInt(user_fund)) +
        '@' +
        Buffer.from('fund', 'utf8').toString('hex') +
        '@' +
        Buffer.from(stakedToken, 'utf8').toString('hex') +
        '@' +
        toHex(speed) +
        '@' +
        toHex(nonce) +
        '@' +
        toHex(vesting) +
        '@' +
        toHex(unbounding),

      receiver: contractNftStake,
      gasLimit: '14000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: fundTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Fund transaction',
        errorMessage: 'An error has occured Fund',
        successMessage: 'Fund transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };
  return (
    <>
      {user_fund !== undefined && (
        <>
          {!hasPendingTransactions ? (
            <>
              <Button
                buttonWidth='100%'
                borderRadius={40}
                background={['#BD37EC', '#1F67FF']}
                text='Lock tokens'
                onClick={sendFundTransaction}
                disabled={user_fund == 0 || stakedToken === '' || !agreement}
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
    </>
  );
};
