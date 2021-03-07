import * as React from 'react';
import parser, { ParseResult } from './parser';

const getMessage = (r: ParseResult): string => {
  if ('errors' in r) {
    return r.errors.map((e) => JSON.stringify(e)).join(', ');
  } else if ('exception' in r) {
    return r.exception;
  } else {
    return 'ok';
  }
};

const App: React.FunctionComponent = () => {
  const [json, setJson] = React.useState('');
  const parseResult = React.useMemo(() => parser(json), [json]);
  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = React.useCallback(
    (e) => setJson(e.target.value),
    [setJson]
  );

  const message = getMessage(parseResult);

  return (
    <div>
      <label>
        Clock JSON:
        <br />
        <textarea onChange={onChange} id="json" value={json} />
      </label>

      <p>{message}</p>
    </div>
  );
};

export default App;
