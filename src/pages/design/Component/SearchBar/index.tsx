import React, { FC, CSSProperties, useState, useEffect } from 'react';

interface SearchBarProps {
  placeholder?: string;
  fontSize?: number;
  fontFamily?: string;
  textColor?: string;
  background?: string | [string, string];
  gradientDirection?: string;
  inputHeight?: string;
  inputWidth?: string;

  BoxShadowActive?: boolean;
  BoxShadowActiveColor?: string;

  hasBorderActive?: boolean;
  BorderActiveColor?: string;
  hasBorder?: boolean;

  borderGradientDirection?: string;
  borderColor?: string;
  borderWidth?: string | number;
  borderRadius?: number;

  disabled?: boolean;
  grayscale?: string;

  widthSvg?: string;
  heightSvg?: string;
  colorSvg?: string;

  value?: string;
  placeholderColor?: string;

  onInputChange?: (value: string) => void;
}

const generateUniqueId = () => {
  return `search-bar-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

const SearchBar: FC<SearchBarProps> = ({
  placeholderColor = '#FFFFFF',
  placeholder = '',
  BoxShadowActive = true,
  BoxShadowActiveColor = 'inset 0px 0px 44px rgba(142, 68, 235, 0.5)',
  textColor = '#fff',
  background = '#000000',
  gradientDirection = 'to right',
  inputHeight = '50px',
  inputWidth = '100%',
  hasBorder = true,
  borderGradientDirection = 'to right',
  borderColor = 'transparent',
  borderWidth = '1px',
  borderRadius = 25,
  disabled = false,
  grayscale = '0%',
  widthSvg = '16px',
  heightSvg = '16px',
  colorSvg = '#fff',
  fontSize = '14px',
  fontFamily = 'Plus Jakarta Sans',
  onInputChange,
  hasBorderActive = true,
  BorderActiveColor = '#2266FF',
  value = ''
}) => {
  const [inputFocused, setInputFocused] = useState(false);
  const [uniqueId] = useState(generateUniqueId());
  const searchBarClassName = `searchBarInput-${uniqueId}`;
  const [BorderType, setBorderType] = useState(
    Array.isArray(borderColor)
      ? `linear-gradient(${borderGradientDirection}, ${borderColor[0]}, ${borderColor[1]})`
      : borderColor
  );

  useEffect(() => {
    if (hasBorderActive && inputFocused) {
      setBorderType(BorderActiveColor);
    } else if (Array.isArray(borderColor)) {
      return setBorderType(
        `linear-gradient(${borderGradientDirection}, ${borderColor[0]}, ${borderColor[1]})`
      );
    } else {
      return setBorderType(borderColor);
    }
  }, [inputFocused]);

  const backgroundStyle: CSSProperties = {
    background: Array.isArray(background)
      ? `linear-gradient(${gradientDirection}, ${background[0]}, ${background[1]})`
      : background
  };
  const borderStyle: CSSProperties = hasBorder
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
  const searchBarStyle: CSSProperties = {
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

    filter: `grayscale(${grayscale})`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    boxShadow: BoxShadowActive && inputFocused ? BoxShadowActiveColor : 'none'
  };

  const SearchBarSvgStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
  const customPlaceholderStyles = `
    .${searchBarClassName}::placeholder {
      color: ${placeholderColor};
    }
  `;
  return (
    <div style={searchBarStyle}>
      <div style={SearchBarSvgStyle}>
        <SearchBarSvg
          widthSvg={widthSvg}
          heightSvg={heightSvg}
          colorSvg={colorSvg}
        />
      </div>
      <div>
        {placeholderColor && <style>{customPlaceholderStyles}</style>}

        <input
          type='text'
          className={searchBarClassName}
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={value}
          style={{
            flexGrow: 1,
            width: '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize,
            fontFamily,
            color: textColor,
            cursor: disabled ? 'not-allowed' : 'auto'
          }}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          onChange={(e) => onInputChange && onInputChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;

interface SearchBarSvgProps {
  widthSvg?: string;
  heightSvg?: string;
  colorSvg?: string;
}

const SearchBarSvg: FC<SearchBarSvgProps> = ({
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
        d='M14.2716 13.1684L11.3313 10.2281C12.0391 9.28574 12.4213 8.13865 12.42 6.96C12.42 3.94938 9.97063 1.5 6.96 1.5C3.94938 1.5 1.5 3.94938 1.5 6.96C1.5 9.97063 3.94938 12.42 6.96 12.42C8.13865 12.4213 9.28574 12.0391 10.2281 11.3313L13.1684 14.2716C13.3173 14.4046 13.5114 14.4756 13.711 14.47C13.9105 14.4645 14.1004 14.3827 14.2415 14.2415C14.3827 14.1004 14.4645 13.9105 14.47 13.711C14.4756 13.5114 14.4046 13.3173 14.2716 13.1684ZM3.06 6.96C3.06 6.18865 3.28873 5.43463 3.71727 4.79328C4.14581 4.15192 4.7549 3.65205 5.46754 3.35687C6.18017 3.06169 6.96433 2.98446 7.72085 3.13494C8.47738 3.28542 9.17229 3.65686 9.71772 4.20228C10.2631 4.74771 10.6346 5.44262 10.7851 6.19915C10.9355 6.95567 10.8583 7.73983 10.5631 8.45247C10.268 9.1651 9.76808 9.77419 9.12673 10.2027C8.48537 10.6313 7.73135 10.86 6.96 10.86C5.92604 10.8588 4.93478 10.4475 4.20365 9.71635C3.47253 8.98522 3.06124 7.99396 3.06 6.96Z'
        fill={colorSvg}
      />
    </svg>
  );
};
