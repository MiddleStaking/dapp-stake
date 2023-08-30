import React from 'react';
import './Logo.scss'; // assurez-vous que ce fichier existe et est dans le bon répertoire
import { ReactComponent as MiddleLogo } from './img/ms.svg';
const LogoText = () => {
  return (
    <div className='logo-container'>
      <div className='logo'>
        <MiddleLogo style={{ height: '73px', width: '100%' }} />
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
