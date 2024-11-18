import * as React from 'react';
import { useState } from 'react';
import { Address } from '@multiversx/sdk-core/out';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractDistrib } from 'config';
import { Button } from './../../../../components/Design';

export const ActionAdd = (datas: any) => {
  // console.log('datas:', datas);
  const { hasPendingTransactions } = useGetPendingTransactions();
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);
  const { address } = useGetAccount();
  const contract_address = new Address(contractDistrib).hex();

  const sendStakeTransaction = async () => {
    const stakeTransaction = [];
    for (const data of datas.datas) {
      stakeTransaction.push({
        value: 0,
        data: data,
        receiver: contractDistrib,
        gasLimit: '80000000'
      });
    }

    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: stakeTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing add transaction',
        errorMessage: 'An error has occured add',
        successMessage: 'add transaction successful'
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
        <>
          <Button
            buttonWidth='100%'
            borderRadius={40}
            background={['#BD37EC', '#1F67FF']}
            borderColor={'black'}
            text='add receiver'
            onClick={sendStakeTransaction}
            disabled={false}
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
  );
};
