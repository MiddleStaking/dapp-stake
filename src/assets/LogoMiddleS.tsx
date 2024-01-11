import React from 'react';
import './Logo.scss';
import logoMs from './img/ms.svg';

const LogoText = () => {
  return (
    <div className='logo-container'>
      <div className='logo'>
        <img src={logoMs} alt="Middle Logo" style={{ height: '73px', width: '100%' }} />
      </div>
      <div className='text'>
        Middle
        <br />
        Staking
      </div>
    </div>
  );
};

export default LogoText;
