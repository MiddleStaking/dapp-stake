import * as React from 'react';
import { useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractStake, defaultToken } from 'config';
import bigToHex from 'helpers/bigToHex';
import { Button } from './../../../../components/Design';
import { useGetUserESDT } from './../Actions/helpers/useGetUserESDT';

export const ActionRemovePoolFees = ({ stakedToken, rewardedToken }: any) => {
  const { hasPendingTransactions } = useGetPendingTransactions();
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
    const fundTransaction = {
      value: 0,
      data:
        'ESDTTransfer@' +
        Buffer.from(defaultToken, 'utf8').toString('hex') +
        '@' +
        bigToHex(BigInt(price)) +
        '@' +
        Buffer.from('removePoolFees', 'utf8').toString('hex') +
        '@' +
        Buffer.from(stakedToken, 'utf8').toString('hex') +
        '@' +
        Buffer.from(rewardedToken, 'utf8').toString('hex'),

      receiver: contractStake,
      gasLimit: '7000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: fundTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing remove fees transaction',
        errorMessage: 'An error has occured remove fees',
        successMessage: 'Remove fees transaction successful'
      },
      redirectAfterSign: false
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
