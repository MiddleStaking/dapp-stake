import React, {
  useState,
  ReactNode,
  CSSProperties,
  useRef,
  useEffect
} from 'react';

type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  background?: string;
  color?: string;
};

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  background = 'black',
  color = 'white'
}) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [divHeight, setDivHeight] = useState(0);

  const containerRef: any = useRef(null);

  const handleMouseOver = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({ x: rect.left + rect.width / 2, y: rect.top });
      setVisible(true);
    }
  };

  const handleScroll = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (containerRef.current) {
      const { offsetHeight } = containerRef.current;
      setDivHeight(offsetHeight);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseOut = () => {
    setVisible(false);
  };

  const tooltipStyle: CSSProperties = {
    padding: '2px 5px',
    borderRadius: '5px 5px',
    position: 'fixed',
    top: `${position.y - divHeight / 2}px`,
    left: `${position.x}px`,
    transform: 'translate(-50%, -100%)',
    color: color,
    background: background,
    zIndex: 1000
  };

  const arrowStyle: CSSProperties = {
    width: '0',
    height: '0',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: `10px solid ${background}`,
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '-10px',
    zIndex: 1000
  };
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      ref={containerRef}
      style={{ position: 'relative' }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {children}
      {visible && (
        <div style={tooltipStyle}>
          {content}
          <div style={arrowStyle}></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
