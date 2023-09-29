import * as React from 'react';
import { useEffect, useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractNftStake } from 'config';
import { Button } from './../../../../components/Design';
import BigNumber from 'bignumber.js';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import { useGetESDTInformations } from './helpers/useGetESDTInformations';

export const ActionClaimRewards = ({
  pool_id,
  rewardsAmount,
  identifier,
  buttonWidth,
  bottomHeight,
  Availablerewards
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

  const sendClaimTransaction = async () => {
    const claimTransaction = {
      value: 0,
      data: 'claimRewards@' + bigToHexDec(BigInt(pool_id)),
      receiver: contractNftStake,
      gasLimit: '5000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: claimTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing claimRewards transaction',
        errorMessage: 'An error has occured claimRewards transaction',
        successMessage: 'claimRewards transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const claimAllowed = rewardsAmount != '0' && !hasPendingTransactions;
  const notAllowedClass = claimAllowed ? '' : 'not-allowed disabled';
  // const rewarded_esdt_info = useGetESDTInformations(identifier.identifier);

  // const rdecimals = rewarded_esdt_info?.decimals
  //   ? rewarded_esdt_info?.decimals
  //   : 0;

  return (
    <div
      style={{
        width: buttonWidth,

        fontSize: '10px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '5px'
      }}
    >
      {/* {filteredData !== undefined && filteredData[0] > 0 && ( */}
      <>
        {/* <FormatAmount
            value={filteredData.toString()}
            decimals={Number(rdecimals)}
            egldLabel={rewarded_esdt_info?.name}
            data-testid='balance'
            digits={2}
          /> */}
        {!hasPendingTransactions ? (
          <>
            <Button
              fontSize='10px'
              buttonHeight={bottomHeight}
              disabled={
                Availablerewards[0] == undefined || Availablerewards[0] == 0
              }
              buttonWidth={buttonWidth}
              borderRadius={40}
              background={['#BD37EC', '#1F67FF']}
              borderColor={'black'}
              text='Claim my rewards'
              onClick={sendClaimTransaction}
            />
          </>
        ) : (
          <>
            {' '}
            <Button
              fontSize='10px'
              buttonHeight={bottomHeight}
              buttonWidth={buttonWidth}
              borderRadius={40}
              background={['#BD37EC', '#1F67FF']}
              borderColor={'black'}
              text='Processing'
              disabled={true}
            />
          </>
        )}
      </>
      {/* )} */}
    </div>
  );
};
