import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useGetAccountInfo } from 'lib';
import { FormatAmount } from 'lib';
import './../../../../../assets/Modal.css';
import './CollectionModal.scss';
import { BigNumber } from 'bignumber.js';
import { useParams } from 'react-router-dom';
import { Button } from 'components/Design';
import DropdownMenu from 'components/Design/DropdownMenu';
import Input from 'components/Design/Input';
import toBigAmount from 'helpers/toBigAmount';
import toHex from 'helpers/toHex';
import { useGetCollectionRewards } from 'pages/CollectionDetail/components/Actions/helpers';
import { useGetUserCredits } from 'pages/Collections/components/Actions/helpers';
import { useGetESDTInformations } from 'pages/Earn/components/Actions/helpers';
import notFound from '../../../../../assets/img/notfoundc.svg';
import { ActionFundV2 } from '../../Actions/ActionFundV2';
import { ActionWhitelistCollection } from '../../Actions/ActionWhitelistCollection';
import { ActionWhitelistToken } from '../../Actions/ActionWhitelistToken';
import {
  useGetCollectionInformations,
  useGetUserNFT
} from '../../Actions/helpers';
import { useGetNft } from '../../Actions/helpers/useGetNft';
import { useGetWhitelistedCollections } from '../../Actions/helpersApi/useGetWhitelistedCollections';
import { useGetWhitelistedTokens } from '../../Actions/helpersApi/useGetWhitelistedTokens';
import { useGetWhitelistPrice } from '../../Actions/helpersApi/useGetWhitelistPrice';
import { useGetWhitelistTokenPrice } from '../../Actions/helpersApi/useGetWhitelistTokenPrice';
import HexagoneNFT from '../../hexagoneNFT';
import { CheckBox } from './../../../../../components/Design';
import HexagoneGroupe from './hexagoneGroupe';
import { scOwner, defaultToken } from 'config';

interface ModalProps {
  userEsdtBalance: any;
  show: boolean;
  setShow: any;
  onClose: MouseEventHandler<any>;
  Speed?: number;
  Nonce?: number | string;
  Vesting?: number;
  Unbounding?: number;
  SelectReward?: string;
}

