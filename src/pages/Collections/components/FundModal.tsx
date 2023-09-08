import React, { useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
// import './../../../assets/Modal.css';
import './StakeModal.scss';

import { ActionRemovePoolFees, ActionStake } from './Actions';
import { defaultToken } from 'config';
import { useGetTokenPosition } from './Actions/helpers';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import notFound from './../../../assets/img/notfoundc.svg';
import { useGetESDTInformations, useGetUserNFT } from './Actions/helpers';
import { ActionFund } from './Actions';
import { CheckBox, Button } from './../../../components/Design';
import DropdownMenu from 'components/Design/DropdownMenu';
import Input from 'components/Design/Input';

const FundModal = (props: any) => {
  const userNFTBalance = useGetUserNFT();
  const userEsdtBalance = props.userEsdtBalance;
  const [stoken, setStoken] = React.useState(defaultToken);
  const [rtoken, setRtoken] = React.useState(defaultToken);
  const [decimals, setDecimals] = React.useState(18);
  const [balance, setBalance] = React.useState(BigInt(0));

  const [payFees, setPayFees] = React.useState(false);
  const tokenPosition = useGetTokenPosition(stoken, rtoken);
  const { network } = useGetNetworkConfig();
  const [tokenAmount, setTokenAmount] = React.useState(0);
  const [vestingTime, setVestingTime] = React.useState(0);
  const [unboundingTime, setUnboundingTime] = React.useState(0);
  const [speedNumber, setSpeedNumber] = React.useState(365);
  const [nonceNumber, setNonceNumber] = React.useState(0);
  const [rangeValue, setRangeValue] = React.useState(0);

  const [bigAmount, setBigAmount] = React.useState(BigInt(0));

  const default_esdt_info = useGetESDTInformations(defaultToken);
  const price = BigInt('5000000000000000000000');
  const price_float = '5000.00';
  const dollar_value = default_esdt_info?.price
    ? Number(BigInt(price) / BigInt(10 ** default_esdt_info.decimals)) *
      default_esdt_info?.price
    : 0;

  const tokenProps = userEsdtBalance.find(
    (item: any) => item.identifier === rtoken
  );
  const defaultProps = userEsdtBalance.find(
    (item: any) => item.identifier === defaultToken
  );
  const handleChange = () => {
    setPayFees(!payFees);
  };

  useEffect(() => {
    if (tokenProps?.decimals) setDecimals(tokenProps.decimals);
    if (tokenProps?.balance) setBalance(tokenProps.balance);
  }, [tokenProps]);

  function setFSToken(e: React.ChangeEvent<any>) {
    const index = userEsdtBalance
      .filter(({ identifier }: any) => identifier === identifier)
      .findIndex((tokens: any) => tokens.identifier === e.target.value);
    setStoken(e.target.value);
    setPayFees(false);
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
    setPayFees(false);
  }

  const staked_esdt_info = useGetESDTInformations(stoken);
  const rewarded_esdt_info = useGetESDTInformations(rtoken);
  const sdecimals = staked_esdt_info?.decimals ? staked_esdt_info?.decimals : 0;
  const rdecimals = rewarded_esdt_info?.decimals
    ? rewarded_esdt_info?.decimals
    : 0;

  const image1 = staked_esdt_info?.assets?.svgUrl
    ? staked_esdt_info?.assets?.svgUrl
    : notFound;
  const image2 = rewarded_esdt_info?.assets?.svgUrl
    ? rewarded_esdt_info?.assets?.svgUrl
    : notFound;
  const staked_value = staked_esdt_info?.price
    ? Number(BigInt(tokenPosition.total_stake) / BigInt(10 ** sdecimals)) *
      staked_esdt_info?.price
    : 0;
  const rewarded_value = rewarded_esdt_info?.price
    ? Number(BigInt(tokenPosition.balance) / BigInt(10 ** sdecimals)) *
      rewarded_esdt_info?.price
    : 0;

  let apr = BigInt(100);
  if (tokenPosition.total_stake > BigInt(0)) {
    apr =
      (BigInt(tokenPosition.balance) * apr) / BigInt(tokenPosition.total_stake);
  }

  let fees = BigInt(10);
  if (tokenPosition.fee_percentage) {
    fees = BigInt(tokenPosition.fee_percentage) / BigInt(100);
  }

  if (stoken == defaultToken && rtoken == defaultToken) {
    fees = BigInt(0);
  }
  const speed =
    (BigInt(tokenPosition.blocks_to_max) * BigInt(6)) /
    BigInt(24) /
    BigInt(60) /
    BigInt(60);

  function handleTokenAmountChange(value: any) {
    const amount = BigInt(Number(value) * 10 ** sdecimals);
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
        Number(BigInt(big_amount)) / Number(BigInt(10 ** sdecimals))
      );
      setBigAmount(big_amount);
    } else {
      setRangeValue(0);
    }
  }

  function handleVestingTimeChange(value: any) {
    setVestingTime(value);
  }

  function handleUnboundingTimeChange(value: any) {
    setUnboundingTime(value);
  }

  function handleSpeedChange(value: any) {
    if (value == 0) {
      setSpeedNumber(1);
    } else if (value > 1000) {
      setSpeedNumber(1000);
    } else {
      setSpeedNumber(value);
    }
  }

  function handleNonceChange(value: any) {
    setNonceNumber(value);
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

  if (!props.show) {
    return null;
  }

  const percentage = rangeValue / 100;

  return (
    <>
      <div className='centerStakeModal'>
        <div className='backgroundStakeModal'>
          <div className='modalStakeModal'>
            <div className='contentStakeModal'>
              <div className='modalLabelStakeModal'>Add collection rewards</div>
              <div className='logosStakeModal'>
                <div className='logo2StakeModal'>
                  <div className='image_2StakeModal'>
                    <img className='img_2StakeModal' src={image2} />
                  </div>
                </div>

                <div className='logo1StakeModal'>
                  <div className='image_1StakeModal'>
                    <img className='img_1StakeModal' src={image1} />
                  </div>
                </div>
              </div>
              <div className='dropDownGroupeStakeModal'>
                <div className='dropDownStake'>
                  <div className='GroupeLabelDropdoown'>
                    <div className='LabelDropdoown'>Staked collection</div>
                  </div>

                  <DropdownMenu
                    BoxShadowActive={true}
                    BoxShadowActiveColor='0 0 24px 0 rgba(182,57,237,.64)'
                    BoxShadowColor='0 0 24px 0 rgba(182,57,237,.64)'
                    inputHeight={'40px'}
                    inputWidth='179px'
                    borderRadius='54'
                    hasBorder={true}
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
                    defaultValue={'select collection'}
                    disableOption={false}
                    onSelect={function (value: any): void {
                      setStoken(value);
                    }}
                  />
                </div>
                <div className='dropDownStake'>
                  <div className='GroupeLabelDropdoown'>
                    <div className='LabelDropdoown'>Earned token</div>
                  </div>

                  <DropdownMenu
                    BoxShadowActive={true}
                    BoxShadowActiveColor='0 0 24px 0 rgba(182,57,237,.64)'
                    BoxShadowColor='0 0 24px 0 rgba(182,57,237,.64)'
                    inputHeight={'40px'}
                    inputWidth='179px'
                    borderRadius='54'
                    hasBorder={true}
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
                    defaultValue={rtoken}
                    disableOption={false}
                    onSelect={function (value: any): void {
                      setRtoken(value);
                    }}
                  />
                </div>
              </div>
              {/* {tokenPosition.stakedToken == stoken &&
                tokenPosition.rewardedToken == rtoken && (
                  <div className='pool-details_StakeModal'>
                    <div className='this-pool-already-exists_StakeModal'>
                      This pool already exists
                    </div>
                    <div className='GroupeDetails_StakeModal'>
                      <div className='LogosDetails_StakeModal'>
                        <div className='logosStakeModal'>
                          <div className='logo2StakeModal'>
                            <div className='image_2StakeModal'>
                              <img className='img_2StakeModal' src={image2} />
                            </div>
                          </div>

                          <div className='logo1StakeModal'>
                            <div className='image_1StakeModal'>
                              <img className='img_1StakeModal' src={image1} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='PoolDetails_StakeModal'>
                        <div className='DetailsInfo'>
                          <div className='LabelDetailsInfo'>Rewards</div>
                          <div className='ValueDetailsInfo'>
                            <FormatAmount
                              value={tokenPosition.balance.toString()}
                              decimals={Number(
                                rewarded_esdt_info?.decimals
                                  ? rewarded_esdt_info?.decimals
                                  : 0
                              )}
                              egldLabel={' '}
                              data-testid='balance'
                              digits={2}
                            />
                          </div>
                        </div>
                        <div className='DetailsInfo'>
                          <div className='LabelDetailsInfo'>Value</div>
                          <div className='ValueDetailsInfo'>
                            {rewarded_value.toLocaleString('en-US', {
                              maximumFractionDigits: 2
                            })}{' '}
                            $
                          </div>
                        </div>
                        <div className='DetailsInfo'>
                          <div className='LabelDetailsInfo'>
                            All time rewarded
                          </div>
                          <div className='ValueDetailsInfo'>
                            <FormatAmount
                              value={tokenPosition.total_rewards.toString()}
                              decimals={Number(
                                rewarded_esdt_info?.decimals
                                  ? rewarded_esdt_info?.decimals
                                  : 0
                              )}
                              egldLabel={' '}
                              data-testid='balance'
                              digits={2}
                            />
                          </div>
                        </div>
                        <div className='DetailsInfo'>
                          <div className='LabelDetailsInfo'>Speed</div>
                          <div className='ValueDetailsInfo'>
                            {speed.toString()} days
                          </div>
                        </div>
                        <div className='DetailsInfo'>
                          <div className='LabelDetailsInfo'>Staked</div>
                          <div className='ValueDetailsInfo'>
                            <FormatAmount
                              value={tokenPosition.total_stake.toString()}
                              decimals={Number(
                                staked_esdt_info?.decimals
                                  ? staked_esdt_info?.decimals
                                  : 0
                              )}
                              egldLabel={' '}
                              data-testid='staked'
                              digits={2}
                            />
                          </div>
                        </div>
                        <div className='DetailsInfo'>
                          <div className='LabelDetailsInfo'>Staked value</div>
                          <div className='ValueDetailsInfo'>
                            {staked_value.toLocaleString('en-US', {
                              maximumFractionDigits: 2
                            })}{' '}
                            $
                          </div>
                        </div>
                        <div className='DetailsInfo'>
                          <div className='LabelDetailsInfo'>Users</div>
                          <div className='ValueDetailsInfo'>
                            <FormatAmount
                              value={
                                tokenPosition.users
                                  ? tokenPosition.users.toString()
                                  : '0'
                              }
                              decimals={Number(0)}
                              egldLabel={' '}
                              data-testid='staked'
                              digits={0}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              } */}
              <div className='staked-rewarded-tokens-StakeModal'>
                {tokenPosition.stakedToken == stoken &&
                tokenPosition.rewardedToken == rtoken ? (
                  <div className='do-you-want-to-add-it-rewarded-tokens'>
                    Add rewards for NFT/SFT collection ?
                  </div>
                ) : (
                  <div className='do-you-want-to-add-it-rewarded-tokens'>
                    Deposit rewards for new staking pool ?
                  </div>
                )}

                <div>
                  <div className='AmountRageGroupeSwap'>
                    <div className='label6'>Rewards</div>
                    {/* <div className='InputRangePerso'> */}
                    {/* <input
                          type='range'
                          id='slider'
                          min='0'
                          max='100'
                          step='1'
                          value={rangeValue}
                          onChange={handleRangeValueChange}
                          // ref={sliderRef}
                        /> */}
                    <div>
                      <input
                        type='range'
                        id='slider'
                        min='0'
                        max='100'
                        step='1'
                        value={rangeValue}
                        onChange={handleRangeValueChange}
                        style={{
                          appearance: 'none',
                          width: '100%',
                          height: '8px',
                          background: `linear-gradient(to right, #1F67FF 0%, #BD37EC ${
                            percentage * 100
                          }%, white ${percentage * 100}%, white 100%)`,
                          outline: 'none',
                          opacity: '0.7',
                          transition: 'opacity .2s',
                          borderRadius: '5px'
                        }}
                      />
                    </div>

                    {/* </div> */}
                    <div className='label6'>{rangeValue}%</div>
                  </div>
                </div>

                <div className='AmountInputGroupe'>
                  <div className='FormatAmountStaked'>
                    <Input
                      inputHeight='40px'
                      inputWidth='179px'
                      borderColor='rgb(105, 88, 133)'
                      value={tokenAmount}
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
                      placeholder={'number'}
                      fontSize={14}
                    />
                  </div>

                  <div className='FormatAmountStaked'>
                    <FormatAmount
                      decimals={Number(decimals.toString())}
                      value={balance.toString()}
                      egldLabel={rtoken}
                      data-testid='staked'
                    />
                  </div>
                </div>

                <div className='AmountInputGroupe'>
                  <div className='FormatAmountStaked'>
                    <Input
                      inputHeight='40px'
                      inputWidth='179px'
                      borderColor='rgb(105, 88, 133)'
                      value={vestingTime}
                      onInputChange={handleVestingTimeChange}
                      rightHtml={
                        <Button
                          textColor='#1F67FF'
                          buttonWidth={'15px'}
                          buttonHeight={'15px'}
                          hasBorder={false}
                          borderRadius={40}
                          background={'transparent'}
                          fontSize='10px'
                          text='MAX V-DAY'
                          onClick={setToMax}
                        />
                      }
                      type='number'
                      placeholder={'number'}
                      fontSize={14}
                    />
                  </div>
                </div>
                <div className='FormatInpuntGroupe'>
                  <div className='FormatAmountStaked'>
                    <Input
                      inputHeight='40px'
                      inputWidth='179px'
                      borderColor='rgb(105, 88, 133)'
                      value={unboundingTime}
                      onInputChange={handleUnboundingTimeChange}
                      rightHtml={
                        <Button
                          textColor='#1F67FF'
                          buttonWidth={'15px'}
                          buttonHeight={'15px'}
                          hasBorder={false}
                          borderRadius={40}
                          background={'transparent'}
                          fontSize='10px'
                          text='MAX U-DAY'
                          onClick={setToMax}
                        />
                      }
                      type='number'
                      placeholder={'number'}
                      fontSize={14}
                    />
                  </div>
                </div>
                <div className='AmountInputGroupe'>
                  <div className='FormatAmountStaked'>
                    <Input
                      inputHeight='40px'
                      inputWidth='179px'
                      borderColor='rgb(105, 88, 133)'
                      value={speedNumber}
                      onInputChange={handleSpeedChange}
                      rightHtml={
                        <Button
                          textColor='#1F67FF'
                          buttonWidth={'15px'}
                          buttonHeight={'15px'}
                          hasBorder={false}
                          borderRadius={40}
                          background={'transparent'}
                          fontSize='10px'
                          text='MAX S-DAY'
                          onClick={setToMax}
                        />
                      }
                      type='number'
                      placeholder={'number'}
                      fontSize={14}
                    />
                  </div>
                </div>

                <div className='AmountInputGroupe'>
                  <div className='FormatAmountStaked'>
                    <Input
                      inputHeight='40px'
                      inputWidth='179px'
                      borderColor='rgb(105, 88, 133)'
                      value={nonceNumber}
                      onInputChange={handleNonceChange}
                      rightHtml={
                        <Button
                          textColor='#1F67FF'
                          buttonWidth={'15px'}
                          buttonHeight={'15px'}
                          hasBorder={false}
                          borderRadius={40}
                          background={'transparent'}
                          fontSize='10px'
                          text='MAX N-DAY'
                          onClick={setToMax}
                        />
                      }
                      type='number'
                      placeholder={'number'}
                      fontSize={14}
                    />
                  </div>
                </div>
              </div>
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
                  />
                </div>
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
      {/* <div className='modal' onClick={props.onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <img className='smallPoolLogo' src={props.image1} />
          <h4 className='modal-title mx-auto'>Stake ESDT</h4>
          <img className='smallPoolLogo' src={props.image2} />
        </div>
        <div className='modal-body'>
          <br />
          You will stake{' '}
          <u>
            {' '}
            <img className='smallPoolLogo' src={props.image1} />[
            {props.stakedToken}]
          </u>{' '}
          and earn <img className='smallPoolLogo' src={props.image2} />[
          {props.rewardedToken}] that will be claimable over time.
          <br />
          <br />
          <ul>
            <li>Staked tokens will stay in contract</li>
            <li>You can unstake at any time</li>
            <li>Calculated rewards vary based on total staked</li>
            <li>Rewards must be claimed to be finalized</li>
          </ul>
        </div>
        <Form.Group as={Row} md='12'>
          <Form.Group
            as={Col}
            md='6'
            controlId='TokenAmount'
            onChange={handleTokenAmountChange}
          >
            {' '}
            <div className='maxInput' role='button'>
              <a onClick={setToMax}>
                <u>MAX</u>
              </a>
            </div>
            <Form.Control
              required
              type='number'
              placeholder=''
              defaultValue='0'
              value={tokenAmount}
            />{' '}
            <Form.Label className='float-right'>
              <FormatAmount
                decimals={Number(props.decimals.toString())}
                value={props.balance.toString()}
                egldLabel={props.stakedToken}
                data-testid='staked'
                digits={2}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group className='m-auto' onClick={props.onClose}>
            <ActionStake
              stakedToken={props.stakedToken}
              rewardedToken={props.rewardedToken}
              user_fund={bigAmount}
              name='STAKE'
            />{' '}
          </Form.Group>
        </Form.Group>
        <div className='modal-footer'>
          <button onClick={props.onClose} className='button'>
            Close
          </button>
        </div>
      </div>
    </div> */}
    </>
  );
};

export default FundModal;
