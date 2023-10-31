import React, { useEffect, useState } from 'react';
import { faHourglassStart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SandClockProps {
  width?: number;
  height?: number;
}

const SandClock: React.FC<SandClockProps> = () => {
  const [deg, setDeg] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeg((prev) => (prev == 180 ? 0 : 180));
    }, 1500);

    return () => clearTimeout(timer);
  }, [deg]);
  return (
    <div style={{ transform: `rotate(${deg}deg)`, display: 'inline-block' }}>
      <FontAwesomeIcon size='xs' icon={faHourglassStart} />
      {/* <FontAwesomeIcon size='lg' icon={faHourglassEnd} /> */}
    </div>
  );
};

export default SandClock;
