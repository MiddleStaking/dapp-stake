import React, { FC, CSSProperties } from 'react';
import ButtonGroupe from './Component/Button/ButtonGroupe';
import ToggleSwitchGroupe from './Component/ToggleSwitch/ToggleSwitchGroupe';
import CheckedBoxGroupe from './Component/CheckBox/CheckedBoxGroupe';
import LogosGroupe from './Component/Logos/LogosGroupe';
import SearchBarGroupe from './Component/SearchBar/SearchBarGroupe';
import OptionGroupe from './Component/Option/OptionGroupe';
import InputGroupe from './Component/Input/OptionGroupe';
import HeaderDekstop from './Component/Header.tsx';
import CardPresentation from './Component/CardPresentation';
import './gallery.scss';

const Design: FC = () => {
  return (
    <div>
      <CardPresentation height='150px' width='1200' label='header'>
        <HeaderDekstop />
      </CardPresentation>

      <div className='grid-container'>
        <ButtonGroupe />
        <ToggleSwitchGroupe />
        <CheckedBoxGroupe />
        <LogosGroupe />
        <SearchBarGroupe />
        <OptionGroupe />
        <InputGroupe />
      </div>
    </div>
  );
};

export default Design;
