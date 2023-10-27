import * as React from 'react';
import { useState } from 'react';
import { HeaderMenuContext } from 'context/Header/HeaderMenuContext';
import ModalAddCollection from './ModalAddCollection';

export const PoolAddCollection = ({
  address,
  userEsdtBalance,
  paddingAroundSvg,
  widthSvg,
  Speed,
  Nonce,
  Vesting,
  Unbounding,
  SelectReward,
  border = true
}: any) => {
  const [showStake, setShowStake] = useState(false);
  const { setHeaderMenu } = React.useContext(HeaderMenuContext);

  return (
    <>
      {showStake && (
        <ModalAddCollection
          onClose={() => {
            setHeaderMenu(true), setShowStake(false);
          }}
          setShow={setShowStake}
          show={showStake}
          userEsdtBalance={userEsdtBalance}
          Vesting={Vesting ? Vesting : 0}
          Unbounding={Unbounding ? Unbounding : 0}
          Speed={Speed ? Speed : 31}
          Nonce={Nonce ? Nonce : 0}
          SelectReward={SelectReward ? SelectReward : ''}
        />
      )}

      {address && (
        <div
          className={border ? 'button-icon-border' : '' + 'cursor-pointer'}
          onClick={() => {
            setHeaderMenu(false), setShowStake(true);
          }}
        >
          <div
            style={{
              padding: paddingAroundSvg ? paddingAroundSvg : '9px 9px 9px 9px'
            }}
            className='button-icon'
          >
            <svg
              className='plus'
              width={widthSvg ? widthSvg : 20}
              height={widthSvg ? widthSvg : 20}
              viewBox='0 0 32 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M17.3334 6.66683C17.3334 5.93045 16.7364 5.3335 16 5.3335C15.2637 5.3335 14.6667 5.93045 14.6667 6.66683V14.6668H6.66671C5.93033 14.6668 5.33337 15.2638 5.33337 16.0002C5.33337 16.7365 5.93033 17.3335 6.66671 17.3335H14.6667V25.3335C14.6667 26.0699 15.2637 26.6668 16 26.6668C16.7364 26.6668 17.3334 26.0699 17.3334 25.3335V17.3335H25.3334C26.0698 17.3335 26.6667 16.7365 26.6667 16.0002C26.6667 15.2638 26.0698 14.6668 25.3334 14.6668H17.3334V6.66683Z'
                fill='white'
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};
