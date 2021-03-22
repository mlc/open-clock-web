import { FunctionComponent, useCallback, useRef } from 'react';

const Fullscreenable: FunctionComponent = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const enter = useCallback(() => {
    ref.current?.firstElementChild?.requestFullscreen({
      navigationUI: 'show',
    });
  }, [ref]);

  return (
    <>
      <button type="button" onClick={enter}>
        Fullscreen
      </button>
      <div ref={ref}>{children}</div>
    </>
  );
};

export default Fullscreenable;
