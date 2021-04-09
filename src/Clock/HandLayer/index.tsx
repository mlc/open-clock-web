import type { FunctionComponent } from 'react';
import type { LayerProps } from '../LayerProps';
import { useTime } from '../../TimeContext';
import { ClockLayerHandTypes as HandType } from '../../open-clock';
import ImageHand from './ImageHand';
import angleExtractors from './angleExtractors';

const HandLayer: FunctionComponent<LayerProps> = ({
  assets,
  layer,
  position,
}) => {
  const now = useTime();

  const { handOptions } = layer;
  if (!handOptions) {
    return null;
  }

  const fraction = angleExtractors[handOptions.handType](now);
  const angle = 360 * (handOptions.animateClockwise ? fraction : 1 - fraction);
  if (handOptions.useImage) {
    return (
      <ImageHand
        layer={layer}
        position={position}
        assets={assets}
        angle={angle}
        handOptions={handOptions}
        animationType={
          handOptions.handType === HandType.Second ? 'smooth' : 'set'
        }
      />
    );
  } else {
    return <use href={`hands.svg#${handOptions.handStyle}`} rotate={angle} />;
  }
};

export default HandLayer;
