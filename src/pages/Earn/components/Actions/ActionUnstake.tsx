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

export const ActionUnstake = ({
  staked_token,
  rewarded_token,
  user_fund
}: any) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.length > 0;
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendUnstakeTransaction = async () => {
    const payload =
      'unstake@' +
      Buffer.from(staked_token, 'utf8').toString('hex') +
      '@' +
      Buffer.from(rewarded_token, 'utf8').toString('hex') +
      '@' +
      bigToHex(user_fund);
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
        processingMessage: 'Processing Unstake transaction',
        errorMessage: 'An error has occured Unstake',
        successMessage: 'Unstake transaction successful'
      }
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  return (
    <>
      {user_fund !== undefined && (
        <>
          {!hasPendingTransactions ? (
            <>
              <Button
                buttonWidth='100%'
                borderRadius={40}
                background={['#BD37EC', '#1F67FF']}
                text='Unstake tokens'
                onClick={sendUnstakeTransaction}
                disabled={user_fund == 0}
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
      )}
    </>
  );
};
