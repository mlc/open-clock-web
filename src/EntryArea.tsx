import * as React from 'react';
import styles from './style.css';

interface Props {
  showEntry?: boolean;
  json?: string;
  setJson: (json: string) => void;
}

const EntryArea: React.FunctionComponent<Props> = ({
  showEntry = false,
  json = '',
  setJson,
}) => {
  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = React.useCallback(
    ({ target: { value } }) => setJson(value),
    [setJson]
  );
  const pickfileRef = React.useRef<HTMLInputElement>(null);
  const onFileClick = React.useCallback(() => {
    pickfileRef.current?.click();
  }, [pickfileRef]);
  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { files } }) => {
      if (files && files[0]) {
        const file = files[0];
        file.text().then((text) => setJson(text));
      }
    },
    [setJson]
  );

  return (
    <form id={styles.jsonForm}>
      <label htmlFor={styles.jsonEntry}>Clock JSON</label>
      {showEntry ? ': enter in textarea or ' : ': '}
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
      {showEntry && (
        <textarea onChange={onChange} id={styles.jsonEntry} value={json} />
      )}
    </form>
  );
};

export default EntryArea;
