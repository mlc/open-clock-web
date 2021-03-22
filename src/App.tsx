import * as React from 'react';
import parser, { ParseResult } from './parser';
import Clock from './Clock';
import { TimeProvider } from './TimeContext';
import EntryArea from './EntryArea';
import Fullscreenable from './Fullscreenable';
import styles from './style.css';

const getMessage = (rs: ParseResult[]): string[] =>
  rs.flatMap((r) => {
    if ('errors' in r) {
      return r.errors.map((e) => JSON.stringify(e));
    } else if ('exception' in r) {
      return [r.exception];
    } else {
      return [];
    }
  });

const ClockOrError: React.FunctionComponent<{
  parseResults: ParseResult[];
}> = ({ parseResults }) => {
  const errors = getMessage(parseResults);
  if (errors.length > 0) {
    return <p className={styles.error}>{errors.join(', ')}</p>;
  } else {
    return (
      <Fullscreenable>
        {parseResults.map((parseResult) =>
          'clock' in parseResult ? <Clock clock={parseResult.clock} /> : null
        )}
      </Fullscreenable>
    );
  }
};

const App: React.FunctionComponent = () => {
  const [jsons, setJsons] = React.useState<string[]>([]);
  const parseResults = React.useMemo(() => jsons.map(parser), [jsons]);

  return (
    <TimeProvider>
      <div>
        <EntryArea jsons={jsons} setJsons={setJsons} />
        {jsons && <ClockOrError parseResults={parseResults} />}
      </div>
    </TimeProvider>
  );
};

export default App;
