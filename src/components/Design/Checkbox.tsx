import React, { FC, CSSProperties, MouseEventHandler } from 'react';

interface ToggleSwitchProps {
  label?: string;
  checked?: boolean;
  onClick?: MouseEventHandler;
  disabled?: boolean;
  gradientDirection?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  borderColor?: string | [string, string];
  borderWidth?: string | number;
  hasBorder?: boolean;
  backgroundCheked?: string;
  background?: string;
  grayscale?: string;
  colorSvg?: string;
}

export const CheckBox: FC<ToggleSwitchProps> = ({
  label = '',
  borderWidth = '1px',
  checked = false,
  onClick,
  disabled = false,
  gradientDirection = 'to right',
  width = 20,
  height = 20,
  borderRadius = 3,
  borderColor = '#fff',
  hasBorder = true,
  background = 'linear-gradient(156.86deg, rgba(189, 55, 236, 0.26) 12.97%, rgba(31, 103, 255, 0) 71.91%), rgba(99, 74, 203, 0.32)',
  backgroundCheked = 'linear-gradient(90deg, #BD37EC 0%, #1F67FF 100%)',
  grayscale = '60%',
  colorSvg = 'white'
}) => {
  const isGradient = (
    value: string | [string, string]
  ): value is [string, string] => {
    return Array.isArray(value);
  };

  const containerStyle: CSSProperties = {
    display: 'flex',
    filter: disabled ? `grayscale(${grayscale})` : 'none',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    cursor: 'pointer',
    border: hasBorder ? `solid ${borderWidth}` : 'none',
    borderRadius: borderRadius,
    background: checked ? backgroundCheked : background,
    borderColor: disabled
      ? 'grey'
      : hasBorder
      ? isGradient(borderColor)
        ? `linear-gradient(${gradientDirection}, ${borderColor[0]}, ${borderColor[1]})`
        : borderColor
      : 'none',
    marginRight: '3px'
  };

  const handleClick = (event: React.MouseEvent) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer', display: 'flex' }}>
      <div style={containerStyle}>
        {checked && <CheckedSvg colorSvg={disabled ? 'grey' : colorSvg} />}
      </div>
      {label && label}
    </div>
  );
};

interface CheckedSvgProps {
  widthSvg?: string;
  heightSvg?: string;
  colorSvg?: string;
}

const CheckedSvg: FC<CheckedSvgProps> = ({
  widthSvg = '13.37px',
  heightSvg = '10.04px',
  colorSvg = 'white'
}) => {
  return (
    <svg
      width={widthSvg}
      height={heightSvg}
      viewBox='0 0 14 11'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.21674 10.9999C5.10247 10.9996 4.98951 10.9757 4.88486 10.9298C4.7802 10.8839 4.6861 10.817 4.60841 10.7333L0.558405 6.42493C0.40701 6.26359 0.325909 6.04871 0.332942 5.82758C0.339974 5.60644 0.434565 5.39715 0.595905 5.24576C0.757245 5.09436 0.972118 5.01326 1.19325 5.0203C1.41439 5.02733 1.62368 5.12192 1.77507 5.28326L5.20841 8.94159L12.2167 1.27493C12.2879 1.18636 12.3763 1.11327 12.4767 1.06014C12.5771 1.00702 12.6873 0.974978 12.8006 0.965991C12.9138 0.957004 13.0277 0.971261 13.1352 1.00788C13.2427 1.04451 13.3416 1.10273 13.4258 1.17896C13.51 1.2552 13.5777 1.34785 13.6248 1.45121C13.6719 1.55458 13.6974 1.66648 13.6997 1.78004C13.7019 1.89361 13.681 2.00644 13.638 2.1116C13.5951 2.21677 13.5312 2.31205 13.4501 2.39159L5.83341 10.7249C5.75644 10.8102 5.66267 10.8787 5.55798 10.926C5.45329 10.9733 5.33995 10.9985 5.22507 10.9999H5.21674Z'
        fill={colorSvg}
      />
    </svg>
  );
};
