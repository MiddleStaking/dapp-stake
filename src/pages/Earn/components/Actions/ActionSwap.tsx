import * as React from 'react';
import { useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractStake, defaultToken } from 'config';
import bigToHex from 'helpers/bigToHex';
import { Button } from './../../../../components/Design';

export const ActionSwap = ({
  first_token,
  second_token,
  in_token,
  user_fund,
  min_out,
  price_impact
}: any) => {
  const { hasPendingTransactions } = useGetPendingTransactions();
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendStakeTransaction = async () => {
    let stakeTransaction = {
      value: 0,
      data:
        'ESDTTransfer@' +
        Buffer.from(in_token, 'utf8').toString('hex') +
        '@' +
        bigToHex(BigInt(user_fund)) +
        '@' +
        Buffer.from('swap', 'utf8').toString('hex') +
        '@' +
        Buffer.from(first_token, 'utf8').toString('hex') +
        '@' +
        Buffer.from(second_token, 'utf8').toString('hex') +
        '@' +
        bigToHex(BigInt(min_out)),
      receiver: contractStake,
      gasLimit: '5200000'
    };

    if (
      in_token != defaultToken &&
      first_token != defaultToken &&
      second_token != defaultToken
    ) {
      stakeTransaction = {
        value: 0,
        data:
          'ESDTTransfer@' +
          Buffer.from(in_token, 'utf8').toString('hex') +
          '@' +
          bigToHex(BigInt(user_fund)) +
          '@' +
          Buffer.from('dualSwap', 'utf8').toString('hex') +
          '@' +
          Buffer.from(
            in_token == first_token ? first_token : second_token,
            'utf8'
          ).toString('hex') +
          '@' +
          Buffer.from(
            in_token == first_token ? second_token : first_token,
            'utf8'
          ).toString('hex') +
          '@' +
          bigToHex(BigInt(0)),
        receiver: contractStake,
        gasLimit: '5200000'
      };
    }

    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: stakeTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Swap transaction',
        errorMessage: 'An error has occured Swap',
        successMessage: 'Swap transaction successful'
      },
      redirectAfterSign: false
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
              {price_impact > 10 ? (
                <Button
                  buttonWidth='100%'
                  borderRadius={40}
                  background={['rgb(236 55 55)', 'rgb(236 55 55)']}
                  borderColor={'black'}
                  text='LOW LIQUIDITY'
                  onClick={sendStakeTransaction}
                  disabled={false}
                />
              ) : (
                <Button
                  buttonWidth='100%'
                  borderRadius={40}
                  background={['#BD37EC', '#1F67FF']}
                  text='Swap tokens'
                  onClick={sendStakeTransaction}
                  disabled={user_fund == 0}
                />
              )}
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
