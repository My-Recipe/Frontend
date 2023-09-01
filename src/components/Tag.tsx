import IconCacel from '@/assets/icon-cancel.svg';
import DesignSystem from '@/utils/designSystem';
import { Group } from '@base';
import { css } from '@emotion/react';
import { HTMLAttributes, MouseEvent, useState } from 'react';

const defaultStyle = css({
  width: 'auto',
  height: 42,
  padding: '9px 15px',
  borderRadius: 4,
  background: DesignSystem.Color.primary.yellow,
  cursor: 'pointer',
  userSelect: 'none',
});
const hoverStyle = css({
  ':hover': {
    background: DesignSystem.Color.primary['yellow-hover'],
  },
});

export interface TagProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  onClose?: (e: MouseEvent, value: string) => void;
  value?: string;
  onClick?: (e: MouseEvent, value: string) => void;
}

function Tag({
  children,
  onClose,
  value: propsValue,
  onClick,
  ...props
}: TagProps) {
  const [isHover, setIsHover] = useState(false);
  const value =
    propsValue ||
    (typeof children === 'string' && children) ||
    'undefined value';

  return (
    <div css={{ display: 'inline-block' }}>
      <Group
        gap={12}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        css={[defaultStyle, hoverStyle, DesignSystem.Text.button]}
        onClick={(e) =>
          onClick && e.target === e.currentTarget && onClick(e, value)
        }
        {...props}
      >
        {children}
        {isHover && (
          <img onClick={(e) => onClose && onClose(e, value)} src={IconCacel} />
        )}
      </Group>
    </div>
  );
}

export default Tag;
