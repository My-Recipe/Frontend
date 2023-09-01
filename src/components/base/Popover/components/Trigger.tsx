import { ReactElement, cloneElement, useContext } from 'react';
import { PopoverContext } from '../context';

export interface PopoverTriggerProps {
  children: ReactElement;
  preventTrigger?: boolean;
}

function PopoverTrigger({ children, preventTrigger }: PopoverTriggerProps) {
  const { triggerOnClick, setTriggerRect, triggerRef } =
    useContext(PopoverContext);

  const ref = triggerRef;
  const onClick = () => {
    const element = ref?.current;
    if (!element || preventTrigger) return;

    const rect = element.getBoundingClientRect();
    setTriggerRect(rect);
    triggerOnClick();
  };

  const childrenToTriggerPopover = cloneElement(children, {
    onClick,
    ref,
  });

  return childrenToTriggerPopover;
}

export default PopoverTrigger;
