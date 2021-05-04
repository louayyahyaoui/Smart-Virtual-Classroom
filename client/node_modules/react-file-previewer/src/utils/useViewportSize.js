import { pathOr } from 'ramda';
import { useState, useEffect } from 'react';

const useViewportSize = viewportElem => {
  const isClient = typeof window === 'object';

  const [size, setSize] = useState({
    width: pathOr(0, ['current', 'clientWidth'], viewportElem),
    height: pathOr(0, ['current', 'clientHeight'], viewportElem),
  });

  useEffect(() => {
    setSize({
      width: pathOr(0, ['current', 'clientWidth'], viewportElem),
      height: pathOr(0, ['current', 'clientHeight'], viewportElem),
    });
  }, [viewportElem]);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setSize({
        width: pathOr(0, ['current', 'clientWidth'], viewportElem),
        height: pathOr(0, ['current', 'clientHeight'], viewportElem),
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewportElem]);

  return size;
};

export default useViewportSize;
