import { css } from '@emotion/react';
import { CSSProperties, HTMLAttributes } from 'react';

const commonStyle = css({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
});

const groupStyle = {
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
};

const growStyle = css({
  '& > *': {
    flexGrow: 1,
  },
});

export interface GroupProps extends HTMLAttributes<HTMLDivElement> {
  position?: 'left' | 'right' | 'center' | 'apart';
  grow?: boolean;
  gap?: CSSProperties['gap'];
}

function Group({
  children,
  position = 'left',
  grow,
  gap,
  ...props
}: GroupProps) {
  return (
    <div
      css={[grow && growStyle, commonStyle, groupStyle[position], { gap }]}
      {...props}
    >
      {children}
    </div>
  );
}

export default Group;
