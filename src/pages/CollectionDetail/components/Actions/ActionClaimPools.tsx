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
import { Button } from './../../../../components/Design';
export const ActionClaimPools = ({
  user_pools,
  buttonWidth,
  bottomHeight
}: any) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.length > 0;

  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendClaimTransaction = async () => {
    const transactions: Transaction[] = [];

    for (const pool_id of user_pools) {
      const payload = 'claimRewards@' + bigToHex(BigInt(pool_id));
      transactions.push(
        new Transaction({
          value: BigInt(0),
          data: new TextEncoder().encode(payload),
          receiver: new Address(contractNftStake),
          gasLimit: BigInt('6000000'),

          gasPrice: BigInt(GAS_PRICE),
          chainID: network.chainId,
          sender: new Address(address),
          version: 1
        })
      );
    }

    // const claimTransaction = {
    //   value: 0,
    //   data: 'claimRewards@' + bigToHex(BigInt(pool_id)),
    //   receiver: contractNftStake,
    //   gasLimit: '6000000'
    // };

    const sessionId = await signAndSendTransactions({
      transactions: transactions,
      transactionsDisplayInfo: {
        processingMessage: 'Processing claimRewards transaction',
        errorMessage: 'An error has occured claimRewards transaction',
        successMessage: 'claimRewards transaction successful'
      }
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
                disabled={user_pools?.length == 0}
                buttonWidth={buttonWidth}
                borderRadius={40}
                background={['#BD37EC', '#1F67FF']}
                borderColor={'black'}
                text={'Claim ' + user_pools?.length + ' pools'}
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
