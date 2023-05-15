import React, { FC, CSSProperties, useState, useEffect } from 'react';

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

  onClick: () => void;
}

const Options: FC<OptionProps> = ({
  text,
  onClick,
  backgroudColor,
  textColor,
  borderRadius,
  width = '150px',
  height = '40px',
  fontSize = '14px',
  fontFamily = 'Plus Jakarta Sans',
  hoverActive = true,
  hoverBackgroudColor = 'rgba(99, 74, 203, 0.32)',
  hoverTextColor = '#2266FF'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (hoverActive) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (hoverActive) {
      setIsHovered(false);
    }
  };

  const optionStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 1000,
    width: width,
    height: height,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: backgroudColor,
    borderRadius: borderRadius,
    fontSize: fontSize
  };

  const HoverStyle: React.CSSProperties = {
    width: width,
    height: height,
    background: isHovered ? hoverBackgroudColor : backgroudColor,
    color: isHovered ? hoverTextColor : textColor,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius
  };
  return (
    <div
      style={optionStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={HoverStyle}>{text}</div>
    </div>
  );
};

export default Options;
