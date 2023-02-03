import React, { useState } from 'react';
import './../../../assets/Modal.css';
import { ActionRemovePoolFees } from './Actions/ActionRemovePoolFees';
const PayFeesModal = (props: any) => {
  //Token Amont = Valeur formulaire
  //BigAmount = Valeur VRAI
  const [agreement, setAgreement] = useState(false);

  if (!props.showFees) {
    return null;
  }
  const handleChange = () => {
    setAgreement(!agreement);
  };

  return (
    <div className='modal' onClick={props.onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <h4 className='modal-title'>
            Pays to remove fees on deposit of the pool
          </h4>
        </div>
        <div className='modal-body'>
          <h3>/!\ Payment is final /!\</h3>
          <br />
          <br /> Tokens will be sent to the main pool with no witdrawal option
          <br />
          <br />
          After payment, the pool <u>(1)[{props.stakedToken}]</u>:
          <u>(2)[{props.rewardedToken}]</u> deposit fees will be set to zero
          <br />
          <br />
          Owner of the contract (we) can adjust speed of the pool.
        </div>
        <ActionRemovePoolFees
          stakedToken={props.stakedToken}
          rewardedToken={props.rewardedToken}
          agreement={agreement}
        />{' '}
        <label>
          <input checked={agreement} onChange={handleChange} type='checkbox' />{' '}
          I understand that payment is final and i want to set 0% fee deposit
          for the pool [{props.stakedToken}][{props.rewardedToken}]
        </label>
        <div className='modal-footer'>
          <button onClick={props.onClose} className='button'>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayFeesModal;
