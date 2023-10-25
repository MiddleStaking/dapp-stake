import React, { FC, CSSProperties, ChangeEventHandler } from 'react';

interface ToggleSwitchProps {
  id: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  trackColor?: string | [string, string];
  thumbColor?: string | [string, string];
  gradientDirection?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  borderColor?: string | [string, string];
  borderWidth?: string | number;
  hasBorder?: boolean;
  thumbWidth?: string | number;
  thumbheight?: string | number;
}

export const ToggleSwitch: FC<ToggleSwitchProps> = ({
  id,
  borderWidth = '1px',
  checked = false,
  onChange,
  disabled = false,
  trackColor = checked ? ['#BD37EC', '#1F67FF'] : 'black',
  thumbColor = 'white', // Change color when disabled
  gradientDirection = 'to right',
  thumbWidth = '18px',
  thumbheight = '18px',
  width = 50,
  height = 24,
  borderRadius = 12,
  borderColor = ['#BD37EC', '#1F67FF'],
  hasBorder = checked ? false : true
}) => {
  const isGradient = (
    value: string | [string, string]
  ): value is [string, string] => {
    return Array.isArray(value);
  };

  const containerStyle: CSSProperties = {
    // filter: 'drop-shadow(0px 0px 24px rgba(182, 57, 237, 0.64))',
    // zIndex: 0,
    pointerEvents: disabled ? 'none' : 'auto',
    padding: hasBorder ? borderWidth : 0,
    display: 'inline-block',
    width,
    height,
    borderRadius,
    overflow: 'hidden',
    background: hasBorder
      ? isGradient(borderColor)
        ? `linear-gradient(${gradientDirection}, ${borderColor[0]}, ${borderColor[1]})`
        : borderColor
      : 'none'
  };

  const trackStyle: CSSProperties = {
    display: 'flex', // Use flex layout
    alignItems: 'center', // Center items vertically
    background: checked
      ? isGradient(trackColor)
        ? `linear-gradient(${gradientDirection}, ${trackColor[0]}, ${trackColor[1]})`
        : trackColor
      : 'black',
    borderRadius,
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    padding: '0 4px' // Add padding to prevent thumb from touching the edges
  };

  const thumbStyle: CSSProperties = {
    background: disabled
      ? 'grey'
      : isGradient(thumbColor)
      ? `linear-gradient(${gradientDirection}, ${thumbColor[0]}, ${thumbColor[1]})`
      : thumbColor,
    borderRadius: '50%',
    width: thumbWidth,
    height: thumbheight,
    transition: 'margin 0.4s', // Add transition
    marginLeft: checked ? `calc(100% - ${thumbWidth})` : '0' // Add this line
  };

  const inputStyle: CSSProperties = {
    width: 0,
    height: 0,
    display: 'none'
  };

  return (
    <div
      style={{ filter: 'drop-shadow(0px 0px 24px rgba(182, 57, 237, 0.64))' }}
    >
      <div style={containerStyle}>
        <label htmlFor={id} style={trackStyle}>
          <input
            type='checkbox'
            id={id}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            style={inputStyle}
          />
          <span style={thumbStyle}></span>
        </label>
      </div>
    </div>
  );
};
