import React, { useState, useEffect, FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
// import { defaultToken } from 'config';
import { useGetSwapedTokens } from './Actions/helpers';
import { useGetESDTInformations } from './Actions/helpers';
import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import notFound from './../../../assets/img/notfoundc.svg';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { useGetPoolPosition } from './Actions/helpers';
import DropdownMenu from 'components/Design/DropdownMenu';
import {
  faArrowsLeftRight,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import Input from 'components/Design/Input';
import { Button } from './../../../components/Design';
import { ActionSwap } from './Actions';
import { HeaderMenuContext } from 'context/Header/HeaderMenuContext';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import './StakeModal.scss';

interface SwapLayoutProps {
  firstToken: string;
  secondToken: string;
  defaultToken: string;
  userEsdtBalance: Array<any>;
  swapedTokens: string[];
}
export const SwapLayout: FC<SwapLayoutProps> = ({
  firstToken = 'WEGLD-bd4d79',
  secondToken,
  defaultToken,
  userEsdtBalance,
  swapedTokens
}) => {
  const [first_token, setFirstToken] = React.useState(firstToken);
  const [second_token, setSecondToken] = React.useState(secondToken);
  const { hasPendingTransactions } = useGetPendingTransactions();
  const [inBalance, setInBalance] = React.useState(BigInt(0));
  const [outBalance, setOutBalance] = React.useState(BigInt(0));
  const [in_token, setInToken] = React.useState(first_token);
  const [out_token, setOutToken] = React.useState(second_token);
  const [tokenAmount, setTokenAmount] = React.useState(0);
  const [rangeValue, setRangeValue] = React.useState(0);
  const [bigAmount, setBigAmount] = React.useState(BigInt(0));

  let out_amount = BigInt(0);
  let out_fees = BigInt(0);
  let price_impact = 0;
  let dual_price_impact = 0;

  const isLoggedIn = useGetIsLoggedIn();
  const in_esdt_info = useGetESDTInformations(in_token);
  const out_esdt_info = useGetESDTInformations(out_token);
  const def_esdt_info = useGetESDTInformations(defaultToken);

  const first_image = in_esdt_info?.assets?.svgUrl
    ? in_esdt_info?.assets?.svgUrl
    : notFound;
  const second_image = out_esdt_info?.assets?.svgUrl
    ? out_esdt_info?.assets?.svgUrl
    : notFound;

  let isDual = false;
  if (in_token != defaultToken && out_token != defaultToken) {
    isDual = true;
  }

  const firstPoolPosition = useGetPoolPosition(
    defaultToken,
    in_token == defaultToken ? out_token : in_token,
    true,
    hasPendingTransactions,
    true
  );
  const secondPoolPosition = useGetPoolPosition(
    defaultToken,
    out_token,
    true,
    hasPendingTransactions,
    isDual
  );

  const first_decimals = in_esdt_info?.decimals ? in_esdt_info?.decimals : 0;
  const second_decimals = out_esdt_info?.decimals ? out_esdt_info?.decimals : 0;

  const in_balance = userEsdtBalance.find(
    (item: any) => item.identifier === in_token
  );
  const out_balance = userEsdtBalance.find(
    (item: any) => item.identifier === out_token
  );
  useEffect(() => {
    setInBalance(in_balance?.balance ? in_balance?.balance : BigInt(0));
    setOutBalance(out_balance?.balance ? out_balance?.balance : BigInt(0));
    if (in_token == out_token) {
      setInToken('WEGLD-bd4d79');
      setOutToken(defaultToken);
    }
  }, [in_token, out_token, userEsdtBalance]);

  function inverse() {
    const first = in_token;
    const second = out_token;
    setInToken(second);
    setOutToken(first);
    setTokenAmount(0);
    setBigAmount(BigInt(0));
    setRangeValue(0);
  }
  function setToMax() {
    setTokenAmount(
      Number(BigInt(inBalance)) / Number(BigInt(10 ** in_decimals))
    );
    setBigAmount(inBalance);
    setRangeValue(100);
  }
  const in_decimals = in_esdt_info?.decimals ? in_esdt_info?.decimals : 0;
  const out_decimals = out_esdt_info?.decimals ? out_esdt_info?.decimals : 0;
  function handleTokenAmountChange(value: any) {
    const amount = BigInt(Number(value) * 10 ** in_decimals);
    if (amount < BigInt(0)) {
      setTokenAmount(0);
      setBigAmount(BigInt(0));
    } else {
      setTokenAmount(Number(value));
      const output = toBigAmount(Number(value), Number(in_decimals));
      setBigAmount(BigInt(output));
    }
    const percentage = Number(
      (BigInt(amount) * BigInt(100)) /
        BigInt(inBalance ? inBalance : amount ? amount : 1)
    );
    setRangeValue(percentage);
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
  function handleRangeValueChange(e: React.ChangeEvent<any>) {
    if (inBalance > BigInt(0)) {
      setRangeValue(e.target.value);
      const percentage = Number(e.target.value).toFixed();
      const big_amount = BigInt(
        (BigInt(inBalance) * BigInt(percentage)) / BigInt(100)
      );
      setTokenAmount(
        Number(BigInt(big_amount)) / Number(BigInt(10 ** in_decimals))
      );
      setBigAmount(big_amount);
    } else {
      setRangeValue(0);
    }
  }
  if (in_token == defaultToken || out_token == defaultToken) {
    //Simple Swap
    const k_pool =
      BigInt(firstPoolPosition.first_token_amount) *
      BigInt(firstPoolPosition.second_token_amount);
    const in_amount = BigInt(bigAmount);

    if (defaultToken == in_token) {
      //******* */
      const in_fees =
        (in_amount * BigInt(firstPoolPosition.first_fee)) / BigInt(10000);
      const y_amount =
        k_pool /
        (BigInt(firstPoolPosition.first_token_amount) + in_amount - in_fees);

      out_amount = BigInt(firstPoolPosition.second_token_amount) - y_amount;
      out_fees =
        (out_amount * BigInt(10000)) /
        BigInt(firstPoolPosition.second_fee) /
        BigInt(10000);

      price_impact =
        (Number(in_amount.toString()) /
          Number(firstPoolPosition.first_token_amount.toString())) *
        100;
    } else {
      //******* */
      const in_fees =
        (in_amount * BigInt(firstPoolPosition.first_fee)) / BigInt(10000);
      const x_amount =
        k_pool /
        (BigInt(firstPoolPosition.second_token_amount) + in_amount - in_fees);

      out_amount = BigInt(firstPoolPosition.first_token_amount) - x_amount;
      out_fees =
        (out_amount * BigInt(10000)) /
        BigInt(firstPoolPosition.second_fee) /
        BigInt(10000);

      price_impact =
        (Number(in_amount.toString()) /
          Number(firstPoolPosition.second_token_amount.toString())) *
        100;
    }
  } else {
    //Dual Swap

    const first_k_pool =
      BigInt(secondPoolPosition.first_token_amount) *
      BigInt(secondPoolPosition.second_token_amount);
    const second_k_pool =
      BigInt(firstPoolPosition.first_token_amount) *
      BigInt(firstPoolPosition.second_token_amount);
    const in_amount = BigInt(bigAmount);

    // if (first_token == in_token) {
    //******* */
    // const in_fees =
    //   (in_amount * BigInt(secondPoolPosition.first_fee)) / BigInt(10000);
    // const first_x_amount =
    //   first_k_pool /
    //   (BigInt(secondPoolPosition.second_token_amount) + in_amount - in_fees);
    // const first_out_amount =
    //   BigInt(secondPoolPosition.first_token_amount) - first_x_amount;

    // const second_y_amount =
    //   second_k_pool /
    //   (BigInt(firstPoolPosition.first_token_amount) + first_out_amount);
    // out_amount =
    //   BigInt(firstPoolPosition.second_token_amount) - second_y_amount;

    // out_fees =
    //   (out_amount * BigInt(10000)) /
    //   BigInt(firstPoolPosition.second_fee) /
    //   BigInt(10000);

    // price_impact =
    //   (Number(in_amount.toString()) /
    //     Number(firstPoolPosition.first_token_amount.toString())) *
    //   100;
    // } else {
    //******* */
    const in_fees =
      (in_amount * BigInt(firstPoolPosition.first_fee)) / BigInt(10000);
    const first_x_amount =
      second_k_pool /
      (BigInt(firstPoolPosition.second_token_amount) + in_amount - in_fees);
    const first_out_amount =
      BigInt(firstPoolPosition.first_token_amount) - first_x_amount;

    price_impact =
      (Number(in_amount.toString()) /
        Number(firstPoolPosition.second_token_amount.toString())) *
      100;
    const second_y_amount =
      first_k_pool /
      (BigInt(secondPoolPosition.first_token_amount) + first_out_amount);
    out_amount =
      BigInt(secondPoolPosition.second_token_amount) - second_y_amount;

    out_fees =
      (out_amount * BigInt(10000)) /
      BigInt(secondPoolPosition.second_fee) /
      BigInt(10000);

    dual_price_impact =
      (Number(first_out_amount.toString()) /
        Number(secondPoolPosition.first_token_amount.toString())) *
      100;

    // }
  }

  //Slippage :
  const min_out = ((out_amount - out_fees) * BigInt(99)) / BigInt(100);
  //console.log('in_stake : ' + in_stake + ' out_mid : ' + out_mid);

  const percentage = rangeValue / 100;

  const first_amount = firstPoolPosition.first_token_amount
    ? Number(firstPoolPosition.first_token_amount)
    : Number(1);
  const second_amount = secondPoolPosition.first_token_amount
    ? Number(secondPoolPosition.first_token_amount)
    : Number(1);
  const price = def_esdt_info?.price
    ? Number(def_esdt_info.price) * 2
    : Number(1);
  const lp_value1 = first_amount * price;
  const lp_value2 = second_amount * price;
  const { setHeaderMenu } = React.useContext(HeaderMenuContext);
  setHeaderMenu(true);
  return (
    <div className='center'>
      <div className='centerSwapModal'>
        <div className='backgroundStakeModal'>
          <div className='modalStakeModal'>
            <div className='contentStakeModal'>
              <div className='modalLabelStakeModal'>Swap tokens</div>

              <div className='logosStakeModal'>
                {/* <div className='logo2StakeModal'>
                  <div className='image_2StakeModal'>
                    <img className='img_2StakeModal' src={second_image} />
                  </div>
                </div>

                <div className='logo1StakeModal'>
                  <div className='image_1StakeModal'>
                    <img className='img_1StakeModal' src={first_image} />
                  </div>
                </div> */}
                <div className='LogoStakeModalGroupe'>
                  <div className='LogoStake'>
                    <img src={second_image} />
                  </div>
                  <div className='LogoArrow'>
                    <div className='LogoInverseArrow'>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        style={{
                          fontSize: '20px'
                        }}
                      />
                    </div>
                  </div>
                  <div className='LogoEarn'>
                    <img src={first_image} />
                  </div>
                </div>
              </div>
              <div className='pool-details_StakeModal'>
                <div className='this-pool-already-exists_StakeModal'>
                  Pool informations
                </div>
                {!isDual ? (
                  <div className='GroupeDetails_StakeModal'>
                    <div className='LogosDetails_StakeModal'>
                      <div className='logosStakeModal'>
                        <div className='logo2StakeModal'>
                          <div className='image_2StakeModal'>
                            <img
                              className='img_2StakeModal'
                              src={second_image}
                            />
                          </div>
                        </div>

                        <div className='logo1StakeModal'>
                          <div className='image_1StakeModal'>
                            <img
                              className='img_1StakeModal'
                              src={first_image}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='PoolDetails_StakeModal'>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>{defaultToken}</div>
                        <div className='ValueDetailsInfo'>
                          <FormatAmount
                            value={firstPoolPosition.first_token_amount.toString()}
                            decimals={Number(first_decimals)}
                            egldLabel={' '}
                            data-testid='balance'
                            digits={2}
                          />
                        </div>
                      </div>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>
                          {in_token == defaultToken ? out_token : in_token}
                        </div>
                        <div className='ValueDetailsInfo'>
                          <FormatAmount
                            value={firstPoolPosition.second_token_amount.toString()}
                            decimals={Number(second_decimals)}
                            egldLabel={' '}
                            data-testid='balance'
                            digits={2}
                          />
                        </div>
                      </div>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>in_fee</div>
                        <div className='ValueDetailsInfo'>
                          <FormatAmount
                            value={firstPoolPosition.first_fee.toString()}
                            decimals={Number(2)}
                            egldLabel={' '}
                            data-testid='balance'
                            digits={2}
                          />{' '}
                          %
                        </div>
                      </div>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>out_fee</div>
                        <div className='ValueDetailsInfo'>
                          <FormatAmount
                            value={firstPoolPosition.second_fee.toString()}
                            decimals={Number(2)}
                            egldLabel={' '}
                            data-testid='balance'
                            digits={2}
                          />{' '}
                          %
                        </div>
                      </div>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>LP value</div>
                        <div className='ValueDetailsInfo'>
                          {/* {staked_value.toLocaleString('en-US', {
                            maximumFractionDigits: 2
                          })}{' '} */}
                          <FormatAmount
                            value={lp_value1.toString()}
                            decimals={Number(18)}
                            egldLabel={'$'}
                            data-testid='balance'
                            digits={2}
                          />{' '}
                        </div>
                      </div>
                      {/* <div className='DetailsInfo'>
                      <div className='LabelDetailsInfo'>{'Send'}</div>
                      <div className='ValueDetailsInfo'>
                        <FormatAmount
                          className='label2'
                          decimals={Number(in_decimals.toString())}
                          value={inBalance.toString()}
                          egldLabel={' '}
                          data-testid='staked'
                        />
                      </div>
                    </div> */}
                    </div>
                  </div>
                ) : (
                  <div className='GroupeDetails_StakeModal'>
                    <div className='LogosDetails_StakeModal'>
                      <div className='logosStakeModal'>
                        <div className='logo2StakeModal'>
                          <div className='image_2StakeModal'>
                            <img
                              className='img_2StakeModal'
                              src={second_image}
                            />
                          </div>
                        </div>

                        <div className='logo1StakeModal'>
                          <div className='image_1StakeModal'>
                            <img
                              className='img_1StakeModal'
                              src={first_image}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='PoolDetails_StakeModal'>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>
                          {defaultToken.split('-')[0]} :{' '}
                          {in_token.split('-')[0]}
                        </div>
                        <div className='ValueDetailsInfo'>
                          <FormatAmount
                            value={firstPoolPosition.first_token_amount.toString()}
                            decimals={Number(18)}
                            egldLabel={' '}
                            data-testid='balance'
                            digits={2}
                          />{' '}
                          :{' '}
                          <FormatAmount
                            value={firstPoolPosition.second_token_amount.toString()}
                            decimals={Number(first_decimals)}
                            egldLabel={' '}
                            data-testid='balance'
                            digits={2}
                          />
                        </div>
                      </div>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>
                          {defaultToken.split('-')[0]} :{' '}
                          {out_token.split('-')[0]}
                        </div>
                        <div className='ValueDetailsInfo'>
                          <FormatAmount
                            value={secondPoolPosition.first_token_amount.toString()}
                            decimals={Number(18)}
                            egldLabel={' '}
                            data-testid='balance'
                            digits={2}
                          />{' '}
                          :{' '}
                          <FormatAmount
                            value={secondPoolPosition.second_token_amount.toString()}
                            decimals={Number(second_decimals)}
                            egldLabel={' '}
                            data-testid='balance'
                            digits={2}
                          />
                        </div>
                      </div>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>in_fee</div>
                        <div className='ValueDetailsInfo'>
                          <FormatAmount
                            value={firstPoolPosition.first_fee.toString()}
                            decimals={Number(2)}
                            egldLabel={' '}
                            data-testid='balance'
                            digits={2}
                          />{' '}
                          %
                        </div>
                      </div>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>out_fee</div>
                        <div className='ValueDetailsInfo'>
                          <FormatAmount
                            value={firstPoolPosition.second_fee.toString()}
                            decimals={Number(2)}
                            egldLabel={' '}
                            data-testid='balance'
                            digits={2}
                          />{' '}
                          %
                        </div>
                      </div>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>LP value 1</div>
                        <div className='ValueDetailsInfo'>
                          {/* {staked_value.toLocaleString('en-US', {
                            maximumFractionDigits: 2
                          })}{' '} */}
                          <FormatAmount
                            value={lp_value1.toString()}
                            decimals={Number(18)}
                            egldLabel={'$'}
                            data-testid='balance'
                            digits={2}
                          />{' '}
                        </div>
                      </div>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>LP value 2</div>
                        <div className='ValueDetailsInfo'>
                          <FormatAmount
                            value={lp_value2.toString()}
                            decimals={Number(18)}
                            egldLabel={'$'}
                            data-testid='balance'
                            digits={2}
                          />{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className='dropDownGroupeStakeModal'>
                <div className='dropDownStake'>
                  <div className='GroupeLabelDropdoownFormatAmount'>
                    <div className='LabelDropdoown'>Send</div>
                    <div className='LabelDropdoownFormatAmount'>
                      <FormatAmount
                        className='label2'
                        decimals={Number(first_decimals.toString())}
                        value={inBalance.toString()}
                        egldLabel={' '}
                        data-testid='staked'
                      />
                    </div>
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
                      swapedTokens
                        ? swapedTokens.map((item: any) => ({
                            text: item,
                            value: item
                          }))
                        : [{ text: in_token, value: in_token }]
                    }
                    defaultValue={in_token}
                    disableOption={false}
                    onSelect={function (value: any): void {
                      setInToken(value);
                    }}
                  />
                </div>
                <div className='dropDownArrow' onClick={inverse}>
                  <div className='InverseArrow'>
                    <FontAwesomeIcon
                      icon={faArrowsLeftRight}
                      style={{
                        fontSize: '20px'
                      }}
                    />
                  </div>
                </div>
                <div className='dropDownEarn'>
                  <div className='GroupeLabelDropdoownFormatAmount'>
                    <div className='LabelDropdoown'>Receive</div>
                    <div className='LabelDropdoownFormatAmount'>
                      <FormatAmount
                        className='label2'
                        decimals={Number(out_decimals.toString())}
                        value={outBalance.toString()}
                        egldLabel={' '}
                        data-testid='staked'
                      />
                    </div>
                  </div>
                  <DropdownMenu
                    BoxShadowActive={false}
                    BoxShadowActiveColor='none'
                    BoxShadowColor='none'
                    inputHeight={'40px'}
                    inputWidth='179px'
                    borderRadius='54'
                    hasBorder={true}
                    borderRadiusOptions='5px'
                    borderColor='#695885'
                    options={
                      swapedTokens
                        ? swapedTokens.map((item: any) => ({
                            text: item,
                            value: item
                          }))
                        : [{ text: out_token, value: out_token }]
                    }
                    defaultValue={out_token}
                    disableOption={false}
                    onSelect={function (value: any): void {
                      setOutToken(value);
                    }}
                  />
                </div>
              </div>
              <div>
                <div className='AmountRageGroupeSwap'>
                  <div className='label6'>amount</div>
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
                {!isDual ? (
                  <div className='label6'>
                    price_impact {price_impact.toString()}
                  </div>
                ) : (
                  <div className='label6'>
                    price_impact 1 {price_impact.toString()}
                    <br />
                    price_impact 2 {dual_price_impact.toString()}
                  </div>
                )}
              </div>

              <div className='AmountInputGroupe'>
                <div className='FormatAmountStaked'>
                  <Input
                    inputHeight='40px'
                    inputWidth='100%'
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
                  <Input
                    inputHeight='40px'
                    inputWidth='100%'
                    borderColor='rgb(105, 88, 133)'
                    disabled={true}
                    value={(
                      Number(out_amount - out_fees) /
                      10 ** out_decimals
                    ).toString()}
                    type='number'
                    placeholder={'number'}
                    fontSize={14}
                  />
                </div>{' '}
                <FormatAmount
                  className='label2'
                  decimals={Number(out_decimals.toString())}
                  value={min_out.toString()}
                  egldLabel={' '}
                  data-testid='staked'
                />
              </div>
              <div className='bottomGroupeModal'>
                <div className='bottomModal'>
                  <ActionSwap
                    isLoggedIn={isLoggedIn}
                    first_token={
                      in_token == defaultToken
                        ? in_token
                        : out_token == defaultToken
                        ? out_token
                        : in_token
                    }
                    second_token={
                      out_token == defaultToken ? in_token : out_token
                    }
                    in_token={in_token}
                    user_fund={bigAmount}
                    min_out={min_out}
                    price_impact={
                      price_impact > dual_price_impact
                        ? price_impact
                        : dual_price_impact
                    }
                  />
                </div>
              </div>
            </div>
            <div className='neon-border-stack'></div>
          </div>
        </div>
      </div>
    </div>
  );
};
