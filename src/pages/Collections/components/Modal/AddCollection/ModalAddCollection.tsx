import React, { MouseEventHandler, useEffect, useState } from 'react';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import './../../../../../assets/Modal.css';
import './CollectionModal.scss';
import { Button } from 'components/Design';
import HexagoneGroupe from './hexagoneGroupe';
import DropdownMenu from 'components/Design/DropdownMenu';
import { defaultToken } from 'config';
import {
  useGetCollectionInformations,
  useGetUserNFT
} from '../../Actions/helpers';
import notFound from '../../../../../assets/img/notfoundc.svg';
import Input from 'components/Design/Input';
import { ActionFund } from '../../Actions';
import { useGetNft } from '../../Actions/helpers/useGetNft';
import HexagoneNFT from '../../hexagoneNFT';
import { useGetCollectionRewards } from 'pages/CollectionDetail/components/Actions/helpers';
import { useGetESDTInformations } from 'pages/Earn/components/Actions/helpers';
import { CheckBox } from './../../../../../components/Design';
import { BigNumber } from 'bignumber.js';
import { useParams } from 'react-router-dom';

interface ModalProps {
  userEsdtBalance: any;
  show: boolean;
  onClose: MouseEventHandler<any>;
  Speed?: number;
  Nonce?: number;
  Vesting?: number;
  Unbounding?: number;
  SelectReward?: string;
}

