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
import { contractNftStake, contractNftStakeV2 } from 'config';
import bigToHex from 'helpers/bigToHex';
import toHex from 'helpers/toHex';
import { Button } from '../../../../components/Design';

export const ActionStakeNft = ({
  selectedTokens, // Array of { token: any, amount: number }
  pool_id,
  disabled,
  isV2
}: any) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const addressTobech32 = new Address(
    isV2 ? contractNftStakeV2 : contractNftStake
  );

  const transactions = useGetPendingTransactions();
  // Filter for stake transactions on this pool
  const stakePartialPayload =
    addressTobech32.toHex() +
    '@' +
    Buffer.from('stake', 'utf8').toString('hex') +
    '@' +
    bigToHex(BigInt(pool_id));

  const hasPendingTransactions = transactions.some((t: any) => {
    const data = t.data || '';
    return (
      data.toString().includes(stakePartialPayload) ||
      (typeof data === 'string' && atob(data).includes(stakePartialPayload))
    );
  });

  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendStakeTransaction = async () => {
    if (!selectedTokens || selectedTokens.length === 0) return;

    let payload = '';

    // If simple ESDTNFTTransfer (Single item)
    if (selectedTokens.length === 1) {
      const item = selectedTokens[0];
      payload =
        'ESDTNFTTransfer@' +
        Buffer.from(item.token.collection, 'utf8').toString('hex') +
        '@' +
        toHex(item.token.nonce) +
        '@' +
        bigToHex(BigInt(item.amount)) +
        '@' +
        addressTobech32.toHex() +
        '@' +
        Buffer.from('stake', 'utf8').toString('hex') +
        '@' +
        bigToHex(BigInt(pool_id));
    } else {
      // MultiESDTNFTTransfer
      // Format: MultiESDTNFTTransfer @ destination_address @ num_payments @ token_id @ nonce @ amount ... @ func_name @ args
      payload =
        'MultiESDTNFTTransfer@' +
        addressTobech32.toHex() +
        '@' +
        toHex(selectedTokens.length);

      for (const item of selectedTokens) {
        payload +=
          '@' +
          Buffer.from(item.token.collection, 'utf8').toString('hex') +
          '@' +
          toHex(item.token.nonce) +
          '@' +
          bigToHex(BigInt(item.amount));
      }

      // Add function call and args
      payload +=
        '@' +
        Buffer.from('stake', 'utf8').toString('hex') +
        '@' +
        bigToHex(BigInt(pool_id));
    }

    const transaction = new Transaction({
      value: BigInt(0),
      data: new TextEncoder().encode(payload),
      receiver: new Address(address), // Self-send for ESDT transfer
      gasLimit: BigInt('10000000') + BigInt(selectedTokens.length * 1000000), // Dynamic gas limit

      gasPrice: BigInt(GAS_PRICE),
      chainID: network.chainId,
      sender: new Address(address),
      version: 1
    });

    const sessionId = await signAndSendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing Stake transaction',
        errorMessage: 'An error has occured Stake',
        successMessage: 'Stake transaction successful'
      }
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  return (
    <>
      <Button
        buttonWidth='100%'
        borderRadius={40}
        background={['#BD37EC', '#1F67FF']}
        text={
          hasPendingTransactions
            ? 'Processing...'
            : selectedTokens?.length > 1
            ? `Stake ${selectedTokens.length} NFTs`
            : 'Stake NFT'
        }
        onClick={sendStakeTransaction}
        disabled={disabled || hasPendingTransactions}
      />
    </>
  );
};
