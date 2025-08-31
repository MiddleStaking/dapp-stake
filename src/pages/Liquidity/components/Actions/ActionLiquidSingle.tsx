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
import { contractSwap } from 'config';
import bigToHex from 'helpers/bigToHex';
import { Button } from '../../../../components/Design';

export const ActionLiquidSingle = ({
  first_token,
  second_token,
  amount
}: any) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.length > 0;
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);
  const contract_address = new Address(contractSwap).toHex();
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
    const payload =
      'MultiESDTNFTTransfer@' +
      contract_address +
      '@01' +
      '@' +
      Buffer.from(first_token, 'utf8').toString('hex') +
      '@00' +
      '@' +
      bigToHex(BigInt(amount.toFixed())) +
      '@' +
      Buffer.from('addSingleLP', 'utf8').toString('hex') +
      '@' +
      Buffer.from(second_token, 'utf8').toString('hex');
    const transaction = new Transaction({
      value: BigInt(0),
      data: new TextEncoder().encode(payload),
      receiver: new Address(address),
      gasLimit: BigInt('6000000'),

      gasPrice: BigInt(GAS_PRICE),
      chainID: network.chainId,
      sender: new Address(address),
      version: 1
    });

    const sessionId = await signAndSendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing single transaction',
        errorMessage: 'An error has occured single',
        successMessage: 'single transaction successful'
      }
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const stakeAllowed = !hasPendingTransactions;

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
