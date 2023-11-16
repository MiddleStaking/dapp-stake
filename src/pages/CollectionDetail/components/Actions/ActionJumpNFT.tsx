import * as React from 'react';
import { useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { useWindowDimensions } from 'components/DimensionScreen';
import { contractNftStake } from 'config';
import bigToHex from 'helpers/bigToHex';
import { Button } from '../../../../components/Design';

export const ActionJumpNFT = ({ Nft_id, pool_id, disabled }: any) => {
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { width } = useWindowDimensions();

  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendJumpTransaction = async () => {
    const jumpTransaction = {
      value: 0,
      data: 'jump@' + bigToHex(Nft_id) + '@' + bigToHex(pool_id),

      receiver: contractNftStake,
      gasLimit: '7000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: jumpTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Jump transaction',
        errorMessage: 'An error has occured Jump',
        successMessage: 'Jump transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  return (
    <>
      {!hasPendingTransactions ? (
        <>
          <Button
            boxShadow='0px 0px 44px 0px #8E44EB80 inset'
            borderWidth='2px'
            borderRadius={40}
            background='black'
            borderColor={['#BD37EC', '#1F67FF']}
            text={'validate'}
            hasBorder={true}
            fontFamily=''
            buttonHeight={width > 579 ? '40px' : '40px'}
            fontSize={width > 579 ? '15px' : '15px'}
            disabled={disabled}
            onClick={sendJumpTransaction}
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
  );
};
