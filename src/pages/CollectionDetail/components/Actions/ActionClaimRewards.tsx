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
export const ActionClaimRewards = ({
  pool_id,
  buttonWidth,
  bottomHeight,
  Availablerewards,
  isV2
}: any) => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const payload = 'claimRewards@' + bigToHex(BigInt(pool_id));
  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.some((t: any) => {
    // Check if transaction data matches the payload (handle potentially different data formats)
    const data = t.data || '';
    // Decode if it's base64 (common in some response formats) or just check string
    return (
      data.toString().includes(payload) ||
      (typeof data === 'string' && atob(data).includes(payload))
    );
  });

  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendClaimTransaction = async () => {
    const transaction = new Transaction({
      value: BigInt(0),
      data: new TextEncoder().encode(payload),
      receiver: new Address(isV2 ? contractNftStakeV2 : contractNftStake),
      gasLimit: BigInt('6000000'),

      gasPrice: BigInt(GAS_PRICE),
      chainID: network.chainId,
      sender: new Address(address),
      version: 1
    });

    const sessionId = await signAndSendTransactions({
      transactions: [transaction],
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
              disabled={Availablerewards == undefined || Availablerewards == 0}
              buttonWidth={buttonWidth}
              borderRadius={40}
              background={['#BD37EC', '#1F67FF']}
              borderColor={'black'}
              text={
                hasPendingTransactions ? 'Processing...' : 'Claim my rewards'
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
