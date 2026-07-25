import { useEffect, useState } from 'react';

export default function useCounter(target, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();
    const numericTarget = typeof target === 'string' ? parseInt(target.replace(/[^0-9]/g, ''), 10) : Number(target);
    const safeTarget = Number.isFinite(numericTarget) ? numericTarget : 0;
    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      setValue(Math.floor(progress * safeTarget));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}
