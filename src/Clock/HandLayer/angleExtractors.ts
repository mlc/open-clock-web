import { ChronoField } from '@js-joda/core';
import { ClockLayerHandTypes as HandType } from '../../open-clock';
import type { AngleExtractor } from './types';

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

export default angleExtractors;
