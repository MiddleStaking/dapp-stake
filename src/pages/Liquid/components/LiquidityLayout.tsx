import React from 'react';
import { defaultToken } from 'config';
import { useGetSwapedTokens } from './Actions/helpers';
import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
import { LiquidInfo } from './LiquidInfo';
import { useGetAllLp } from 'pages/Swap/components/Actions/helpers';
import './LiquidityLayout.css';
import BigNumber from 'bignumber.js';

export const LiquidityLayout = () => {
  const swapedTokens: string[] = useGetSwapedTokens();
  const allLp = useGetAllLp();
  const userEsdtBalance = useGetUserESDT();

  const sortedLp = allLp
    ? [...allLp].sort((a, b) =>
        new BigNumber(b.first_token_amount)
          .minus(new BigNumber(a.first_token_amount))
          .toNumber()
      )
    : [];

  return (
    <div className='center'>
      <div className='liquidity-table'>
        {sortedLp &&
          sortedLp.map((lp) => (
            <div className='table-row' key={lp.lp_token}>
              <div className='table-cell'>
                <LiquidInfo userEsdtBalance={userEsdtBalance} lp={lp} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
