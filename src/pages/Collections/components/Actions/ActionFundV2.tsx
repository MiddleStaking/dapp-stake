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
import { contractNftStakeV2 } from 'config';
import bigToHex from 'helpers/bigToHex';
import toHex from 'helpers/toHex';
import { Button } from './../../../../components/Design';

export const ActionFundV2 = ({
  stakedToken,
  rewardedToken,
  user_fund,
  speed,
  nonce,
  vesting,
  unbounding,
  agreement
}: any) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.length > 0;

  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendFundTransaction = async () => {
    // Parse nonce string into array of hex strings
    const nonceList = nonce
      .toString()
      .split(',')
      .map((n: string) => n.trim())
      .filter((n: string) => n !== '');
    const noncePayload = nonceList
      .map((n: string) => toHex(Number(n)))
      .join('@');

    const payload =
      'ESDTTransfer@' +
      Buffer.from(rewardedToken, 'utf8').toString('hex') +
      '@' +
      bigToHex(BigInt(user_fund)) +
      '@' +
      Buffer.from('fund', 'utf8').toString('hex') +
      '@' +
      Buffer.from(stakedToken, 'utf8').toString('hex') +
      '@' +
      toHex(speed * 86400) +
      '@' +
      toHex(vesting * 86400) +
      '@' +
      toHex(unbounding * 86400) +
      (noncePayload ? '@' + noncePayload : '');

    const transaction = new Transaction({
      value: BigInt(0),
      data: new TextEncoder().encode(payload),
      receiver: new Address(contractNftStakeV2),
      gasLimit: BigInt('14000000'),

      gasPrice: BigInt(GAS_PRICE),
      chainID: network.chainId,
      sender: new Address(address),
      version: 1
    });

    const sessionId = await signAndSendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing V2 Fund transaction',
        errorMessage: 'An error has occured V2 Fund',
        successMessage: 'V2 Fund transaction successful'
      }
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
              <Button
                buttonWidth='100%'
                borderRadius={40}
                background={['#BD37EC', '#1F67FF']}
                text='Lock tokens (V2)'
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
