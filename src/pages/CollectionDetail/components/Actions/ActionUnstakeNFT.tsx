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
import { Button } from '../../../../components/Design';

interface ActionUnstakeNFTProps {
  nft_id?: string;
  nft_ids?: string[]; // Support for multiple IDs
  text: React.ReactNode;
  disabled: boolean;
  isV2?: boolean;
}

export const ActionUnstakeNFT = ({
  nft_id,
  nft_ids,
  text,
  disabled,
  isV2
}: ActionUnstakeNFTProps) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.length > 0;
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendClaimTransaction = async () => {
    let payload = 'unstake';
    let count = 0;

    if (nft_ids && nft_ids.length > 0) {
      nft_ids.forEach((id) => {
        payload += '@' + bigToHex(BigInt(id));
      });
      count = nft_ids.length;
    } else if (nft_id) {
      payload += '@' + bigToHex(BigInt(nft_id));
      count = 1;
    } else {
      return; // Nothing to unstake
    }

    const transaction = new Transaction({
      value: BigInt(0),
      data: new TextEncoder().encode(payload),
      receiver: new Address(isV2 ? contractNftStakeV2 : contractNftStake),
      gasLimit: BigInt('8000000') + BigInt(count * 500000), // Dynamic gas

      gasPrice: BigInt(GAS_PRICE),
      chainID: network.chainId,
      sender: new Address(address),
      version: 1
    });

    const sessionId = await signAndSendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing unstakeNft transaction',
        errorMessage: 'An error has occured unstakeNft transaction',
        successMessage: 'unstakeNft transaction successful'
      }
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  return (
    <div className='center' style={{ width: '100%' }}>
      <>
        {!hasPendingTransactions ? (
          <>
            <Button
              buttonWidth='100%'
              borderRadius={40}
              background={['#BD37EC', '#1F67FF']}
              borderColor={'black'}
              text={text}
              disabled={disabled}
              onClick={sendClaimTransaction}
            />
          </>
        ) : (
          <>
            {' '}
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
    </div>
  );
};
