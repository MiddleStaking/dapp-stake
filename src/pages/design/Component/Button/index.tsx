import React, { FC, CSSProperties, MouseEventHandler } from 'react';

interface ButtonProps {
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  textColor?: string;
  onClick?: MouseEventHandler;
  background?: string | [string, string];
  gradientDirection?: string;
  buttonHeight?: string;
  buttonWidth?: string;
  hasBorder?: boolean;
  borederGradientDirection?: string;
  borderColor?: string | [string, string];
  borderWidth?: string | number;
  borderRadius?: number;
  disabled?: boolean;
  grayscale?: string;
}

const Button: FC<ButtonProps> = ({
  background = 'blue',
  buttonWidth = '120px',
  disabled = false,
  buttonHeight = '39px',
  borderColor = 'black',
  borderWidth = '1px',
  borderRadius = 5,
  fontSize = 14,
  fontFamily = 'Arial',
  textColor = 'white',
  hasBorder = false,
  grayscale = '50%',
  onClick,
  text = 'Texte a difinir',
  gradientDirection = 'to right',
  borederGradientDirection = 'to right'
}) => {
  const isGradient = (
    value: string | [string, string]
  ): value is [string, string] => {
    return Array.isArray(value);
  };

  const buttonStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    filter: disabled ? `grayscale(${grayscale})` : 'none',
    alignItems: 'center',
    background: isGradient(background)
      ? `linear-gradient(${gradientDirection}, ${background[0]}, ${background[1]})`
      : background,
    borderStyle: 'none',
    borderRadius,
    width: '100%',
    height: '100%',
    color: textColor,
    cursor: 'pointer',
    fontFamily,
    fontSize,
    padding: hasBorder
      ? '10px 20px'
      : `calc(10px + ${borderWidth}) calc(20px + ${borderWidth})`,
    textAlign: 'center',
    textDecoration: 'none',
    userSelect: 'none'
  };

  const borderGradient = isGradient(borderColor)
    ? `linear-gradient(${borederGradientDirection}, ${borderColor[0]}, ${borderColor[1]})`
    : borderColor;

  const wrapperStyle: CSSProperties = {
    width: buttonWidth,
    filter: disabled ? `grayscale(${grayscale})` : 'none',
    height: buttonHeight,
    background: hasBorder ? borderGradient : 'transparent',
    borderRadius,
    display: 'inline-block',
    padding: hasBorder ? borderWidth : 0
  };

  return (
    <div style={wrapperStyle}>
      <button disabled={disabled} style={buttonStyle} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default Button;
