import { css } from '@emotion/react';

const globalStyles = {
  button: css({
    userSelect: 'none',
    cursor: 'pointer',
  }),
  animation: {
    all: (duration: number) => css({ transition: `all ${duration}ms ease` }),
    transform: (duraion: number) =>
      css({
        transition: `transform ${duraion}ms ease,width ${duraion}ms ease`,
      }),
  },
};

export default globalStyles;
