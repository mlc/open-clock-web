import type { ZonedDateTime } from '@js-joda/core';
import type { LayerProps } from '../LayerProps';
import type { ClockLayerHandOptions as HandOptions } from '../../open-clock';

export type HandProps = LayerProps & {
  angle: number;
  handOptions: HandOptions;
  animationType: string;
};

export type AngleExtractor = (time: ZonedDateTime) => number;
