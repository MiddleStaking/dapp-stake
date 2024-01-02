import React from 'react';
import './Logo.scss';
import logoMs from './img/ms.svg';

const LogoTextMobile = () => {
  return (
    <div className='logo-container'>
      <div className='logo-mobile'>
        <img src={logoMs} style={{ height: '50px' }} />
      </div>
      <div className='text-mobile'>
        Middle
        <br />
        Staking
      </div>
    </div>
  );
};

export default LogoTextMobile;
