import React, { useEffect, useState } from 'react';
import SandClock from '../AccordionWrap/component/SandClock';

interface CountdownProps {
  totalSeconds: number;
  id_pool?: any;
}

const Countdown: React.FC<CountdownProps> = ({ totalSeconds }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  useEffect(() => {
    setSecondsRemaining(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (secondsRemaining > 0) {
      const timer = setTimeout(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [secondsRemaining]);

  const computeTime = () => {
    let remaining = secondsRemaining;

    const days = Math.floor(remaining / (60 * 60 * 24));
    remaining -= days * 60 * 60 * 24;

    const hours = Math.floor(remaining / (60 * 60));
    remaining -= hours * 60 * 60;

    const minutes = Math.floor(remaining / 60);
    remaining -= minutes * 60;

    const seconds = remaining;

    if (days > 0) return `${days} D ${hours.toString().padStart(2, '0')} h `;
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')} h ${minutes
        .toString()
        .padStart(2, '0')}`;
    }

    if (minutes > 0)
      return `${minutes.toString().padStart(2, '0')} ${
        minutes === 1 ? 'minute' : 'minutes'
      }`;
    return `${seconds.toString().padStart(2, '0')} ${
      seconds === 1 ? 'second' : 'seconds'
    }`;
  };

  if (totalSeconds <= 0) {
    return <></>;
  }

  return (
    <div
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '5px'
      }}
    >
      <SandClock />
      {computeTime()}
    </div>
  );
};

export default Countdown;
