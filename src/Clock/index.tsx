/* eslint-disable react/jsx-props-no-spreading */
import { FunctionComponent, HTMLAttributes, useMemo } from 'react';
import { ClockWrapper } from '../open-clock';
import './clock.css';
import Layer from './Layer';
import { useAssets } from './useAssets';

interface Props {
  clock: ClockWrapper;
  ratio?: number;
  height: number;
  wrapper?: boolean;
}

interface MaybeWrapperProps extends HTMLAttributes<HTMLDivElement> {
  render: boolean;
}

const MaybeWrapper: FunctionComponent<MaybeWrapperProps> = ({
  render,
  children,
  ...rest
}) => (render ? <div {...rest}>{children}</div> : <>{children}</>);

const Clock: FunctionComponent<Props> = ({
  clock,
  ratio = 0.82,
  height,
  wrapper = true,
}) => {
  const width = ratio * height;
  const style = useMemo(
    () => ({ width: `${width}px`, height: `${height}px` }),
    [ratio, height]
  );
  const assets = useAssets(clock?.assets);

  const viewBox = `${-100 * ratio} -100 ${200 * ratio} 200`;
  return (
    <MaybeWrapper render={wrapper} style={style}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="clockwidget"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
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
    </MaybeWrapper>
  );
};

export default Clock;
