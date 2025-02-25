import React, { useEffect } from 'react';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import './../../../assets/Modal.css';
import './StakeModal.scss';
import DropdownMenu from 'components/Design/DropdownMenu';
import Input from 'components/Design/Input';
import toBigAmount from 'helpers/toBigAmount';
import notFound from './../../../assets/img/notfoundc.svg';
import { Button } from './../../../components/Design';
import { ActionLiquidSingle } from './Actions';
import BigNumber from 'bignumber.js';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';

const AddSingleTokenModal = (props: any) => {
  const [user_balance, setUserBalance] = React.useState(props.userEsdtBalance);
  const [first_token, setFirstToken] = React.useState(props.first_esdt_info);
  const [second_token, setSecondToken] = React.useState(props.second_esdt_info);
  const { account } = useGetAccountInfo();

  React.useEffect(() => {
    setUserBalance(props.userEsdtBalance);
  }, [props.userEsdtBalance]);
  React.useEffect(() => {
    setFirstToken(props.first_esdt_info);
  }, [props.first_esdt_info]);
  React.useEffect(() => {
    setSecondToken(props.second_esdt_info);
  }, [props.second_esdt_info]);

  const egld_balance =
    Number(account?.balance) > 0
      ? new BigNumber(account?.balance)
      : new BigNumber(0);
  const [first_balance, setFirstBalance] = React.useState(new BigNumber(0));
  const [second_balance, setSecondBalance] = React.useState(new BigNumber(0));
  const [tokenAmount, setTokenAmount] = React.useState(0);
  const [rangeValue, setRangeValue] = React.useState(0);
  const [firstBig, setFirstBig] = React.useState(new BigNumber(0));

  useEffect(() => {
    const first_balance = user_balance.find(
      (item: any) => item.identifier === first_token.identifier
    );
    const second_balance = user_balance.find(
      (item: any) => item.identifier === second_token.identifier
    );

    setFirstBalance(
      first_token.identifier === 'EGLD-000000'
        ? egld_balance
        : first_balance
        ? new BigNumber(first_balance.balance)
        : new BigNumber(0)
    );
    setSecondBalance(
      second_token.identifier === 'EGLD-000000'
        ? egld_balance
        : second_balance
        ? new BigNumber(second_balance.balance)
        : new BigNumber(0)
    );
  }, [props.first_esdt_info, props.second_esdt_info, user_balance]);

  const first_decimals = first_token?.decimals ? first_token?.decimals : 0;
  const second_decimals = second_token?.decimals ? second_token?.decimals : 0;

  const first_image = first_token?.assets?.svgUrl
    ? first_token?.assets?.svgUrl
    : notFound;
  const second_image = second_token?.assets?.svgUrl
    ? second_token?.assets?.svgUrl
    : notFound;

  function handleTokenAmountChange(value: any) {
    const amount = new BigNumber(value);
    if (amount.isLessThan(0)) {
      setTokenAmount(0);
      setFirstBig(new BigNumber(0));
    } else {
      setTokenAmount(amount.toNumber());
      setFirstBig(amount.multipliedBy(10 ** first_decimals));
    }
    const percentage = first_balance.isGreaterThan(0)
      ? amount
          .multipliedBy(10 ** first_decimals)
          .multipliedBy(100)
          .dividedBy(first_balance)
          .toNumber()
      : 0;
    setRangeValue(percentage);
  }

  function handleRangeValueChange(e: React.ChangeEvent<any>) {
    if (first_balance.isGreaterThan(0)) {
      setRangeValue(e.target.value);
      const percentage = Number(e.target.value).toFixed();
      const big_amount = new BigNumber(first_balance.toString())
        .multipliedBy(percentage)
        .dividedBy(100);
      setTokenAmount(big_amount.dividedBy(10 ** first_decimals).toNumber());
      setFirstBig(big_amount.integerValue(BigNumber.ROUND_FLOOR));
    } else {
      setRangeValue(0);
    }
  }

  function setToMax() {
    setTokenAmount(first_balance.dividedBy(10 ** first_decimals).toNumber());
    setFirstBig(first_balance);
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
              <div className='modalLabelStakeModal'>Single side LP</div>

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

              <div className='dropDownGroupeStakeModal'>
                <div className='dropDownStake'>
                  <div className='GroupeLabelDropdoownFormatAmount'>
                    <div className='LabelDropdoown'>Send</div>
                    <div className='LabelDropdoownFormatAmount'>
                      <FormatAmount
                        className='label2'
                        decimals={Number(first_decimals.toString())}
                        value={first_balance.toString()}
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
                        value={second_balance.toString()}
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
                  <ActionLiquidSingle
                    first_token={first_token.identifier}
                    second_token={second_token.identifier}
                    amount={firstBig}
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
export default AddSingleTokenModal;
