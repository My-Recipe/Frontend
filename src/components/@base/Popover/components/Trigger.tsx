import { ReactElement, RefObject, cloneElement, useContext } from 'react';
import { PopoverContext } from '../context';

export interface PopoverTriggerProps {
  children?: ReactElement;
  preventTrigger?: boolean;
  renderTriggerComponent?: ({
    ref,
    onClick,
  }: {
    ref: RefObject<HTMLElement> | undefined;
    onClick: () => void;
  }) => JSX.Element;
}

function PopoverTrigger({
  children,
  preventTrigger,
  renderTriggerComponent,
}: PopoverTriggerProps) {
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

  if (renderTriggerComponent) return renderTriggerComponent({ ref, onClick });

  if (children) {
    const childrenToTriggerPopover = cloneElement(children, {
      onClick,
      ref,
    });
    return childrenToTriggerPopover;
  }
}

export default PopoverTrigger;
