import { useRef, useEffect } from 'react';

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function useFocusTrap(isOpen) {
  const trapRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !trapRef.current) return;
    const trap = trapRef.current;
    const first = trap.querySelectorAll(FOCUSABLE)[0];
    first?.focus();

    const handleKey = (e) => {
      if (e.key !== 'Tab') return;
      const els = trap.querySelectorAll(FOCUSABLE);
      if (!els.length) return;
      const firstEl = els[0];
      const lastEl = els[els.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    trap.addEventListener('keydown', handleKey);
    return () => trap.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  return trapRef;
}
