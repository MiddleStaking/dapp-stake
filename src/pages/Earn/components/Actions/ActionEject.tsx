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

import { contractStake } from 'config';
import bigToHex from 'helpers/bigToHex';
import { Button } from './../../../../components/Design';

export const ActionEject = ({ staked_token, rewarded_token }: any) => {
  const size = 1;

  //GAS
  // 1 -> 6,000,000 == ok -> 5,057,909 used
  // 4 -> 6,000,000 == fail
  // 4 -> 12,000,000 == ok 9,937,188 used
  // 7 -> 16,000,000 == ok 14,884,778 used
  // 21 -> 6,000,000 == fail
  // 21 -> 12,000,000 == fail
  // 21 -> 50,000,000 == ok 37,118,672 used

  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.length > 0;
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendTransaction = async () => {
    const payload =
      'ejectTokens@' +
      Buffer.from(staked_token, 'utf8').toString('hex') +
      '@' +
      Buffer.from(rewarded_token, 'utf8').toString('hex') +
      '@' +
      bigToHex(BigInt(size));
    const transaction = new Transaction({
      value: BigInt(0),
      data: new TextEncoder().encode(payload),
      receiver: new Address(contractStake),
      gasLimit: BigInt('6000000'),

      gasPrice: BigInt(GAS_PRICE),
      chainID: network.chainId,
      sender: new Address(address),
      version: 1
    });

    const sessionId = await signAndSendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing eject transaction',
        errorMessage: 'An error has occured eject',
        successMessage: 'Eject transaction successful'
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
              text={'Eject User (' + size + ')'}
              onClick={sendTransaction}
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
