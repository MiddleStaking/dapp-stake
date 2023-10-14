import * as React from 'react';
import { useEffect, useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractNftStake } from 'config';
import { Button } from './../../../../components/Design';

export const ActionFund = ({
  stakedToken,
  rewardedToken,
  user_fund,
  speed,
  nonce,
  vesting,
  unbounding,
  agreement
}: any) => {
  const { hasPendingTransactions } = useGetPendingTransactions();

  function bigToHexDec(d: bigint) {
    let result = '';
    result = d.toString(16);
    if (Math.abs(result.length % 2) == 1) {
      result = '0' + result;
    }
    return result;
  }

  function toHexDec(d: number) {
    let result = '';
    result = Number(d).toString(16);
    if (Math.abs(result.length % 2) == 1) {
      result = '0' + result;
    }
    return result;
    //return  ((Number(d).toString(16)));//.slice(-2).toUpperCase();
  }

  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendFundTransaction = async () => {
    const fundTransaction = {
      value: 0,
      data:
        'ESDTTransfer@' +
        Buffer.from(rewardedToken, 'utf8').toString('hex') +
        '@' +
        bigToHexDec(BigInt(user_fund)) +
        '@' +
        Buffer.from('fund', 'utf8').toString('hex') +
        '@' +
        Buffer.from(stakedToken, 'utf8').toString('hex') +
        '@' +
        toHexDec(speed) +
        '@' +
        toHexDec(nonce) +
        '@' +
        toHexDec(vesting) +
        '@' +
        toHexDec(unbounding),

      receiver: contractNftStake,
      gasLimit: '14000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: fundTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Fund transaction',
        errorMessage: 'An error has occured Fund',
        successMessage: 'Fund transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const unstakeAllowed =
    user_fund != '0' && user_fund > 0 && !hasPendingTransactions;
  const notAllowedClass = unstakeAllowed ? '' : 'not-allowed disabled';

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
                text='Lock tokens'
                onClick={sendFundTransaction}
                disabled={user_fund == 0 || stakedToken === '' || !agreement}
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
