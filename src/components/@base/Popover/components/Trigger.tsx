import { ReactElement, cloneElement, useContext, useEffect } from 'react';
import { PopoverContext } from '../context';

export interface PopoverTriggerProps {
  children?: ReactElement;
  preventTrigger?: boolean;
}

function PopoverTrigger({ children, preventTrigger }: PopoverTriggerProps) {
  const { triggerOnClick, setTriggerRect, triggerRef } =
    useContext(PopoverContext);

  const ref = triggerRef;
  const onClick = () => {
    if (preventTrigger) return;
    triggerOnClick();
  };

  useEffect(() => {
    const element = ref?.current;
    if (!element) return;
    setTriggerRect(element.getBoundingClientRect());
  }, [ref?.current]);

  if (children) {
    const childrenToTriggerPopover = cloneElement(children, {
      onClick,
      ref,
    });
    return childrenToTriggerPopover;
  }
}

export default PopoverTrigger;
