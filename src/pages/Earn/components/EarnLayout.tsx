import React from 'react';
import styles from './../earn.module.scss';

import { TopInfo } from './TopInfo';
import { PoolInfo } from './PoolInfo';
import { defaultToken } from 'config';
import { useGetRewardedTokens } from './Actions/helpers';
import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';

export const EarnLayout = ({ children }: React.PropsWithChildren) => {
  const rewardedTokens = useGetRewardedTokens();
  const userEsdtBalance = useGetUserESDT();

  const balance = userEsdtBalance
    .filter((token) => {
      return token.identifier === defaultToken;
    })
    .map((token) => token.balance);

  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-12 col-md-10 mx-auto'>
          <div className='card shadow-sm border-0'>
            <div className='card-body p-1'>
              <div className='card border-0 bg-primary'>
                <div className='card-body text-center p-4'>
                  <TopInfo />
                  Balance :{' '}
                  <FormatAmount
                    value={balance.toString()}
                    egldLabel={defaultToken}
                    data-testid='balance'
                  />
                </div>
                {rewardedTokens[0] != '' ? (
                  rewardedTokens.map((rtoken) => (
                    <div key={rtoken}>
                      <PoolInfo
                        stakedToken={defaultToken}
                        rewardedToken={rtoken}
                        userEsdtBalance={balance}
                      />
                    </div>
                  ))
                ) : (
                  <>No pool to load</>
                )}
              </div>
            </div>
          </div>
          <div className={styles.transactions}>{children}</div>
        </div>
      </div>
    </div>
  );
};
