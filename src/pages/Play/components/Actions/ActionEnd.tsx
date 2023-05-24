import * as React from 'react';
import { useEffect, useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractPlay } from 'config';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import { useGetUserESDT } from './../../../../pages/Earn/components/Actions/helpers/useGetUserESDT';
import { Button } from './../../../../components/Design';

export const ActionEnd = () => {
  const { hasPendingTransactions } = useGetPendingTransactions();
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendUnstakeTransaction = async () => {
    const unstakeTransaction = {
      value: 0,
      data: 'claim',
      receiver: contractPlay,
      gasLimit: '5000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: unstakeTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing mine transaction',
        errorMessage: 'An error has occured mine',
        successMessage: 'Mine transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  return (
    <div>
      {!hasPendingTransactions ? (
        <div>
          <>
            <Button
              buttonWidth='100px'
              hasBorder={true}
              borderRadius={40}
              background={['#BD37EC', '#1F67FF']}
              borderColor={['#BD37EC', '#1F67FF']}
              text={'MINE !!!!'}
              onClick={sendUnstakeTransaction}
            />{' '}
          </>
        </div>
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
    </div>
  );
};
