import * as React from 'react';
import { useState } from 'react';
import { useGetPendingTransactions } from 'lib';
import { FormatAmount } from 'lib';
import { defaultToken } from 'config';
import { useGetESDTInformations } from './Actions/helpers';
import LiquidModal from './LiquidModal';
import AddSingleTokenModal from './AddSingleTokenModal';

import RemoveLpModal from './RemoveLpModal';
import BigNumber from 'bignumber.js';
// import './LiquidInfo.css';
import { Add } from 'components/Nodes/components/Add';

export const LiquidInfo = ({ userEsdtBalance, lp }: any) => {
  const [showLiquid, setShowLiquid] = useState(false);
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);

  const [showRemoveLP, setShowRemoveLP] = useState(false);
  const pending = useGetPendingTransactions();
  const hasPendingTransactions = pending.length > 0;

  const lp_balance = userEsdtBalance.find(
    (item: any) => item.identifier === lp.lp_token
  );

  const first_esdt_info = useGetESDTInformations(defaultToken);
  const second_esdt_info = useGetESDTInformations(lp.swaped_token);

  const first_price = first_esdt_info.price
    ? BigInt((first_esdt_info.price * 1000000).toFixed())
    : BigInt(1000000);
  const first_value = BigInt(
    (BigInt(BigNumber(lp.first_token_amount).toFixed()) * BigInt(first_price)) /
      BigInt(1000000)
  );

  const second_price = second_esdt_info.price
    ? BigInt((second_esdt_info.price * 1000000).toFixed())
    : BigInt(1000000);
  const second_value = BigInt(
    (BigInt(BigNumber(lp.second_token_amount).toFixed()) *
      BigInt(second_price)) /
      BigInt(1000000)
  );

  const ecart =
    (first_value /
      BigInt(
        Math.pow(10, first_esdt_info.decimals ? first_esdt_info.decimals : 0)
      ) -
      second_value /
        BigInt(
          Math.pow(
            10,
            second_esdt_info.decimals ? second_esdt_info.decimals : 0
          )
        )) /
    BigInt(2);

  const ecart2 =
    (second_value /
      BigInt(
        Math.pow(10, second_esdt_info.decimals ? second_esdt_info.decimals : 0)
      ) -
      first_value /
        BigInt(
          Math.pow(10, first_esdt_info.decimals ? first_esdt_info.decimals : 0)
        )) /
    BigInt(2);

  return (
    <div className='text-white table-row'>
      <LiquidModal
        userEsdtBalance={userEsdtBalance}
        firstPoolPosition={lp}
        first_esdt_info={first_esdt_info}
        second_esdt_info={second_esdt_info}
        show={showLiquid}
        onClose={() => setShowLiquid(false)}
      />
      <RemoveLpModal
        userEsdtBalance={userEsdtBalance}
        firstPoolPosition={lp}
        first_esdt_info={first_esdt_info}
        second_esdt_info={second_esdt_info}
        lp_token={lp.lp_token}
        show={showRemoveLP}
        onClose={() => setShowRemoveLP(false)}
      />

      <AddSingleTokenModal
        userEsdtBalance={userEsdtBalance}
        first_esdt_info={first_esdt_info}
        second_esdt_info={second_esdt_info}
        show={showFirst}
        firstPoolPosition={lp}
        onClose={() => setShowFirst(false)}
      />
      <AddSingleTokenModal
        userEsdtBalance={userEsdtBalance}
        first_esdt_info={second_esdt_info}
        second_esdt_info={first_esdt_info}
        show={showSecond}
        firstPoolPosition={lp}
        onClose={() => setShowSecond(false)}
      />

      <div className='table-cell'>${lp.swaped_token.split('-')[0]} </div>

      <div className='table-cell'>
        <FormatAmount
          value={BigNumber(lp.first_token_amount).toFixed()}
          data-testid='balance'
        />
        <span
          onClick={() => {
            setShowFirst(true);
          }}
        >
          <span className='button-icon'>+</span>
        </span>
      </div>
      <div className='table-cell'>
        <FormatAmount
          value={BigNumber(lp.second_token_amount).toFixed()}
          data-testid='balance'
        />{' '}
        <span
          onClick={() => {
            setShowSecond(true);
          }}
        >
          <span className='button-icon'>+</span>
        </span>
      </div>

      <div className='table-cell'>
        <FormatAmount value={first_value.toString()} data-testid='balance' />
      </div>

      <div className='table-cell'>
        {second_esdt_info.price && (
          <FormatAmount value={second_value.toString()} data-testid='balance' />
        )}
      </div>

      <div className='table-cell'>
        {second_esdt_info.price && (
          <>
            {ecart > 0 && (
              <>
                {'+ '}
                <FormatAmount value={ecart.toString()} data-testid='balance' />
              </>
            )}
            {ecart2 > 0 && (
              <>
                {'- '}
                <FormatAmount value={ecart2.toString()} data-testid='balance' />
              </>
            )}
          </>
        )}
      </div>

      <div className='table-cell'>
        <div
          className='button-icon'
          onClick={() => {
            setShowLiquid(true);
          }}
        >
          +
        </div>

        {lp_balance?.balance > 0 && (
          <div
            className='button-icon'
            onClick={() => {
              setShowRemoveLP(true);
            }}
          >
            -
          </div>
        )}
      </div>
    </div>
  );
};
