import * as React from 'react';
import { useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractSwap } from 'config';
import bigToHex from 'helpers/bigToHex';
import { Button } from './../../../../components/Design';

export const ActionLiquidRemove = ({
  first_token,
  second_token,
  lp_token,
  lp_amount
}: any) => {
  const { hasPendingTransactions } = useGetPendingTransactions();
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendStakeTransaction = async () => {
    const stakeTransaction = {
      value: 0,
      data:
        'ESDTTransfer@' +
        Buffer.from(lp_token, 'utf8').toString('hex') +
        '@' +
        bigToHex(BigInt(lp_amount)) +
        '@' +
        Buffer.from('removeLp', 'utf8').toString('hex') +
        '@' +
        Buffer.from(first_token, 'utf8').toString('hex') +
        '@' +
        Buffer.from(second_token, 'utf8').toString('hex'),
      receiver: contractSwap,
      gasLimit: '5200000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: stakeTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing removeLp transaction',
        errorMessage: 'An error has occured removeLp',
        successMessage: 'removeLp transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  return (
    <>
      {!hasPendingTransactions ? (
        <Button
          buttonWidth='100%'
          borderRadius={40}
          background={['#BD37EC', '#1F67FF']}
          borderColor={'black'}
          text='remove Lp'
          onClick={sendStakeTransaction}
          disabled={false}
        />
      ) : (
        <Button
          buttonWidth='100%'
          borderRadius={40}
          background={['#BD37EC', '#1F67FF']}
          borderColor={'black'}
          text='Processing'
          disabled={true}
        />
      )}
    </>
  );
};
