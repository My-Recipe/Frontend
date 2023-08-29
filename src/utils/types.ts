import { Interpolation, Theme } from '@emotion/react';
import { StoryObj } from '@storybook/react';
export type StoryObjWithCSSProp<T> = StoryObj<T> & {
  args?: { css?: Interpolation<Theme> };
};
