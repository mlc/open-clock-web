import * as React from 'react';
import Fullscreenable from './Fullscreenable';
import Clock from '../Clock';
import type { ClockWrapper } from '../open-clock';

interface Props {
  clocks: readonly ClockWrapper[];
  height: number;
}

const MultipleClocks: React.FunctionComponent<Props> = ({ clocks, height }) => (
  <Fullscreenable>
    {clocks.map((clock) => (
      <Clock clock={clock} height={height} />
    ))}
  </Fullscreenable>
);

export default MultipleClocks;
