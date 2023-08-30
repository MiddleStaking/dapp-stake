import React, { FC, CSSProperties, useState } from 'react';

interface OptionProps {
  text: string;
  fontSize?: string;
  fontFamily?: string;
  textColor?: string;
  backgroudColor?: string;
  gradientDirection?: string;
  height?: string;
  width?: string;
  borderRadius?: string;
  padding?: string;
  hoverActive?: boolean;
  hoverBackgroudColor?: string;
  hoverTextColor?: string;
  disable?: boolean;
  onClick?: () => void;
}

const Options: FC<OptionProps> = ({
  text,
  onClick,
  backgroudColor,
  textColor,
  borderRadius = '10px',
  width = '150px',
  height = '40px',
  fontSize = '14px',
  fontFamily = '',
  hoverActive = true,
  hoverBackgroudColor = 'rgba(99, 74, 203, 0.32)',
  hoverTextColor = '#2266FF',
  disable = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (!disable && hoverActive) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!disable && hoverActive) {
      setIsHovered(false);
    }
  };

  const handleOnClick = () => {
    if (!disable && onClick) {
      onClick();
    }
  };

  const optionStyle: CSSProperties = {
    zIndex: 1000,
    width: width,
    height: height,
    cursor: disable ? 'not-allowed' : 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: disable ? 'grey' : backgroudColor,
    borderRadius: borderRadius,
    fontSize: fontSize
  };

  const HoverStyle: CSSProperties = {
    width: width,
    height: height,
    background: disable
      ? 'grey'
      : isHovered
      ? hoverBackgroudColor
      : backgroudColor,
    color: disable ? '#aaa' : isHovered ? hoverTextColor : textColor,
    cursor: disable ? 'not-allowed' : 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius,
    fontFamily: fontFamily
  };

  //console.log(borderRadius);

  return (
    <div
      style={optionStyle}
      onClick={handleOnClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={HoverStyle}>{text}</div>
    </div>
  );
};

export default Options;
