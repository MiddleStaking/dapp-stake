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

const ToggleSwitch: FC<ToggleSwitchProps> = ({
  id,
  borderWidth = '1px',
  checked = false,
  onChange,
  disabled = false,
  trackColor = '#ccc',
  thumbColor = 'white',
  gradientDirection = 'to right',
  thumbWidth = '18px',
  thumbheight = '18px',
  width = 50,
  height = 24,
  borderRadius = 12,
  borderColor = 'transparent',
  hasBorder = false
}) => {
  const isGradient = (
    value: string | [string, string]
  ): value is [string, string] => {
    return Array.isArray(value);
  };

  const containerStyle: CSSProperties = {
    pointerEvents: disabled ? 'none' : 'auto', // Ajoutez cette ligne
    filter: disabled ? 'grayscale(50%)' : 'none',
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
    filter: disabled ? 'grayscale(50%)' : 'none',
    display: 'inline-block',
    background: isGradient(trackColor)
      ? `linear-gradient(${gradientDirection}, ${trackColor[0]}, ${trackColor[1]})`
      : trackColor,
    borderRadius,
    width: '100%',
    height: '100%',
    cursor: 'pointer'
  };

  const thumbStyle: CSSProperties = {
    filter: disabled ? 'grayscale(100%)' : 'none',
    display: 'inline-block',
    background: isGradient(thumbColor)
      ? `linear-gradient(${gradientDirection}, ${thumbColor[0]}, ${thumbColor[1]})`
      : !disabled
      ? thumbColor
      : 'grey',
    borderRadius: '50%',
    width: thumbWidth,
    height: thumbheight,
    marginLeft: checked
      ? hasBorder
        ? width -
          parseFloat(thumbWidth.toString()) -
          5 -
          parseFloat(borderWidth.toString())
        : width - parseFloat(thumbWidth.toString()) - 4
      : 4,
    transition: disabled ? 'none' : 'margin-left 0.2s',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)'
  };

  const inputStyle: CSSProperties = {
    opacity: 0,
    width: 0,
    height: 0
  };

  return (
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
  );
};

export default ToggleSwitch;
