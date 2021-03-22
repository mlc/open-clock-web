import * as React from 'react';
import { ClockWrapper } from '../open-clock';
import styles from './clock.css';
import Layer from './Layer';
import { useAssets } from './useAssets';

interface Props {
  clock: ClockWrapper;
  ratio?: number;
  height: number;
}

const Clock: React.FunctionComponent<Props> = ({
  clock,
  ratio = 0.82,
  height,
}) => {
  const width = ratio * height;
  const style = React.useMemo(
    () => ({ width: `${width}px`, height: `${height}px` }),
    [ratio, height]
  );
  const assets = useAssets(clock?.assets);

  const viewBox = `${-100 * ratio} -100 ${200 * ratio} 200`;
  return (
    <div style={style}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.clockwidget}
        viewBox={viewBox}
      >
        {clock.clockStandard.layers.map((layer) => (
          <Layer
            assets={assets}
            ratio={ratio}
            layer={layer}
            key={layer.zIndex}
          />
        ))}
      </svg>
    </div>
  );
};

export default Clock;
