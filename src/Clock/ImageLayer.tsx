import * as React from 'react';
import type { LayerProps } from './LayerProps';

const ImageLayer: React.FunctionComponent<LayerProps> = ({
  layer: { imageFilename, scale },
  assets,
  position: { x, y },
}) => {
  const asset = assets[imageFilename];
  if (!asset) {
    return null;
  }
  const s = (Number(scale) * 200) / 275;
  const width = asset.width * s;
  const height = asset.height * s;

  return (
    <image
      href={asset.url}
      x={x - width / 2}
      y={y - height / 2}
      width={width}
      height={height}
    />
  );
};

export default ImageLayer;
