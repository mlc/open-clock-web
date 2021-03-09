import * as React from 'react';
import { ClockWrapper } from '../open-clock';
import styles from './clock.css';
import Layer from './Layer';

interface Props {
  clock: ClockWrapper;
  ratio?: number;
  height?: number;
}

const Clock: React.FunctionComponent<Props> = ({
  clock,
  ratio = 0.8,
  height = 200,
}) => {
  const width = ratio * height;
  const style = React.useMemo(
    () => ({ width: `${width}px`, height: `${height}px` }),
    [ratio, height]
  );
  const viewBox = `${-100 * ratio} -100 ${200 * ratio} 200`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={styles.clockwidget}
      viewBox={viewBox}
    >
      {clock.clockStandard.layers.map((layer) => (
        <Layer ratio={ratio} layer={layer} key={layer.zIndex} />
      ))}
    </svg>
  );
};

export default Clock;
