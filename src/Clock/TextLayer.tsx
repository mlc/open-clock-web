import * as React from 'react';
import type { Property } from 'csstype';
import { DateTimeFormatter } from '@js-joda/core';
// @ts-ignore
import { Locale } from '@js-joda/locale_en-us';

import { LayerProps } from './LayerProps';
import { useTime } from '../TimeContext';
import {
  ClockLayerTextCasing,
  ClockLayerTextJustification,
  ClockLayerTextOptionsDateTimeFormat,
  ClockLayerType,
} from '../open-clock';

interface DateTimeTextProps {
  dateTimeFormat: ClockLayerTextOptionsDateTimeFormat;
}

const p = (pattern: string): DateTimeFormatter =>
  DateTimeFormatter.ofPattern(pattern).withLocale(Locale.US);

const formatPatterns: {
  [K in ClockLayerTextOptionsDateTimeFormat]:
    | DateTimeFormatter
    | string
    | undefined;
} = {
  [ClockLayerTextOptionsDateTimeFormat.City]: undefined,
  [ClockLayerTextOptionsDateTimeFormat.Colon]: ':',
  [ClockLayerTextOptionsDateTimeFormat.Country]: undefined,
  [ClockLayerTextOptionsDateTimeFormat.Da]: undefined,
  [ClockLayerTextOptionsDateTimeFormat.Dadd]: undefined,
  [ClockLayerTextOptionsDateTimeFormat.Dd]: undefined,
  [ClockLayerTextOptionsDateTimeFormat.Ddauto]: undefined,
  [ClockLayerTextOptionsDateTimeFormat.Ddmm]: p('dd MMM'),
  [ClockLayerTextOptionsDateTimeFormat.Dl]: p('EEEE'),
  [ClockLayerTextOptionsDateTimeFormat.Dw]: undefined,
  [ClockLayerTextOptionsDateTimeFormat.Dy]: undefined,
  [ClockLayerTextOptionsDateTimeFormat.Hh]: p('h'),
  [ClockLayerTextOptionsDateTimeFormat.Hhmm]: p('h:mm'),
  [ClockLayerTextOptionsDateTimeFormat.Hhmmpm]: p('h:mm a'),
  [ClockLayerTextOptionsDateTimeFormat.Hhmmss]: p('h:mm:ss'),
  [ClockLayerTextOptionsDateTimeFormat.HourWord]: undefined,
  [ClockLayerTextOptionsDateTimeFormat.HourWordUnit]: undefined,
  [ClockLayerTextOptionsDateTimeFormat.Ml]: undefined,
  [ClockLayerTextOptionsDateTimeFormat.Mm]: undefined,
  [ClockLayerTextOptionsDateTimeFormat.Mmdd]: undefined,
  [ClockLayerTextOptionsDateTimeFormat.Mn]: undefined,
  [ClockLayerTextOptionsDateTimeFormat.Mo]: undefined,
  [ClockLayerTextOptionsDateTimeFormat.MinuteWord]: undefined,
  [ClockLayerTextOptionsDateTimeFormat.MinuteWordUnit]: undefined,
  [ClockLayerTextOptionsDateTimeFormat.Pm]: undefined,
  [ClockLayerTextOptionsDateTimeFormat.Ss]: undefined,
  [ClockLayerTextOptionsDateTimeFormat.SecondsWord]: undefined,
  [ClockLayerTextOptionsDateTimeFormat.SecondsWordUnit]: undefined,
  [ClockLayerTextOptionsDateTimeFormat.Slash]: '/',
  [ClockLayerTextOptionsDateTimeFormat.Wy]: undefined,
  [ClockLayerTextOptionsDateTimeFormat.Yy]: undefined,
  [ClockLayerTextOptionsDateTimeFormat.Yyyy]: undefined,
};

const textAnchors: {
  [K in ClockLayerTextJustification]: Property.TextAnchor;
} = {
  [ClockLayerTextJustification.Centered]: 'middle',
  [ClockLayerTextJustification.Left]: 'start',
  [ClockLayerTextJustification.Right]: 'end',
};

const textTransforms: {
  [K in ClockLayerTextCasing]: Property.TextTransform;
} = {
  [ClockLayerTextCasing.Lower]: 'lowercase',
  [ClockLayerTextCasing.None]: 'none',
  [ClockLayerTextCasing.Sentence]: 'initial',
  [ClockLayerTextCasing.Uppercased]: 'uppercase',
  [ClockLayerTextCasing.Word]: 'capitalize',
};

const DateTimeText: React.FunctionComponent<DateTimeTextProps> = ({
  dateTimeFormat,
}) => {
  const now = useTime();
  const pattern = formatPatterns[dateTimeFormat];
  if (typeof pattern === 'string') {
    return <>{pattern}</>;
  } else if (pattern === undefined) {
    return null;
  } else {
    return <>{pattern.format(now)}</>;
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
    fill: layer.fillColor,
    textTransform: textTransforms[layer.textOptions.casingType],
    fontFamily: layer.textOptions.fontFamily,
    fontSize: `${Number(layer.scale) * 46.5}px`,
    textAnchor: textAnchors[layer.textOptions.justification],
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
