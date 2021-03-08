import * as React from 'react';
import { ZonedDateTime } from '@js-joda/core';

const TimeContext = React.createContext<ZonedDateTime>(ZonedDateTime.now());

export const useTime = () => React.useContext(TimeContext);
export const TimeConsumer = TimeContext.Consumer;

export const TimeProvider: React.FunctionComponent = ({ children }) => {
  const [now, setNow] = React.useState(ZonedDateTime.now());
  React.useEffect(() => {
    // TODO: synchronize so that the first update occurs at 0ms after a new second
    const intervalId = setInterval(() => {
      setNow(ZonedDateTime.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [setNow]);

  return <TimeContext.Provider value={now}>{children}</TimeContext.Provider>;
};
