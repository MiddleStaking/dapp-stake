import * as React from 'react';
import { useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractSwap, defaultToken } from 'config';
import bigToHex from 'helpers/bigToHex';
import { Button } from './../../../../components/Design';
import { useGetAccount } from 'hooks';
import { Address } from '@multiversx/sdk-core/out';
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
  const { hasPendingTransactions } = useGetPendingTransactions();
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);
  const { address } = useGetAccount();
  const contract_address = new Address(contractSwap).hex();

  let hexValue = swap_amount.toString(16); // Convert to hex
  if (hexValue.length % 2 !== 0) {
    hexValue = '0' + hexValue;
  }

  let hexValue2 = min_out.toString(16); // Convert to hex
  if (hexValue2.length % 2 !== 0) {
    hexValue2 = '0' + hexValue2;
  }

  const sendStakeTransaction = async () => {
    let stakeTransaction = {
      value: 0,
      data:
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
        hexValue2,
      receiver: address,
      gasLimit: '20000000'
    };

    if (
      in_token != defaultToken &&
      first_token != defaultToken &&
      second_token != defaultToken
    ) {
      stakeTransaction = {
        value: 0,
        data:
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
          hexValue2,
        receiver: address,
        gasLimit: '20000000'
      };
    }

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
