import { ReactElement, cloneElement, useContext, useRef } from 'react';
import { PopoverContext } from './Popover';

export interface PopoverTriggerProps {
  children: ReactElement;
}

function PopoverTrigger({ children, ...props }: PopoverTriggerProps) {
  const { setIsShow, setTriggerRect, triggerRef } = useContext(PopoverContext);

  const localRef = useRef<HTMLElement>(null);
  const ref = triggerRef || localRef;

  const onClick = () => {
    const element = ref.current;
    if (element === null) return;

    const rect = element.getBoundingClientRect();
    setTriggerRect(rect);
    setIsShow(true);
  };

  const childrenToTriggerPopover = cloneElement(children, {
    onClick,
    ref,
  });

  return childrenToTriggerPopover;
}

export default PopoverTrigger;
