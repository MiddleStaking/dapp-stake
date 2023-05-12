import React, { FC, CSSProperties, useState } from 'react';
import CardPresentation from '../CardPresentation';
import MexLogos from './Mex';
import VitalLogos from './Vital';

const LogosGroupe: FC = () => {
  const firstLogoshMargin: CSSProperties = {
    display: 'flex',
    marginBottom: '10px',
    marginTop: '10px',
    flexDirection: 'row',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const LogosMiddleDiv: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
  return (
    <CardPresentation label='Logos'>
      <div style={firstLogoshMargin}>
        <div style={LogosMiddleDiv}>
          <MexLogos width={'24'} height={'24'} />
        </div>
        <div style={LogosMiddleDiv}>
          <VitalLogos width={'40'} height={'40'} />
        </div>
      </div>
    </CardPresentation>
  );
};

export default LogosGroupe;
