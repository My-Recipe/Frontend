import { useRef, useState } from 'react';
import { Position, Rect } from './Popover';

interface Params {
  triggerRect: Rect;
  // popoverRect: Rect; => to Ref
  position: Position;
  triggerPopoverMargin?: number;
}

export function useRect(initialStateParams: Params) {
  const popoverRectRef = useRef<HTMLElement>(null);
  const getPopoverCoords = ({
    triggerRect,
    position,
    triggerPopoverMargin = 10,
  }: Params) => {
    const popoverRect = popoverRectRef.current?.getBoundingClientRect();
    if (!popoverRect?.width) return {};
    const triggerHeight = triggerRect.height;
    const triggerWidth = triggerRect.width;
    const popoverWidth = popoverRect.width;

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
        return {
          top: triggerHeight + triggerPopoverMargin,
          left: 0,
          width: triggerWidth,
        };
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
