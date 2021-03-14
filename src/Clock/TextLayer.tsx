import * as React from 'react';
import type { Property } from 'csstype';
import {
  ChronoField,
  DateTimeFormatter,
  TemporalField,
  ZonedDateTime,
} from '@js-joda/core';
// @ts-ignore
import { Locale } from '@js-joda/locale_en-us';
import { toWords } from 'number-to-words';

import { LayerProps } from './LayerProps';
import { useTime } from '../TimeContext';
import {
  ClockLayerTextCasing as Casing,
  ClockLayerTextJustification as Justification,
  ClockLayerTextOptionsDateTimeFormat as Format,
  ClockLayerType,
} from '../open-clock';

interface DateTimeTextProps {
  dateTimeFormat: Format;
}

type FormatFunction = (time: ZonedDateTime) => string;

const p = (pattern: string): FormatFunction => {
  const formatter = DateTimeFormatter.ofPattern(pattern).withLocale(Locale.US);
  return (time) => formatter.format(time);
};

const w = (
  unit: TemporalField,
  singular?: string,
  plural?: string
): FormatFunction => (time) => {
  const n = time.get(unit);
  const words = toWords(n);
  if (typeof singular === 'string' && typeof plural === 'string') {
    return `${words} ${n === 1 ? singular : plural}`;
  } else {
    return words;
  }
};

const formatPatterns: {
  [K in Format]: FormatFunction | string | undefined;
} = {
  [Format.City]: undefined,
  [Format.Colon]: ':',
  [Format.Country]: undefined,
  [Format.Da]: p('eee'),
  [Format.Dadd]: p('eee d'),
  [Format.Dd]: p('dd'),
  [Format.Ddauto]: p('d'),
  [Format.Ddmm]: p('d MMM'),
  [Format.Dl]: p('EEEE'),
  [Format.Dw]: p('E'),
  [Format.Dy]: p('D'),
  [Format.Hh]: p('hh'),
  [Format.Hhmm]: p('h:mm'),
  [Format.Hhmmpm]: p('h:mm a'),
  [Format.Hhmmss]: p('h:mm:ss'),
  [Format.HourWord]: w(ChronoField.HOUR_OF_AMPM),
  [Format.HourWordUnit]: w(ChronoField.HOUR_OF_AMPM, 'hour', 'hours'),
  [Format.Ml]: p('MMMM'),
  [Format.Mm]: p('mm'),
  [Format.Mmdd]: p('MMM d'),
  [Format.Mn]: p('M'),
  [Format.Mo]: p('MMM'),
  [Format.MinuteWord]: w(ChronoField.MINUTE_OF_HOUR),
  [Format.MinuteWordUnit]: w(ChronoField.MINUTE_OF_HOUR, 'minute', 'minutes'),
  [Format.Pm]: p('a'),
  [Format.Ss]: p('ss'),
  [Format.SecondsWord]: w(ChronoField.SECOND_OF_MINUTE),
  [Format.SecondsWordUnit]: w(
    ChronoField.SECOND_OF_MINUTE,
    'second',
    'seconds'
  ),
  [Format.Slash]: '/',
  [Format.Wy]: p('w'),
  [Format.Yy]: p('yy'),
  [Format.Yyyy]: p('yyyy'),
};

const textAnchors: {
  [K in Justification]: Property.TextAnchor;
} = {
  [Justification.Centered]: 'middle',
  [Justification.Left]: 'start',
  [Justification.Right]: 'end',
};

const textTransforms: {
  [K in Casing]: Property.TextTransform | undefined;
} = {
  [Casing.Lower]: 'lowercase',
  [Casing.None]: undefined,
  [Casing.Sentence]: undefined, // not supported by CSS. ¯\_(ツ)_/¯
  [Casing.Uppercased]: 'uppercase',
  [Casing.Word]: 'capitalize',
};

const DateTimeText: React.FunctionComponent<DateTimeTextProps> = ({
  dateTimeFormat,
}) => {
  const now = useTime();
  const pattern = formatPatterns[dateTimeFormat];
  if (pattern === undefined) {
    return null;
  } else if (typeof pattern === 'string') {
    return <>{pattern}</>;
  } else {
    return <>{pattern(now)}</>;
  }
};

const TextLayer: React.FunctionComponent<LayerProps> = ({
  position: { x, y },
  layer,
}) => {
  if (!layer.textOptions) {
    return null;
  }

  const style: React.CSSProperties = {
    textTransform: textTransforms[layer.textOptions.casingType],
    fontFamily: layer.textOptions.fontFamily,
    fontSize: `${Number(layer.scale) * 46.5}px`,
    textAnchor: textAnchors[layer.textOptions.justification],
    fill: layer.fillColor,
  };

  return (
    <text x={x} y={y} style={style}>
      {layer.type === ClockLayerType.DateTime ? (
        <DateTimeText dateTimeFormat={layer.textOptions.dateTimeFormat} />
      ) : (
        layer.textOptions.customText
      )}
    </text>
  );
};

export default React.memo(TextLayer);
