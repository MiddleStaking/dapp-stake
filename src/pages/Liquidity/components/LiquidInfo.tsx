import * as React from 'react';
import { useState } from 'react';
import { useGetPendingTransactions } from 'lib';
import { FormatAmount } from 'lib';
import { defaultToken } from 'config';
import { useGetESDTInformations } from 'pages/Earn/components/Actions/helpers';
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

  const first_price = first_esdt_info?.price
    ? BigNumber(first_esdt_info.price).multipliedBy(1000000).toFixed(0)
    : '1000000';
  const first_value = new BigNumber(lp.first_token_amount)
    .multipliedBy(first_price)
    .dividedBy(1000000);

  const second_price = second_esdt_info?.price
    ? BigNumber(second_esdt_info?.price)
        .multipliedBy(1000000)
        .toFixed(0)
    : '1000000';
  const second_value = new BigNumber(lp?.second_token_amount)
    .multipliedBy(second_price)
    .dividedBy(1000000);

  const ecart = BigNumber(first_value.toString())
    .div(
      BigNumber(10).pow(
        first_esdt_info?.decimals ? first_esdt_info.decimals : 0
      )
    )
    .minus(
      BigNumber(second_value.toString()).div(
        BigNumber(10).pow(
          second_esdt_info?.decimals ? second_esdt_info.decimals : 0
        )
      )
    )
    .div(2);

  const ecart2 = BigNumber(second_value.toString())
    .div(
      BigNumber(10).pow(
        second_esdt_info?.decimals ? second_esdt_info.decimals : 0
      )
    )
    .minus(
      BigNumber(first_value.toString()).div(
        BigNumber(10).pow(
          first_esdt_info?.decimals ? first_esdt_info.decimals : 0
        )
      )
    )
    .div(2);

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
        {Number(
          new BigNumber(lp?.first_token_amount)
            .dividedBy(10 ** first_esdt_info?.decimals)
            .toFixed()
        ).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}{' '}
        <span
          onClick={() => {
            setShowFirst(true);
          }}
        >
          <span className='button-icon'>+</span>
        </span>
      </div>
      <div className='table-cell'>
        {Number(
          new BigNumber(lp.second_token_amount)
            .dividedBy(10 ** second_esdt_info?.decimals)
            .toFixed()
        ).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}{' '}
        <span
          onClick={() => {
            setShowSecond(true);
          }}
        >
          <span className='button-icon'>+</span>
        </span>
      </div>

      <div className='table-cell'>
        {Number(
          first_value.dividedBy(10 ** first_esdt_info?.decimals).toString()
        ).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}{' '}
      </div>

      <div className='table-cell'>
        {second_esdt_info.price && (
          <>
            {' '}
            {Number(
              second_value
                .dividedBy(10 ** second_esdt_info?.decimals)
                .toString()
            ).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}{' '}
          </>
        )}
      </div>

      <div className='table-cell'>
        {second_esdt_info.price && (
          <>
            {ecart.isGreaterThan(0) && (
              <>
                {'+ '}
                {Number(ecart.toFixed(0)).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </>
            )}
            {ecart2.isGreaterThan(0) && (
              <>
                {'- '}
                {Number(ecart2.toFixed(0)).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}{' '}
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
