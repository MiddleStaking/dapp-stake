import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useGetAccountInfo } from 'lib';
import './../../../../../assets/Modal.css';
import '../AddCollection/CollectionModal.scss';
import { BigNumber } from 'bignumber.js';
import Input from 'components/Design/Input';
import { CheckBox } from './../../../../../components/Design';
import { ActionEditPoolV2 } from '../../Actions/ActionEditPoolV2';
import { useGetUserNFT } from '../../Actions/helpers';
import DropdownMenu from 'components/Design/DropdownMenu';

interface ModalProps {
  show: boolean;
  setShow: any;
  onClose: MouseEventHandler<any>;
  collectionReward: any;
}

const ModalEditPoolV2 = (props: ModalProps) => {
  const ModalRef: any = useRef(null);
  const { collectionReward } = props;

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        props.show &&
        ModalRef.current &&
        !ModalRef.current.contains(e.target)
      ) {
        props.setShow(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [props.show]);

  const maxVesting = 40;
  const maxSpeed = 365;
  const maxUnbound = 10;

  const [agreement, setaAgreement] = React.useState(false);

  const [vestingTime, setVestingTime] = React.useState(
    collectionReward?.vesting ? Number(collectionReward.vesting) : 0
  );
  const [unboundingTime, setUnboundingTime] = React.useState(
    collectionReward?.unbounding ? Number(collectionReward.unbounding) : 0
  );
  const [speedNumber, setSpeedNumber] = React.useState(
    collectionReward?.speed ? Number(collectionReward.speed) : 1
  );
  // Initial Nonces
  const initialNonces =
    collectionReward?.nonces && collectionReward.nonces.length > 0
      ? collectionReward.nonces.some((n: any) => n.toString() === '0')
        ? ''
        : collectionReward.nonces.join(', ')
      : '';

  const [nonceString, setNonceString] = React.useState(initialNonces);

  const [collection, setCollection] = React.useState(
    collectionReward?.collection ? collectionReward.collection.toString() : ''
  );

  // To allow changing collection, we might need user's NFTs or just a text input?
  // ModalAddCollection uses userNFTBalance dropdown.
  const userNFTBalance = useGetUserNFT();

  const handleChange = () => {
    setaAgreement(!agreement);
  };

  function handleVestingTimeChange(value: any) {
    if (value <= 0) {
      setVestingTime(0);
    } else if (value > maxVesting) {
      setVestingTime(maxVesting);
    } else {
      setVestingTime(value);
    }
  }

  function handleUnboundingTimeChange(value: any) {
    if (value <= 0) {
      setUnboundingTime(0);
    } else if (value > maxUnbound) {
      setUnboundingTime(maxUnbound);
    } else {
      setUnboundingTime(value);
    }
  }

  function handleSpeedChange(value: any) {
    if (value < 1) {
      setSpeedNumber(1);
    } else if (value > maxSpeed) {
      setSpeedNumber(maxSpeed);
    } else {
      setSpeedNumber(value);
    }
  }

  function handleRangeSpeedValueChange(e: React.ChangeEvent<any>) {
    if (e.target.value < 1) {
      setSpeedNumber(1);
    } else if (e.target.value > maxSpeed) {
      setSpeedNumber(maxSpeed);
    } else {
      setSpeedNumber(e.target.value);
    }
  }
  function handleRangeVestingValueChange(e: React.ChangeEvent<any>) {
    if (e.target.value < 0) {
      setVestingTime(0);
    } else if (e.target.value > maxVesting) {
      setVestingTime(maxVesting);
    } else {
      setVestingTime(e.target.value);
    }
  }
  function handleRangeUnboundingValueChange(e: React.ChangeEvent<any>) {
    if (e.target.value < 0) {
      setUnboundingTime(0);
    } else if (e.target.value > maxUnbound) {
      setUnboundingTime(maxUnbound);
    } else {
      setUnboundingTime(e.target.value);
    }
  }

  function handleNonceChange(value: any) {
    setNonceString(value);
  }

  if (!props.show) {
    return null;
  }
  const percentage = (speedNumber / maxSpeed) * 100;
  const percentagevestingTime = (vestingTime / maxVesting) * 100;
  const percentageunbundingTime = (unboundingTime / maxUnbound) * 100;

  return (
    <>
      <div className='centerStakeModal_Collection'>
        <div ref={ModalRef} className='backgroundStakeModal_Collection'>
          <div className='modalStakeModal_Collection'>
            <div className='contentStakeModal_Collection'>
              <div className='modalLabelStakeModal_Collection'>
                Edit Pool (V2)
              </div>

              <div
                className='pool-details_StakeModal_black_Collection'
                style={{ marginTop: '20px' }}
              >
                <div className='GroupeDetails_StakeModal_black_Collection'>
                  <div className='PoolDetails_StakeModal_black_Collection'>
                    <div className='DetailsInfo_black_Collection'>
                      <div className='LabelDetailsInfo_black_Collection'>
                        Collection :
                      </div>
                      <div className='ValueDetailsInfo_black_Collection'>
                        <DropdownMenu
                          BoxShadowActive={false}
                          BoxShadowColor='transparent'
                          BoxShadowActiveColor='0 0 24px 0 '
                          inputHeight={'15px'}
                          inputWidth='179px'
                          borderRadius='54'
                          hasBorder={false}
                          borderColor='#695885'
                          borderRadiusOptions='5px'
                          options={
                            userNFTBalance
                              ? userNFTBalance.map((item: any) => ({
                                  text: item.collection,
                                  value: item.collection
                                }))
                              : []
                          }
                          defaultValue={collection}
                          disableOption={false}
                          onSelect={function (value: any): void {
                            setCollection(value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='pool-details_StakeModal_black_Collection'>
                <div className='GroupeDetails_StakeModal_black_input_Collection'>
                  <div className='PoolDetails_StakeModal_black_Collection'>
                    <div className='DetailsInfo_black_Collection'>
                      <div className='LabelDetailsInfo_black_Collection'>
                        Speed :
                      </div>
                      <div>
                        <Input
                          decimal={0}
                          inputHeight='25px'
                          inputWidth='66px'
                          borderRadius={6}
                          hasBorder={false}
                          BoxShadowActive={false}
                          hasBorderActive={false}
                          value={speedNumber
                            .toString()
                            .replace(/^0+(?=\d)/, '')}
                          background={'rgb(51 39 102)'}
                          onInputChange={handleSpeedChange}
                          type='number'
                          placeholder={'number'}
                          fontSize={14}
                        />
                      </div>
                      <div className='ValueDetailsInfo_black_Collection'>
                        <input
                          type='range'
                          id='slider'
                          min='0'
                          max={maxSpeed}
                          step='1'
                          value={speedNumber}
                          onChange={handleRangeSpeedValueChange}
                          style={{
                            appearance: 'none',
                            width: '100%',
                            height: '8px',
                            background: `linear-gradient(to right, #1F67FF 0%, #BD37EC ${percentage}%, white ${percentage}%, white 100%)`,
                            outline: 'none',
                            opacity: '0.7',
                            transition: 'opacity .2s',
                            borderRadius: '5px'
                          }}
                        />
                        <div style={{ minWidth: '30px' }}>
                          {Math.round(percentage)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='pool-details_StakeModal_black_Collection'>
                <div className='GroupeDetails_StakeModal_black_input_Collection'>
                  <div className='PoolDetails_StakeModal_black_Collection'>
                    <div className='DetailsInfo_black_Collection'>
                      <div className='LabelDetailsInfo_black_Collection'>
                        Nonce :
                      </div>
                      <div>
                        <Input
                          decimal={0}
                          inputHeight='25px'
                          inputWidth='179px'
                          borderRadius={6}
                          hasBorder={true}
                          BoxShadowActive={false}
                          hasBorderActive={true}
                          background={'transparent'}
                          value={nonceString}
                          onInputChange={handleNonceChange}
                          type='text'
                          placeholder={'1, 2, 3... or leave empty for all'}
                          fontSize={14}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='pool-details_StakeModal_black_Collection'>
                <div className='GroupeDetails_StakeModal_black_input_Collection'>
                  <div className='PoolDetails_StakeModal_black_Collection'>
                    <div className='DetailsInfo_black_Collection'>
                      <div className='LabelDetailsInfo_black_Collection'>
                        Vesting :
                      </div>
                      <div>
                        <Input
                          decimal={0}
                          inputHeight='25px'
                          inputWidth='60px'
                          borderRadius={6}
                          hasBorder={false}
                          BoxShadowActive={false}
                          hasBorderActive={false}
                          value={vestingTime
                            .toString()
                            .replace(/^0+(?=\d)/, '')}
                          background={'rgb(51 39 102)'}
                          onInputChange={handleVestingTimeChange}
                          type='number'
                          placeholder={'number'}
                          fontSize={14}
                        />
                      </div>
                      <div className='ValueDetailsInfo_black_Collection'>
                        <input
                          type='range'
                          min='0'
                          max={maxVesting}
                          step='1'
                          value={vestingTime}
                          onChange={handleRangeVestingValueChange}
                          style={{
                            appearance: 'none',
                            width: '100%',
                            height: '8px',
                            background: `linear-gradient(to right, #1F67FF 0%, #BD37EC ${percentagevestingTime}%, white ${percentagevestingTime}%, white 100%)`,
                            outline: 'none',
                            opacity: '0.7',
                            transition: 'opacity .2s',
                            borderRadius: '5px'
                          }}
                        />
                        <div style={{ minWidth: '30px' }}>
                          {Math.round(percentagevestingTime)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='pool-details_StakeModal_black_Collection'>
                <div className='GroupeDetails_StakeModal_black_input_Collection'>
                  <div className='PoolDetails_StakeModal_black_Collection'>
                    <div className='DetailsInfo_black_Collection'>
                      <div className='LabelDetailsInfo_black_Collection'>
                        Unbounding :
                      </div>
                      <div>
                        <Input
                          decimal={0}
                          inputHeight='25px'
                          inputWidth='60px'
                          borderRadius={6}
                          hasBorder={false}
                          BoxShadowActive={false}
                          hasBorderActive={false}
                          value={unboundingTime
                            .toString()
                            .replace(/^0+(?=\d)/, '')}
                          background={'rgb(51 39 102)'}
                          onInputChange={handleUnboundingTimeChange}
                          type='number'
                          placeholder={'number'}
                          fontSize={14}
                        />
                      </div>
                      <div className='ValueDetailsInfo_black_Collection'>
                        <input
                          type='range'
                          min='0'
                          max={maxUnbound}
                          step='1'
                          value={unboundingTime}
                          onChange={handleRangeUnboundingValueChange}
                          style={{
                            appearance: 'none',
                            width: '100%',
                            height: '8px',
                            background: `linear-gradient(to right, #1F67FF 0%, #BD37EC ${percentageunbundingTime}%, white ${percentageunbundingTime}%, white 100%)`,
                            outline: 'none',
                            opacity: '0.7',
                            transition: 'opacity .2s',
                            borderRadius: '5px'
                          }}
                        />
                        <div style={{ minWidth: '30px' }}>
                          {Math.round(percentageunbundingTime)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='pool-details_StakeModal_black_Collection'>
                <div className='GroupeDetails_StakeModal_black_Collection'>
                  <div className='PoolDetails_StakeModal_black_Collection'>
                    <div className='DetailsInfo_black_Collection'>
                      <div className='LabelDetailsInfo_black_Collection'>
                        Agreement
                      </div>

                      <div className='ValueDetailsInfo_black_Collection'>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start'
                          }}
                        >
                          <CheckBox
                            label='I confirm these changes'
                            checked={agreement}
                            onClick={() => {
                              handleChange();
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='pool-details_StakeModal_black_Collection'>
                <div className='GroupeDetails_StakeModal_black_Collection'>
                  <div className='PoolDetails_StakeModal_black_Collection'>
                    <div className='DetailsInfo_black_Collection'>
                      <ActionEditPoolV2
                        pool_id={
                          collectionReward?.pool_id
                            ? collectionReward.pool_id.toString()
                            : '0'
                        }
                        collection={collection}
                        speed={speedNumber}
                        vesting={vestingTime}
                        unbounding={unboundingTime}
                        nonces={nonceString}
                        agreement={agreement}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalEditPoolV2;
