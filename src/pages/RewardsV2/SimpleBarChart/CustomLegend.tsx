import * as React from 'react';
import styles from './chartStyle.module.scss';
import { Payload } from 'recharts/types/component/DefaultLegendContent';

type CustomLegendProps = {
  payload: Payload[];
  onClick: (e: any) => void;
  visibleLines: { [key: string]: boolean };
};

const CustomLegend: React.FC<CustomLegendProps> = ({
  payload,
  onClick,
  visibleLines
}) => {
  return (
    <ul className={styles.legendContainer}>
      {payload.map((entry, index) => {
        const year = entry.value.split(' ')[1];
        const isVisible = visibleLines[year] !== false;
        const legendStyle = isVisible ? {} : { textDecoration: 'line-through' };

        return (
          <li
            key={`item-${index}`}
            className={styles.legendItem}
            onClick={() => onClick(entry)}
            style={{
              ...legendStyle,
              cursor: 'pointer',
              color: entry.color
            }}
          >
            {entry.value}
          </li>
        );
      })}
    </ul>
  );
};
export default CustomLegend;
