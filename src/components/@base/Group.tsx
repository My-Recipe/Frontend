import { css } from '@emotion/react';
import { CSSProperties, HTMLAttributes } from 'react';

const groupStyle = {
  default: css({
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
  }),
  position: {
    left: css({
      flexFlow: 'wrap',
      justifyContent: 'flex-start',
    }),
    right: css({
      flexFlow: 'wrap',
      justifyContent: 'flex-end',
    }),
    center: css({
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    }),
    apart: css({
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    }),
  },
  grow: css({
    '& > *': {
      flexGrow: 1,
    },
  }),
  nowrap: css({
    whiteSpace: 'nowrap',
    flexWrap: 'nowrap',
  }),
};

export interface GroupProps extends HTMLAttributes<HTMLDivElement> {
  position?: 'left' | 'right' | 'center' | 'apart';
  grow?: boolean;
  gap?: CSSProperties['gap'];
  nowrap?: boolean;
}

function Group({
  children,
  position = 'left',
  grow,
  gap,
  nowrap,
  ...props
}: GroupProps) {
  return (
    <div
      css={[
        groupStyle.default,
        groupStyle.position[position],
        grow && groupStyle.grow,
        nowrap && groupStyle.nowrap,
      ]}
      style={{ gap }}
      {...props}
    >
      {children}
    </div>
  );
}

export default Group;
