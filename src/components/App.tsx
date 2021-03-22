import * as React from 'react';
import parser, { ClockParseResult, ParseResult } from '../parser';
import Clock from '../Clock';
import { TimeProvider } from '../TimeContext';
import EntryArea from './EntryArea';
import Fullscreenable from './Fullscreenable';
import MultipleClocks from './MultipleClocks';
import './style.css';

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

const ClocksOrError: React.FunctionComponent<{
  parseResults: ParseResult[];
  height?: number;
  ratio?: number;
}> = ({ parseResults, height = 400, ratio = 0.82 }) => {
  const errors = getMessage(parseResults);
  if (errors.length > 0) {
    return <p className="error">{errors.join(', ')}</p>;
  } else if (parseResults.length === 0) {
    return null;
  } else if (parseResults.length === 1 && 'clock' in parseResults[0]) {
    return (
      <Fullscreenable>
        <Clock clock={parseResults[0].clock} height={height} ratio={ratio} />
      </Fullscreenable>
    );
  } else {
    const clocks = (parseResults as ClockParseResult[]).map(
      ({ clock }) => clock
    );
    return <MultipleClocks clocks={clocks} height={height} ratio={ratio} />;
  }
};

const App: React.FunctionComponent = () => {
  const [jsons, setJsons] = React.useState<string[]>([]);
  const parseResults = React.useMemo(() => jsons.map(parser), [jsons]);

  return (
    <TimeProvider>
      <div>
        <EntryArea jsons={jsons} setJsons={setJsons} />
        <ClocksOrError parseResults={parseResults} />
      </div>
    </TimeProvider>
  );
};

export default App;
