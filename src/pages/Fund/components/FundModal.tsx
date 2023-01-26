import { maxDecimals } from '@multiversx/sdk-dapp/utils';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';

import './Modal.css';
const FundModal = (props: any) => {
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

  function handleTokenAmountChange(e: React.ChangeEvent<any>) {
    console.log('e.target.value');
    console.log(e.target.value);
    console.log(props.decimals);
    const amount = BigInt(e.target.value * 10 ** props.decimals);
    const balance = BigInt(props.balance);

    const test =
      Number(BigInt(props.balance)) / Number(BigInt(10 ** props.decimals));
    console.log(test);
    console.log(amount);
    console.log(balance);
    if (amount < BigInt(0)) {
      console.log('TEST1');
      setTokenAmount(0);
      setBigAmount(BigInt(0));
    } else if (amount > props.balance) {
      console.log('TEST2');
      setTokenAmount(
        Number(BigInt(props.balance)) / Number(BigInt(10 ** props.decimals))
      );
      setBigAmount(props.balance);
    } else {
      console.log('TEST3');

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

  function toHex(str: string) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      result += str.charCodeAt(i).toString(16);
    }
    return result;
  }
  function toHexDec(d: number) {
    let result = '';
    result = Number(d).toString(16);
    if (Math.abs(result.length % 2) == 1) {
      result = '0' + result;
    }
    return result;
  }
  function bigToHexDec(d: bigint) {
    let result = '';
    result = d.toString(16);
    if (Math.abs(result.length % 2) == 1) {
      result = '0' + result;
    }
    return result;
  }

  return (
    <div className='modal' onClick={props.onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <h4 className='modal-title'>
            Add {props.rewardedToken}] to The pool {props.decimals.toString()}{' '}
            {props.balance.toString()}
          </h4>
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
          {fees}% of (1)[{props.rewardedToken}] deposited in pool will go to the
          Fee&apos;s Wallet.
          <br />
          <br />
          Owner of the contract (we) can adjust speed and fees deposit of each
          pool. Contact us if you need a faster or a slower pool.
        </div>
        <Form.Group
          as={Col}
          md='6'
          controlId='TokenAmount'
          onChange={handleTokenAmountChange}
        >
          <Form.Label>
            Amount {'@' + bigToHexDec(bigAmount)} ({tokenAmount}) Balance :{' '}
            <FormatAmount
              decimals={Number(props.decimals.toString())}
              value={props.balance.toString()}
              egldLabel={' '}
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

        <div className='modal-footer'>
          <button onClick={props.onClose} className='button'>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundModal;
