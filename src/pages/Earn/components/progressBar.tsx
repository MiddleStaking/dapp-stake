import React from 'react';
import BigNumber from 'bignumber.js';

interface ProgressBarProps {
  value: BigNumber;
  max: BigNumber;
}

const ProgressBar = ({ value, max }: ProgressBarProps) => {
  // Calculer le pourcentage en utilisant BigNumber
  const percentage = value.div(max).multipliedBy(100).toNumber(); // Convertir en nombre pour le style

  return (
    <div
      style={{
        width: '180px',
        backgroundColor: '#f3f3f3',
        borderRadius: '10px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '5px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          width: `${Math.min(percentage, 100)}%`, // Limiter à 100%
          // background: 'linear-gradient(to right, #4caf50, #2a9d8f)',
          background:
            'linear-gradient(to right, rgb(173 63 238), rgb(73 46 119)',
          height: '20px',
          borderRadius: '8px',
          transition: 'width 0.3s ease'
        }}
      ></div>
      <span
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontWeight: 'bold',
          fontSize: '14px',
          color: percentage > 50 ? '#fff' : '#000', // Contraste adapté
          pointerEvents: 'none'
        }}
      >
        {percentage.toFixed(2)}%
      </span>
    </div>
  );
};

export default ProgressBar;
