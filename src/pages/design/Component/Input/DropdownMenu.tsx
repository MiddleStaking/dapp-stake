import React, { FC, useEffect, useState } from 'react';
import Options from './components/Options';

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
  animationDelay?: number;
  width?: string;
  height?: string;
  fontSize?: string;
  fontFamily?: string;
  gradientDirection?: string;
  inputHeight?: string;
  inputWidth?: string;
  hasBorder?: boolean;
  background?: string | [string, string];
  borderGradientDirection?: string;
  borderRadiusOptions?: string;
  borderColor?: string;
  borderWidth?: string | number;
  borderRadius?: string;
  hasBorderActive?: boolean;
  BorderActiveColor?: string;
  disabled?: boolean;
  grayscale?: string;
  BoxShadowActive?: boolean;
  BoxShadowActiveColor?: string;
  placeholderColor?: string;
  textColorOption?: string;
  widthSvg?: string;
  heightSvg?: string;
  colorSvg?: string;
}

const generateUniqueId = () => {
  return `drop-down-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

const DropdownMenu: FC<DropdownMenuProps> = ({
  placeholderColor = '#FFFFFF',
  options,
  onSelect,
  defaultValue,
  backgroundColorSelect = 'rgba(99, 74, 203, 0.32)',
  backgroundColor = '#220C3E',
  textColorSelect = '#2266FF',

  BoxShadowActive = true,
  BoxShadowActiveColor = 'inset 0px 0px 44px rgba(142, 68, 235, 0.5)',

  borderGradientDirection = 'to right',
  borderWidth = '1px',

  // grayscale = '0%',

  animationDelay = 3,
  width = '150px',
  height = '40px',
  fontSize = '14px',
  fontFamily = 'Plus Jakarta Sans',
  background = '#000000',

  gradientDirection = 'to right',
  inputHeight = '50px',
  inputWidth = '100%',
  BorderActiveColor = '#2266FF',
  borderRadiusOptions = '4',
  hasBorderActive = true,

  textColorOption = '#FFFFFF',
  widthSvg = '16px',
  heightSvg = '16px',

  disabled = false,

  borderRadius = disabled ? '25' : '25',
  hasBorder = disabled ? true : false,
  borderColor = disabled ? '#695885' : 'transparent',
  textColor = disabled ? '#695885' : '#FFFFFF',
  colorSvg = disabled ? '#695885' : '#fff'
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

  const [BorderType, setBorderType] = useState(
    Array.isArray(borderColor)
      ? `linear-gradient(${borderGradientDirection}, ${borderColor[0]}, ${borderColor[1]})`
      : borderColor
  );

  useEffect(() => {
    if (hasBorderActive && isOpen) {
      setBorderType(BorderActiveColor);
    } else if (Array.isArray(borderColor)) {
      return setBorderType(
        `linear-gradient(${borderGradientDirection}, ${borderColor[0]}, ${borderColor[1]})`
      );
    } else {
      return setBorderType(borderColor);
    }
  }, [isOpen]);

  const [uniqueId] = useState(generateUniqueId());
  const dropDownMenuClassName = `dropDownInput-${uniqueId}`;

  const handleOptionClick = (value: any) => {
    onSelect(value);
    setSelectedValue(value);
    const foundOption = options.find((option) => option.value === value);
    setDisplayText(foundOption ? foundOption.text : 'Select an option');
    setIsOpen(false);
  };

  const containerStyle: React.CSSProperties = {
    // position: 'relative'
  };

  const backgroundStyle: React.CSSProperties = {
    background: Array.isArray(background)
      ? `linear-gradient(${gradientDirection}, ${background[0]}, ${background[1]})`
      : background
  };
  const borderStyle: React.CSSProperties = hasBorder
    ? {
        borderWidth:
          typeof borderWidth === 'number' ? `${borderWidth}px` : borderWidth,
        borderColor: BorderType,
        borderRadius: `${borderRadius}px`,
        borderStyle: 'solid'
      }
    : {
        borderRadius: `${borderRadius}px`
      };
  const dropDownBarStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 10px',
    fontFamily,
    fontSize,
    color: textColor,
    height: inputHeight,
    width: inputWidth,
    ...backgroundStyle,
    ...borderStyle,

    // filter: `grayscale(${grayscale})`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    boxShadow: BoxShadowActive && isOpen ? BoxShadowActiveColor : 'none'
  };

  const DropDownSvgStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
  const customPlaceholderStyles = `
    .${dropDownMenuClassName}::placeholder {
      color: ${textColor};
    }
  `;

  const handleClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div style={containerStyle}>
      {placeholderColor && <style>{customPlaceholderStyles}</style>}
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

      {/* <Options
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
      /> */}

      <div onClick={handleClick} style={dropDownBarStyle}>
        <div>
          {textColor && <style>{customPlaceholderStyles}</style>}
          <input
            type='text'
            className={dropDownMenuClassName}
            placeholder={displayText}
            disabled={true}
            defaultValue={displayText}
            value={displayText}
            style={{
              flexGrow: 1,
              width: '100%',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize,
              fontFamily,
              color: textColor,
              cursor: disabled ? 'not-allowed' : 'pointer'
            }}
            // onChange={(e) => onInputChange && onInputChange(e.target.value)}
          />
        </div>
        <div style={DropDownSvgStyle}>
          {isOpen ? (
            <DropDownSvg
              widthSvg={widthSvg}
              heightSvg={heightSvg}
              colorSvg={colorSvg}
            />
          ) : (
            <DropDownReversSvg
              widthSvg={widthSvg}
              heightSvg={heightSvg}
              colorSvg={colorSvg}
            />
          )}
        </div>
      </div>

      {isOpen && (
        <div style={{ marginTop: '10px' }}>
          {options
            .filter((option) => option.value !== selectedValue)
            .map((option, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  className='option-item'
                >
                  <Options
                    textColor={textColorOption}
                    width={width}
                    height={height}
                    // textColor={textColor}
                    hoverActive={true}
                    hoverTextColor={textColorSelect}
                    hoverBackgroudColor={backgroundColorSelect}
                    backgroudColor={backgroundColor}
                    key={index}
                    text={option.text}
                    onClick={() => handleOptionClick(option.value)}
                    borderRadius={
                      index === options.length - 2
                        ? `0 0 ${borderRadiusOptions}px ${borderRadiusOptions}px`
                        : index === 0
                        ? `${borderRadiusOptions}px ${borderRadiusOptions}px 0 0`
                        : 'none'
                    }
                  />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;

interface DropDownSvgProps {
  widthSvg?: string;
  heightSvg?: string;
  colorSvg?: string;
}

const DropDownReversSvg: FC<DropDownSvgProps> = ({
  widthSvg = '16px',
  heightSvg = '16px',
  colorSvg = 'white'
}) => {
  return (
    <svg
      width={widthSvg}
      height={heightSvg}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M2.96967 5.21967C3.26256 4.92678 3.73744 4.92678 4.03033 5.21967L8 9.18934L11.9697 5.21967C12.2626 4.92678 12.7374 4.92678 13.0303 5.21967C13.3232 5.51256 13.3232 5.98744 13.0303 6.28033L8.53033 10.7803C8.23744 11.0732 7.76256 11.0732 7.46967 10.7803L2.96967 6.28033C2.67678 5.98744 2.67678 5.51256 2.96967 5.21967Z'
        fill={colorSvg}
      />
    </svg>
  );
};

const DropDownSvg: FC<DropDownSvgProps> = ({
  widthSvg = '16px',
  heightSvg = '16px',
  colorSvg = 'white'
}) => {
  return (
    <svg
      width={widthSvg}
      height={heightSvg}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g transform='translate(16, 16) rotate(180)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M2.96967 5.21967C3.26256 4.92678 3.73744 4.92678 4.03033 5.21967L8 9.18934L11.9697 5.21967C12.2626 4.92678 12.7374 4.92678 13.0303 5.21967C13.3232 5.51256 13.3232 5.98744 13.0303 6.28033L8.53033 10.7803C8.23744 11.0732 7.76256 11.0732 7.46967 10.7803L2.96967 6.28033C2.67678 5.98744 2.67678 5.51256 2.96967 5.21967Z'
          fill={colorSvg}
        />
      </g>
    </svg>
  );
};
