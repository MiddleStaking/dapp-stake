import React, { FC } from 'react';
import ButtonGroupe from './Component/Button/ButtonGroupe';
import CheckedBoxGroupe from './Component/CheckBox/CheckedBoxGroupe';
import InputGroupe from './Component/Input/InputGroupe';
import LogosGroupe from './Component/Logos/LogosGroupe';
import OptionGroupe from './Component/Option/OptionGroupe';
import SearchBarGroupe from './Component/SearchBar/SearchBarGroupe';
import ToggleSwitchGroupe from './Component/ToggleSwitch/ToggleSwitchGroupe';
import './gallery.scss';

const Design: FC = () => {
  return (
    <div>
      {/* <CardPresentation height='150px' width='1200' label='header'>
        <HeaderDekstop />
      </CardPresentation> */}

      <div className='grid-container'>
        <InputGroupe />
        <ButtonGroupe />
        <ToggleSwitchGroupe />
        <CheckedBoxGroupe />
        <LogosGroupe />
        <SearchBarGroupe />
        <OptionGroupe />
      </div>
      {/* <CardPresentation height='150px' width='1200' label='Footer'>
        <FooterDekstop />
      </CardPresentation> */}
    </div>
  );
};

export default Design;
