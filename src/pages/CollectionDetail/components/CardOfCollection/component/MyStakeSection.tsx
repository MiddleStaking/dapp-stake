//NOTE - partie inferieure
import React, { FC } from 'react';
import { ActionUnstakeNFT } from '../../Actions';
import MyStakedNft from './MyStakedNft';
import Countdown from '../../CountDown';

interface MyStakeSectionProps {
  staked_balance: any[];
  pool: number;
}
const MyNftSection: FC<MyStakeSectionProps> = ({ pool, staked_balance }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        justifyContent: 'center'
      }}
    >
      {staked_balance &&
        staked_balance
          .filter((item) => item.staked_nft.pool_id == pool)
          .map((item, key) => (
            <div
              key={key}
              style={{
                width: '100px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              <div className='imgCheminCard'>
                {item.staked_nft.nft_identifier && (
                  <MyStakedNft
                    nft_identifier={item.staked_nft.nft_identifier}
                    nft_nonce={item.staked_nft.nft_nonce}
                  />
                )}
              </div>
              <ActionUnstakeNFT
                text={
                  item?.current_block < item?.staked_nft?.lock
                    ? 'Vesting'
                    : 'Unstake'
                }
                disabled={item?.current_block < item?.staked_nft?.lock}
                nft_id={item?.staked_nft.nft_id}
              />

              {item?.current_block < item?.staked_nft?.lock && (
                <Countdown
                  totalSeconds={
                    (item?.staked_nft?.lock - item?.current_block) * 6
                  }
                />
              )}

              <br />
            </div>
          ))}
    </div>
  );
};

export default MyNftSection;
