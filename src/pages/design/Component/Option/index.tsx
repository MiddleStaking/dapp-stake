import React, { FC, useState } from 'react';
import Options from './component/Options';

interface DropdownMenuProps {
  options: {
    text: string;
    value: any;
  }[];
  onSelect: (value: any) => void;
  defaultValue?: any;
  backgroundColorSelect?: string;
  backgroundColor?: string;
  textColor?: string;
  textColorSelect?: string;
  borderRadius?: string;
  animationDelay?: number;
  width?: string;
  height?: string;
  fontSize?: string;
  fontFamily?: string;
}

const DropdownMenu: FC<DropdownMenuProps> = ({
  options,
  onSelect,
  defaultValue,
  backgroundColorSelect = 'rgba(99, 74, 203, 0.32)',
  backgroundColor = '#220C3E',
  textColor = '#FFFFFF',
  textColorSelect = '#2266FF',
  borderRadius = '0',
  animationDelay = 3,
  width = '150px',
  height = '40px',
  fontSize = '14px',
  fontFamily = 'Plus Jakarta Sans'
}) => {
  const defaultOption = defaultValue
    ? options.find((option) => option.value === defaultValue)
    : options[0];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    defaultOption ? defaultOption.value : null
  );

  const [displayText, setDisplayText] = useState(
    defaultOption ? defaultOption.text : 'Select an option'
  );

  const handleOptionClick = (value: any) => {
    onSelect(value);
    setSelectedValue(value);
    const foundOption = options.find((option) => option.value === value);
    setDisplayText(foundOption ? foundOption.text : 'Select an option');
    setIsOpen(false);
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative'
  };

  const dropdownMenuStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: 1000
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
    .option-item {
      animation: fadeIn 0s linear;
      opacity: 0;
      animation-fill-mode: forwards; // Ajoutez cette ligne
    }
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    ${options
      .filter((option) => option.value !== selectedValue)
      .map(
        (_, index) =>
          `.option-item:nth-child(${index + 1}) { animation-delay: ${
            index /
            (options.filter((option) => option.value !== selectedValue).length *
              animationDelay)
          }s; }`
      )
      .join('\n')}
  `}
      </style>

      <Options
        fontSize={fontSize}
        fontFamily={fontFamily}
        width={width}
        height={height}
        backgroudColor={isOpen ? backgroundColorSelect : 'transparent'}
        text={displayText}
        onClick={() => setIsOpen(!isOpen)}
        textColor={isOpen ? textColorSelect : textColor}
        borderRadius={
          isOpen ? `${borderRadius}px ${borderRadius}px  0 0` : borderRadius
        }
      />
      {isOpen && (
        <div>
          {options
            .filter((option) => option.value !== selectedValue)
            .map((option, index) => (
              <div key={index} className='option-item'>
                <Options
                  width={width}
                  height={height}
                  textColor={textColor}
                  backgroudColor={backgroundColor}
                  key={index}
                  text={option.text}
                  onClick={() => handleOptionClick(option.value)}
                  borderRadius={
                    index === options.length - 2
                      ? `0 0 ${borderRadius}px ${borderRadius}px`
                      : undefined
                  }
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
