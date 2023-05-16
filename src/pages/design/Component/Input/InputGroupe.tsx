import React, { FC, CSSProperties } from 'react';
import CardPresentation from '../CardPresentation';
import DropdownMenu from './DropdownMenu';

const InputGroupe: FC = () => {
  const firstSwitchMargin: CSSProperties = {
    display: 'flex',
    marginBottom: '1px',
    marginTop: '1pxx',
    maxHeight: '50px',
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
    <CardPresentation label='Input'>
      <div style={firstSwitchMargin}>
        <DropdownMenu
          borderRadius={'25'}
          defaultValue={'option6'}
          options={options}
          onSelect={handleSelect}
          animationDelay={3}
          borderRadiusOptions={'4'}
        />
      </div>
      <div style={firstSwitchMargin}>
        <DropdownMenu
          borderRadius={'25'}
          defaultValue={'option6'}
          options={options}
          onSelect={handleSelect}
          animationDelay={3}
          borderRadiusOptions={'10'}
          hasBorder={true}
          borderColor={'#BD37EC'}
          textColorOption={'red'}
          textColor={'#695885'}
          // textColor={'blue'}
        />
      </div>

      <div style={firstSwitchMargin}>
        <DropdownMenu
          // borderRadius={'1'}
          defaultValue={'option1'}
          hasBorder={true}
          borderColor={'#695885'}
          options={options}
          onSelect={handleSelect}
          disabled={true}
        />
      </div>
    </CardPresentation>
  );
};

export default InputGroupe;
