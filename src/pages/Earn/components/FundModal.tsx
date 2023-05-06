import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import './../../../assets/Modal.css';
import { ActionStake } from './Actions';
const StakeModal = (props: any) => {
  //Token Amont = Valeur formulaire
  const [tokenAmount, setTokenAmount] = React.useState(0);
  //BigAmount = Valeur VRAI
  const [bigAmount, setBigAmount] = React.useState(BigInt(0));

  if (!props.show) {
    return null;
  }
  let fees = '10';
  if (props.fees) {
    fees = props.fees;
  }
  function setToMax() {
    setTokenAmount(
      Number(BigInt(props.balance)) / Number(BigInt(10 ** props.decimals))
    );
    setBigAmount(props.balance);
  }
  function handleTokenAmountChange(e: React.ChangeEvent<any>) {
    const amount = BigInt(e.target.value * 10 ** props.decimals);
    const balance = BigInt(props.balance);

    const max = (
      Number(BigInt(props.balance)) / Number(10 ** props.decimals)
    ).toFixed(18);

    if (amount < BigInt(0)) {
      setTokenAmount(0);
      setBigAmount(BigInt(0));
    } else if (amount > props.balance) {
      setTokenAmount(
        Number(BigInt(props.balance)) / Number(BigInt(10 ** props.decimals))
      );
      setBigAmount(props.balance);
    } else {
      setTokenAmount(e.target.value);
      const output = toBigAmount(
        Number(e.target.value),
        Number(props.decimals)
      );
      setBigAmount(BigInt(output));
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

  return (
    <>
      <div className='new-pool-already-exist-default'>
        <div className='background'>
          <div className='modal'>
            <div className='content'>
              <div className='create-new-pool'>Create new pool</div>

              <div className='logos'>
                <div className='image'>
                  <div className='logos2'>
                    <img className='image-3' src={props.image2} />
                  </div>
                </div>

                <div className='logo'>
                  <img className='image-1' src={props.image1} />
                </div>
              </div>

              <div className='frame-56'>
                <div className='input'>
                  <div className='label'>
                    <div className='label2'>Staked token</div>
                  </div>

                  <div className='input-default'>
                    <div className='value'>{props.stakedToken}</div>

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
                  </div>
                </div>

                <div className='input2'>
                  <div className='label3'>
                    <div className='label4'>Earned token</div>
                  </div>

                  <div className='input-default2'>
                    <div className='value'>{props.rewardedToken}</div>

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
                  </div>
                </div>
              </div>

              <div className='pool-details'>
                <div className='this-pool-already-exists'>
                  This pool already exists
                </div>

                <div className='token-position'>
                  <div className='logos3'>
                    <div className='image2'>
                      <div className='logos4'>
                        <img className='image-32' src={props.image2} />
                      </div>
                    </div>

                    <div className='logo2'>
                      <img className='image-12' src={props.image1} />
                    </div>
                  </div>

                  <div className='group-4'>
                    <div className='frame-4'>
                      <div className='rewards'>Rewards</div>

                      <div className='_18-853-74'>18 853,74</div>
                    </div>

                    <div className='frame-6'>
                      <div className='value2'>Value</div>

                      <div className='_723-37'>723.37 $</div>
                    </div>

                    <div className='frame-7'>
                      <div className='all-time-rewarded'>All time rewarded</div>

                      <div className='_98-75'>98,75</div>
                    </div>

                    <div className='frame-8'>
                      <div className='speed'>Speed</div>

                      <div className='_365-days'>365 days</div>
                    </div>

                    <div className='frame-9'>
                      <div className='total-staked'>Total staked</div>

                      <div className='_135-492-65'>135 492,65</div>
                    </div>

                    <div className='frame-10'>
                      <div className='total-value'>Total value</div>

                      <div className='_5-198-9'>5 198,9 $</div>
                    </div>

                    <div className='frame-11'>
                      <div className='users'>Users</div>

                      <div className='_6'>6</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='staked-rewarded-tokens'>
                <div className='do-you-want-to-add-it-rewarded-tokens'>
                  Do you want to add it rewarded tokens ?
                </div>

                <div className='form'>
                  <div className='frame-57'>
                    <div className='input3'>
                      <div className='label5'>
                        <div className='label6'>Staked rewarded tokens</div>
                      </div>

                      <div className='input-default3'>
                        <div className='value3'>Enter number</div>

                        <div className='max'>MAX</div>
                      </div>
                    </div>

                    <div className='font-uniformisation'>
                      <div className='_7-56-mex-ecb-7-bf'>7,56 MEX-ecb7Bf</div>
                    </div>
                  </div>

                  <div className='frame-41'>
                    <div className='frame-412'>
                      <div className='rectangle-8'>
                        <div className='rectangle-7'></div>
                      </div>

                      <div className='label7'>
                        This pair has transaction fees. Add xx,xx MID to not pay
                        10% extra fee.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='bottom'>
              <div className='button2'>
                <div className='button'>
                  <div className='cancel '>Cancel</div>
                </div>{' '}
              </div>

              <div className='button2'>
                <div className='stake2'>Stake tokens</div>
              </div>
            </div>

            <svg
              className='close'
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
    </div> */}{' '}
    </>
  );
};

export default StakeModal;
