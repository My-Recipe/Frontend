import { MutableRefObject, RefCallback } from 'react';

export function mergeRef<T>(
  ...refs: Array<MutableRefObject<T> | RefCallback<T>>
) {
  return (element: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(element);
      } else {
        ref.current = element;
      }
    });
  };
}
