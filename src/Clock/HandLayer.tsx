import * as React from 'react';
import { ChronoField, ZonedDateTime } from '@js-joda/core';
import type { LayerProps } from './LayerProps';
import { useTime } from '../TimeContext';
import { ClockLayerHandTypes as HandType } from '../open-clock';

type AngleExtractor = (time: ZonedDateTime) => number;

const extract = (f: ChronoField, max: number): AngleExtractor => (time) =>
  time.get(f) / max;

const angleExtractors: { [K in HandType]: AngleExtractor } = {
  [HandType.Hour]: extract(ChronoField.HOUR_OF_AMPM, 12),
  [HandType.Minute]: extract(ChronoField.MINUTE_OF_HOUR, 60),
  [HandType.Second]: extract(ChronoField.SECOND_OF_MINUTE, 60),
};

const HandLayer: React.FunctionComponent<LayerProps> = ({ layer }) => {
  const now = useTime();

  const { handOptions } = layer;
  if (!handOptions) {
    return null;
  }

  const fraction = angleExtractors[handOptions.handType](now);
  const angle = 360 * (handOptions.animateClockwise ? fraction : 1 - fraction);
  return <use href={`hands.svg#${handOptions.handStyle}`} rotate={angle} />;
};

export default HandLayer;
