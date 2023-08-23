import { HTMLAttributes, ReactNode, useRef, useState } from 'react';
import { PopoverContext, PopoverContextType, defaultRect } from './context';

export type Rect = Pick<
  DOMRect,
  'left' | 'right' | 'top' | 'bottom' | 'height' | 'width'
>;

export type Position = 'bottom-center' | 'bottom-left' | 'bottom-right';

export interface PopoverMainProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  position: Position;
  preventCloseOnClickTrigger?: boolean;
}
function PopoverMain({
  children,
  position,
  preventCloseOnClickTrigger,
  ...props
}: PopoverMainProps) {
  const [isShow, setIsShow] = useState(false);
  const [triggerRect, setTriggerRect] = useState(defaultRect);
  const triggerRef = useRef<HTMLElement>(null);

  const triggerOnClick = () => {
    setIsShow((isShow) => (preventCloseOnClickTrigger ? true : !isShow));
  };

  const contextValue: PopoverContextType = {
    isShow,
    setIsShow,
    position,
    triggerRect,
    setTriggerRect,
    triggerRef,
    triggerOnClick,
  };

  return (
    <PopoverContext.Provider value={contextValue}>
      <div css={{ position: 'relative' }} {...props}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

export default PopoverMain;
