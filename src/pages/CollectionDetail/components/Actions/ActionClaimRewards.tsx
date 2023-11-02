import * as React from 'react';
import { useState } from 'react';
import {
  useGetAccountInfo,
  useGetPendingTransactions
} from '@multiversx/sdk-dapp/hooks';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractNftStake } from 'config';
import bigToHex from 'helpers/bigToHex';
import { Button } from './../../../../components/Design';
export const ActionClaimRewards = ({
  pool_id,
  buttonWidth,
  bottomHeight,
  Availablerewards
}: any) => {
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { address } = useGetAccountInfo();

  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendClaimTransaction = async () => {
    const claimTransaction = {
      value: 0,
      data: 'claimRewards@' + bigToHex(BigInt(pool_id)),
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
            {address && (
              <Button
                fontSize='10px'
                buttonHeight={bottomHeight}
                disabled={
                  Availablerewards == undefined || Availablerewards == 0
                }
                buttonWidth={buttonWidth}
                borderRadius={40}
                background={['#BD37EC', '#1F67FF']}
                borderColor={'black'}
                text='Claim my rewards'
                onClick={sendClaimTransaction}
              />
            )}
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
