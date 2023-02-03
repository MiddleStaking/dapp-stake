import React, { useState } from 'react';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import { Col, Form } from 'react-bootstrap';
import './../../../assets/Modal.css';
import { ActionFund } from './Actions';
import PayFeesModal from './PayFeesModal';

const FundModal = (props: any) => {
  //Token Amont = Valeur formulaire
  const [tokenAmount, setTokenAmount] = React.useState(0);
  //BigAmount = Valeur VRAI
  const [bigAmount, setBigAmount] = React.useState(BigInt(0));
  const [agreement, setAgreement] = useState(false);
  const [showFees, setShowFees] = useState(false);

  if (!props.show) {
    return null;
  }

  const handleChange = () => {
    setAgreement(!agreement);
  };

  function handleTokenAmountChange(e: React.ChangeEvent<any>) {
    const amount = BigInt(e.target.value * 10 ** props.decimals);

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
    <div className='modal' onClick={props.onClose}>
      <PayFeesModal
        rewardedToken={props.rewardedToken}
        stakedToken={props.stakedToken}
        onClose={() => setShowFees(false)}
        showFees={showFees}
      />
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <h4 className='modal-title'>
            Add [{props.rewardedToken}] to The pool
          </h4>
          <br />
        </div>
        <div className='modal-body'>
          <h3>/!\ Deposit is final /!\</h3>
          <u>(1)[{props.rewardedToken}]</u> will be sent to the pool and locked
          with no withdrawal option.
          <br />
          <br />
          Users will be able to stake <u>(2)[{props.stakedToken}]</u> and share
          a part of the pool based on their stake participation and time spent
          in pool.
          <br />
          <br /> Default pool speed is set at 5 526 000 Blocks. (1 Year)
          <br />
          <br />
        </div>
        <Form.Group
          as={Col}
          md='6'
          controlId='TokenAmount'
          onChange={handleTokenAmountChange}
        >
          <Form.Label>
            You have{' '}
            <FormatAmount
              decimals={Number(props.decimals.toString())}
              value={props.balance.toString()}
              egldLabel={props.rewardedToken}
              data-testid='staked'
            />
          </Form.Label>
          <Form.Control
            required
            type='number'
            placeholder=''
            defaultValue='0'
            value={tokenAmount}
          />
        </Form.Group>
        <ActionFund
          stakedToken={props.stakedToken}
          rewardedToken={props.rewardedToken}
          user_fund={bigAmount}
          agreement={agreement}
        />{' '}
        <label>
          <input checked={agreement} onChange={handleChange} type='checkbox' />{' '}
          I understand that deposit is final and i want to fund pool [
          {props.stakedToken}][{props.rewardedToken}]
        </label>
        <div className='modal-footer'>
          {' '}
          {props.fees > 0 ? (
            <>
              (i) {props.fees.toString()}% of (1)[{props.rewardedToken}]
              deposited in pool will go to the Fee&apos;s Wallet. <br />{' '}
              <button onClick={() => setShowFees(true)}>
                PAY TO REMOVE FEES
              </button>
            </>
          ) : (
            <>
              (i) Deposit Fees have been paid
              <br />
            </>
          )}
          <button onClick={props.onClose} className='button'>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundModal;
