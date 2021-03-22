import * as React from 'react';
import { ClockLayer, ClockLayerType } from '../open-clock';
import TextLayer from './TextLayer';
import type { Assets, LayerProps } from './LayerProps';
import HandLayer from './HandLayer';
import ImageLayer from './ImageLayer';

const layerTypes: {
  [K in ClockLayerType]: React.ComponentType<LayerProps> | undefined;
} = {
  [ClockLayerType.BatteryIndicator]: undefined,
  [ClockLayerType.DataBar]: undefined,
  [ClockLayerType.DataLabel]: undefined,
  [ClockLayerType.DataRing]: undefined,
  [ClockLayerType.DateTime]: TextLayer,
  [ClockLayerType.Hand]: HandLayer,
  [ClockLayerType.Icon]: undefined,
  [ClockLayerType.Image]: ImageLayer,
  [ClockLayerType.Text]: TextLayer,
};

interface Props {
  ratio: number;
  layer: ClockLayer;
  assets: Assets;
  debug?: boolean;
}

const radiansToDegrees = (theta: string | number): number => {
  const rads = typeof theta === 'number' ? theta : Number(theta);
  return (rads * 180) / Math.PI;
};

const Layer: React.FunctionComponent<Props> = ({
  ratio,
  layer,
  assets,
  debug = false,
}) => {
  const position = React.useMemo(
    () => ({
      x: Number(layer.horizontalPosition) * 100,
      y: Number(layer.verticalPosition) * -100,
    }),
    [ratio, layer.horizontalPosition, layer.verticalPosition]
  );
  if (layer.isHidden) {
    return null;
  }
  const LayerType = layerTypes[layer.type];
  if (LayerType === undefined) {
    // not implemented yet
    return null;
  }
  const transform =
    layer.angleOffset === '0.0'
      ? undefined
      : `rotate(${radiansToDegrees(layer.angleOffset)},${position.x},${
          position.y
        })`;
  return (
    <g opacity={layer.alpha} transform={transform}>
      {debug && (
        <circle
          r={2}
          stroke="red"
          strokeWidth={1}
          cx={position.x}
          cy={position.y}
        />
      )}
      <LayerType assets={assets} position={position} layer={layer} />
    </g>
  );
};

export default Layer;
