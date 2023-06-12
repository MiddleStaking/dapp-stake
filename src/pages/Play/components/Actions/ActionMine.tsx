import * as React from 'react';
import { useState } from 'react';
import { faDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractPlay } from 'config';
import { Button } from './../../../../components/Design';
import { useGetUserESDT } from './../../../../pages/Earn/components/Actions/helpers/useGetUserESDT';

export const ActionMine = ({ payment_esdt_info, price }: any) => {
  const pdecimals = payment_esdt_info?.decimals
    ? payment_esdt_info?.decimals
    : 0;

  const { hasPendingTransactions } = useGetPendingTransactions();
  const userEsdtBalance = useGetUserESDT();
  const balance = BigInt(
    userEsdtBalance
      .filter((token) => {
        return token.identifier === payment_esdt_info?.identifier;
      })
      .map((token) => token.balance)
      .toString()
  );

  function bigToHexDec(d: bigint) {
    let result = '';
    result = d.toString(16);
    if (Math.abs(result.length % 2) == 1) {
      result = '0' + result;
    }
    return result;
  }

  const dollar_price_fixed = BigInt(
    payment_esdt_info?.price
      ? (payment_esdt_info?.price * 100000000).toFixed()
      : 0
  );
  const dollar_value = BigInt(
    (dollar_price_fixed * BigInt(price)) / BigInt(100000000)
  );
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendUnstakeTransaction = async () => {
    const unstakeTransaction = {
      value: 0,
      data:
        'ESDTTransfer@' +
        Buffer.from(payment_esdt_info?.identifier, 'utf8').toString('hex') +
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
    <div className='center' style={{ width: '300px' }}>
      {!hasPendingTransactions ? (
        <div>
          {balance >= price && price > 0 ? (
            <>
              Play for{' '}
              <FormatAmount
                value={price ? price.toString() : 0}
                decimals={Number(pdecimals)}
                egldLabel={payment_esdt_info?.identifier}
                data-testid='balance'
                digits={2}
              />{' '}
              {payment_esdt_info?.price && (
                <>
                  <br />~{' '}
                  <FormatAmount
                    value={dollar_value.toString()}
                    decimals={Number(pdecimals)}
                    egldLabel={' '}
                    data-testid='balance'
                    digits={2}
                  />
                  <FontAwesomeIcon icon={faDollar} />
                </>
              )}
              <div style={{ left: '100px', position: 'relative' }}>
                <Button
                  buttonWidth='100px'
                  hasBorder={true}
                  borderRadius={40}
                  background={['#BD37EC', '#1F67FF']}
                  borderColor={['#BD37EC', '#1F67FF']}
                  text={'Play'}
                  onClick={sendUnstakeTransaction}
                />
              </div>
            </>
          ) : (
            <>
              <FormatAmount
                value={balance.toString()}
                decimals={Number(pdecimals)}
                egldLabel={' '}
                data-testid='balance'
                digits={2}
              />
              /{' '}
              <FormatAmount
                value={price ? price.toString() : 0}
                decimals={Number(pdecimals)}
                egldLabel={payment_esdt_info?.identifier}
                data-testid='balance'
                digits={2}
              />
              {payment_esdt_info?.price && (
                <>
                  <br />~{' '}
                  <FormatAmount
                    value={dollar_value.toString()}
                    decimals={Number(pdecimals)}
                    egldLabel={' '}
                    data-testid='balance'
                    digits={2}
                  />
                  <FontAwesomeIcon icon={faDollar} />
                </>
              )}
              <Button
                buttonWidth=''
                hasBorder={true}
                borderRadius={40}
                background={['#BD37EC', '#1F67FF']}
                borderColor={['#BD37EC', '#1F67FF']}
                text={'Low balance'}
                disabled={true}
              />
            </>
          )}
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
