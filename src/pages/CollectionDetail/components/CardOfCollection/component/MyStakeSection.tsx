import React, { FC, useState } from 'react';
import { ActionUnstakeNFT } from '../../Actions';
import { Actionfinalize } from '../../Actions/Actionfinalize';
import { ActionUnbound } from '../../Actions/ActionUnbound';
import Countdown from '../../CountDown';
import MyStakedNft from './MyStakedNft';
import toHex from 'helpers/toHex';
import BigNumber from 'bignumber.js';

interface MyStakeSectionProps {
  staked_balance: any[];
  pool: number;
  unbounding: any;
  isOpen: boolean;
  setOpenModalJump?: any;
  setNftsJump?: any;
  collectionReward?: any;
  collectionRewards?: any;
  isV2?: boolean;
}

const MyNftSection: FC<MyStakeSectionProps> = ({
  pool,
  staked_balance,
  unbounding,
  isOpen,
  setOpenModalJump,
  setNftsJump,
  collectionReward,
  collectionRewards,
  isV2
}) => {
  const [selectedPoolIds, setSelectedPoolIds] = useState<string[]>([]);

  const unstakableItems = React.useMemo(() => {
    return staked_balance
      ? staked_balance.filter(
          (item) =>
            item?.staked_nft?.pool_id?.toString() === pool?.toString() &&
            item?.staked_nft?.jump_unbound == 0 &&
            unbounding == 0 &&
            !(item?.current_block < item?.staked_nft?.lock)
        )
      : [];
  }, [staked_balance, pool, unbounding]);

  const toggleSelection = (poolId: string) => {
    if (selectedPoolIds.includes(poolId)) {
      setSelectedPoolIds(selectedPoolIds.filter((id) => id !== poolId));
    } else {
      setSelectedPoolIds([...selectedPoolIds, poolId]);
    }
  };

  const handleSelectAll = (e: any) => {
    if (e.target.checked) {
      const allIds = unstakableItems.map(
        (item) => item?.staked_nft?.id?.toString()
      );
      setSelectedPoolIds(allIds);
    } else {
      setSelectedPoolIds([]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {selectedPoolIds.length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '15px',
            width: '100%'
          }}
        >
          <div style={{ width: '200px' }}>
            <ActionUnstakeNFT
              text={`Unstake Selected (${selectedPoolIds.length})`}
              disabled={false}
              nft_ids={selectedPoolIds}
              isV2={isV2}
            />
          </div>
        </div>
      )}

      {unstakableItems.length > 0 && (
        <div
          style={{
            marginBottom: '10px',
            color: 'white',
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            alignItems: 'center', // Align vertically
            cursor: 'pointer' // Pointer for the whole container
          }}
          onClick={(e) => {
            // Prevent triggering if clicking the checkbox itself (since it has its own handler, though native label behavior handles this)
            // Actually, simplest is to let label handle it or manually toggle
            if (e.target !== e.currentTarget.querySelector('input')) {
              const isAllSelected =
                selectedPoolIds.length > 0 &&
                selectedPoolIds.length === unstakableItems.length;
              handleSelectAll({ target: { checked: !isAllSelected } });
            }
          }}
        >
          <input
            type='checkbox'
            onChange={handleSelectAll}
            checked={
              selectedPoolIds.length > 0 &&
              selectedPoolIds.length === unstakableItems.length
            }
            style={{ cursor: 'pointer' }}
          />
          <span style={{ userSelect: 'none' }}>Select All Unstakable</span>
        </div>
      )}

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
              (item) =>
                item?.staked_nft?.pool_id?.toString() === pool?.toString()
            )
            .map((item, key) => {
              const canUnstake =
                item?.staked_nft?.jump_unbound == 0 &&
                unbounding == 0 &&
                !(item?.current_block < item?.staked_nft?.lock);

              if (isV2) {
                console.log('V2 NFT Item:', {
                  id: item?.staked_nft?.id,
                  lock: item?.staked_nft?.lock,
                  current_block: item?.current_block,
                  unbound: item?.staked_nft?.unbound,
                  diff: item?.staked_nft?.lock - item?.current_block
                });
              }

              return (
                <div
                  key={key}
                  style={{
                    width: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    position: 'relative'
                  }}
                >
                  <div className='imgCheminCard'>
                    {canUnstake && (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginTop: '5px',
                          marginBottom: '2px'
                        }}
                      >
                        <input
                          type='checkbox'
                          checked={selectedPoolIds.includes(
                            item?.staked_nft?.id?.toString()
                          )}
                          onChange={() =>
                            toggleSelection(item?.staked_nft?.id?.toString())
                          }
                          style={{
                            width: '16px',
                            height: '16px',
                            cursor: 'pointer'
                          }}
                        />
                      </div>
                    )}
                    <a
                      target='_BLANK'
                      rel='noreferrer'
                      className='text-white'
                      href={
                        'https://xoxno.com/nft/' +
                        item?.staked_nft?.identifier +
                        '-' +
                        toHex(item?.staked_nft?.nonce)
                      }
                    >
                      <u>
                        {item?.staked_nft?.identifier.split('-')[1] +
                          '-' +
                          toHex(item?.staked_nft?.nonce)}
                      </u>
                    </a>{' '}
                    {item?.staked_nft?.identifier && (
                      <MyStakedNft
                        // jumpOpen={})
                        collectionRewards={collectionRewards}
                        nftsDetail={item?.staked_nft}
                        jump={isV2 ? undefined : 'jump'}
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
                          item?.current_block < item?.staked_nft?.lock ? (
                            <span
                              style={{
                                display: 'flex',
                                gap: '4px',
                                alignItems: 'center'
                              }}
                            >
                              Vesting
                              <Countdown
                                totalSeconds={
                                  isV2
                                    ? Number(item?.staked_nft?.lock) -
                                      Number(item?.current_block)
                                    : (Number(item?.staked_nft?.lock) -
                                        Number(item?.current_block)) *
                                      6
                                }
                              />
                            </span>
                          ) : (
                            'Unstake '
                          )
                        }
                        disabled={item?.current_block < item?.staked_nft?.lock}
                        nft_id={item?.staked_nft.id}
                        isV2={isV2}
                      />{' '}
                    </>
                  ) : (
                    <>
                      {item?.staked_nft?.unbound == 0 ? (
                        <>
                          <ActionUnbound
                            text={
                              BigInt(item?.current_block) <
                              BigInt(item?.staked_nft?.lock) ? (
                                <Countdown
                                  totalSeconds={
                                    isV2
                                      ? Number(item?.staked_nft?.lock) -
                                        Number(item?.current_block)
                                      : (Number(item?.staked_nft?.lock) -
                                          Number(item?.current_block)) *
                                        6
                                  }
                                />
                              ) : (
                                'Unbound '
                              )
                            }
                            disabled={
                              BigInt(item?.current_block) <
                              BigInt(item?.staked_nft?.lock)
                            }
                            nft_id={item?.staked_nft?.id}
                            isV2={isV2}
                          />
                        </>
                      ) : (
                        <>
                          <Actionfinalize
                            text={'Finalize '}
                            disabled={
                              !item?.current_block || !item?.staked_nft?.unbound
                                ? true
                                : new BigNumber(item.current_block).lt(
                                    new BigNumber(item.staked_nft.unbound)
                                  )
                            }
                            nft_id={item?.staked_nft?.id}
                            isV2={isV2}
                          />
                          <Countdown
                            id_pool={pool}
                            totalSeconds={
                              isV2
                                ? Number(item?.staked_nft?.unbound) -
                                  Number(item?.current_block)
                                : (Number(item?.staked_nft?.unbound) -
                                    Number(item?.current_block)) *
                                  6
                            }
                          />
                        </>
                      )}
                    </>
                  )}
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default MyNftSection;
