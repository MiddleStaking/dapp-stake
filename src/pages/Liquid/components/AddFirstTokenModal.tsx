import React, { useEffect } from 'react';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import './../../../assets/Modal.css';
import './StakeModal.scss';
import DropdownMenu from 'components/Design/DropdownMenu';
import Input from 'components/Design/Input';
import toBigAmount from 'helpers/toBigAmount';
import notFound from './../../../assets/img/notfoundc.svg';
import { Button } from './../../../components/Design';
import { ActionLiquidRemove } from './Actions';
import BigNumber from 'bignumber.js';

const AddFirstTokenModal = (props: any) => {
  const [user_balance, setUserBalance] = React.useState(props.userEsdtBalance);
  const [token, setToken] = React.useState(props.esdt_info);
  const [first_pool, setFirstPool] = React.useState(props.firstPoolPosition);

  React.useEffect(() => {
    setUserBalance(props.userEsdtBalance);
  }, [props.userEsdtBalance]);
  React.useEffect(() => {
    setFirstPool(props.firstPoolPosition);
  }, [props.firstPoolPosition]);
  React.useEffect(() => {
    setToken(props.first_esdt_info);
    props.second_esdt_info;
  }, [props.first_esdt_info]);

  const [lpBalance, setLpBalance] = React.useState(BigInt(0));
  const [tokenAmount, setTokenAmount] = React.useState(0);
  const [rangeValue, setRangeValue] = React.useState(0);
  const [firstBig, setFirstBig] = React.useState(BigInt(0));

  useEffect(() => {
    const balance = user_balance.find(
      (item: any) => item.identifier === token.identifier
    );
  }, [props.first_esdt_info, props.second_esdt_info, user_balance]);

  const first_decimals = first_token?.decimals ? first_token?.decimals : 0;
  const second_decimals = second_token?.decimals ? second_token?.decimals : 0;
  const lp_decimals = 0;

  const first_image = first_token?.assets?.svgUrl
    ? first_token?.assets?.svgUrl
    : notFound;
  const second_image = second_token?.assets?.svgUrl
    ? second_token?.assets?.svgUrl
    : notFound;

  const taux = new BigNumber(
    first_pool.second_token_amount > 0 ? first_pool.second_token_amount : 1
  )
    .multipliedBy(new BigNumber(1000000000))
    .dividedBy(
      new BigNumber(
        first_pool.first_token_amount > 0 ? first_pool.first_token_amount : 1
      )
    );

  function handleTokenAmountChange(value: any) {
    const amount = BigInt(Number(value));
    if (amount < BigInt(0)) {
      setTokenAmount(0);
      setFirstBig(BigInt(0));
    } else {
      setTokenAmount(Number(value));
      const output = toBigAmount(Number(value), Number(first_decimals));
      setFirstBig(BigInt(output));
    }
    const percentage =
      lpBalance > 0
        ? Number((BigInt(amount) * BigInt(100)) / BigInt(lpBalance))
        : 0;
    setRangeValue(percentage);
  }

  function handleRangeValueChange(e: React.ChangeEvent<any>) {
    if (lpBalance > BigInt(0)) {
      setRangeValue(e.target.value);
      const percentage = Number(e.target.value).toFixed();
      const big_amount = BigInt(
        (BigInt(lpBalance) * BigInt(percentage)) / BigInt(100)
      );
      setTokenAmount(Number(BigInt(big_amount)));
      setFirstBig(big_amount);
    } else {
      setRangeValue(0);
    }
  }

  function setToMax() {
    setTokenAmount(Number(lpBalance));
    setFirstBig(lpBalance);
    setRangeValue(100);
  }

  if (!props.show) {
    return null;
  }

  const percentage = rangeValue / 100;
  const first_amount = first_pool.first_token_amount
    ? Number(first_pool.first_token_amount)
    : Number(1);
  const price = first_token?.price ? Number(first_token.price) * 2 : Number(1);
  const lp_value1 = first_amount * price;

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
                {!props.isDual ? (
                  <div className='GroupeDetails_StakeModal'>
                    <div className='LogosDetails_StakeModal'>
                      <div className='logosStakeModal'>
                        <div className='logo2StakeModal'>
                          <div className='image_2StakeModal'>
                            <img
                              className='img_2StakeModal'
                              src={first_image}
                            />
                          </div>
                        </div>

                        <div className='logo1StakeModal'>
                          <div className='image_1StakeModal'>
                            <img
                              className='img_1StakeModal'
                              src={second_image}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='PoolDetails_StakeModal'>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>
                          {first_token.identifier}
                        </div>
                        <div className='ValueDetailsInfo'>
                          <FormatAmount
                            value={first_pool.first_token_amount.toString()}
                            decimals={Number(first_decimals)}
                            egldLabel={' '}
                            data-testid='balance'
                            digits={2}
                          />
                        </div>
                      </div>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>
                          {second_token.identifier}
                        </div>
                        <div className='ValueDetailsInfo'>
                          <FormatAmount
                            value={first_pool.second_token_amount.toString()}
                            decimals={Number(second_decimals)}
                            egldLabel={' '}
                            data-testid='balance'
                            digits={2}
                          />
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
                          />
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
                              src={first_image}
                            />
                          </div>
                        </div>

                        <div className='logo1StakeModal'>
                          <div className='image_1StakeModal'>
                            <img
                              className='img_1StakeModal'
                              src={second_image}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='PoolDetails_StakeModal'>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>
                          {first_token.identifier.split('-')[0]} :{' '}
                        </div>
                      </div>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>
                          {second_token.identifier.split('-')[0]}
                        </div>
                        <div className='ValueDetailsInfo'>
                          <FormatAmount
                            value={first_pool.first_token_amount.toString()}
                            decimals={Number(first_decimals)}
                            egldLabel={' '}
                            data-testid='balance'
                            digits={2}
                          />{' '}
                          :{' '}
                          <FormatAmount
                            value={first_pool.second_token_amount.toString()}
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
                            value={first_pool.first_fee.toString()}
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
                            value={first_pool.second_fee.toString()}
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
                        value={lpBalance.toString()}
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
                    options={[
                      {
                        text: first_token.identifier,
                        value: first_token.identifier
                      }
                    ]}
                    defaultValue={first_token.identifier}
                    disableOption={true}
                    onSelect={function (): void {
                      throw new Error('Function not implemented.');
                    }}
                  />
                </div>

                <div className='dropDownEarn'>
                  <div className='GroupeLabelDropdoownFormatAmount'>
                    <div className='LabelDropdoown'>Send</div>
                    <div className='LabelDropdoownFormatAmount'>
                      <FormatAmount
                        className='label2'
                        decimals={Number(second_decimals.toString())}
                        value={lpBalance.toString()}
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
                    options={[
                      {
                        text: second_token.identifier,
                        value: second_token.identifier
                      }
                    ]}
                    defaultValue={second_token.identifier}
                    disableOption={true}
                    onSelect={function (): void {
                      throw new Error('Function not implemented.');
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
                  <ActionLiquidRemove
                    first_token={first_token.identifier}
                    second_token={second_token.identifier}
                    lp_token={props.lp_token}
                    lp_amount={firstBig}
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
    </>
  );
};
export default AddFirstTokenModal;
