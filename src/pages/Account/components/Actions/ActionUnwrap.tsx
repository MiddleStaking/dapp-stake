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
import bigToHex from 'helpers/bigToHex';
import { Button } from './../../../../components/Design';

const shard0 = 'erd1qqqqqqqqqqqqqpgqvc7gdl0p4s97guh498wgz75k8sav6sjfjlwqh679jy';
const shard1 = 'erd1qqqqqqqqqqqqqpgqhe8t5jewej70zupmh44jurgn29psua5l2jps3ntjj3';
const shard2 = 'erd1qqqqqqqqqqqqqpgqmuk0q2saj0mgutxm4teywre6dl8wqf58xamqdrukln';
export const ActionUnwrap = ({ user_fund, account }: any) => {
  let contractAddress = shard0;
  if (account.shard == 1) {
    contractAddress = shard1;
  }
  if (account.shard == 2) {
    contractAddress = shard2;
  }

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
      Buffer.from('WEGLD-bd4d79', 'utf8').toString('hex') +
      '@' +
      bigToHex(BigInt(user_fund)) +
      '@' +
      Buffer.from('unwrapEgld', 'utf8').toString('hex');
    const transaction = new Transaction({
      value: BigInt(0),
      data: new TextEncoder().encode(payload),
      receiver: new Address(contractAddress),
      gasLimit: BigInt('4200000'),

      gasPrice: BigInt(GAS_PRICE),
      chainID: network.chainId,
      sender: new Address(address),
      version: 1
    });

    const sessionId = await signAndSendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing Unwrap transaction',
        errorMessage: 'An error has occured Unwrap',
        successMessage: 'Unwrap transaction successful'
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
                text='Unwrap EGLD'
                onClick={sendStakeTransaction}
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
