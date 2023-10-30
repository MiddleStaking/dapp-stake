import * as React from 'react';
import { useState } from 'react';
import { Address } from '@multiversx/sdk-core/out';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractNftStake } from 'config';
import bigToHex from 'helpers/bigToHex';
import { Button } from '../../../../components/Design';

export const ActionStakeNft = ({
  stakedNFT,
  user_fund,
  pool_id,
  address,
  nft_nonce,
  disabled
}: any) => {
  const { hasPendingTransactions } = useGetPendingTransactions();

  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const addressTobech32 = new Address(contractNftStake);
  const sendStakeTransaction = async () => {
    const stakeTransaction = {
      value: 0,
      data:
        'ESDTNFTTransfer@' +
        Buffer.from(stakedNFT, 'utf8').toString('hex') +
        '@' +
        bigToHex(BigInt(nft_nonce)) +
        '@' +
        bigToHex(BigInt(user_fund)) +
        '@' +
        addressTobech32.hex() +
        '@' +
        Buffer.from('stake', 'utf8').toString('hex') +
        '@' +
        bigToHex(BigInt(pool_id)),

      receiver: address,
      gasLimit: '7000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: stakeTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Stake transaction',
        errorMessage: 'An error has occured Stake',
        successMessage: 'Stake transaction successful'
      },
      redirectAfterSign: false
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
                text='Stake'
                onClick={sendStakeTransaction}
                disabled={user_fund == 0 || disabled}
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
