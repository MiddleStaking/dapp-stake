import React, { FC, CSSProperties, useState } from 'react';
import ToggleSwitch from '.';

const ToggleSwitchGroupe: FC = () => {
  const [switch1State, setSwitch1State] = useState(false);
  const [switch2State, setSwitch2State] = useState(true);

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

  const handleToggle1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwitch1State(e.target.checked);
    console.log(`Switch 1: ${e.target.checked}`);
  };

  const handleToggle2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwitch2State(e.target.checked);
    console.log(`Switch 2: ${e.target.checked}`);
  };

  return (
    <div style={ButtonGroupeStyle}>
      <div style={firstSwitchMargin}>
        <div>
          <ToggleSwitch
            id='switch-1'
            onChange={handleToggle1}
            checked={switch1State}
            trackColor={'black'}
            thumbColor='#fff'
            borderColor={['#BD37EC', '#1F67FF']}
            hasBorder={true}
          />
        </div>
        <div>
          <ToggleSwitch
            id='switch-1'
            onChange={handleToggle1}
            checked={switch1State}
            trackColor={'black'}
            thumbColor='white'
            borderColor={['#BD37EC', '#1F67FF']}
            hasBorder={true}
            disabled={true}
          />
        </div>
      </div>

      <div style={switchMargin}>
        <div>
          <ToggleSwitch
            id='switch-2'
            onChange={handleToggle2}
            checked={switch2State}
            trackColor={['#BD37EC', '#1F67FF']}
            thumbColor='white'
          />
        </div>

        <div>
          <ToggleSwitch
            id='switch-2'
            onChange={handleToggle2}
            checked={switch2State}
            trackColor={['#BD37EC', '#1F67FF']}
            thumbColor='white'
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ToggleSwitchGroupe;
