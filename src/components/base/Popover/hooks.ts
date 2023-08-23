import { RefObject, useEffect, useRef, useState } from 'react';
import { Position, Rect } from './Popover';

/**
 * 대상 ref를 제외한 바깥쪽 클릭이벤트를 감지해주는 hooks 입니다.
 * @param handler - outside click시 실행되는 callback 함수
 * @param preventClickRefs - click 이벤트에서 제외할 ref / refs
 * @returns 기준이 되는 ref
 */
export function useClickOutside<T extends HTMLElement>(
  handler: () => void,
  preventClickRefs?: RefObject<HTMLElement>[] | RefObject<HTMLElement>,
) {
  const ref = useRef<T>();

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const element = e.target;

      if (element instanceof Node && preventClickRefs) {
        if (Array.isArray(preventClickRefs)) {
          for (const ref of preventClickRefs) {
            if (ref.current && ref.current.contains(element)) return;
          }
        } else if (preventClickRefs.current?.contains(element)) {
          return;
        }
      }

      if (
        element instanceof Node &&
        ref.current &&
        !ref.current.contains(element)
      ) {
        handler();
      }
    };

    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  }, [ref, handler, preventClickRefs]);

  return ref;
}

interface Params {
  triggerRect: Rect;
  // popoverRect: Rect; => to Ref
  position: Position;
  triggerPopoverMargin?: number;
}

export function useRect(initialStateParams: Params) {
  const popoverRectRef = useRef<HTMLElement>(null);
  const popoverRect = popoverRectRef.current?.getBoundingClientRect();
  const getPopoverCoords = ({
    triggerRect,
    position,
    triggerPopoverMargin = 10,
  }: Params) => {
    const triggerHeight = triggerRect.height;
    const triggerWidth = triggerRect.width;
    const popoverWidth = popoverRect?.width || 0;

    switch (position) {
      case 'bottom-center':
        return {
          top: triggerHeight + triggerPopoverMargin,
          left: triggerWidth / 2 - popoverWidth / 2,
        };
      case 'bottom-left':
        return {
          top: triggerHeight + triggerPopoverMargin,
          left: 0,
        };
      case 'bottom-right':
        return {
          top: triggerHeight + triggerPopoverMargin,
          right: 0,
          left: 'auto',
        };
      default:
        return {};
    }
  };

  const [rectCoords, setRectCoords] = useState(
    getPopoverCoords(initialStateParams),
  );

  const setRect = (newStateParams: Params) => {
    setRectCoords(getPopoverCoords(newStateParams));
  };

  return { ref: popoverRectRef, rect: rectCoords, setRect };
}
