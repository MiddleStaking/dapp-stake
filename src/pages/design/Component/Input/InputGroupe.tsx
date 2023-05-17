import React, { FC, CSSProperties, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { defaultToken } from 'config';
import Button from '../Button';
import CardPresentation from '../CardPresentation';
// import ToggleSwitch from '../ToggleSwitch';
import DropdownMenu from './DropdownMenu';
import Input from './Input';

const InputGroupe: FC = () => {
  const firstSwitchMargin: CSSProperties = {
    display: 'flex',
    marginBottom: '1px',
    marginTop: '10px',
    maxHeight: '50px',
    flexDirection: 'row',
    gap: '10px'
  };
  const [inputValue, setInputValue] = useState('0');
  const [inputValue2, setInputValue2] = useState('');

  const handleSelect = (value: any) => {
    console.log('Selected option:', value);
  };

  const handleMaxClick = () => {
    setInputValue('100');
  };
  const options = [
    { text: 'Option 1', value: 'option1' },
    { text: 'Option 2', value: 'option2' },
    { text: 'Option 3', value: 'option3' },
    { text: 'Option 4', value: 'option4' },
    { text: 'Option 5', value: 'option5' },
    { text: 'Option 6', value: 'option6' },
    { text: 'Option 7', value: 'option7' },
    { text: 'Option 8', value: 'option8' },
    { text: 'Option 2', value: 'option2' },
    { text: 'Option 3', value: 'option3' },
    { text: 'Option 4', value: 'option4' },
    { text: 'Option 5', value: 'option5' },
    { text: 'Option 6', value: 'option6' },
    { text: 'Option 7', value: 'option7' },
    { text: 'Option 1', value: 'option1' },
    { text: 'Option 2', value: 'option2' },
    { text: 'Option 3', value: 'option3' },
    { text: 'Option 4', value: 'option4' },
    { text: 'Option 5', value: 'option5' },
    { text: 'Option 6', value: 'option6' },
    { text: 'Option 7', value: 'option7' },
    { text: 'Option 1', value: 'option1' },
    { text: 'Option 2', value: 'option2' },
    { text: 'Option 3', value: 'option3' },
    { text: 'Option 4', value: 'option4' },
    { text: 'Option 5', value: 'option5' },
    { text: 'Option 6', value: 'option6' },
    { text: 'Option 7', value: 'option7' },
    { text: 'Option 5', value: 'option5' },
    { text: 'Option 6', value: 'option6' },
    { text: 'Option 7', value: 'option7' },
    { text: 'Option 1', value: 'option1' },
    { text: 'Option 2', value: 'option2' },
    { text: 'Option 3', value: 'option3' },
    { text: 'Option 4', value: 'option4' },
    { text: 'Option 5', value: 'option5' },
    { text: 'Option 6', value: 'option6' },
    { text: 'Option 7', value: 'option7' },
    { text: 'Option 1', value: 'option1' },
    { text: 'Option 2', value: 'option2' },
    { text: 'Option 3', value: 'option3' },
    { text: 'Option 4', value: 'option4' },
    { text: 'Option 5', value: 'option5' },
    { text: 'Option 6', value: 'option6' },
    { text: 'Option 7', value: 'option7' },
    { text: 'Option 1', value: 'option1' },
    { text: 'Option 2', value: 'option2' },
    { text: 'Option 3', value: 'option3' },
    { text: 'Option 4', value: 'option4' },
    { text: 'Option 5', value: 'option5' },
    { text: 'Option 6', value: 'option6' },
    { text: 'Option 7', value: 'option7' },
    { text: 'Option 5', value: 'option5' },
    { text: 'Option 6', value: 'option6' },
    { text: 'Option 7', value: 'option7' },
    { text: 'Option 1', value: 'option1' },
    { text: 'Option 2', value: 'option2' },
    { text: 'Option 3', value: 'option3' },
    { text: 'Option 4', value: 'option4' },
    { text: 'Option 5', value: 'option5' },
    { text: 'Option 6', value: 'option6' },
    { text: 'Option 7', value: 'option7' },
    { text: 'Option 1', value: 'option1' },
    { text: 'Option 2', value: 'option2' },
    { text: 'Option 3', value: 'option3' },
    { text: 'Option 4', value: 'option4' },
    { text: 'Option 5', value: 'option5' },
    { text: 'Option 6', value: 'option6' },
    { text: 'Option 7', value: 'option7' },
    { text: 'Option 1', value: 'option1' },
    { text: 'Option 2', value: 'option2' },
    { text: 'Option 3', value: 'option3' },
    { text: 'Option 4', value: 'option4' },
    { text: 'Option 5', value: 'option5' },
    { text: 'Option 6', value: 'option6' },
    { text: 'Option 7', value: 'option7' }
  ];
  const handleInputChange = (value: string) => {
    console.log(value);
    setInputValue(value);
  };

  const path = useLocation().pathname;
  const firstSegment = path.split('/')[2];

  const handleInputChange2 = (value: string) => {
    console.log(value);
    setInputValue2(value);
  };
  return (
    <CardPresentation label='Input'>
      <div style={firstSwitchMargin}>
        <DropdownMenu
          defaultValue={
            firstSegment === undefined ? defaultToken : firstSegment
          }
          borderRadius={'25'}
          borderRadiusOptions={'10'}
          options={options}
          onSelect={handleSelect}
          animationDelay={3}
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
          OptonsCrollHeight={'500px'}
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
      {/* <div style={firstSwitchMargin}>
        <ToggleSwitch
          id='switch-19'
          trackColor={['#BD37EC', '#1F67FF']}
          thumbColor='white'
          checked={true}
        />
      </div> */}
      <div style={firstSwitchMargin}>
        <Input
          LeftHtml={
            <Button
              textColor='#1F67FF'
              buttonWidth={'30px'}
              buttonHeight={'30px'}
              hasBorder={false}
              borderRadius={40}
              background={'transparent'}
              fontSize='14px'
              text='LEFT'
              onClick={() => console.log('Bouton cliqué')}
            />
          }
          type='text'
          placeholder={'text'}
          value={inputValue2}
          onInputChange={handleInputChange2}
        />
      </div>
      <div style={firstSwitchMargin}>
        <Input
          value={inputValue}
          onInputChange={handleInputChange}
          rightHtml={
            <Button
              textColor='#1F67FF'
              buttonWidth={'30px'}
              buttonHeight={'30px'}
              hasBorder={false}
              borderRadius={40}
              background={'transparent'}
              fontSize='14px'
              text='MAX'
              onClick={handleMaxClick}
            />
          }
          type='number'
          placeholder={'number'}
          fontSize={14}
        />
      </div>
      <div style={firstSwitchMargin}>
        <Input value={''} disabled={true} type='text' placeholder={'text'} />
      </div>
    </CardPresentation>
  );
};

export default InputGroupe;

//styleName: Text/12px/Semibold;
// font-family: Plus Jakarta Sans;
// font-size: 12px;
// font-weight: 600;
// line-height: 15px;
// letter-spacing: 0em;
// text-align: right;
