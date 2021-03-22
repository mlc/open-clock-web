import * as React from 'react';
import styles from './style.css';

interface Props {
  jsons?: string[];
  setJsons: (json: string[]) => void;
}

const EntryArea: React.FunctionComponent<Props> = ({ setJsons }) => {
  const pickfileRef = React.useRef<HTMLInputElement>(null);
  const onFileClick = React.useCallback(() => {
    pickfileRef.current?.click();
  }, [pickfileRef]);
  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { files } }) => {
      if (files && files.length > 0) {
        Promise.all(
          Array.prototype.map.call(files, (file) => file.text())
        ).then((jsons) => setJsons(jsons as string[]));
      }
    },
    [setJsons]
  );

  return (
    <form id={styles.jsonForm}>
      <label htmlFor={styles.jsonEntry}>Clock JSON</label>
      <button type="button" onClick={onFileClick}>
        open file
      </button>
      <input
        ref={pickfileRef}
        id="pickfile"
        type="file"
        accept=".ocs,.json,application/json"
        multiple
        onChange={onFileChange}
        className={styles.hidden}
      />
      <br />
    </form>
  );
};

export default EntryArea;
