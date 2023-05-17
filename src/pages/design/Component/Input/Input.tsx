import React, {
  FC,
  CSSProperties,
  useState,
  useEffect,
  ReactNode
} from 'react';

interface InputProps {
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
  LeftHtml?: ReactNode;
  rightHtml?: ReactNode;
  value: string | number;
  placeholderColor?: string;
  type:
    | 'button'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';

  onInputChange?: (value: string) => void;
}

const generateUniqueId = () => {
  return `search-bar-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

const Input: FC<InputProps> = ({
  type = 'text',
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
  fontSize = '14px',
  fontFamily = 'Plus Jakarta Sans',
  onInputChange,
  hasBorderActive = true,
  BorderActiveColor = '#2266FF',
  value = '',
  LeftHtml = <div />,
  rightHtml = <div />
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

    // filter: `grayscale(${grayscale})`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    boxShadow: BoxShadowActive && inputFocused ? BoxShadowActiveColor : 'none'
  };

  const HtmlLeftSvgStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5px'
  };
  const HtmlRightSvgStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '5px'
  };
  const customPlaceholderStyles = `
    .${searchBarClassName}::placeholder {
      color: ${placeholderColor};
    }
  `;
  return (
    <div style={searchBarStyle}>
      <div style={HtmlLeftSvgStyle}>{LeftHtml}</div>
      <div>
        {placeholderColor && <style>{customPlaceholderStyles}</style>}
        <input
          type={type}
          className={searchBarClassName}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          style={{
            flexGrow: 1,
            width: '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            paddingTop: 0,
            paddingBottom: 0,
            fontFamily,
            color: textColor,
            cursor: disabled ? 'not-allowed' : 'auto',
            fontSize: fontSize
          }}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          onChange={(e) => onInputChange && onInputChange(e.target.value)}
        />
      </div>
      <div style={HtmlRightSvgStyle}>{rightHtml}</div>
    </div>
  );
};

export default Input;
