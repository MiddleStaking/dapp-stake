import * as React from 'react';
import { useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractMint, defaultToken } from 'config';
import { Button } from '../../../../components/Design';
import bigToHex from 'helpers/bigToHex';
import { Address } from '@multiversx/sdk-core/out';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';

export const ActionMint = ({
  method,
  bigValue,
  disabled,
  nonce,
  collection
}: any) => {
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { address } = useGetAccountInfo();

  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendMintTransaction = async () => {
    let mintTransaction = {};

    if (method == 'egld') {
      mintTransaction = {
        value: bigValue.toString(),
        data: 'buySft',
        receiver: contractMint,
        gasLimit: '10000000'
      };
    }

    if (method == 'mid') {
      mintTransaction = {
        value: 0,
        data:
          'ESDTTransfer@' +
          Buffer.from(defaultToken, 'utf8').toString('hex') +
          '@' +
          bigToHex(bigValue) +
          '@' +
          Buffer.from('buySft', 'utf8').toString('hex'),
        receiver: contractMint,
        gasLimit: '14000000'
      };
    }

    if (method == 'gift') {
      const addressTobech32 = new Address(contractMint);
      mintTransaction = {
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
          Buffer.from('buyNft', 'utf8').toString('hex'),
        receiver: address,
        gasLimit: '60000000'
      };
    }

    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: mintTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Mint transaction',
        errorMessage: 'An error has occured Mint',
        successMessage: 'Mint transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  return (
    <>
      {!hasPendingTransactions && (
        <>
          <Button
            buttonWidth='100%'
            borderRadius={40}
            background={['#BD37EC', '#1F67FF']}
            text='Open Gift'
            onClick={sendMintTransaction}
            disabled={disabled}
          />
        </>
      )}
    </>
  );
};
