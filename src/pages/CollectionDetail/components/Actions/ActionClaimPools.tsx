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
import { contractNftStake, contractNftStakeV2 } from 'config';
import bigToHex from 'helpers/bigToHex';
import { Button } from './../../../../components/Design';
export const ActionClaimPools = ({
  user_pools,
  buttonWidth,
  bottomHeight,
  isV2
}: any) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const transactions = useGetPendingTransactions();
  // Check if any pending transaction is a claimRewards transaction for one of our pools
  const hasPendingTransactions = transactions.some((t: any) => {
    const data = t.data || '';
    return user_pools.some((pool: any) => {
      const poolId = pool.pool_id !== undefined ? pool.pool_id : pool;
      const payload = 'claimRewards@' + bigToHex(BigInt(poolId));
      return (
        data.toString().includes(payload) ||
        (typeof data === 'string' && atob(data).includes(payload))
      );
    });
  });

  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendClaimTransaction = async () => {
    const transactions: Transaction[] = [];

    for (const pool of user_pools) {
      const pool_id = pool.pool_id !== undefined ? pool.pool_id : pool; // Handle object or primitive
      // If pool is object, use its isV2. If primitive, fallback to prop isV2
      const isPoolV2 = pool.isV2 !== undefined ? pool.isV2 : isV2;

      const payload = 'claimRewards@' + bigToHex(BigInt(pool_id));
      transactions.push(
        new Transaction({
          value: BigInt(0),
          data: new TextEncoder().encode(payload),
          receiver: new Address(
            isPoolV2 ? contractNftStakeV2 : contractNftStake
          ),
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
              text={
                hasPendingTransactions
                  ? 'Processing...'
                  : 'Claim ' + user_pools?.length + ' pools'
              }
              onClick={sendClaimTransaction}
            />
          )}
        </>
      </>
      {/* )} */}
    </div>
  );
};
