import * as React from 'react';
import { useState } from 'react';
import { Address } from '@multiversx/sdk-core/out';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractDistrib } from 'config';
import bigToHex from 'helpers/bigToHex';
import { Button } from './../../../../components/Design';
import toHex from 'helpers/toHex';

export const ActionDeposit = ({ tab, collection, nonce, qty }: any) => {
  const { hasPendingTransactions } = useGetPendingTransactions();
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);
  const { address } = useGetAccount();
  const contract_address = new Address(contractDistrib).hex();
  console.log('exec@', tab);
  const sendStakeTransaction = async () => {
    // const stakeTransaction = [];
    // stakeTransaction.push({
    //   value: 0,
    //   data: 'graou@' + toHex(tab),
    //   receiver: contractDistrib,
    //   gasLimit: '62000000'
    // });
    const addressTobech32 = new Address(contractDistrib);

    const stakeTransaction = {
      value: 0,
      data:
        'ESDTNFTTransfer@' +
        Buffer.from(collection, 'utf8').toString('hex') +
        '@' +
        bigToHex(BigInt(nonce)) +
        '@' +
        bigToHex(BigInt(qty)) +
        '@' +
        addressTobech32.hex() +
        '@' +
        Buffer.from('deposit', 'utf8').toString('hex') +
        '@' +
        toHex(tab),

      receiver: address,
      gasLimit: '7000000'
    };

    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: stakeTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing exec transaction',
        errorMessage: 'An error has occured exec',
        successMessage: 'exec transaction successful'
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
            text='Deposit'
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