const ModalAddCollectionV2 = (props: ModalProps) => {
  const { param } = useParams();
  const [url] = useState(param?.toString());
  const [credits, setCredits] = useState(BigNumber(0));
  const [buyCredits, setBuyCredits] = useState(false);
  const ModalRef: any = useRef(null);
  const { account, address } = useGetAccountInfo();
  const eBalance = BigInt(Number(account?.balance) > 0 ? account?.balance : 0);

  const user_credits = useGetUserCredits(address);
  // Default credit value for safety, though V2 might have different logic
  const credit_value = 500;

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

  const userNFTBalance = useGetUserNFT();
  const userEsdtBalance = props.userEsdtBalance;
  const [openAccordions, setOpenAccordions] = useState([
    false,
    false,
    false,
    false,
    false,
    false
  ]);
  const [stoken, setStoken] = React.useState(url ? url : '');
  const testgetStakedTokens = useGetCollectionRewards(stoken);
  const [rtoken, setRtoken] = React.useState(
    props.SelectReward ? props.SelectReward : ''
  );
  const [decimals, setDecimals] = React.useState(18);
  const [balance, setBalance] = React.useState(BigInt(0));
  const maxVesting = 40;
  const maxSpeed = 365;
  const maxUnbound = 10;

  const [agreement, setaAgreement] = React.useState(false);
  const [agreement2, setaAgreement2] = React.useState(true);

  const [tokenAmount, setTokenAmount] = React.useState(0);
  const [vestingTime, setVestingTime] = React.useState(
    props.Vesting ? props.Vesting : 0
  );
  const [unboundingTime, setUnboundingTime] = React.useState(
    props.Unbounding ? props.Unbounding : 0
  );
  const [speedNumber, setSpeedNumber] = React.useState(
    props.Speed ? props.Speed : 180
  );
  // Replaced nonceNumber with nonceString for multiple nonce support
  const [nonceString, setNonceString] = React.useState(
    props.Nonce ? props.Nonce.toString() : ''
  );

  // Use first valid nonce for preview
  const firstNonce = nonceString
    ? parseInt(nonceString.split(',')[0].trim())
    : 0;

  const nft: any = useGetNft(stoken, isNaN(firstNonce) ? 0 : firstNonce, true);

  const [bigAmount, setBigAmount] = React.useState(BigInt(0));

  // Whitelist Logic
  const whitelistedCollections = useGetWhitelistedCollections();
  const whitelistPrice = useGetWhitelistPrice();
  const isWhitelisted = React.useMemo(() => {
    if (!stoken || stoken === 'select collection') return true; // Default to true to show selector
    return whitelistedCollections.includes(stoken);
  }, [stoken, whitelistedCollections]);

  const whitelistedTokens = useGetWhitelistedTokens();
  const whitelistTokenPrice = useGetWhitelistTokenPrice();
  const isTokenWhitelisted = React.useMemo(() => {
    if (!rtoken || rtoken === 'select token') return true;
    return whitelistedTokens.includes(rtoken);
  }, [rtoken, whitelistedTokens]);

  const tokenProps = userEsdtBalance.find(
    (item: any) => item.identifier === rtoken
  );
  const handleChange = () => {
    setaAgreement(!agreement);
  };
  const handleChange2 = () => {
    setaAgreement2(!agreement2);
  };

  useEffect(() => {
    if ((firstNonce > 0 || nonceString.length > 0) && !nft.media) {
      setaAgreement2(false);
    } else {
      setaAgreement2(true);
    }
  }, [nonceString, nft]);

  useEffect(() => {
    if (tokenProps?.decimals) setDecimals(tokenProps.decimals);
    if (tokenProps?.balance) setBalance(tokenProps.balance);
  }, [tokenProps]);

  const rewarded_esdt_info = useGetESDTInformations(rtoken);

  const rdecimals = rewarded_esdt_info?.decimals
    ? rewarded_esdt_info?.decimals
    : 0;

  function handleTokenAmountChange(value: any) {
    if (!rtoken) {
      return;
    }
    const amount = BigInt(Number(value) * 10 ** rdecimals);
    if (amount < BigInt(0)) {
      setTokenAmount(0);
      setBigAmount(BigInt(0));
    } else if (amount > balance) {
      setTokenAmount(Number(BigInt(balance)) / Number(BigInt(10 ** decimals)));
      setBigAmount(balance);
    } else {
      setTokenAmount(value);
      const output = toBigAmount(Number(value), Number(decimals));
      setBigAmount(BigInt(output));
    }
  }

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

  const getCollectionInformations = useGetCollectionInformations(stoken);

  function handleNonceChange(value: any) {
    if (!stoken) {
      return;
    }
    // Allow string input for multiple nonces
    setNonceString(value);
  }

  function setToMax() {
    setTokenAmount(Number(BigInt(balance)) / Number(BigInt(10 ** decimals)));
    setBigAmount(balance);
  }

  //calculate credit cost
  useEffect(() => {
    let l_credits = 0;
    if (speedNumber > 31) {
      l_credits = (speedNumber - 31) * 2;
    }
    if (vestingTime > 0) {
      l_credits += vestingTime * 5;
    }
    if (unboundingTime > 0) {
      l_credits += unboundingTime * 20;
    }
    setCredits(BigNumber(l_credits));
  }, [speedNumber, vestingTime, unboundingTime]);

  if (!props.show) {
    return null;
  }
  const percentage = (speedNumber / maxSpeed) * 100;
  const percentagevestingTime = (vestingTime / maxVesting) * 100;
  const percentageunbundingTime = (unboundingTime / maxUnbound) * 100;

  const toggleAccordion = (index: number) => {
    const newOpenAccordions = [...openAccordions];
    newOpenAccordions[index] = !newOpenAccordions[index];
    setOpenAccordions(newOpenAccordions);
  };

  return (
    <>
      <div className='centerStakeModal_Collection'>
        <div ref={ModalRef} className='backgroundStakeModal_Collection'>
          <div className='modalStakeModal_Collection'>
            <div className='contentStakeModal_Collection'>
              <div className='modalLabelStakeModal_Collection'>
                Deposit Rewards (V2)
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '30px 0px'
                }}
              >
                {nft.media ? (
                  <div
                    style={{
                      position: 'relative'
                    }}
                  >
                    <HexagoneNFT
                      format={
                        nft?.media[0]?.fileType == 'video/mp4'
                          ? 'video/mp4'
                          : 'image'
                      }
                      url={nft?.media[0]?.url}
                      width={200}
                      withBorder={true}
                      borderWidth={2.5}
                      borderColor='linear-gradient(to bottom, #1f67ff, #5e5ffe, #8356fa, #a249f4, #bd37ec)'
                      withShadow={true}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        borderRadius: '50px',
                        width: '50px',
                        height: '50px',
                        background: 'black'
                      }}
                    >
                      <img
                        style={{
                          borderRadius: '50px',
                          width: '50px',
                          height: '50px'
                        }}
                        src={
                          rewarded_esdt_info?.assets?.svgUrl
                            ? rewarded_esdt_info.assets.svgUrl
                            : notFound
                        }
                        alt=''
                      />
                    </div>
                  </div>
                ) : (
                  getCollectionInformations &&
                  Object.keys(getCollectionInformations).length > 0 && (
                    <HexagoneGroupe
                      logoToken={
                        rewarded_esdt_info?.assets?.svgUrl
                          ? rewarded_esdt_info.assets.svgUrl
                          : notFound
                      }
                      collectionInfo={getCollectionInformations}
                    />
                  )
                )}
              </div>

              <div className='pool-details_StakeModal_black_Collection'>
                <div className='GroupeDetails_StakeModal_black_Collection'>
                  <div className='PoolDetails_StakeModal_black_Collection'>
                    <div className='DetailsInfo_black_Collection'>
                      <div className='LabelDetailsInfo_black_Collection'>
                        Select collection :
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
                          defaultValue={url ? url : 'select collection'}
                          disableOption={false}
                          onSelect={function (value: any): void {
                            setTokenAmount(0);
                            setStoken(value);
                            setBigAmount(BigInt(0));
                            setNonceString('');
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {!isWhitelisted && stoken && stoken !== 'select collection' ? (
                <div className='pool-details_StakeModal_black_Collection'>
                  <div className='GroupeDetails_StakeModal_black_Collection'>
                    <div className='PoolDetails_StakeModal_black_Collection'>
                      <div
                        className='DetailsInfo_black_Collection'
                        style={{ flexDirection: 'column', gap: '10px' }}
                      >
                        <div
                          className='alert alert-info'
                          style={{ width: '100%', textAlign: 'center' }}
                        >
                          This collection is not whitelisted yet.
                          <br />
                          Cost to whitelist:{' '}
                          <FormatAmount
                            value={whitelistPrice.toString()}
                            decimals={
                              userEsdtBalance.find(
                                (t: any) => t.identifier === defaultToken
                              )?.decimals || 18
                            }
                            digits={2}
                          />{' '}
                          {userEsdtBalance.find(
                            (t: any) => t.identifier === defaultToken
                          )?.name || 'Tokens'}
                        </div>
                        <div style={{ width: '100%' }}>
                          <ActionWhitelistCollection
                            collectionId={stoken}
                            price={whitelistPrice}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className='pool-details_StakeModal_black_Collection'>
                    <div className='GroupeDetails_StakeModal_black_Collection'>
                      <div className='PoolDetails_StakeModal_black_Collection'>
                        <div className='DetailsInfo_black_Collection'>
                          <div className='LabelDetailsInfo_black_Collection'>
                            Select Reward :
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
                                userEsdtBalance
                                  ? userEsdtBalance.map((item: any) => ({
                                      text: item.identifier,
                                      value: item.identifier
                                    }))
                                  : []
                              }
                              defaultValue={
                                rtoken !== '' && rtoken !== null
                                  ? rtoken
                                  : 'select token'
                              }
                              disableOption={false}
                              onSelect={function (value: any): void {
                                if (rtoken !== value) {
                                  setRtoken(value);
                                  setTokenAmount(0);
                                  setBigAmount(BigInt(0));
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {!isTokenWhitelisted &&
                  rtoken &&
                  rtoken !== 'select token' ? (
                    <div className='pool-details_StakeModal_black_Collection'>
                      <div className='GroupeDetails_StakeModal_black_Collection'>
                        <div className='PoolDetails_StakeModal_black_Collection'>
                          <div
                            className='DetailsInfo_black_Collection'
                            style={{ flexDirection: 'column', gap: '10px' }}
                          >
                            <div
                              className='alert alert-info'
                              style={{ width: '100%', textAlign: 'center' }}
                            >
                              This token is not whitelisted yet.
                              <br />
                              Cost to whitelist:{' '}
                              <FormatAmount
                                value={whitelistTokenPrice.toString()}
                                decimals={
                                  userEsdtBalance.find(
                                    (t: any) => t.identifier === defaultToken
                                  )?.decimals || 18
                                }
                                digits={2}
                              />{' '}
                              {userEsdtBalance.find(
                                (t: any) => t.identifier === defaultToken
                              )?.name || 'Tokens'}
                            </div>
                            <div style={{ width: '100%' }}>
                              <ActionWhitelistToken
                                tokenId={rtoken}
                                price={whitelistTokenPrice}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
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
                                  placeholder={'1, 2, 3...'}
                                  fontSize={14}
                                  disabled={stoken ? false : true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {!nft.media && firstNonce > 0 && (
                        <div className='alert alert-warning'>
                          We were not able to find a media related to this
                          nonce. <br />
                          <CheckBox
                            label='Continue anyway'
                            checked={agreement2}
                            onClick={() => {
                              handleChange2();
                            }}
                          />
                        </div>
                      )}

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
                        <div className='GroupeDetails_StakeModal_black_input_Collection'>
                          <div className='PoolDetails_StakeModal_black_Collection'>
                            <div className='DetailsInfo_black_Collection'>
                              <div className='LabelDetailsInfo_black_Collection'>
                                Amount :
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
                                  value={tokenAmount
                                    .toString()
                                    .replace(/^0+(?=\d)/, '')}
                                  onInputChange={handleTokenAmountChange}
                                  type='number'
                                  placeholder={'number'}
                                  fontSize={14}
                                  disabled={rtoken ? false : true}
                                />
                              </div>
                              <div className='ValueDetailsInfo_black_Collection'>
                                <div
                                  className='Max_StakeModal_Collection'
                                  onClick={setToMax}
                                >
                                  Max
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
                                    label='I understand that this operation is irreversible'
                                    checked={agreement}
                                    onClick={() => {
                                      handleChange();
                                    }}
                                  />
                                  <a
                                    style={{
                                      color: 'white',
                                      display: 'flex',
                                      marginLeft: '28px', // Align with text start (20px width + 3px margin + ~5px gap)
                                      fontSize: '10px',
                                      textDecoration: 'underline'
                                    }}
                                    target='_blank'
                                    rel='noreferrer'
                                    href='https://docs.middlestaking.fr/contracts/nft-sft-staking-contract'
                                  >
                                    Read More
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: '20px',
                          width: '100%'
                        }}
                      >
                        <div style={{ margin: 'auto', width: '100%' }}>
                          <ActionFundV2
                            stakedToken={stoken}
                            rewardedToken={rtoken}
                            user_fund={bigAmount}
                            speed={speedNumber}
                            nonce={nonceString}
                            vesting={vestingTime}
                            unbounding={unboundingTime}
                            agreement={agreement && agreement2}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAddCollectionV2;
