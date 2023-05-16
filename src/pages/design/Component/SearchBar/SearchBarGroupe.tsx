import React, { FC, CSSProperties, useState } from 'react';
import SearchBar from '.';
import CardPresentation from '../CardPresentation';

const SearchBarGroupe: FC = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const firstSwitchMargin: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
    marginTop: '10px',
    flexDirection: 'row',
    gap: '10px'
  };

  return (
    <CardPresentation label='SearchBar' width='100%'>
      <div style={firstSwitchMargin}>
        <SearchBar
          onInputChange={handleInputChange}
          hasBorder={false}
          BoxShadowActive={false}
          placeholder={'search pool'}
        />
      </div>
      <div style={firstSwitchMargin}>
        <SearchBar placeholder={'search pool'} />
      </div>
      <div style={firstSwitchMargin}>
        <SearchBar
          placeholder={'search pool'}
          hasBorder={true}
          borderColor={'#695885'}
          textColor={'#695885'}
          BorderActiveColor={'purple'}
          BoxShadowActiveColor={'10px 5px 5px red'}
          background='red'
          colorSvg='black'
          borderRadius={10}
          placeholderColor={'orange'}
          value={inputValue}
        />
      </div>
      <div style={firstSwitchMargin}>
        <SearchBar placeholder={'search pool'} disabled={true} />
      </div>
    </CardPresentation>
  );
};

export default SearchBarGroupe;
