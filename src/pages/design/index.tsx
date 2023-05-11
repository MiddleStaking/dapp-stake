import React, { FC, CSSProperties } from 'react';
import ButtonGroupe from './Component/Button/ButtonGroupe';
import ToggleSwitchGroupe from './Component/ToggleSwitch/ToggleSwitchGroupe';
import CheckedBoxGroupe from './Component/CheckBox/CheckedBoxGroupe';

const Design: FC = () => {
  const ButtonGroupeStyle: CSSProperties = {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh', // Utiliser 100% de la hauteur de la fenêtre
    boxSizing: 'border-box', // Inclure le padding et la bordure dans le calcul de la hauteur totale
    margin: 0, // Supprimer les marges par défaut du navigateur
    padding: 0 // Supprimer les espaces de remplissage par défaut du navigateur
  };

  return (
    <div style={ButtonGroupeStyle}>
      <ButtonGroupe />
      <ToggleSwitchGroupe />
      <CheckedBoxGroupe />
    </div>
  );
};

export default Design;
