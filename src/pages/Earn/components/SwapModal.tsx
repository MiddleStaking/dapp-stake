import React, { useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import './../../../assets/Modal.css';
import { ActionRemovePoolFees, ActionStake } from './Actions';
import { useGetTokenPosition } from './Actions/helpers';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import notFound from './../../../assets/img/notfoundc.svg';
import { useGetESDTInformations } from './Actions/helpers';
import { ActionSwap } from './Actions';
import { Button } from './../../../components/Design';
import './StakeModal.scss';
import DropdownMenu from 'components/DropdownMenu';
import Input from 'components/Design/Input';

const SwapModal = (props: any) => {
  const userEsdtBalance = props.userEsdtBalance;
  const [first_token, setFirsttoken] = React.useState(props.first_token);
  const [second_token, setSecondtoken] = React.useState(props.second_token);
  const [in_token, setInToken] = React.useState(props.in_token);
  const [out_token, setOutToken] = React.useState(props.out_token);

  const [inBalance, setInBalance] = React.useState(BigInt(0));
  const [outBalance, setOutBalance] = React.useState(BigInt(0));
  const [tokenAmount, setTokenAmount] = React.useState(0);
  const [rangeValue, setRangeValue] = React.useState(0);
  const [bigAmount, setBigAmount] = React.useState(BigInt(0));

  let out_amount = BigInt(0);
  let out_fees = BigInt(0);
  let price_impact = 0;

  const in_balance = userEsdtBalance.find(
    (item: any) => item.identifier === in_token
  );
  const out_balance = userEsdtBalance.find(
    (item: any) => item.identifier === out_token
  );
  useEffect(() => {
    setInBalance(in_balance?.balance ? in_balance?.balance : BigInt(0));
    setOutBalance(out_balance?.balance ? out_balance?.balance : BigInt(0));
  }, [in_token, in_balance]);

  const first_esdt_info = useGetESDTInformations(first_token);
  const second_esdt_info = useGetESDTInformations(second_token);
  const in_esdt_info = useGetESDTInformations(in_token);
  const out_esdt_info = useGetESDTInformations(out_token);

  const first_decimals = first_esdt_info?.decimals
    ? first_esdt_info?.decimals
    : 0;
  const second_decimals = second_esdt_info?.decimals
    ? second_esdt_info?.decimals
    : 0;
  const in_decimals = in_esdt_info?.decimals ? in_esdt_info?.decimals : 0;
  const out_decimals = out_esdt_info?.decimals ? out_esdt_info?.decimals : 0;

  const first_image = first_esdt_info?.assets?.svgUrl
    ? first_esdt_info?.assets?.svgUrl
    : notFound;
  const second_image = second_decimals?.assets?.svgUrl
    ? second_decimals?.assets?.svgUrl
    : notFound;

  function handleTokenAmountChange(e: React.ChangeEvent<any>) {
    const amount = BigInt(e.target.value * 10 ** in_decimals);
    if (amount < BigInt(0)) {
      setTokenAmount(0);
      setBigAmount(BigInt(0));
    } else if (amount > inBalance) {
      setTokenAmount(
        Number(BigInt(inBalance)) / Number(BigInt(10 ** in_decimals))
      );
      setBigAmount(inBalance);
    } else {
      setTokenAmount(e.target.value);
      const output = toBigAmount(Number(e.target.value), Number(in_decimals));
      setBigAmount(BigInt(output));
    }
    const percentage = Number(
      (BigInt(amount) * BigInt(100)) / BigInt(inBalance)
    );
    setRangeValue(percentage);
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

  function inverse() {
    const first = in_token;
    const second = out_token;
    setInToken(second);
    setOutToken(first);
    setTokenAmount(0);
    setBigAmount(BigInt(0));
    setRangeValue(0);
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
    setTokenAmount(
      Number(BigInt(inBalance)) / Number(BigInt(10 ** in_decimals))
    );
    setBigAmount(inBalance);
    setRangeValue(100);
  }

  const k_pool =
    BigInt(props.poolPosition.first_token_amount) *
    BigInt(props.poolPosition.second_token_amount);
  const in_amount = BigInt(bigAmount);

  if (first_token == in_token) {
    //******* */
    const in_fees =
      (in_amount * BigInt(props.poolPosition.first_fee)) / BigInt(10000);
    const y_amount =
      k_pool /
      (BigInt(props.poolPosition.first_token_amount) + in_amount - in_fees);

    out_amount = BigInt(props.poolPosition.second_token_amount) - y_amount;
    out_fees =
      (out_amount * BigInt(10000)) /
      BigInt(props.poolPosition.second_fee) /
      BigInt(10000);

    price_impact =
      (Number(in_amount.toString()) /
        props.poolPosition.first_token_amount.toString()) *
      100;
  } else {
    //******* */
    const in_fees =
      (in_amount * BigInt(props.poolPosition.first_fee)) / BigInt(10000);
    const x_amount =
      k_pool /
      (BigInt(props.poolPosition.second_token_amount) + in_amount - in_fees);

    out_amount = BigInt(props.poolPosition.first_token_amount) - x_amount;
    out_fees =
      (out_amount * BigInt(10000)) /
      BigInt(props.poolPosition.second_fee) /
      BigInt(10000);

    price_impact =
      (Number(in_amount.toString()) /
        props.poolPosition.second_token_amount.toString()) *
      100;
  }
  const min_out = ((out_amount - out_fees) * BigInt(95)) / BigInt(100);
  //console.log('in_stake : ' + in_stake + ' out_mid : ' + out_mid);

  if (!props.show) {
    return null;
  }
  return (
    <>
      <div className='centerStakeModal'>
        <div className='backgroundStakeModal'>
          <div className='modalStakeModal'>
            <div className='contentStakeModal'>
              <div className='modalLabelStakeModal'>Swap tokens</div>

              <div className='logosStakeModal'>
                <div className='logo2StakeModal'>
                  <div className='image_2StakeModal'>
                    <img className='img_2StakeModal' src={second_image} />
                  </div>
                </div>

                <div className='logo1StakeModal'>
                  <div className='image_1StakeModal'>
                    <img className='img_1StakeModal' src={first_image} />
                  </div>
                </div>
              </div>
              <div className='pool-details_StakeModal'>
                <div className='this-pool-already-exists_StakeModal'>
                  Pool informations
                </div>
                <div className='GroupeDetails_StakeModal'>
                  <div className='LogosDetails_StakeModal'>
                    <div className='logosStakeModal'>
                      <div className='logo2StakeModal'>
                        <div className='image_2StakeModal'>
                          <img className='img_2StakeModal' src={first_image} />
                        </div>
                      </div>

                      <div className='logo1StakeModal'>
                        <div className='image_1StakeModal'>
                          <img className='img_1StakeModal' src={second_image} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='PoolDetails_StakeModal'>
                    <div className='DetailsInfo'>
                      <div className='LabelDetailsInfo'>{first_token}</div>
                      <div className='ValueDetailsInfo'>
                        <FormatAmount
                          value={props.poolPosition.first_token_amount.toString()}
                          decimals={Number(first_decimals)}
                          egldLabel={' '}
                          data-testid='balance'
                          digits={2}
                        />
                      </div>
                    </div>
                    <div className='DetailsInfo'>
                      <div className='LabelDetailsInfo'>{second_token}</div>
                      <div className='ValueDetailsInfo'>
                        <FormatAmount
                          value={props.poolPosition.second_token_amount.toString()}
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
                          value={props.poolPosition.first_fee.toString()}
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
                          value={props.poolPosition.second_fee.toString()}
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
                        TBD$
                      </div>
                    </div>
                    <div className='DetailsInfo'>
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
                    </div>
                  </div>
                </div>
              </div>
              <div className='dropDownGroupeStakeModal'>
                <div className='dropDownStake'>
                  <div className='GroupeLabelDropdoownFormatAmount'>
                    <div className='LabelDropdoown'>Send</div>
                    <div className='LabelDropdoownFormatAmount'>
                      <FormatAmount
                        className='label2'
                        decimals={Number(in_decimals.toString())}
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
                    options={[{ text: in_token, value: in_token }]}
                    defaultValue={in_token}
                    disableOption={true}
                    onSelect={function (value: any): void {
                      throw new Error('Function not implemented.');
                    }}
                  />
                </div>
                <div className='dropDownArrow' onClick={inverse}>
                  <div className='InverseArrow'>{'<->'}</div>
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
                    options={[{ text: out_token, value: out_token }]}
                    defaultValue={out_token}
                    disableOption={true}
                    onSelect={function (value: any): void {
                      throw new Error('Function not implemented.');
                    }}
                  />
                </div>
              </div>
              <div>
                <div className='AmountRageGroupeSwap'>
                  <div className='label6'>amount</div>
                  <input
                    type='range'
                    id='slider'
                    min='0'
                    max='100'
                    step='1'
                    value={rangeValue}
                    onChange={handleRangeValueChange}
                  />{' '}
                  <div className='label6'>{rangeValue}%</div>
                </div>
                <div className='label6'>
                  price_impact {price_impact.toString()}
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
                  <Input
                    inputHeight='40px'
                    inputWidth='179px'
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
                <div className='bottomModal'>
                  <ActionSwap
                    first_token={first_token}
                    second_token={second_token}
                    in_token={in_token}
                    user_fund={bigAmount}
                    min_out={min_out}
                    price_impact={price_impact}
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
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13.4099 12.0002L17.7099 7.71019C17.8982 7.52188 18.004 7.26649 18.004 7.00019C18.004 6.73388 17.8982 6.47849 17.7099 6.29019C17.5216 6.10188 17.2662 5.99609 16.9999 5.99609C16.7336 5.99609 16.4782 6.10188 16.2899 6.29019L11.9999 10.5902L7.70994 6.29019C7.52164 6.10188 7.26624 5.99609 6.99994 5.99609C6.73364 5.99609 6.47824 6.10188 6.28994 6.29019C6.10164 6.47849 5.99585 6.73388 5.99585 7.00019C5.99585 7.26649 6.10164 7.52188 6.28994 7.71019L10.5899 12.0002L6.28994 16.2902C6.19621 16.3831 6.12182 16.4937 6.07105 16.6156C6.02028 16.7375 5.99414 16.8682 5.99414 17.0002C5.99414 17.1322 6.02028 17.2629 6.07105 17.3848C6.12182 17.5066 6.19621 17.6172 6.28994 17.7102C6.3829 17.8039 6.4935 17.8783 6.61536 17.9291C6.73722 17.9798 6.86793 18.006 6.99994 18.006C7.13195 18.006 7.26266 17.9798 7.38452 17.9291C7.50638 17.8783 7.61698 17.8039 7.70994 17.7102L11.9999 13.4102L16.2899 17.7102C16.3829 17.8039 16.4935 17.8783 16.6154 17.9291C16.7372 17.9798 16.8679 18.006 16.9999 18.006C17.132 18.006 17.2627 17.9798 17.3845 17.9291C17.5064 17.8783 17.617 17.8039 17.7099 17.7102C17.8037 17.6172 17.8781 17.5066 17.9288 17.3848C17.9796 17.2629 18.0057 17.1322 18.0057 17.0002C18.0057 16.8682 17.9796 16.7375 17.9288 16.6156C17.8781 16.4937 17.8037 16.3831 17.7099 16.2902L13.4099 12.0002Z'
                fill='white'
              />
            </svg>
            {/* <div className='neon-border'></div> */}
          </div>
        </div>
      </div>
    </>
    // <>
    //   <div className='new-pool-already-exist-default'>
    //     <div className='background'>
    //       <div className='modal2'>
    //         <div className='content'>
    //           <div className='create-new-pool'>Swap tokens</div>

    //           <div className='logos'>
    //             <div className='image'>
    //               <div className='logos2'>
    //                 <img className='image-3' src={second_image} />
    //               </div>
    //             </div>

    //             <div className='logo'>
    //               <img className='image-1' src={first_image} />
    //             </div>
    //           </div>

    //           <div className='pool-details'>
    //             <div className='this-pool-already-exists'>
    //               Pool informations
    //             </div>

    //             <div className='token-position'>
    //               <div className='logos3'>
    //                 <div className='image2'>
    //                   <div className='logos4'>
    //                     <img className='image-32' src={first_image} />
    //                   </div>
    //                 </div>

    //                 <div className='logo2'>
    //                   <img className='image-12' src={second_image} />
    //                 </div>
    //               </div>

    //               <div className='group-4'>
    //                 <div className='frame-4'>
    //                   <div className='rewards'>{first_token}</div>

    //                   <div className='_18-853-74'>
    //                     {' '}
    //                     <FormatAmount
    //                       value={props.poolPosition.first_token_amount.toString()}
    //                       decimals={Number(first_decimals)}
    //                       egldLabel={' '}
    //                       data-testid='balance'
    //                       digits={2}
    //                     />
    //                   </div>
    //                 </div>

    //                 <div className='frame-6'>
    //                   <div className='rewards'>{second_token}</div>

    //                   <div className='_18-853-74'>
    //                     {' '}
    //                     <FormatAmount
    //                       value={props.poolPosition.second_token_amount.toString()}
    //                       decimals={Number(second_decimals)}
    //                       egldLabel={' '}
    //                       data-testid='balance'
    //                       digits={2}
    //                     />
    //                   </div>
    //                 </div>

    //                 <div className='frame-7'>
    //                   <div className='all-time-rewarded'>in_fee</div>

    //                   <div className='_98-75'>
    //                     {' '}
    //                     <FormatAmount
    //                       value={props.poolPosition.first_fee.toString()}
    //                       decimals={Number(2)}
    //                       egldLabel={' '}
    //                       data-testid='balance'
    //                       digits={2}
    //                     />{' '}
    //                     %
    //                   </div>
    //                 </div>

    //                 <div className='frame-8'>
    //                   <div className='speed'>out_fee</div>

    //                   <div className='_365-days'>
    //                     <FormatAmount
    //                       value={props.poolPosition.second_fee.toString()}
    //                       decimals={Number(2)}
    //                       egldLabel={' '}
    //                       data-testid='balance'
    //                       digits={2}
    //                     />{' '}
    //                     %
    //                   </div>
    //                 </div>

    //                 <div className='frame-10'>
    //                   <div className='total-value'>LP value</div>

    //                   <div className='_5-198-9'>
    //                     {/* {staked_value.toLocaleString('en-US', {
    //                           maximumFractionDigits: 2
    //                         })}{' '} */}
    //                     TBD$
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>

    //           <div className='frame-56'>
    //             <div className='input'>
    //               <div className='label'>
    //                 <div className='label2'>{'Send '}</div>{' '}
    //                 <FormatAmount
    //                   className='label2'
    //                   decimals={Number(in_decimals.toString())}
    //                   value={inBalance.toString()}
    //                   egldLabel={' '}
    //                   data-testid='staked'
    //                 />
    //               </div>

    //               <div className='input-default'>
    //                 <svg
    //                   className='chevron-down'
    //                   width='16'
    //                   height='16'
    //                   viewBox='0 0 16 16'
    //                   fill='none'
    //                   xmlns='http://www.w3.org/2000/svg'
    //                 >
    //                   <path
    //                     fillRule='evenodd'
    //                     clipRule='evenodd'
    //                     d='M2.96967 5.21967C3.26256 4.92678 3.73744 4.92678 4.03033 5.21967L8 9.18934L11.9697 5.21967C12.2626 4.92678 12.7374 4.92678 13.0303 5.21967C13.3232 5.51256 13.3232 5.98744 13.0303 6.28033L8.53033 10.7803C8.23744 11.0732 7.76256 11.0732 7.46967 10.7803L2.96967 6.28033C2.67678 5.98744 2.67678 5.51256 2.96967 5.21967Z'
    //                     fill='white'
    //                   />
    //                 </svg>
    //                 <div className='value'>
    //                   <Form.Control
    //                     as='select'
    //                     value={in_token}
    //                     disabled={false}
    //                     className='search-select'
    //                   >
    //                     <option
    //                       disabled={true}
    //                       className='text-center not-allowed disabled'
    //                     >
    //                       {in_token}
    //                     </option>
    //                   </Form.Control>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className='max cursor-pointer' onClick={inverse}>
    //               {'<->'}
    //             </div>
    //             <div className='input2'>
    //               <div className='label3'>
    //                 <div className='label4'>Receive</div>
    //                 <FormatAmount
    //                   className='label2'
    //                   decimals={Number(out_decimals.toString())}
    //                   value={outBalance.toString()}
    //                   egldLabel={' '}
    //                   data-testid='staked'
    //                 />
    //               </div>

    //               <div className='input-default2'>
    //                 <svg
    //                   className='chevron-down2'
    //                   width='16'
    //                   height='16'
    //                   viewBox='0 0 16 16'
    //                   fill='none'
    //                   xmlns='http://www.w3.org/2000/svg'
    //                 >
    //                   <path
    //                     fillRule='evenodd'
    //                     clipRule='evenodd'
    //                     d='M2.96967 5.21967C3.26256 4.92678 3.73744 4.92678 4.03033 5.21967L8 9.18934L11.9697 5.21967C12.2626 4.92678 12.7374 4.92678 13.0303 5.21967C13.3232 5.51256 13.3232 5.98744 13.0303 6.28033L8.53033 10.7803C8.23744 11.0732 7.76256 11.0732 7.46967 10.7803L2.96967 6.28033C2.67678 5.98744 2.67678 5.51256 2.96967 5.21967Z'
    //                     fill='white'
    //                   />
    //                 </svg>
    //                 <div className='value'>
    //                   <Form.Control
    //                     as='select'
    //                     value={out_token}
    //                     disabled={false}
    //                     className='search-select'
    //                   >
    //                     <option
    //                       disabled={true}
    //                       className='text-center not-allowed disabled'
    //                     >
    //                       {out_token}
    //                     </option>
    //                   </Form.Control>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>

    //           <div className='staked-rewarded-tokens'>
    //             <>
    //               <div className='form'>
    //                 <div className='frame-57'>
    //                   <div className='input3'>
    //                     <div className='label5'>
    //                       <div className='label6'>amount</div>
    //                       <input
    //                         type='range'
    //                         id='slider'
    //                         min='0'
    //                         max='100'
    //                         step='1'
    //                         value={rangeValue}
    //                         onChange={handleRangeValueChange}
    //                       />{' '}
    //                       <div className='label6'>{rangeValue}%</div>
    //                       <div className='label6'>
    //                         price_impact {price_impact.toString()}
    //                       </div>
    //                     </div>

    //                     <Form.Group
    //                       className='amount-bar'
    //                       as={Col}
    //                       controlId='TokenAmount'
    //                       onChange={handleTokenAmountChange}
    //                     >
    //                       <Form.Control
    //                         className='amount-input'
    //                         required
    //                         type='number'
    //                         placeholder=''
    //                         defaultValue='0'
    //                         value={tokenAmount}
    //                       />{' '}
    //                       <div
    //                         className='max cursor-pointer'
    //                         onClick={setToMax}
    //                       >
    //                         MAX
    //                       </div>
    //                     </Form.Group>
    //                   </div>
    //                   <div className='font-uniformisation'>
    //                     <Form.Group
    //                       className='amount-bar'
    //                       as={Col}
    //                       controlId='TokenAmount'
    //                     >
    //                       <Form.Control
    //                         className='amount-input'
    //                         required
    //                         type='number'
    //                         placeholder=''
    //                         defaultValue='0'
    //                         value={(
    //                           Number(out_amount - out_fees) /
    //                           10 ** out_decimals
    //                         ).toString()}
    //                       />{' '}
    //                     </Form.Group>
    //                     {/* <div className='_7-56-mex-ecb-7-bf'>
    //                       <FormatAmount
    //                         decimals={Number(in_decimals.toString())}
    //                         value={balance.toString()}
    //                         egldLabel={in_token}
    //                         data-testid='staked'
    //                       />
    //                     </div> */}
    //                   </div>
    //                   <div className='font-uniformisation'>
    //                     {/* <div className='_7-56-mex-ecb-7-bf'>
    //                       <FormatAmount
    //                         decimals={Number(out_decimals.toString())}
    //                         value={out_amount.toString()}
    //                         egldLabel={out_token}
    //                         data-testid='staked'
    //                       />
    //                     </div> */}
    //                   </div>
    //                 </div>
    //               </div>
    //             </>
    //           </div>
    //         </div>

    //         <div className='bottom' onClick={props.onClose}>
    //           <Button
    //             buttonWidth='100%'
    //             hasBorder={true}
    //             borderRadius={40}
    //             background={'black'}
    //             borderColor={['#BD37EC', '#1F67FF']}
    //             text='Cancel'
    //             onClick={props.onClose}
    //           />{' '}
    //           <ActionSwap
    //             first_token={first_token}
    //             second_token={second_token}
    //             in_token={in_token}
    //             user_fund={bigAmount}
    //             min_out={min_out}
    //             price_impact={price_impact}
    //           />
    //         </div>

    //         <svg
    //           className='close'
    //           onClick={props.onClose}
    //           width='24'
    //           height='24'
    //           viewBox='0 0 24 24'
    //           fill='none'
    //           xmlns='http://www.w3.org/2000/svg'
    //         >
    //           <path
    //             d='M13.4099 12.0002L17.7099 7.71019C17.8982 7.52188 18.004 7.26649 18.004 7.00019C18.004 6.73388 17.8982 6.47849 17.7099 6.29019C17.5216 6.10188 17.2662 5.99609 16.9999 5.99609C16.7336 5.99609 16.4782 6.10188 16.2899 6.29019L11.9999 10.5902L7.70994 6.29019C7.52164 6.10188 7.26624 5.99609 6.99994 5.99609C6.73364 5.99609 6.47824 6.10188 6.28994 6.29019C6.10164 6.47849 5.99585 6.73388 5.99585 7.00019C5.99585 7.26649 6.10164 7.52188 6.28994 7.71019L10.5899 12.0002L6.28994 16.2902C6.19621 16.3831 6.12182 16.4937 6.07105 16.6156C6.02028 16.7375 5.99414 16.8682 5.99414 17.0002C5.99414 17.1322 6.02028 17.2629 6.07105 17.3848C6.12182 17.5066 6.19621 17.6172 6.28994 17.7102C6.3829 17.8039 6.4935 17.8783 6.61536 17.9291C6.73722 17.9798 6.86793 18.006 6.99994 18.006C7.13195 18.006 7.26266 17.9798 7.38452 17.9291C7.50638 17.8783 7.61698 17.8039 7.70994 17.7102L11.9999 13.4102L16.2899 17.7102C16.3829 17.8039 16.4935 17.8783 16.6154 17.9291C16.7372 17.9798 16.8679 18.006 16.9999 18.006C17.132 18.006 17.2627 17.9798 17.3845 17.9291C17.5064 17.8783 17.617 17.8039 17.7099 17.7102C17.8037 17.6172 17.8781 17.5066 17.9288 17.3848C17.9796 17.2629 18.0057 17.1322 18.0057 17.0002C18.0057 16.8682 17.9796 16.7375 17.9288 16.6156C17.8781 16.4937 17.8037 16.3831 17.7099 16.2902L13.4099 12.0002Z'
    //             fill='white'
    //           />
    //         </svg>

    //         <div className='neon-border'></div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};

export default SwapModal;
