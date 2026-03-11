import * as React from 'react';
import { useState } from 'react';
import { useGetPendingTransactions } from 'lib';
import { signAndSendTransactions } from 'helpers';
import {
  Address,
  GAS_PRICE,
  Transaction,
  useGetAccountInfo,
  useGetNetworkConfig
} from 'lib';
import { contractNftStakeV2 } from 'config';
import toHex from 'helpers/toHex';
import { Button } from './../../../../components/Design';

export const ActionEditPoolV2 = ({
  pool_id,
  collection,
  speed,
  vesting,
  unbounding,
  nonces,
  agreement
}: any) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.length > 0;

  const [, setTransactionSessionId] = useState<string | null>(null);

  const sendEditTransaction = async () => {
    // Parse nonce string into array of hex strings
    const nonceList = nonces
      .toString()
      .split(',')
      .map((n: string) => n.trim())
      .filter((n: string) => n !== '' && n !== '0'); // Filter out 0 if intended as "All" or if specific nonces are required.
    // Note: If user wants "All", they might pass empty string or 0. Smart contract likely expects empty variadic for "All"?
    // Or maybe "0"? The ABI says `new_nonces` is variadic u64.
    // In `fund`, passing 0 or empty usually means something.
    // Previous code in ActionFundV2:
    // const noncePayload = nonceList.map((n: string) => toHex(Number(n))).join('@');
    // If nonceList is empty, noncePayload is empty string.
    // If user inputs "0", it gets encoded as 0.
    // I'll stick to passing what user inputs.

    const noncePayload = nonceList
      .map((n: string) => toHex(Number(n)))
      .join('@');

    const payload =
      'editPool' +
      '@' +
      toHex(pool_id) +
      '@' +
      Buffer.from(collection, 'utf8').toString('hex') +
      '@' +
      toHex(speed) +
      '@' +
      toHex(vesting) +
      '@' +
      toHex(unbounding) +
      (noncePayload ? '@' + noncePayload : '');

    const transaction = new Transaction({
      value: BigInt(0),
      data: new TextEncoder().encode(payload),
      receiver: new Address(contractNftStakeV2),
      gasLimit: BigInt('14000000'), // Adjust gas limit if needed. editPool might need more or less.
      gasPrice: BigInt(GAS_PRICE),
      chainID: network.chainId,
      sender: new Address(address),
      version: 1
    });

    const sessionId = await signAndSendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing Edit Pool V2 transaction',
        errorMessage: 'An error has occured Edit Pool V2',
        successMessage: 'Edit Pool V2 transaction successful'
      }
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  return (
    <>
      {!hasPendingTransactions ? (
        <Button
          buttonWidth='100%'
          borderRadius={40}
          background={['#BD37EC', '#1F67FF']}
          text='Update Pool'
          onClick={sendEditTransaction}
          disabled={!pool_id || !collection || !agreement}
        />
      ) : (
        <Button
          buttonWidth='100%'
          borderRadius={40}
          background={['#BD37EC', '#1F67FF']}
          borderColor={'black'}
          text='Processing'
          disabled={true}
        />
      )}
    </>
  );
};
