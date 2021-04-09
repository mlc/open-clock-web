import { FunctionComponent, useEffect, useRef } from 'react';
import type { HandProps } from './types';

const ImageHand: FunctionComponent<HandProps> = ({
  assets,
  layer: { imageFilename, scale },
  position: { x, y },
  angle,
  handOptions: { imageAnchorX, imageAnchorY },
  animationType,
}) => {
  const ref = useRef<SVGImageElement | null>(null);
  useEffect(() => {
    if (animationType === 'smooth') {
      const anim = ref.current?.animate(
        [
          { transform: `rotate(${angle}deg)` },
          { transform: `rotate(${angle + 6}deg)` },
        ],
        {
          duration: 1000,
          iterations: 1,
        }
      );
      return () => anim?.cancel();
    } else {
      return undefined;
    }
  }, [ref, angle, x, y, animationType]);

  const asset = assets[imageFilename];
  if (!asset) {
    return null;
  }
  const s = (Number(scale) * 200) / 275;
  const width = asset.width * s;
  const height = asset.height * s;
  const cx = Number(imageAnchorX);
  const cy = Number(imageAnchorY);
  const transform = `rotate(${angle} ${x} ${y})`;
  return (
    <image
      ref={ref}
      href={asset.url}
      width={width}
      height={height}
      x={x - width * cx}
      y={y - height * cy}
      transform={transform}
    />
  );
};

export default ImageHand;
