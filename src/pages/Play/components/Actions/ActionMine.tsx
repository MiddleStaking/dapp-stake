import * as React from 'react';
import { useEffect, useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractPlay } from 'config';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import { useGetUserESDT } from './../Actions/helpers/useGetUserESDT';

export const ActionMine = ({ payment, price }: any) => {
  const { hasPendingTransactions } = useGetPendingTransactions();
  const userEsdtBalance = useGetUserESDT();
  const balance = BigInt(
    userEsdtBalance
      .filter((token) => {
        return token.identifier === payment;
      })
      .map((token) => token.balance)
      .toString()
  );
  const decimals = userEsdtBalance
    .filter((token) => {
      return token.identifier === payment;
    })
    .map((token) => token.decimals);

  function bigToHexDec(d: bigint) {
    let result = '';
    result = d.toString(16);
    if (Math.abs(result.length % 2) == 1) {
      result = '0' + result;
    }
    return result;
  }

  console.log(balance);
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendUnstakeTransaction = async () => {
    const unstakeTransaction = {
      value: 0,
      data:
        'ESDTTransfer@' +
        Buffer.from(payment, 'utf8').toString('hex') +
        '@' +
        bigToHexDec(BigInt(price)) +
        '@' +
        Buffer.from('mine', 'utf8').toString('hex'),

      receiver: contractPlay,
      gasLimit: '5000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: unstakeTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing mine transaction',
        errorMessage: 'An error has occured mine',
        successMessage: 'Mine transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  return (
    <div>
      {!hasPendingTransactions ? (
        <div>
          {balance >= price ? (
            <>
              {' '}
              <button
                style={{ width: 'auto' }}
                className='goldButton butLineBig'
                onClick={sendUnstakeTransaction}
                disabled={false}
              >
                Pay{' '}
                <FormatAmount
                  value={price ? price.toString() : 0}
                  decimals={Number(18)}
                  egldLabel={payment}
                  data-testid='balance'
                  digits={2}
                />
                <br />
                and play MINE !
              </button>
            </>
          ) : (
            <>
              <button className='bouton-disabled' disabled={true}>
                <FormatAmount
                  value={balance.toString()}
                  decimals={Number(18)}
                  egldLabel={' '}
                  data-testid='balance'
                  digits={2}
                />
                /{' '}
                <FormatAmount
                  value={price ? price.toString() : 0}
                  decimals={Number(18)}
                  egldLabel={payment}
                  data-testid='balance'
                  digits={2}
                />
                <br />
              </button>
            </>
          )}
        </div>
      ) : (
        <div>
          <button className='btn'>Processing</button>
        </div>
      )}
    </div>
  );
};
