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
import { contractSwap, defaultToken } from 'config';
import bigToHex from 'helpers/bigToHex';
import { Button } from './../../../../components/Design';
import BigNumber from 'bignumber.js';

export const ActionSwap = ({
  isLoggedIn,
  first_token,
  second_token,
  in_token,
  swap_amount,
  in_balance,
  min_out,
  price_impact
}: any) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.length > 0;
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);
  const contract_address = new Address(contractSwap).toHex();

  let hexValue = swap_amount.toString(16); // Convert to hex
  if (hexValue.length % 2 !== 0) {
    hexValue = '0' + hexValue;
  }

  let hexValue2 = min_out.toString(16); // Convert to hex
  if (hexValue2.length % 2 !== 0) {
    hexValue2 = '0' + hexValue2;
  }

  const sendStakeTransaction = async () => {
    const payload =
      'MultiESDTNFTTransfer@' +
      contract_address +
      '@01' +
      '@' +
      Buffer.from(in_token, 'utf8').toString('hex') +
      '@00' +
      '@' +
      hexValue +
      '@' +
      Buffer.from('swap', 'utf8').toString('hex') +
      '@' +
      Buffer.from(first_token, 'utf8').toString('hex') +
      '@' +
      Buffer.from(second_token, 'utf8').toString('hex') +
      '@' +
      hexValue2;

    let transaction = new Transaction({
      value: BigInt(0),
      data: new TextEncoder().encode(payload),
      receiver: new Address(address),
      gasLimit: BigInt('20000000'),

      gasPrice: BigInt(GAS_PRICE),
      chainID: network.chainId,
      sender: new Address(address),
      version: 1
    });

    if (
      in_token != defaultToken &&
      first_token != defaultToken &&
      second_token != defaultToken
    ) {
      const payload =
        'MultiESDTNFTTransfer@' +
        contract_address +
        '@01' +
        '@' +
        Buffer.from(in_token, 'utf8').toString('hex') +
        '@00' +
        '@' +
        hexValue +
        '@' +
        Buffer.from('dualSwap', 'utf8').toString('hex') +
        '@' +
        Buffer.from(
          in_token == first_token ? first_token : second_token,
          'utf8'
        ).toString('hex') +
        '@' +
        Buffer.from(
          in_token == first_token ? second_token : first_token,
          'utf8'
        ).toString('hex') +
        '@' +
        hexValue2;
      transaction = new Transaction({
        value: BigInt(0),
        data: new TextEncoder().encode(payload),
        receiver: new Address(address),
        gasLimit: BigInt('20000000'),

        gasPrice: BigInt(GAS_PRICE),
        chainID: network.chainId,
        sender: new Address(address),
        version: 1
      });
    }

    const sessionId = await signAndSendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing Swap transaction',
        errorMessage: 'An error has occured Swap',
        successMessage: 'Swap transaction successful'
      }
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  return (
    <>
      {swap_amount !== undefined && isLoggedIn && (
        <>
          {!hasPendingTransactions ? (
            <>
              {price_impact > 10 ? (
                <Button
                  buttonWidth='100%'
                  borderRadius={40}
                  background={['rgb(236 55 55)', 'rgb(236 55 55)']}
                  borderColor={'black'}
                  text={
                    in_balance.isLessThan(swap_amount)
                      ? 'Low balance & low liquidity'
                      : 'LOW LIQUIDITY'
                  }
                  onClick={sendStakeTransaction}
                  disabled={in_balance.isLessThan(swap_amount)}
                />
              ) : (
                <>
                  {in_balance.isLessThan(swap_amount) ? (
                    <Button
                      buttonWidth='100%'
                      borderRadius={40}
                      background={['#BD37EC', '#1F67FF']}
                      text='Low balance'
                      onClick={sendStakeTransaction}
                      disabled={true}
                    />
                  ) : (
                    <Button
                      buttonWidth='100%'
                      borderRadius={40}
                      background={['#BD37EC', '#1F67FF']}
                      text='Swap tokens'
                      onClick={sendStakeTransaction}
                      disabled={swap_amount == 0}
                    />
                  )}
                </>
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
      )}
    </>
  );
};
