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
import { contractStake, defaultToken } from 'config';
import bigToHex from 'helpers/bigToHex';
import { Button } from './../../../../components/Design';
import { useGetUserESDT } from './../Actions/helpers/useGetUserESDT';

export const ActionRemovePoolFees = ({ stakedToken, rewardedToken }: any) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.length > 0;

  const userEsdtBalance = useGetUserESDT();
  const price = BigInt('2000000000000000000000');
  const balance = BigInt(
    userEsdtBalance
      .filter((token) => {
        return token.identifier === defaultToken;
      })
      .map((token) => token.balance)
      .toString()
  );

  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendFundTransaction = async () => {
    const payload =
      'ESDTTransfer@' +
      Buffer.from(defaultToken, 'utf8').toString('hex') +
      '@' +
      bigToHex(BigInt(price)) +
      '@' +
      Buffer.from('removePoolFees', 'utf8').toString('hex') +
      '@' +
      Buffer.from(stakedToken, 'utf8').toString('hex') +
      '@' +
      Buffer.from(rewardedToken, 'utf8').toString('hex');
    const transaction = new Transaction({
      value: BigInt(0),
      data: new TextEncoder().encode(payload),
      receiver: new Address(contractStake),
      gasLimit: BigInt('7000000'),

      gasPrice: BigInt(GAS_PRICE),
      chainID: network.chainId,
      sender: new Address(address),
      version: 1
    });

    const sessionId = await signAndSendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing remove fees transaction',
        errorMessage: 'An error has occured remove fees',
        successMessage: 'Remove fees transaction successful'
      }
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  return (
    <>
      {balance !== undefined && (
        <>
          {!hasPendingTransactions ? (
            <>
              <Button
                buttonWidth='100%'
                borderRadius={40}
                background={['#BD37EC', '#1F67FF']}
                text={balance >= price ? 'Remove fees' : 'Low balance'}
                onClick={sendFundTransaction}
                disabled={balance <= price}
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
