import * as React from 'react';
import parser, { ParseResult } from './parser';
import { TimeProvider } from './TimeContext';
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

const App: React.FunctionComponent = () => {
  const [json, setJson] = React.useState('');
  const parseResult = React.useMemo(() => parser(json), [json]);
  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = React.useCallback(
    ({ target: { value } }) => setJson(value),
    [setJson]
  );
  const pickfileRef = React.useRef<HTMLInputElement>(null);
  const onFileClick = React.useCallback(() => {
    pickfileRef.current?.click();
  }, [pickfileRef.current]);
  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { files } }) => {
      if (files && files[0]) {
        const file = files[0];
        file.text().then((text) => setJson(text));
      }
    },
    [setJson]
  );

  const message = getMessage(parseResult);

  return (
    <TimeProvider>
      <div>
        <form id={styles.jsonForm}>
          <label htmlFor={styles.jsonEntry}>Clock JSON</label>: enter in
          textarea or&nbsp;
          <button type="button" onClick={onFileClick}>
            open file
          </button>
          <input
            ref={pickfileRef}
            id="pickfile"
            type="file"
            accept=".ocs,.json,application/json"
            onChange={onFileChange}
            className={styles.hidden}
          />
          <br />
          <textarea onChange={onChange} id={styles.jsonEntry} value={json} />
        </form>

        <p style={{ fontFamily: '"TwoFiftySixBytes-Regular"' }}>{message}</p>
      </div>
    </TimeProvider>
  );
};

export default App;
