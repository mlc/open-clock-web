import * as React from 'react';
import parser, { ParseResult } from './parser';
import Clock from './Clock';
import { TimeProvider } from './TimeContext';
import EntryArea from './EntryArea';
import Fullscreenable from './Fullscreenable';
import styles from './style.css';

const getMessage = (r: ParseResult): string => {
  if ('errors' in r) {
    return r.errors.map((e) => JSON.stringify(e)).join(', ');
  } else if ('exception' in r) {
    return r.exception;
  } else {
    return 'ok';
  }
};

const ClockOrError: React.FunctionComponent<{ parseResult: ParseResult }> = ({
  parseResult,
}) => {
  if ('clock' in parseResult) {
    return (
      <Fullscreenable>
        <Clock clock={parseResult.clock} />
      </Fullscreenable>
    );
  } else {
    return <p className={styles.error}>{getMessage(parseResult)}</p>;
  }
};

const App: React.FunctionComponent = () => {
  const [json, setJson] = React.useState('');
  const parseResult = React.useMemo(() => parser(json), [json]);

  return (
    <TimeProvider>
      <div>
        <EntryArea json={json} setJson={setJson} />
        {json && <ClockOrError parseResult={parseResult} />}
      </div>
    </TimeProvider>
  );
};

export default App;
