import React, { FC, CSSProperties, MouseEventHandler, useState } from 'react';

interface ButtonProps {
  onClick?: MouseEventHandler;
  hasBorder?: boolean;
  borderGradientDirection?: string;
  borderColor?: string | [string, string];
  borderRadius?: number;
  disabled?: boolean;
  grayscale?: string;
  background?: string | [string, string];
  selected: boolean;
}

export const RadioButton: FC<ButtonProps> = ({
  disabled = false,
  borderColor = 'black',
  borderRadius = 15, // Ajusté pour un aspect plus rond
  hasBorder = true, // Activer par défaut pour voir le dégradé
  grayscale = '50%',
  onClick,
  borderGradientDirection = 'to right',
  background = 'black',
  selected = false
}) => {
  const isGradient = (
    value: string | [string, string]
  ): value is [string, string] => {
    return Array.isArray(value);
  };

  const borderGradient = isGradient(borderColor)
    ? `linear-gradient(${borderGradientDirection}, ${borderColor[0]}, ${borderColor[1]})`
    : borderColor;

  const backgroundGradient = isGradient(background)
    ? `linear-gradient(${borderGradientDirection}, ${background[0]}, ${background[1]})`
    : background;

  const wrapperStyle: CSSProperties = {
    filter: disabled ? `grayscale(${grayscale})` : 'none',
    background: hasBorder ? borderGradient : 'transparent',
    borderRadius,
    width: 20,
    height: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: disabled ? 'default' : 'pointer'
  };

  const innerCircleStyle: CSSProperties = {
    width: selected ? 10 : 0,
    height: selected ? 10 : 0,
    borderRadius: '50%',
    background: selected ? borderGradient : 'transparent',
    transition: 'width 0.2s ease, height 0.2s ease'
  };

  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  const wrapperStyle1After: CSSProperties = {
    background: backgroundGradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 15,
    height: 15,
    borderRadius: '50%'
  };

  return (
    <div style={wrapperStyle} onClick={handleOnClick}>
      <div style={wrapperStyle1After}>
        <div style={innerCircleStyle}></div>
      </div>
    </div>
  );
};
