import { mergeRef } from '@/utils/components';
import {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { PopoverContext, Position, Rect } from './Popover';
import { useClickOutside } from './hooks';

export interface PopoverContentProps extends ContentInternalProps {
  children: ReactNode;
}

function PopoverContent({ children, ...props }: PopoverContentProps) {
  const { isShow } = useContext(PopoverContext);
  if (!isShow) return null;
  return <ContentInternal {...props}>{children}</ContentInternal>;
}

export interface ContentInternalProps
  extends HTMLAttributes<HTMLDialogElement> {
  children: ReactNode;
  triggerPopoverMargin?: number;
}

const getPopoverCoords = ({
  triggerRect,
  popoverRect,
  position,
  triggerPopoverMargin = 10,
}: {
  triggerRect: Rect;
  popoverRect: Rect;
  position: Position;
  triggerPopoverMargin?: number;
}) => {
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
      return {};
  }
};

function ContentInternal({
  children,
  triggerPopoverMargin,
  ...props
}: ContentInternalProps) {
  const { triggerRect, position, setIsShow, triggerRef } =
    useContext(PopoverContext);
  const ref = useRef<HTMLDialogElement>(null);
  const [coords, setCoords] = useState<
    Pick<CSSProperties, 'left' | 'right' | 'top' | 'bottom'>
  >({ left: 'auto', top: 'auto' });

  useLayoutEffect(() => {
    const element = ref.current;
    if (element === null) return;

    const popoverRect = element.getBoundingClientRect();
    const coords = getPopoverCoords({
      triggerRect,
      popoverRect,
      position,
      triggerPopoverMargin,
    });

    setCoords(coords);
  }, []);

  const dismiss = () => setIsShow(false);
  const refClickOutside = useClickOutside(dismiss, triggerRef);

  const mergedRef = mergeRef(ref, refClickOutside);

  return (
    <dialog
      open={true}
      ref={mergedRef}
      css={{
        position: 'absolute',
        ...coords,
        margin: 0,
        border: 0,
      }}
      {...props}
    >
      {children}
    </dialog>
  );
}

export default PopoverContent;
