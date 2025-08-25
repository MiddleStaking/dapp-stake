import * as React from 'react';
import { useState } from 'react';
import { useGetPendingTransactions } from 'lib';
import { signAndSendTransactions } from 'helpers';
import {
  AbiRegistry,
  Address,
  GAS_PRICE,
  SmartContractTransactionsFactory,
  Transaction,
  TransactionsFactoryConfig,
  useGetAccount,
  useGetNetworkConfig,
  useGetAccountInfo
} from 'lib';
import { contractSwap } from 'config';
import bigToHex from 'helpers/bigToHex';
import { Button } from './../../../../components/Design';

export const ActionLiquidRemove = ({
  first_token,
  second_token,
  lp_token,
  lp_amount
}: any) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.length > 0;
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendStakeTransaction = async () => {
    const payload =
      'ESDTTransfer@' +
      Buffer.from(lp_token, 'utf8').toString('hex') +
      '@' +
      bigToHex(BigInt(lp_amount)) +
      '@' +
      Buffer.from('removeLp', 'utf8').toString('hex') +
      '@' +
      Buffer.from(first_token, 'utf8').toString('hex') +
      '@' +
      Buffer.from(second_token, 'utf8').toString('hex');
    const transaction = new Transaction({
      value: BigInt(0),
      data: new TextEncoder().encode(payload),
      receiver: new Address(contractSwap),
      gasLimit: BigInt('5200000'),

      gasPrice: BigInt(GAS_PRICE),
      chainID: network.chainId,
      sender: new Address(address),
      version: 1
    });

    const sessionId = await signAndSendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing removeLp transaction',
        errorMessage: 'An error has occured removeLp',
        successMessage: 'removeLp transaction successful'
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
