import { css } from '@emotion/react';

const globalStyles = {
  button: css({
    userSelect: 'none',
    cursor: 'pointer',
  }),
  animation: {
    all: (duration: number) =>
      css({ transition: `all ${duration}ms ease-out` }),
    transform: (duraion: number) =>
      css({
        transition: `transform ${duraion}ms ease-out,width ${duraion}ms ease-out`,
      }),
  },
  center: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
};

export default globalStyles;
