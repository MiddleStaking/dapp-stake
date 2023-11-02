import React from 'react';
import './Logo.scss'; // assurez-vous que ce fichier existe et est dans le bon répertoire
import { ReactComponent as MiddleLogo } from './img/ms.svg';
const LogoTextMobile = () => {
  return (
    <div className='logo-container'>
      <div className='logo-mobile'>
        <MiddleLogo style={{ height: '50px' }} />
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
