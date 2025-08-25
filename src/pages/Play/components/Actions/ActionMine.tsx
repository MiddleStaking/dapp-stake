import * as React from 'react';
import { useState } from 'react';
import { faDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetPendingTransactions, FormatAmount } from 'lib';
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
import { useNavigate } from 'react-router-dom';
import { contractPlay } from 'config';
import bigToHex from 'helpers/bigToHex';
import { routeNames } from 'routes';
import { Button } from './../../../../components/Design';
import { useGetUserESDT } from './../../../../pages/Earn/components/Actions/helpers/useGetUserESDT';

export const ActionMine = ({ payment_esdt_info, price }: any) => {
  const navigate = useNavigate();

  const pdecimals = payment_esdt_info?.decimals
    ? payment_esdt_info?.decimals
    : 0;

  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.length > 0;

  const userEsdtBalance = useGetUserESDT();
  const balance = BigInt(
    userEsdtBalance
      .filter((token) => {
        return token.identifier === payment_esdt_info?.identifier;
      })
      .map((token) => token.balance)
      .toString()
  );

  const dollar_price_fixed = BigInt(
    payment_esdt_info?.price
      ? (payment_esdt_info?.price * 100000000).toFixed()
      : 0
  );
  const dollar_value = BigInt(
    (dollar_price_fixed * BigInt(price)) / BigInt(100000000)
  );
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendUnstakeTransaction = async () => {
    const payload =
      'ESDTTransfer@' +
      Buffer.from(payment_esdt_info?.identifier, 'utf8').toString('hex') +
      '@' +
      bigToHex(BigInt(price)) +
      '@' +
      Buffer.from('mine', 'utf8').toString('hex');

    const transaction = new Transaction({
      value: BigInt(0),
      data: new TextEncoder().encode(payload),
      receiver: new Address(contractPlay),
      gasLimit: BigInt('5000000'),

      gasPrice: BigInt(GAS_PRICE),
      chainID: network.chainId,
      sender: new Address(address),
      version: 1
    });

    const sessionId = await signAndSendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing mine transaction',
        errorMessage: 'An error has occured mine',
        successMessage: 'Mine transaction successful'
      }
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  return (
    <div className='center' style={{ width: '300px' }}>
      {!hasPendingTransactions ? (
        <div>
          {balance >= price && price > 0 ? (
            <>
              Play for{' '}
              <FormatAmount
                value={price ? price.toString() : 0}
                data-testid='balance'
              />{' '}
              {payment_esdt_info?.price && (
                <>
                  <br />~{' '}
                  <FormatAmount
                    value={dollar_value.toString()}
                    data-testid='balance'
                  />
                  <FontAwesomeIcon icon={faDollar} />
                </>
              )}
              <div style={{ left: '100px', position: 'relative' }}>
                <Button
                  buttonWidth='100px'
                  hasBorder={true}
                  borderRadius={40}
                  background={['#BD37EC', '#1F67FF']}
                  borderColor={['#BD37EC', '#1F67FF']}
                  text={'Play'}
                  onClick={sendUnstakeTransaction}
                />
              </div>
            </>
          ) : (
            <>
              {payment_esdt_info?.identifier ? (
                <>
                  {' '}
                  <FormatAmount
                    value={balance.toString()}
                    data-testid='balance'
                  />
                  /{' '}
                  <FormatAmount
                    value={price ? price.toString() : 0}
                    data-testid='balance'
                  />
                </>
              ) : (
                <>Loading token informations...</>
              )}

              {payment_esdt_info?.price && (
                <>
                  <br />~{' '}
                  <FormatAmount
                    value={dollar_value.toString()}
                    data-testid='balance'
                  />
                  <FontAwesomeIcon icon={faDollar} />
                </>
              )}
              <Button
                buttonWidth=''
                hasBorder={true}
                borderRadius={40}
                background={['#BD37EC', '#1F67FF']}
                borderColor={['#BD37EC', '#1F67FF']}
                text={'Low balance'}
                disabled={true}
              />

              <Button
                onClick={() => navigate(routeNames.swap)}
                buttonWidth=''
                hasBorder={true}
                borderRadius={40}
                background={['#BD37EC', '#1F67FF']}
                borderColor={['#BD37EC', '#1F67FF']}
                text={'Swap tokens'}
                disabled={false}
              />
            </>
          )}
        </div>
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
    </div>
  );
};
