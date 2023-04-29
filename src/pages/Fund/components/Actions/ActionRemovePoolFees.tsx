import * as React from 'react';
import { useEffect, useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractAddress, defaultToken } from 'config';
import { useGetUserESDT } from './../Actions/helpers/useGetUserESDT';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import { useGetESDTInformations } from 'pages/Earn/components/Actions/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollar } from '@fortawesome/free-solid-svg-icons';
export const ActionRemovePoolFees = ({
  stakedToken,
  rewardedToken,
  agreement
}: any) => {
  const { hasPendingTransactions } = useGetPendingTransactions();
  const userEsdtBalance = useGetUserESDT();
  const default_esdt_info = useGetESDTInformations(defaultToken);
  const price = BigInt('5000000000000000000000');

  const dollar_value = default_esdt_info?.price
    ? Number(BigInt(price) / BigInt(10 ** default_esdt_info.decimals)) *
      default_esdt_info?.price
    : 0;

  const balance = BigInt(
    userEsdtBalance
      .filter((token) => {
        return token.identifier === defaultToken;
      })
      .map((token) => token.balance)
      .toString()
  );
  const decimals = userEsdtBalance
    .filter((token) => {
      return token.identifier === defaultToken;
    })
    .map((token) => token.decimals);

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

  const sendFundTransaction = async () => {
    if (!agreement) {
      return;
    }
    const fundTransaction = {
      value: 0,
      data:
        'ESDTTransfer@' +
        Buffer.from(defaultToken, 'utf8').toString('hex') +
        '@' +
        bigToHexDec(BigInt(price)) +
        '@' +
        Buffer.from('removePoolFees', 'utf8').toString('hex') +
        '@' +
        Buffer.from(stakedToken, 'utf8').toString('hex') +
        '@' +
        Buffer.from(rewardedToken, 'utf8').toString('hex'),

      receiver: contractAddress,
      gasLimit: '6000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: fundTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing remove fees transaction',
        errorMessage: 'An error has occured remove fees',
        successMessage: 'Remove fees transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const unstakeAllowed =
    balance > BigInt(0) && balance >= price && !hasPendingTransactions;
  const notAllowedClass = unstakeAllowed ? '' : 'not-allowed disabled';

  return (
    <div>
      {balance !== undefined && (
        <>
          {' '}
          Balance :{' '}
          <FormatAmount
            decimals={Number(decimals.toString())}
            value={balance.toString()}
            egldLabel={defaultToken}
            digits={2}
          />
          {!hasPendingTransactions ? (
            <>
              <div>
                {balance >= price ? (
                  <>
                    {' '}
                    <button
                      className='bouton-visiter'
                      onClick={sendFundTransaction}
                      disabled={!agreement}
                    >
                      REMOVE FEES FOR{' '}
                      <FormatAmount
                        decimals={Number(decimals.toString())}
                        value={price.toString()}
                        egldLabel={' '}
                        digits={2}
                      />
                      {default_esdt_info?.price && (
                        <>
                          <br /> ~
                          {dollar_value.toLocaleString('en-US', {
                            maximumFractionDigits: 2
                          })}{' '}
                          <FontAwesomeIcon icon={faDollar} />
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    {' '}
                    <button className='bouton-disabled' disabled={true}>
                      <FormatAmount
                        decimals={Number(decimals.toString())}
                        value={balance.toString()}
                        egldLabel={' '}
                        digits={2}
                      />{' '}
                      /{' '}
                      <FormatAmount
                        decimals={Number(decimals.toString())}
                        value={price.toString()}
                        egldLabel={' '}
                        digits={2}
                      />{' '}
                      {default_esdt_info?.price && (
                        <>
                          {' '}
                          <br /> ~
                          {dollar_value.toLocaleString('en-US', {
                            maximumFractionDigits: 2
                          })}{' '}
                          <FontAwesomeIcon icon={faDollar} />
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className={notAllowedClass}>
              <button className='btn'>Processing</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
