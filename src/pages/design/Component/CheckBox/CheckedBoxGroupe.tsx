import React, { FC, CSSProperties, useState } from 'react';
import CheckBox from '.';
import CardPresentation from '../CardPresentation';

const CheckedBoxGroupe: FC = () => {
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(true);

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
    <CardPresentation label='CheckBox'>
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
    </CardPresentation>
  );
};

export default CheckedBoxGroupe;
