import * as React from 'react';

const Fullscreenable: React.FunctionComponent = ({ children }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const enter = React.useCallback(() => {
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
