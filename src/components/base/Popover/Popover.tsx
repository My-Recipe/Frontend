import {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  createContext,
  useRef,
  useState,
} from 'react';

export type Rect = Pick<
  DOMRect,
  'left' | 'right' | 'top' | 'bottom' | 'height' | 'width'
>;

const defaultRect = {
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0,
};

export type Position = 'bottom-center' | 'bottom-left' | 'bottom-right';

export interface PopoverContextType {
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  position: Position;
  triggerRect: Rect;
  setTriggerRect: Dispatch<SetStateAction<Rect>>;
  triggerRef?: RefObject<HTMLElement>;
}
export const PopoverContext = createContext<PopoverContextType>({
  isShow: false,
  setIsShow: () => {
    throw new Error('PopoverContext setIsShow should be used under provider');
  },
  position: 'bottom-center',
  triggerRect: defaultRect,
  setTriggerRect: () => {
    throw new Error(
      'PopoverContext setTriggerRect should be used under provider',
    );
  },
});

export interface PopoverMainProps {
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

  const contextValue: PopoverContextType = {
    isShow,
    setIsShow,
    position,
    triggerRect,
    setTriggerRect,
    triggerRef: preventCloseOnClickTrigger ? triggerRef : undefined,
  };

  return (
    <PopoverContext.Provider value={contextValue}>
      <div css={{ position: 'relative' }}>{children}</div>
    </PopoverContext.Provider>
  );
}

export default PopoverMain;
