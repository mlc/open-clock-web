import * as React from 'react';
import { ChronoField, ZonedDateTime } from '@js-joda/core';
import type { LayerProps } from './LayerProps';
import { useTime } from '../TimeContext';
import { ClockLayerHandTypes as HandType } from '../open-clock';

type AngleExtractor = (time: ZonedDateTime) => number;

const seconds: AngleExtractor = (time) =>
  time.get(ChronoField.SECOND_OF_MINUTE) / 60;
const minutes: AngleExtractor = (time) =>
  (time.get(ChronoField.MINUTE_OF_HOUR) + seconds(time)) / 60;
const hours: AngleExtractor = (time) =>
  (time.get(ChronoField.HOUR_OF_AMPM) + minutes(time)) / 12;

const angleExtractors: { [K in HandType]: AngleExtractor } = {
  [HandType.Hour]: hours,
  [HandType.Minute]: minutes,
  [HandType.Second]: seconds,
};

const HandLayer: React.FunctionComponent<LayerProps> = ({
  assets,
  layer,
  position: { x, y },
}) => {
  const now = useTime();

  const { handOptions } = layer;
  if (!handOptions) {
    return null;
  }

  const fraction = angleExtractors[handOptions.handType](now);
  const angle = 360 * (handOptions.animateClockwise ? fraction : 1 - fraction);
  if (handOptions.useImage) {
    const asset = assets[layer.imageFilename];
    if (!asset) {
      return null;
    }
    const s = (Number(layer.scale) * 200) / 275;
    const width = asset.width * s;
    const height = asset.height * s;
    const cx = Number(handOptions.imageAnchorX);
    const cy = Number(handOptions.imageAnchorY);
    const transform = `rotate(${angle} ${x} ${y})`;
    return (
      <image
        href={asset.url}
        width={width}
        height={height}
        x={x - width * cx}
        y={y - height * cy}
        transform={transform}
      />
    );
  } else {
    return <use href={`hands.svg#${handOptions.handStyle}`} rotate={angle} />;
  }
};

export default HandLayer;
