import React, { FC, CSSProperties, useState } from 'react';
import CardPresentation from '../CardPresentation';
import DropdownMenu from '.';

const OptionGroupe: FC = () => {
  const firstSwitchMargin: CSSProperties = {
    display: 'flex',
    marginBottom: '10px',
    marginTop: '10px',
    height: '100px',
    flexDirection: 'row',
    gap: '10px'
  };

  const handleSelect = (value: any) => {
    console.log('Selected option:', value);
  };
  const options = [
    { text: 'Option 1', value: 'option1' },
    { text: 'Option 2', value: 'option2' },
    { text: 'Option 3', value: 'option3' },
    { text: 'Option 4', value: 'option4' },
    { text: 'Option 5', value: 'option5' },
    { text: 'Option 6', value: 'option6' },
    { text: 'Option 7', value: 'option7' }
  ];

  return (
    <CardPresentation label='Options'>
      <div style={firstSwitchMargin}>
        <DropdownMenu
          borderRadius={'5'}
          defaultValue={options[1].value}
          options={options}
          onSelect={handleSelect}
          animationDelay={3}
        />
      </div>
    </CardPresentation>
  );
};

export default OptionGroupe;
