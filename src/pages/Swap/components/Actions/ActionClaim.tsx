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
import { contractRestake } from 'config';
import { Button } from './../../../../components/Design';
import BigNumber from 'bignumber.js';

export const ActionClaim = (props: { amount: BigNumber }) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.length > 0;
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);
  const contract_address = new Address(contractRestake).toHex();

  const sendStakeTransaction = async () => {
    const payload = 'claimRewards';

    const transaction = new Transaction({
      value: BigInt(0),
      data: new TextEncoder().encode(payload),
      receiver: new Address(contract_address),
      gasLimit: BigInt('20000000'),

      gasPrice: BigInt(GAS_PRICE),
      chainID: network.chainId,
      sender: new Address(address),
      version: 1
    });

    const sessionId = await signAndSendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing Restake transaction',
        errorMessage: 'An error has occured Restake',
        successMessage: 'Restake transaction successful'
      }
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
