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

import { useWindowDimensions } from 'components/DimensionScreen';
import { contractNftStake } from 'config';
import bigToHex from 'helpers/bigToHex';
import { Button } from '../../../../components/Design';

export const ActionJumpNFT = ({ Nft_id, pool_id, disabled }: any) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.length > 0;
  const { width } = useWindowDimensions();

  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendJumpTransaction = async () => {
    const payload = 'jump@' + bigToHex(Nft_id) + '@' + bigToHex(pool_id);
    const transaction = new Transaction({
      value: BigInt('0'),
      data: new TextEncoder().encode(payload),
      receiver: new Address(contractNftStake),
      gasLimit: BigInt('8000000'),

      gasPrice: BigInt(GAS_PRICE),
      chainID: network.chainId,
      sender: new Address(address),
      version: 1
    });

    const sessionId = await signAndSendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing Jump transaction',
        errorMessage: 'An error has occured Jump',
        successMessage: 'Jump transaction successful'
      }
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
