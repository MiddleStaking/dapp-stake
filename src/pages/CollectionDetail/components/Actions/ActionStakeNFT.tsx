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
import { contractNftStake } from 'config';
import bigToHex from 'helpers/bigToHex';
import { Button } from '../../../../components/Design';

export const ActionStakeNft = ({
  stakedNFT,
  user_fund,
  pool_id,
  nft_nonce,
  disabled
}: any) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.length > 0;
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const addressTobech32 = new Address(contractNftStake);
  const sendStakeTransaction = async () => {
    const payload =
      'ESDTNFTTransfer@' +
      Buffer.from(stakedNFT, 'utf8').toString('hex') +
      '@' +
      bigToHex(BigInt(nft_nonce)) +
      '@' +
      bigToHex(BigInt(user_fund)) +
      '@' +
      addressTobech32.toHex() +
      '@' +
      Buffer.from('stake', 'utf8').toString('hex') +
      '@' +
      bigToHex(BigInt(pool_id));

    const transaction = new Transaction({
      value: BigInt(0),
      data: new TextEncoder().encode(payload),
      receiver: addressTobech32,
      gasLimit: BigInt('8000000'),

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
