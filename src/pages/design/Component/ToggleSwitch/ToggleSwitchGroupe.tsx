import React, { FC, CSSProperties, useState } from 'react';
import ToggleSwitch from '.';
import CardPresentation from '../CardPresentation';

const ToggleSwitchGroupe: FC = () => {
  const [switch1State, setSwitch1State] = useState(false);
  const [switch2State, setSwitch2State] = useState(true);

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
    <CardPresentation label='ToggleSwitch'>
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
            // thumbColor='white'
            disabled={true}
          />
        </div>
      </div>
    </CardPresentation>
  );
};

export default ToggleSwitchGroupe;
