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

import { contractNftStake } from 'config';
import bigToHex from 'helpers/bigToHex';
import toHex from 'helpers/toHex';
import { Button } from './../../../../components/Design';

export const ActionClose = ({ poolID }: any) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.length > 0;
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendFundTransaction = async () => {
    const payload = 'close@' + toHex(poolID);
    const transaction = new Transaction({
      value: BigInt(0),
      data: new TextEncoder().encode(payload),
      receiver: new Address(contractNftStake),
      gasLimit: BigInt('14000000'),

      gasPrice: BigInt(GAS_PRICE),
      chainID: network.chainId,
      sender: new Address(address),
      version: 1
    });

    const sessionId = await signAndSendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing Fund transaction',
        errorMessage: 'An error has occured Fund',
        successMessage: 'Fund transaction successful'
      }
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };
  return (
    <>
      <>
        {!hasPendingTransactions ? (
          <>
            <Button
              buttonWidth='100%'
              borderRadius={40}
              background={['#BD37EC', '#1F67FF']}
              text='CLOSE POOL'
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
    </>
  );
};
