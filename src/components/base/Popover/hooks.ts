import { RefObject, useEffect, useRef } from 'react';

export function useClickOutside(
  outsideOnClick: () => void,
  preventTriggerTargetRef?: RefObject<HTMLElement>,
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (element === null) return;

    const onClick = (e: MouseEvent) => {
      if (
        e.target instanceof Node &&
        preventTriggerTargetRef?.current &&
        preventTriggerTargetRef.current.contains(e.target)
      )
        return;
      if (e.target instanceof Node && element && !element.contains(e.target)) {
        // e.currentTarge 이 element의 자손인지
        outsideOnClick();
      }
    };

    setTimeout(() => document.addEventListener('click', onClick), 0);
    return () => {
      setTimeout(() => document.removeEventListener('click', onClick), 0);
    };
  }, []);

  return ref;
}
