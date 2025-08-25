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

import { contractStake } from 'config';
import { Button } from './../../../../components/Design';

export const ActionStakeRewards = ({ staked_token, rewardsAmount }: any) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.length > 0;

  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendStakeRewardsTransaction = async () => {
    const payload =
      'stakeRewards@' + Buffer.from(staked_token, 'utf8').toString('hex');
    const transaction = new Transaction({
      value: BigInt('0'),
      data: new TextEncoder().encode(payload),
      receiver: new Address(contractStake),
      gasLimit: BigInt('4000000'),

      gasPrice: BigInt(GAS_PRICE),
      chainID: network.chainId,
      sender: new Address(address),
      version: 1
    });

    const sessionId = await signAndSendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing Stake Rewards transaction',
        errorMessage: 'An error has occured Stake Rewards transaction',
        successMessage: 'Stake Rewards transaction successful'
      }
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  return (
    <div className='center' style={{ width: '100%' }}>
      {rewardsAmount !== undefined && rewardsAmount > 0 && (
        <>
          {!hasPendingTransactions ? (
            <>
              <Button
                buttonWidth='100%'
                hasBorder={true}
                borderRadius={40}
                background={'black'}
                borderColor={['#BD37EC', '#1F67FF']}
                text='Reinvest my rewards'
                onClick={sendStakeRewardsTransaction}
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
    </div>
  );
};
