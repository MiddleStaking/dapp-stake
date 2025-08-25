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
import { contractPlay } from 'config';
import { Button } from './../../../../components/Design';

export const ActionEnd = () => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.length > 0;
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendUnstakeTransaction = async () => {
    const payload = 'claim';
    const transaction = new Transaction({
      value: BigInt(0),
      data: new TextEncoder().encode(payload),
      receiver: new Address(contractPlay),
      gasLimit: BigInt('5000000'),

      gasPrice: BigInt(GAS_PRICE),
      chainID: network.chainId,
      sender: new Address(address),
      version: 1
    });

    const sessionId = await signAndSendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing mine transaction',
        errorMessage: 'An error has occured mine',
        successMessage: 'Mine transaction successful'
      }
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
