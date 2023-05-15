import React, { useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import './../../../assets/Modal.css';
import { ActionUnstake } from './Actions';
import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
import { useGetTokenPosition } from './Actions/helpers';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import notFound from './../../../assets/img/notfoundc.svg';
import { useGetESDTInformations } from './Actions/helpers';
import { ActionFund } from './Actions';

const StakeModal = (props: any) => {
  const userEsdtBalance = useGetUserESDT();
  const [stoken, setStoken] = React.useState(props.stakedToken);
  const [rtoken, setRtoken] = React.useState(props.rewardedToken);
  const [balance, setBalance] = React.useState(BigInt(0));
  const tokenPosition = useGetTokenPosition(stoken, rtoken);
  const [tokenAmount, setTokenAmount] = React.useState(0);
  const [rangeValue, setRangeValue] = React.useState(0);
  const [bigAmount, setBigAmount] = React.useState(BigInt(0));

  useEffect(() => {
    setBalance(props?.balance ? props?.balance : BigInt(0));
  }, [props.balance]);

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

  const speed =
    (BigInt(tokenPosition.blocks_to_max) * BigInt(6)) /
    BigInt(24) /
    BigInt(60) /
    BigInt(60);

  function handleTokenAmountChange(e: React.ChangeEvent<any>) {
    const amount = BigInt(e.target.value * 10 ** sdecimals);
    if (amount < BigInt(0)) {
      setTokenAmount(0);
      setBigAmount(BigInt(0));
    } else if (amount > balance) {
      setTokenAmount(Number(BigInt(balance)) / Number(BigInt(10 ** sdecimals)));
      setBigAmount(balance);
    } else {
      setTokenAmount(e.target.value);
      const output = toBigAmount(Number(e.target.value), Number(sdecimals));
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
    setTokenAmount(Number(BigInt(balance)) / Number(BigInt(10 ** sdecimals)));
    setBigAmount(balance);
    setRangeValue(100);
  }

  if (!props.show) {
    return null;
  }
  return (
    <>
      <div className='new-pool-already-exist-default'>
        <div className='background'>
          <div className='modal'>
            <div className='content'>
              <div className='create-new-pool'>Unstake tokens</div>

              <div className='logos'>
                <div className='image'>
                  <div className='logos2'>
                    <img className='image-3' src={image2} />
                  </div>
                </div>

                <div className='logo'>
                  <img className='image-1' src={image1} />
                </div>
              </div>

              <div className='frame-56'>
                <div className='input'>
                  <div className='label'>
                    <div className='label2'>Stake</div>
                  </div>

                  <div className='input-default'>
                    <svg
                      className='chevron-down'
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M2.96967 5.21967C3.26256 4.92678 3.73744 4.92678 4.03033 5.21967L8 9.18934L11.9697 5.21967C12.2626 4.92678 12.7374 4.92678 13.0303 5.21967C13.3232 5.51256 13.3232 5.98744 13.0303 6.28033L8.53033 10.7803C8.23744 11.0732 7.76256 11.0732 7.46967 10.7803L2.96967 6.28033C2.67678 5.98744 2.67678 5.51256 2.96967 5.21967Z'
                        fill='white'
                      />
                    </svg>
                    <div className='value'>
                      <Form.Control
                        as='select'
                        value={stoken}
                        disabled={false}
                        className='search-select'
                      >
                        <option
                          disabled={true}
                          className='text-center not-allowed disabled'
                        >
                          {stoken}
                        </option>
                      </Form.Control>
                    </div>
                  </div>
                </div>

                <div className='input2'>
                  <div className='label3'>
                    <div className='label4'>Earn</div>
                  </div>

                  <div className='input-default2'>
                    <svg
                      className='chevron-down2'
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M2.96967 5.21967C3.26256 4.92678 3.73744 4.92678 4.03033 5.21967L8 9.18934L11.9697 5.21967C12.2626 4.92678 12.7374 4.92678 13.0303 5.21967C13.3232 5.51256 13.3232 5.98744 13.0303 6.28033L8.53033 10.7803C8.23744 11.0732 7.76256 11.0732 7.46967 10.7803L2.96967 6.28033C2.67678 5.98744 2.67678 5.51256 2.96967 5.21967Z'
                        fill='white'
                      />
                    </svg>
                    <div className='value'>
                      <Form.Control
                        as='select'
                        value={rtoken}
                        disabled={false}
                        className='search-select'
                      >
                        <option
                          disabled={true}
                          className='text-center not-allowed disabled'
                        >
                          {rtoken}
                        </option>
                      </Form.Control>
                    </div>
                  </div>
                </div>
              </div>
              {tokenPosition.stakedToken == stoken &&
                tokenPosition.rewardedToken == rtoken && (
                  <div className='pool-details'>
                    <div className='this-pool-already-exists'>
                      Staking pool informations
                    </div>

                    <div className='token-position'>
                      <div className='logos3'>
                        <div className='image2'>
                          <div className='logos4'>
                            <img className='image-32' src={image2} />
                          </div>
                        </div>

                        <div className='logo2'>
                          <img className='image-12' src={image1} />
                        </div>
                      </div>

                      <div className='group-4'>
                        <div className='frame-4'>
                          <div className='rewards'>Rewards</div>

                          <div className='_18-853-74'>
                            {' '}
                            <FormatAmount
                              value={tokenPosition.balance.toString()}
                              decimals={Number(rdecimals)}
                              egldLabel={' '}
                              data-testid='balance'
                              digits={2}
                            />
                          </div>
                        </div>

                        <div className='frame-6'>
                          <div className='value2'>Value</div>

                          <div className='_723-37'>
                            {rewarded_value.toLocaleString('en-US', {
                              maximumFractionDigits: 2
                            })}{' '}
                            $
                          </div>
                        </div>

                        <div className='frame-7'>
                          <div className='all-time-rewarded'>
                            All time rewarded
                          </div>

                          <div className='_98-75'>
                            {' '}
                            <FormatAmount
                              value={tokenPosition.total_rewards.toString()}
                              decimals={Number(rdecimals)}
                              egldLabel={' '}
                              data-testid='balance'
                              digits={2}
                            />
                          </div>
                        </div>

                        <div className='frame-8'>
                          <div className='speed'>Speed</div>

                          <div className='_365-days'>
                            {speed.toString()} days
                          </div>
                        </div>

                        <div className='frame-9'>
                          <div className='total-staked'>Staked</div>

                          <div className='_135-492-65'>
                            {' '}
                            <FormatAmount
                              value={tokenPosition.total_stake.toString()}
                              decimals={Number(sdecimals)}
                              egldLabel={' '}
                              data-testid='staked'
                              digits={2}
                            />
                          </div>
                        </div>

                        <div className='frame-10'>
                          <div className='total-value'>Staked value</div>

                          <div className='_5-198-9'>
                            {staked_value.toLocaleString('en-US', {
                              maximumFractionDigits: 2
                            })}{' '}
                            $
                          </div>
                        </div>

                        <div className='frame-11'>
                          <div className='users'>Users</div>

                          <div className='_6'>
                            {' '}
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
                )}

              <div className='staked-rewarded-tokens'>
                <>
                  <div className='do-you-want-to-add-it-rewarded-tokens'>
                    Set the amount you want to unstake
                  </div>

                  <div className='form'>
                    <div className='frame-57'>
                      <div className='input3'>
                        <div className='label5'>
                          <div className='label6'>amount</div>{' '}
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

                        <Form.Group
                          className='amount-bar'
                          as={Col}
                          controlId='TokenAmount'
                          onChange={handleTokenAmountChange}
                        >
                          <Form.Control
                            className='amount-input'
                            required
                            type='number'
                            placeholder=''
                            defaultValue='0'
                            value={tokenAmount}
                          />{' '}
                          <div
                            className='max cursor-pointer'
                            onClick={setToMax}
                          >
                            MAX
                          </div>
                        </Form.Group>
                      </div>

                      <div className='font-uniformisation'>
                        <div className='_7-56-mex-ecb-7-bf'>
                          <FormatAmount
                            decimals={Number(sdecimals.toString())}
                            value={balance.toString()}
                            egldLabel={stoken}
                            data-testid='staked'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>

            <div className='bottom' onClick={props.onClose}>
              <div className='button2 cursor-pointer' onClick={props.onClose}>
                <div className='button'>
                  <div className='cancel '>Cancel</div>
                </div>{' '}
              </div>

              <ActionUnstake
                stakedToken={stoken}
                rewardedToken={rtoken}
                user_fund={bigAmount}
              />
            </div>

            <svg
              className='close'
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

            <div className='neon-border'></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StakeModal;
