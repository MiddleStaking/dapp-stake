import * as React from 'react';
import { useState } from 'react';
import { Address } from '@multiversx/sdk-core/out';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractSwap } from 'config';
import bigToHex from 'helpers/bigToHex';
import { Button } from './../../../../components/Design';
import BigNumber from 'bignumber.js';

export const ActionLiquid = ({
  first_token,
  second_token,
  first_amount,
  second_amount,
  first_balance,
  second_balance
}: any) => {
  const { hasPendingTransactions } = useGetPendingTransactions();
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);
  const { address } = useGetAccount();
  const contract_address = new Address(contractSwap).hex();
  //  const user_address = new AddressValue(new Address(address));
  /*
  mxpy contract call erd1h29t8znkdhz4ycc5p797qang79kxewv789c95ef7pv8wj9q55gcsa9z3l6 
  --ledger --ledger-address-index 0 
  --gas-limit=6000000 --recall-nonce --proxy="https://gateway.multiversx.com" --chain 1 --send 
  --function="MultiESDTNFTTransfer" 
  --arguments erd1qqqqqqqqqqqqqpgqgdf6vk43c2jxk4a6nw2adv8vmnpqagegtxfqmf8et2 2 str:"MID-ecb7bf" 0 450000000000000000000 str:"UTK-2f80e9" 0 200000000000000000000  str:"addLp"
   
  MultiESDTNFTTransfer
  @000000000000000005004353A65AB1C2A46B57BA9B95D6B0ECDCC20EA3285992
  @02
  @4D49442D656362376266
  @00
  @18650127CC3DC80000
  @55544B2D326638306539
  @00
  @0AD78EBC5AC6200000
  @6164644C70

  */
  const sendStakeTransaction = async () => {
    const stakeTransaction = {
      value: 0,
      data:
        'MultiESDTNFTTransfer@' +
        contract_address +
        '@02' +
        '@' +
        Buffer.from(first_token, 'utf8').toString('hex') +
        '@00' +
        '@' +
        bigToHex(BigInt(first_amount.toFixed())) +
        '@' +
        Buffer.from(second_token, 'utf8').toString('hex') +
        '@00' +
        '@' +
        bigToHex(BigInt(second_amount.toFixed())) +
        '@' +
        Buffer.from('addLp', 'utf8').toString('hex'),
      receiver: address,
      gasLimit: '6000000'
    };

    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: stakeTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Swap transaction',
        errorMessage: 'An error has occured Swap',
        successMessage: 'Swap transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const stakeAllowed =
    first_balance >= first_amount &&
    second_balance >= second_amount &&
    !hasPendingTransactions;

  return (
    <>
      {!hasPendingTransactions ? (
        <>
          {stakeAllowed ? (
            <Button
              buttonWidth='100%'
              borderRadius={40}
              background={['#BD37EC', '#1F67FF']}
              borderColor={'black'}
              text='add Lp'
              onClick={sendStakeTransaction}
              disabled={false}
            />
          ) : (
            <Button
              buttonWidth='100%'
              borderRadius={40}
              background={['#BD37EC', '#1F67FF']}
              text='No funds'
              onClick={sendStakeTransaction}
              disabled={true}
            />
          )}
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
