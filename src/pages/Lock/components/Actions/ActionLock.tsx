import * as React from 'react';
import { useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contracts } from 'config';
import bigToHex from 'helpers/bigToHex';
import toHex from 'helpers/toHex';
import { Button } from '../../../../components/Design';
import { Address } from '@multiversx/sdk-core/out';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';

export const ActionLock = ({ collection, nonce }: any) => {
  const { hasPendingTransactions } = useGetPendingTransactions();

  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const addressTobech32 = new Address(contracts.lockGraou);
  const { address } = useGetAccountInfo();

  const sendFundTransaction = async () => {
    const fundTransaction = {
      value: 0,
      data:
        'ESDTNFTTransfer@' +
        Buffer.from(collection, 'utf8').toString('hex') +
        '@' +
        bigToHex(BigInt(nonce)) +
        '@' +
        bigToHex(BigInt(1)) +
        '@' +
        addressTobech32.hex() +
        '@' +
        Buffer.from('lock', 'utf8').toString('hex'),

      receiver: address,
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
      {!hasPendingTransactions ? (
        <>
          <Button
            buttonWidth='100%'
            borderRadius={40}
            background={['#BD37EC', '#1F67FF']}
            text='Lock sft'
            onClick={sendFundTransaction}
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
