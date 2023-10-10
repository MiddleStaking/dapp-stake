import * as React from 'react';
import { useEffect, useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractMint } from 'config';
import { Button } from '../../../../components/Design';
import bigToHex from 'helpers/bigToHex';

export const ActionMint = ({ user_fund }: any) => {
  const { hasPendingTransactions } = useGetPendingTransactions();

  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendMintTransaction = async () => {
    const mintTransaction = {
      value: '10000000000000000',
      data: 'buySft',
      receiver: contractMint,
      gasLimit: '5200000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: mintTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Mint transaction',
        errorMessage: 'An error has occured Mint',
        successMessage: 'Mint transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const stakeAllowed = user_fund > 0 && !hasPendingTransactions;
  const notAllowedClass = stakeAllowed ? '' : 'not-allowed disabled';

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
                text='Mint SFT'
                onClick={sendMintTransaction}
                disabled={user_fund == BigInt(0)}
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