const ModalAddCollection = (props: ModalProps) => {
  const { param } = useParams();
  const [url] = useState(param?.toString());

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
  // const { network } = useGetNetworkConfig();
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
  const [nonceNumber, setNonceNumber] = React.useState(
    props.Nonce ? props.Nonce : 0
  );
  const [rangeValue, setRangeValue] = React.useState(0);

  const nft: any = useGetNft(stoken, nonceNumber, true);

  const [bigAmount, setBigAmount] = React.useState(BigInt(0));

  const tokenProps = userEsdtBalance.find(
    (item: any) => item.identifier === rtoken
  );
  const defaultProps = userEsdtBalance.find(
    (item: any) => item.identifier === defaultToken
  );
  const handleChange = () => {
    setaAgreement(!agreement);
  };
  const handleChange2 = () => {
    setaAgreement2(!agreement2);
  };

  useEffect(() => {
    if (nonceNumber > 0 && !nft.media) {
      setaAgreement2(false);
    } else {
      setaAgreement2(true);
    }
  }, [nonceNumber, nft]);

  useEffect(() => {
    if (tokenProps?.decimals) setDecimals(tokenProps.decimals);
    if (tokenProps?.balance) setBalance(tokenProps.balance);
  }, [tokenProps]);

  function setFSToken(e: React.ChangeEvent<any>) {
    const index = userEsdtBalance
      .filter(({ identifier }: any) => identifier === identifier)
      .findIndex((tokens: any) => tokens.identifier === e.target.value);
    setStoken(e.target.value);
  }

  function setFRtoken(e: React.ChangeEvent<any>) {
    const index = userEsdtBalance
      .filter(({ identifier }: any) => identifier === identifier)
      .findIndex((tokens: any) => tokens.identifier === e.target.value);
    setRtoken(e.target.value);

    if (tokenProps?.decimals) setDecimals(tokenProps.decimals);
    if (tokenProps?.balance) setBalance(tokenProps.balance);
    setBigAmount(BigInt(0));
    setTokenAmount(0);
  }

  const rewarded_esdt_info = useGetESDTInformations(rtoken);

  const rdecimals = rewarded_esdt_info?.decimals
    ? rewarded_esdt_info?.decimals
    : 0;

  const image2 = rewarded_esdt_info?.assets?.svgUrl
    ? rewarded_esdt_info?.assets?.svgUrl
    : notFound;

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
      setTokenAmount(Number(value));
      const output = toBigAmount(Number(value), Number(decimals));
      setBigAmount(BigInt(output));
    }
    const percentage = Number((BigInt(amount) * BigInt(100)) / BigInt(balance));
    setRangeValue(percentage);
  }

  function handleRangeValueChange(e: React.ChangeEvent<any>) {
    if (balance > BigInt(0)) {
      setRangeValue(e.target.value);
      const percentage = Number(e.target.value).toFixed();
      const big_amount = BigInt(
        (BigInt(balance) * BigInt(percentage)) / BigInt(100)
      );
      setTokenAmount(
        Number(BigInt(big_amount)) / Number(BigInt(10 ** rdecimals))
      );
      setBigAmount(big_amount);
    } else {
      setRangeValue(0);
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

    // const percentage = (Number(value) * 100) / 365;
    // setRangeValue(percentage);
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
    if (value >= 0) {
      setNonceNumber(value);
    }
  }

  function toBigAmount(invalue: number, indec: number) {
    let fixed = '';
    let dec = '';
    let vir = false;
    const sNumber = invalue.toString();
    for (
      let i = 0, len = sNumber.length;
      i < len && (dec.length < indec || indec === 0);
      i += 1
    ) {
      if (!vir) {
        if (sNumber.charAt(i) === '.') {
          vir = true;
        } else {
          fixed = fixed + sNumber.charAt(i);
        }
      } else if (indec > dec.length) {
        dec = dec + sNumber.charAt(i);
      }
    }
    let output = fixed + dec;
    for (let i = 0; dec.length < indec; i += 1) {
      output = output + '0';
      dec = dec + '0';
    }
    return output;
  }

  function setToMax() {
    setTokenAmount(Number(BigInt(balance)) / Number(BigInt(10 ** decimals)));
    setBigAmount(balance);
    setRangeValue(100);
  }
  function toHexDec(d: number) {
    let result = '';
    result = Number(d).toString(16);
    if (Math.abs(result.length % 2) == 1) {
      result = '0' + result;
    }
    return result;
    //return  ((Number(d).toString(16)));//.slice(-2).toUpperCase();
  }

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
        <div className='backgroundStakeModal_Collection'>
          <div className='modalStakeModal_Collection'>
            <div className='contentStakeModal_Collection'>
              <div className='modalLabelStakeModal_Collection'>
                Deposit Rewards
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '30px 0px'
                }}
              >
                {/* <HexagoneGroupe collectionInfo={getCollectionInformations} /> */}

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
                        bottom: 0, // Positionne cette div en bas de la div parente
                        left: 0, // Positionne cette div à gauche de la div parente
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
                            setNonceNumber(0);
                          }}
                        />
                      </div>
                      <div
                        className='svgAccordeons'
                        onClick={() => toggleAccordion(0)}
                      >
                        <svg
                          width={'16px'}
                          height={'16px'}
                          viewBox='0 0 16 16'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                          style={{
                            transform: openAccordions[0]
                              ? 'rotate(180deg)'
                              : 'none',
                            transition: 'transform 0.3s ease'
                          }}
                        >
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M2.96967 5.21967C3.26256 4.92678 3.73744 4.92678 4.03033 5.21967L8 9.18934L11.9697 5.21967C12.2626 4.92678 12.7374 4.92678 13.0303 5.21967C13.3232 5.51256 13.3232 5.98744 13.0303 6.28033L8.53033 10.7803C8.23744 11.0732 7.76256 11.0732 7.46967 10.7803L2.96967 6.28033C2.67678 5.98744 2.67678 5.51256 2.96967 5.21967Z'
                            fill={openAccordions[0] ? 'green' : '#fff'}
                          />
                        </svg>
                      </div>
                    </div>
                    <div
                      className={`accordion-content ${
                        openAccordions[0] ? 'open' : ''
                      }`}
                    >
                      This is the NFT/SFT collection that users will have to
                      stake to be able to harvest rewards. <br />
                      (interface load your NFT/SFT wallet balance)
                    </div>
                  </div>
                </div>
              </div>
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
                              setRangeValue(100);
                            }
                          }}
                        />
                      </div>
                      <div
                        className='svgAccordeons'
                        onClick={() => toggleAccordion(1)}
                      >
                        <svg
                          width={'16px'}
                          height={'16px'}
                          viewBox='0 0 16 16'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                          style={{
                            transform: openAccordions[1]
                              ? 'rotate(180deg)'
                              : 'none',
                            transition: 'transform 0.3s ease'
                          }}
                        >
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M2.96967 5.21967C3.26256 4.92678 3.73744 4.92678 4.03033 5.21967L8 9.18934L11.9697 5.21967C12.2626 4.92678 12.7374 4.92678 13.0303 5.21967C13.3232 5.51256 13.3232 5.98744 13.0303 6.28033L8.53033 10.7803C8.23744 11.0732 7.76256 11.0732 7.46967 10.7803L2.96967 6.28033C2.67678 5.98744 2.67678 5.51256 2.96967 5.21967Z'
                            fill={openAccordions[1] ? 'green' : '#fff'}
                          />
                        </svg>
                      </div>
                    </div>
                    <div
                      className={`accordion-content ${
                        openAccordions[1] ? 'open' : ''
                      }`}
                    >
                      Choose the token you want to distribute as staking reward.
                      <br />
                      (interface load your ESDT wallet balance)
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
                        <div
                          style={{
                            minWidth: '30px'
                          }}
                        >
                          {Math.round(percentage)}%
                        </div>
                        <div
                          className='svgAccordeons'
                          onClick={() => toggleAccordion(2)}
                        >
                          <svg
                            width={'16px'}
                            height={'16px'}
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            style={{
                              transform: openAccordions[2]
                                ? 'rotate(180deg)'
                                : 'none',
                              transition: 'transform 0.3s ease'
                            }}
                          >
                            <path
                              fillRule='evenodd'
                              clipRule='evenodd'
                              d='M2.96967 5.21967C3.26256 4.92678 3.73744 4.92678 4.03033 5.21967L8 9.18934L11.9697 5.21967C12.2626 4.92678 12.7374 4.92678 13.0303 5.21967C13.3232 5.51256 13.3232 5.98744 13.0303 6.28033L8.53033 10.7803C8.23744 11.0732 7.76256 11.0732 7.46967 10.7803L2.96967 6.28033C2.67678 5.98744 2.67678 5.51256 2.96967 5.21967Z'
                              fill={openAccordions[2] ? 'green' : '#fff'}
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`accordion-content ${
                        openAccordions[2] ? 'open' : ''
                      }`}
                    >
                      The speed define how long an NFT/SFT have to be staked to
                      get a full share of the rewards left in pool. <br />
                      e.g: If the speed is 10 days and the user own 100% of the
                      staked nft, he can wait 10 days to claim all the rewards
                      or claim 20% after 2 days. Time spent in pool is reseted
                      after every claim.
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
                          inputHeight='25px'
                          inputWidth='179px'
                          borderRadius={6}
                          hasBorder={true}
                          BoxShadowActive={false}
                          hasBorderActive={true}
                          background={'transparent'}
                          value={nonceNumber
                            .toString()
                            .replace(/^0+(?=\d)/, '')}
                          onInputChange={handleNonceChange}
                          type='number'
                          placeholder={'number'}
                          fontSize={14}
                          disabled={stoken ? false : true}
                        />
                      </div>
                      <div
                        className='svgAccordeons'
                        onClick={() => toggleAccordion(3)}
                      >
                        <svg
                          width={'16px'}
                          height={'16px'}
                          viewBox='0 0 16 16'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                          style={{
                            transform: openAccordions[3]
                              ? 'rotate(180deg)'
                              : 'none',
                            transition: 'transform 0.3s ease'
                          }}
                        >
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M2.96967 5.21967C3.26256 4.92678 3.73744 4.92678 4.03033 5.21967L8 9.18934L11.9697 5.21967C12.2626 4.92678 12.7374 4.92678 13.0303 5.21967C13.3232 5.51256 13.3232 5.98744 13.0303 6.28033L8.53033 10.7803C8.23744 11.0732 7.76256 11.0732 7.46967 10.7803L2.96967 6.28033C2.67678 5.98744 2.67678 5.51256 2.96967 5.21967Z'
                            fill={openAccordions[3] ? 'green' : '#fff'}
                          />
                        </svg>
                      </div>
                    </div>
                    <div
                      className={`accordion-content ${
                        openAccordions[3] ? 'open' : ''
                      }`}
                    >
                      If the nonce is set to 0, any NFT/SFT of the collection
                      can participate into staking. If the nonce is set to a
                      specific number, only the specified nonce will be able to
                      stake. We cannot verify if the nonce exist in collection.
                      Double check before finalize deposit.
                    </div>
                  </div>
                </div>
              </div>
              {!nft.media && nonceNumber > 0 && (
                <div className='alert alert-warning'>
                  We were not able to find a media related to this nonce in this
                  collection. Maybe the nonce does not exist or the api is
                  overloaded ? <br /> Tokens could be lost!{' '}
                  <a
                    style={{ color: 'black' }}
                    target='_blank'
                    rel='noreferrer'
                    href={
                      'https://explorer.multiversx.com/nfts/' +
                      stoken +
                      '-' +
                      toHexDec(nonceNumber)
                    }
                  >
                    <u>
                      Open explorer : {stoken + '-' + toHexDec(nonceNumber)}
                    </u>
                  </a>
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
                          id='slider'
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
                        <div
                          style={{
                            minWidth: '30px'
                          }}
                        >
                          {Math.round(percentagevestingTime)}%
                        </div>
                      </div>
                      <div
                        className='svgAccordeons'
                        onClick={() => toggleAccordion(4)}
                      >
                        <svg
                          width={'16px'}
                          height={'16px'}
                          viewBox='0 0 16 16'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                          style={{
                            transform: openAccordions[4]
                              ? 'rotate(180deg)'
                              : 'none',
                            transition: 'transform 0.3s ease'
                          }}
                        >
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M2.96967 5.21967C3.26256 4.92678 3.73744 4.92678 4.03033 5.21967L8 9.18934L11.9697 5.21967C12.2626 4.92678 12.7374 4.92678 13.0303 5.21967C13.3232 5.51256 13.3232 5.98744 13.0303 6.28033L8.53033 10.7803C8.23744 11.0732 7.76256 11.0732 7.46967 10.7803L2.96967 6.28033C2.67678 5.98744 2.67678 5.51256 2.96967 5.21967Z'
                            fill={openAccordions[4] ? 'green' : '#fff'}
                          />
                        </svg>
                      </div>
                    </div>
                    <div
                      className={`accordion-content ${
                        openAccordions[4] ? 'open' : ''
                      }`}
                    >
                      Vesting define the minimal time an NFT has to stay in
                      staking. While in vesting, the NFT stay eligible to
                      rewards. Once vesting expire, the nft can be unstaked (or
                      unbounded).
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
                          id='slider'
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
                        <div
                          style={{
                            minWidth: '30px'
                          }}
                        >
                          {Math.round(percentageunbundingTime)}%
                        </div>
                        <div
                          className='svgAccordeons'
                          onClick={() => toggleAccordion(5)}
                        >
                          <svg
                            width={'16px'}
                            height={'16px'}
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            style={{
                              transform: openAccordions[5]
                                ? 'rotate(180deg)'
                                : 'none',
                              transition: 'transform 0.3s ease'
                            }}
                          >
                            <path
                              fillRule='evenodd'
                              clipRule='evenodd'
                              d='M2.96967 5.21967C3.26256 4.92678 3.73744 4.92678 4.03033 5.21967L8 9.18934L11.9697 5.21967C12.2626 4.92678 12.7374 4.92678 13.0303 5.21967C13.3232 5.51256 13.3232 5.98744 13.0303 6.28033L8.53033 10.7803C8.23744 11.0732 7.76256 11.0732 7.46967 10.7803L2.96967 6.28033C2.67678 5.98744 2.67678 5.51256 2.96967 5.21967Z'
                              fill={openAccordions[5] ? 'green' : '#fff'}
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`accordion-content ${
                        openAccordions[5] ? 'open' : ''
                      }`}
                    >
                      Unbounding define the number of days a user will have to
                      wait to get back his NFT/SFT.
                      <br />
                      Once unbounded, the nft will not earn any rewards
                      <br />
                      When unbounding period end, users will have to finalize
                      withdrawing.
                    </div>
                  </div>
                </div>
              </div>
              {testgetStakedTokens &&
                testgetStakedTokens
                  .filter(
                    (pool) =>
                      pool.identifier === rtoken &&
                      pool.speed == BigInt(speedNumber) &&
                      pool.nonce == BigInt(nonceNumber) &&
                      pool.vesting == BigInt(vestingTime) &&
                      pool.unbounding == BigInt(unboundingTime)
                  )
                  .map((item, key) => (
                    <div
                      key={key}
                      className='pool-details_StakeModal_Collection'
                    >
                      <div className='GroupeDetails_StakeModal_Collection'>
                        <div className='PoolDetails_StakeModal_Collection'>
                          <div className='DetailsInfo_Collection'>
                            <div className='LabelDetailsInfo_Collection'>
                              Rewards
                            </div>
                            <div className='ValueDetailsInfo_Collection'>
                              <FormatAmount
                                value={item.rewards.toString()}
                                decimals={rdecimals}
                                egldLabel={' '}
                                data-testid='balance'
                                digits={2}
                              />
                            </div>
                          </div>
                          {/* <div className='DetailsInfo_Collection'>
                            <div className='LabelDetailsInfo_Collection'>
                              Value
                            </div>
                            <div className='ValueDetailsInfo_Collection'>
                              700$
                            </div>
                          </div> */}
                          <div className='DetailsInfo_Collection'>
                            <div className='LabelDetailsInfo_Collection'>
                              All time rewarded
                            </div>
                            <div className='ValueDetailsInfo_Collection'>
                              <FormatAmount
                                value={item.total_rewarded.toString()}
                                decimals={rdecimals}
                                egldLabel={' '}
                                data-testid='balance'
                                digits={2}
                              />
                            </div>
                          </div>
                          <div className='DetailsInfo_Collection'>
                            <div className='LabelDetailsInfo_Collection'>
                              Staked NFT
                            </div>
                            <div className='ValueDetailsInfo_Collection'>
                              <FormatAmount
                                value={item.total_staked.toString()}
                                decimals={0}
                                egldLabel={' '}
                                data-testid='balance'
                                digits={0}
                              />
                            </div>
                          </div>
                          {/* <div className='DetailsInfo_Collection'>
                            <div className='LabelDetailsInfo_Collection'>
                              Total value
                            </div>
                            <div className='ValueDetailsInfo_Collection'>
                              <FormatAmount
                                value={item.total_staked.toString()}
                                decimals={0}
                                egldLabel={' '}
                                data-testid='balance'
                                digits={0}
                              />
                            </div>
                          </div> */}
                          <div className='DetailsInfo_Collection'>
                            <div className='LabelDetailsInfo_Collection'>
                              Speed
                            </div>
                            <div className='ValueDetailsInfo_Collection'>
                              {item?.speed.toString()} day
                            </div>
                          </div>
                          {/* <div className='DetailsInfo_Collection'>
                            <div className='LabelDetailsInfo_Collection'>
                              Users
                            </div>
                            <div className='ValueDetailsInfo_Collection'>6</div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  ))}
              <div>Do you want to deposit rewards ?</div>
              <div className='AmountInputGroupe'>
                <div className='FormatAmountStaked'>
                  <Input
                    inputHeight='40px'
                    inputWidth='179px'
                    borderColor='rgb(105, 88, 133)'
                    value={tokenAmount.toString().replace(/^0+(?=[^.])/, '')}
                    onInputChange={handleTokenAmountChange}
                    rightHtml={
                      <Button
                        textColor='#1F67FF'
                        buttonWidth={'15px'}
                        buttonHeight={'15px'}
                        hasBorder={false}
                        borderRadius={40}
                        background={'transparent'}
                        fontSize='10px'
                        text='MAX'
                        onClick={setToMax}
                      />
                    }
                    type='number'
                    placeholder={''}
                    fontSize={14}
                  />
                </div>
                <div className='FormatAmountStaked'>
                  <FormatAmount
                    decimals={Number(decimals.toString())}
                    value={balance.toString()}
                    egldLabel={rtoken}
                    data-testid='staked'
                    digits={
                      balance.toString().length >= decimals
                        ? 2
                        : decimals -
                          BigNumber(balance.toString()).toFixed().length +
                          2
                    }
                  />
                </div>
              </div>{' '}
              1% fees deposit to $MID staking contract
              <div>
                <FormatAmount
                  decimals={Number(decimals.toString())}
                  value={(BigInt(bigAmount) / BigInt(100)).toString()}
                  egldLabel={' fees '}
                  data-testid='staked'
                  digits={
                    balance.toString().length >= decimals
                      ? 2
                      : decimals -
                        BigNumber(balance.toString()).toFixed().length +
                        2
                  }
                />{' '}
                and{' '}
                <FormatAmount
                  decimals={Number(decimals.toString())}
                  value={(
                    (BigInt(bigAmount) * BigInt(99)) /
                    BigInt(100)
                  ).toString()}
                  egldLabel={' locked'}
                  data-testid='staked'
                  digits={
                    balance.toString().length >= decimals
                      ? 2
                      : decimals -
                        BigNumber(balance.toString()).toFixed().length +
                        2
                  }
                />
              </div>
              {/* <div className='bottomGroupeModal' onClick={props.onClose}>
                <div className='bottomModal'>
                  <Button
                    buttonWidth='100%'
                    hasBorder={true}
                    borderRadius={40}
                    background={'black'}
                    borderColor={['#BD37EC', '#1F67FF']}
                    text='Cancel'
                    onClick={props.onClose}
                  />
                </div> */}
              {/* <div className='bottomModal'>
                  <ActionSwap
                    first_token={first_token}
                    second_token={second_token}
                    in_token={in_token}
                    user_fund={bigAmount}
                    min_out={min_out}
                    price_impact={price_impact}
                  />
                </div> */}
              {/* </div> */}
              <div className='bottomGroupeModal' onClick={props.onClose}>
                <div className='bottomModal'>
                  <Button
                    buttonWidth='100%'
                    hasBorder={true}
                    borderRadius={40}
                    background={'black'}
                    borderColor={['#BD37EC', '#1F67FF']}
                    text='Cancel'
                    onClick={props.onClose}
                  />
                </div>

                {/* NOTE : lock Tocken button */}
                <div className='bottomModal'>
                  <ActionFund
                    stakedToken={stoken}
                    rewardedToken={rtoken}
                    user_fund={bigAmount}
                    speed={speedNumber}
                    nonce={nonceNumber}
                    vesting={vestingTime}
                    unbounding={unboundingTime}
                    agreement={agreement && agreement2}
                  />
                </div>
              </div>
              <div>
                <CheckBox
                  label='I understand that this operation is irreversible'
                  checked={agreement}
                  onClick={() => {
                    handleChange();
                  }}
                />
              </div>
              <div>
                <a
                  style={{ color: 'white', display: 'flex' }}
                  target='_blank'
                  rel='noreferrer'
                  href='https://docs.middlestaking.fr/contracts/nft-sft-staking-contract'
                >
                  <u>Read More</u>
                </a>
              </div>
            </div>

            <svg
              className='closeStakeModal'
              onClick={props.onClose}
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M13.4099 12.0002L17.7099 7.71019C17.8982 7.52188 18.004 7.26649 18.004 7.00019C18.004 6.73388 17.8982 6.47849 17.7099 6.29019C17.5216 6.10188 17.2662 5.99609 16.9999 5.99609C16.7336 5.99609 16.4782 6.10188 16.2899 6.29019L11.9999 10.5902L7.70994 6.29019C7.52164 6.10188 7.26624 5.99609 6.99994 5.99609C6.73364 5.99609 6.47824 6.10188 6.28994 6.29019C6.10164 6.47849 5.99585 6.73388 5.99585 7.00019C5.99585 7.26649 6.10164 7.52188 6.28994 7.71019L10.5899 12.0002L6.28994 16.2902C6.19621 16.3831 6.12182 16.4937 6.07105 16.6156C6.02028 16.7375 5.99414 16.8682 5.99414 17.0002C5.99414 17.1322 6.02028 17.2629 6.07105 17.3848C6.12182 17.5066 6.19621 17.6172 6.28994 17.7102C6.3829 17.8039 6.4935 17.8783 6.61536 17.9291C6.73722 17.9798 6.86793 18.006 6.99994 18.006C7.13195 18.006 7.26266 17.9798 7.38452 17.9291C7.50638 17.8783 7.61698 17.8039 7.70994 17.7102L11.9999 13.4102L16.2899 17.7102C16.3829 17.8039 16.4935 17.8783 16.6154 17.9291C16.7372 17.9798 16.8679 18.006 16.9999 18.006C17.132 18.006 17.2627 17.9798 17.3845 17.9291C17.5064 17.8783 17.617 17.8039 17.7099 17.7102C17.8037 17.6172 17.8781 17.5066 17.9288 17.3848C17.9796 17.2629 18.0057 17.1322 18.0057 17.0002C18.0057 16.8682 17.9796 16.7375 17.9288 16.6156C17.8781 16.4937 17.8037 16.3831 17.7099 16.2902L13.4099 12.0002Z' />
            </svg>
            <div className='neon-border-stack'></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ModalAddCollection;
