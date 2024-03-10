//NOTE - partie inferieure
import React, { FC } from 'react';
import { ActionUnstakeNFT } from '../../Actions';
import { Actionfinalize } from '../../Actions/Actionfinalize';
import { ActionUnbound } from '../../Actions/ActionUnbound';
import Countdown from '../../CountDown';
import MyStakedNft from './MyStakedNft';
import toHex from 'helpers/toHex';

interface MyStakeSectionProps {
  staked_balance: any[];
  pool: number;
  unbounding: any;
  isOpen: boolean;
  setOpenModalJump?: any;
  setNftsJump?: any;
  collectionReward?: any;
  collectionRewards?: any;
}
const MyNftSection: FC<MyStakeSectionProps> = ({
  pool,
  staked_balance,
  unbounding,
  isOpen,
  setOpenModalJump,
  setNftsJump,
  collectionReward,
  collectionRewards
}) => {

  console.log(staked_balance);
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
          .filter(
            (item) => item?.staked_nft?.pool_id?.toString() === pool?.toString()
          )
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
                <a
                  target='_BLANK'
                  rel='noreferrer'
                  className='text-white'
                  href={
                    'https://www.frameit.gg/marketplace/nft/' +
                    item?.staked_nft.identifier +
                    '-' +
                    toHex(item?.staked_nft?.nonce)
                  }
                >
                  <u>
                    {item?.staked_nft.identifier.split('-')[1] +
                      '-' +
                      toHex(item?.staked_nft?.nonce)}
                  </u>
                </a>{' '}
                {item?.staked_nft?.identifier && (
                  <MyStakedNft
                    // jumpOpen={})
                    collectionRewards={collectionRewards}
                    nftsDetail={item?.staked_nft}
                    jump={'jump'}
                    collectionReward={collectionReward}
                    setNftsJump={setNftsJump}
                    setOpenModalJump={setOpenModalJump}
                    isOpen={isOpen}
                    nft_identifier={item?.staked_nft.identifier}
                    nft_nonce={item?.staked_nft?.nonce}
                    nft_qty={item?.staked_nft?.qty?.toString()}
                    jumpDesabled={
                      item?.current_block < item?.staked_nft?.lock ||
                      item?.staked_nft?.unbound != 0
                    }
                  />
                )}
              </div>
              {item?.staked_nft?.jump_unbound == 0 && unbounding == 0 ? (
                <>
                  <ActionUnstakeNFT
                    text={
                      item?.current_block < item?.staked_nft?.lock
                        ? 'Vesting '
                        : 'Unstake '
                    }
                    disabled={item?.current_block < item?.staked_nft?.lock}
                    nft_id={item?.staked_nft.id}
                  />{' '}
                  <Countdown
                    totalSeconds={
                      (item?.staked_nft?.lock - item?.current_block) * 6
                    }
                  />
                </>
              ) : (
                <>
                  {item?.staked_nft.unbound == 0 ? (
                    <>
                      <ActionUnbound
                        text={
                          BigInt(item?.current_block) <
                          BigInt(item?.staked_nft?.lock)
                            ? 'Vesting '
                            : 'Unbound '
                        }
                        disabled={
                          BigInt(item?.current_block) <
                          BigInt(item?.staked_nft?.lock)
                        }
                        nft_id={item?.staked_nft.id}
                      />
                      <Countdown
                        totalSeconds={
                          (item?.staked_nft?.unbound - item?.current_block) * 6
                        }
                      />

                      <Countdown
                        totalSeconds={
                          (item?.staked_nft?.lock - item?.current_block) * 6
                        }
                      />
                    </>
                  ) : (
                    <>
                      <Actionfinalize
                        text={'Finalize '}
                        disabled={
                          BigInt(item?.current_block) <
                          BigInt(item?.staked_nft?.unbound)
                        }
                        nft_id={item?.staked_nft.id}
                      />
                      <Countdown
                        id_pool={pool}
                        totalSeconds={
                          (item?.staked_nft?.unbound - item?.current_block) * 6
                        }
                      />
                    </>
                  )}
                </>
              )}
            </div>
          ))}
    </div>
  );
};

export default MyNftSection;
