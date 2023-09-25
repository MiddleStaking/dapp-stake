import React, { useEffect, useState } from 'react';

interface CountdownProps {
  totalSeconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ totalSeconds }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);

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

    if (days > 0) return `${days} d ${hours} h `;
    if (hours > 0) {
      return `${hours} h ${minutes}`;
    }

    if (minutes > 0)
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;
  };

  if (totalSeconds <= 0) {
    return <></>;
  }

  return (
    <div
      style={{
        textAlign: 'center'
      }}
    >
      {computeTime()}
    </div>
  );
};

export default Countdown;
