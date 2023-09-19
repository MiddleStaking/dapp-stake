import * as React from 'react';
import { useEffect, useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractNftStake } from 'config';
import { Button } from '../../../../components/Design';
import { Address } from '@multiversx/sdk-core/out';

export const ActionStakeNft = ({
  stakedNFT,
  user_fund,
  pool_id,
  address,
  nft_nonce
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
        bigToHexDec(BigInt(nft_nonce)) +
        '@' +
        bigToHexDec(BigInt(user_fund)) +
        '@' +
        addressTobech32.hex() +
        '@' +
        Buffer.from('stake', 'utf8').toString('hex') +
        '@' +
        bigToHexDec(BigInt(pool_id)),

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

  const stakeAllowed = user_fund != '0' && !hasPendingTransactions;
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
                text='Stake'
                onClick={sendStakeTransaction}
                disabled={user_fund == 0}
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