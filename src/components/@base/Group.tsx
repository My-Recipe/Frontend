import { css } from '@emotion/react';
import { CSSProperties, HTMLAttributes } from 'react';

const styles = {
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
  wrapChild: css({
    '& > *': {
      whiteSpace: 'break-spaces',
    },
  }),
};

export interface GroupProps extends HTMLAttributes<HTMLDivElement> {
  position?: 'left' | 'right' | 'center' | 'apart';
  align?: CSSProperties['alignItems'];
  grow?: boolean;
  gap?: CSSProperties['gap'];
  nowrap?: boolean;
  wrapChild?: boolean;
}

function Group({
  children,
  position = 'left',
  align,
  grow,
  gap,
  nowrap,
  wrapChild,
  style,
  ...props
}: GroupProps) {
  return (
    <div
      css={[
        styles.default,
        styles.position[position],
        grow && styles.grow,
        nowrap && styles.nowrap,
        wrapChild && styles.wrapChild,
      ]}
      style={{ gap, alignItems: align, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

export default Group;
