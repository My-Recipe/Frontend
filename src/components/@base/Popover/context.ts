import { Dispatch, RefObject, SetStateAction, createContext } from 'react';
import { Position, Rect } from './Popover';

export const defaultRect = {
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0,
};

export interface PopoverContextType {
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  position: Position;
  triggerRect: Rect;
  setTriggerRect: Dispatch<SetStateAction<Rect>>;
  triggerRef: RefObject<HTMLElement> | undefined;
  triggerOnClick: () => void;
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
  triggerRef: undefined,
  triggerOnClick: () => {
    throw new Error(
      'PopoverContext triggerOnClick should be used under provider',
    );
  },
});
