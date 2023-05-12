import React, { FC, CSSProperties, ReactNode } from 'react';

interface CardPresentationProps {
  label: string;
  children: ReactNode;
  width?: string;
}
const CardPresentation: FC<CardPresentationProps> = ({
  label,
  children,
  width = '173px'
}) => {
  const CardPresentationStyle: CSSProperties = {
    boxSizing: 'border-box',
    position: 'relative',
    width: width,
    background: '#151515',
    border: '1px dashed #9747FF',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  };
  const labelStyle: CSSProperties = {
    margin: '0',
    fontSize: '10px',
    color: '#9747FF'
  };
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <div style={CardPresentationStyle}>{children}</div>
    </div>
  );
};

export default CardPresentation;
