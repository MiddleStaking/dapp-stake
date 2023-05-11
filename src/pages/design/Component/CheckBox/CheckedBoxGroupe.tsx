import React, { FC, CSSProperties, useState } from 'react';
import CheckBox from '.';

const CheckedBoxGroupe: FC = () => {
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(true);

  const ButtonGroupeStyle: CSSProperties = {
    boxSizing: 'border-box',
    position: 'relative',
    width: '173px',
    background: '#151515',
    border: '1px dashed #9747FF',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  };

  const switchMargin: CSSProperties = {
    display: 'flex',
    marginBottom: '10px',
    flexDirection: 'row',
    gap: '10px'
  };

  const firstSwitchMargin: CSSProperties = {
    display: 'flex',
    marginBottom: '10px',
    marginTop: '10px',
    flexDirection: 'row',
    gap: '10px'
  };

  return (
    <div style={ButtonGroupeStyle}>
      <div style={firstSwitchMargin}>
        <div>
          <CheckBox
            checked={checkbox1}
            onClick={() => {
              setCheckbox1(!checkbox1);
            }}
          />
        </div>
      </div>
      <div style={switchMargin}>
        <div>
          <CheckBox
            checked={checkbox2}
            onClick={() => {
              setCheckbox2(!checkbox2);
            }}
          />
        </div>
      </div>
      <div style={switchMargin}>
        <div>
          <CheckBox
            checked={checkbox2}
            onClick={() => {
              setCheckbox2(!checkbox2);
            }}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default CheckedBoxGroupe;
