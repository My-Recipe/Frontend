import { MouseEvent, ReactElement, cloneElement, useContext } from 'react';
import { PopoverContext } from '../context';

export interface PopoverCloseProps {
  children: ReactElement;
}

function PopoverClose({ children }: PopoverCloseProps) {
  const { setIsShow } = useContext(PopoverContext);
  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsShow(false);
  };
  const childrenToClosePopover = cloneElement(children, { onClick });
  return childrenToClosePopover;
}

export default PopoverClose;
