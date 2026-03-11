import * as React from 'react';
import { useState } from 'react';
import { useGetPendingTransactions } from 'lib';
import { signAndSendTransactions } from 'helpers';
import {
  Address,
  GAS_PRICE,
  Transaction,
  useGetNetworkConfig,
  useGetAccountInfo
} from 'lib';
import { contractNftStakeV2, defaultToken } from 'config';
import bigToHex from 'helpers/bigToHex';
import { Button } from './../../../../components/Design';

export const ActionWhitelistCollection = ({
  collectionId,
  price
}: {
  collectionId: string;
  price: any;
}) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.length > 0;

  const [, setTransactionSessionId] = useState<string | null>(null);

  const sendWhitelistTransaction = async () => {
    const payload =
      'ESDTTransfer@' +
      Buffer.from(defaultToken, 'utf8').toString('hex') +
      '@' +
      bigToHex(BigInt(price)) +
      '@' +
      Buffer.from('whitelistCollection', 'utf8').toString('hex') +
      '@' +
      Buffer.from(collectionId, 'utf8').toString('hex');

    const transaction = new Transaction({
      value: BigInt(0),
      data: new TextEncoder().encode(payload),
      receiver: new Address(contractNftStakeV2),
      gasLimit: BigInt('14000000'), // Adjust if needed
      gasPrice: BigInt(GAS_PRICE),
      chainID: network.chainId,
      sender: new Address(address),
      version: 1
    });

    const sessionId = await signAndSendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing Whitelist Collection transaction',
        errorMessage: 'An error has occured during Whitelisting',
        successMessage: 'Whitelist Collection transaction successful'
      }
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
          text={`Pay & Whitelist`}
          onClick={sendWhitelistTransaction}
          disabled={!collectionId || !price}
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
