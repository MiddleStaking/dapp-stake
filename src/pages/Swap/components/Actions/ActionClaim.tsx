import * as React from 'react';
import { useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractRestake } from 'config';
import { Button } from './../../../../components/Design';
import { useGetAccount } from 'hooks';
import { Address } from '@multiversx/sdk-core/out';
import BigNumber from 'bignumber.js';

export const ActionClaim = (props: { amount: BigNumber }) => {
  const { hasPendingTransactions } = useGetPendingTransactions();
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);
  const { address } = useGetAccount();
  const contract_address = new Address(contractRestake).hex();

  const sendStakeTransaction = async () => {
    const stakeTransaction = {
      value: 0,
      data: 'claimRewards',
      receiver: contract_address,
      gasLimit: '20000000'
    };

    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: stakeTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Restake transaction',
        errorMessage: 'An error has occured Restake',
        successMessage: 'Restake transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };
  return (
    <>
      <div
        style={{
          padding: '15px',
          backgroundColor: '#2a1b4b',
          color: '#d1c4e9',
          fontFamily: 'Arial, sans-serif',
          borderRadius: '8px',
          maxWidth: '400px',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
          lineHeight: '1.5'
        }}
      >
        <strong style={{ color: '#e0e0e0', fontSize: '16px' }}>
          Rewards Available
        </strong>
        <p>
          The contract has accumulated{' '}
          <strong>{props.amount.dividedBy(10 ** 18).toFixed(2)} EGLD</strong>,
          which will be added to the <strong>MID-EGLD liquidity pool</strong>.
          Signing the transaction is optional but helps accelerate the process,
          ensuring efficient liquidity allocation. Any user can trigger this
          operation.
        </p>
        {!hasPendingTransactions ? (
          <>
            <Button
              buttonWidth='100%'
              borderRadius={40}
              background={['#BD37EC', '#1F67FF']}
              text='Execute'
              onClick={sendStakeTransaction}
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
      </div>
    </>
  );
};
