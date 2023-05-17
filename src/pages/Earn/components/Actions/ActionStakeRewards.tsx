import * as React from 'react';
import { useEffect, useState } from 'react';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractAddress } from 'config';
import Button from 'pages/design/Component/Button';

export const ActionStakeRewards = ({ stakedToken, rewardsAmount }: any) => {
  const { hasPendingTransactions } = useGetPendingTransactions();

  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendStakeRewardsTransaction = async () => {
    const stakeRewardsTransaction = {
      value: 0,
      data: 'stakeRewards@' + Buffer.from(stakedToken, 'utf8').toString('hex'),
      receiver: contractAddress,
      gasLimit: '4000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: stakeRewardsTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Stake Rewards transaction',
        errorMessage: 'An error has occured Stake Rewards transaction',
        successMessage: 'Stake Rewards transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const stakeRewardsAllowed = rewardsAmount != '0' && !hasPendingTransactions;
  const notAllowedClass = stakeRewardsAllowed ? '' : 'not-allowed disabled';

  return (
    <div>
      {rewardsAmount !== undefined && rewardsAmount > 0 && (
        <>
          {!hasPendingTransactions ? (
            <div>
              <Button
                buttonWidth='240px'
                buttonHeight='39px'
                borderRadius={40}
                onClick={sendStakeRewardsTransaction}
                text={'Reinvest my rewards'}
                hasBorder={true}
                borderColor={['#BD37EC', '#1F67FF']}
                background={'#000000'}
                fontFamily='Plus Jakarta Sans'
                fontSize='13px'
                fontWeight='600'
              />
              {/* <button
                onClick={sendStakeRewardsTransaction}
                className='butLineBig goldButton'
              >
                REINVEST REWARDS{' '}
              </button> */}
            </div>
          ) : (
            <div className={notAllowedClass}>
              <button className='butLineBig'>Processing</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
