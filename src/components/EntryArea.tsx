import {
  ChangeEventHandler,
  FunctionComponent,
  useCallback,
  useRef,
} from 'react';

interface Props {
  jsons?: string[];
  setJsons: (json: string[]) => void;
}

const EntryArea: FunctionComponent<Props> = ({ setJsons }) => {
  const pickfileRef = useRef<HTMLInputElement>(null);
  const onFileClick = useCallback(() => {
    pickfileRef.current?.click();
  }, [pickfileRef]);
  const onFileChange: ChangeEventHandler<HTMLInputElement> = useCallback(
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
    <form id="jsonForm">
      <label>
        {'Clock JSON: '}
        <button type="button" onClick={onFileClick}>
          open file
        </button>
      </label>
      <input
        ref={pickfileRef}
        id="pickfile"
        type="file"
        accept=".ocs,.json,application/json"
        multiple
        onChange={onFileChange}
        className="hidden"
      />
      <br />
    </form>
  );
};

export default EntryArea;
