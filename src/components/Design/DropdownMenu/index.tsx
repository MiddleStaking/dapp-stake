import React, { FC, useEffect, useRef, useState } from 'react';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWindowDimensions } from 'components/DimensionScreen';
import Options from './components';

interface DropdownMenuProps {
  options: {
    text: string;
    value: any;
  }[];
  onSelect: (value: any) => void;
  value?: any;
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
  BoxShadowColor?: string;
  placeholderColor?: string;
  textColorOption?: string;
  widthSvg?: string;
  heightSvg?: string;
  colorSvg?: string;
  OptonsCrollHeight?: string;
  disableOption?: boolean;
  borderColorMobile?: string;
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

  BoxShadowActive = false,
  BoxShadowActiveColor = 'inset 0px 0px 44px rgba(142, 68, 235, 0.5)',
  BoxShadowColor = 'inset 0px 0px 44px rgba(142, 68, 235, 0.5)',

  borderGradientDirection = 'to right',
  borderWidth = '1px',

  // grayscale = '0%',

  // animationDelay = 3,
  value = '', //TODO K : why ?
  // width = '150px',  //TODO K : why ?
  height = '40px',
  fontSize = '14px',
  fontFamily = '',
  background = '#000000',

  gradientDirection = 'to right',
  inputHeight = '50px',
  inputWidth = '100%',
  BorderActiveColor = '#2266FF',
  borderRadiusOptions = '5',
  hasBorderActive = true,

  textColorOption = '#FFFFFF',
  widthSvg = '16px',
  heightSvg = '16px',

  disabled = false,

  borderColorMobile = 'red',

  borderRadius = disabled ? '25' : '25',
  hasBorder = disabled ? true : false,
  borderColor = disabled ? '#695885' : 'transparent',
  textColor = disabled ? '#695885' : '#FFFFFF',
  colorSvg = disabled ? '#695885' : '#fff',
  OptonsCrollHeight = '300px',

  disableOption = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedValue, setSelectedValue] = useState(
  //   defaultOption ? defaultOption.value : null
  // );
  const [searchValue, setSearchValue] = useState('');
  const { width } = useWindowDimensions();
  const [displayText, setDisplayText] = useState(
    defaultValue ? defaultValue : 'Select an option'
  );

  const [isReadonly, setIsReadonly] = useState(false);

  const [BorderType, setBorderType] = useState(
    Array.isArray(borderColor)
      ? `linear-gradient(${borderGradientDirection}, ${borderColor[0]}, ${borderColor[1]})`
      : borderColor
  );

  useEffect(() => {
    if (value !== '') {
      // setSearchValue(value);
    }
    setDisplayText(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (value !== '') {
      setSearchValue(value);
    }
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

  useEffect(() => {
    if (!isOpen) {
      setSearchValue('');
      inputRef.current.blur();
    }
  }, [isOpen]);

  const [uniqueId] = useState(generateUniqueId());
  const dropDownMenuClassName = `dropDownInput-${uniqueId}`;

  const handleOptionClick = (val: any) => {
    onSelect(val);
    // setSelectedValue(value);
    const foundOption = options.find((option) => option.value === val);
    setDisplayText(foundOption ? foundOption.text : 'Select an option');
    setSearchValue('');
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
    gap: '5px',
    color: textColor,
    height: inputHeight,
    width: inputWidth,
    ...backgroundStyle,
    ...borderStyle,

    // filter: `grayscale(${grayscale})`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    boxShadow: BoxShadowActive && isOpen ? BoxShadowActiveColor : BoxShadowColor
  };

  const DropDownSvgStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  };
  const customPlaceholderStyles = `
    .${dropDownMenuClassName}::placeholder {
      color: ${textColor};
    }
  `;
  const inputRef: any = useRef();
  const dropDownBarRef: any = useRef(null);

  const handleClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
    inputRef.current.focus();
  };

  const dropdownRef: any = useRef(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isOpen]);

  const isFirstRender = useRef(true); // Crée une ref pour suivre le premier rendu

  useEffect(() => {
    if (isFirstRender.current) {
      // Si c'est le premier rendu, ne faites rien et mettez à jour le drapeau isFirstRender pour les rendus futurs
      isFirstRender.current = false;
      return;
    }

    // Si ce n'est pas le premier rendu, et si isReadonly est false, alors définissez le focus
    if (!isReadonly && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isReadonly]);

  const handleIconClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isOpen) {
      setIsOpen(true);
    }

    setIsReadonly((prev) => !prev);
  };

  return (
    <div style={containerStyle} ref={dropdownRef}>
      {placeholderColor && <style>{customPlaceholderStyles}</style>}
      <div onClick={handleClick} style={dropDownBarStyle} ref={dropDownBarRef}>
        {width < 768 && (
          <div style={{}} onClick={handleIconClick}>
            <FontAwesomeIcon icon={faKeyboard} />
          </div>
        )}
        <div>
          {textColor && <style>{customPlaceholderStyles}</style>}
          <input
            ref={inputRef}
            type='text'
            className={dropDownMenuClassName}
            placeholder={displayText}
            disabled={disabled}
            // defaultValue={displayText}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            style={{
              flexGrow: 1,
              // width: `calc(${inputWidth} - 10px)`,
              width: '100%',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize,
              fontFamily,
              color: textColor,
              cursor: disabled ? 'not-allowed' : 'pointer'
            }}
            readOnly={isReadonly}
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
        <div
          style={{
            marginTop: '10px',
            position: 'absolute',
            overflow: 'auto',
            maxHeight: OptonsCrollHeight,
            borderRadius: `${borderRadiusOptions}`,
            border: width > 450 ? 'none' : `1px solid ${borderColorMobile}`,
            background: 'transparent',
            zIndex: 10
          }}
        >
          {(() => {
            const filteredOptions = options.filter((option) =>
              option.text.toLowerCase().includes(searchValue.toLowerCase())
            );

            if (filteredOptions.length === 0) {
              return (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Options
                    disable={disableOption}
                    textColor={textColorOption}
                    width={inputWidth}
                    height={height}
                    hoverActive={true}
                    hoverTextColor={textColorSelect}
                    hoverBackgroudColor={backgroundColorSelect}
                    backgroudColor={backgroundColor}
                    text={'no token found'}
                    borderRadius={`${borderRadiusOptions}px`}
                  />
                </div>
              );
            }
            return filteredOptions.map((option, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'transparent'
                }}
              >
                <Options
                  disable={disableOption}
                  textColor={textColorOption}
                  width={inputWidth}
                  height={height}
                  hoverActive={true}
                  hoverTextColor={textColorSelect}
                  hoverBackgroudColor={backgroundColorSelect}
                  backgroudColor={backgroundColor}
                  key={index}
                  text={option.text}
                  onClick={() => handleOptionClick(option.value)}
                  borderRadius={
                    index === filteredOptions.length - 1
                      ? `0 0 ${borderRadiusOptions} ${borderRadiusOptions}`
                      : index === 0
                      ? `${borderRadiusOptions} ${borderRadiusOptions} 0 0`
                      : 'none'
                  }
                />
              </div>
            ));
          })()}
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
