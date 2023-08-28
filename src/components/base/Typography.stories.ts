import { COLOR_VARIANT_TEXT } from '@/utils/constants';
import { StoryObjWithCSSProp } from '@/utils/types';
import type { Meta } from '@storybook/react';
import Typography from './Typography';

const meta: Meta<typeof Typography> = {
  component: Typography,
  argTypes: {
    color: {
      control: 'select',
      options: COLOR_VARIANT_TEXT,
    },
  },
};

export default meta;

type Story = StoryObjWithCSSProp<typeof Typography>;

export const TypographyDefault: Story = {
  args: {
    children: 'Sample text',
    color: 'text.black',
  },
};
export const TypographyCustomColor: Story = {
  argTypes: {
    color: {
      control: 'color',
      presetColors: ['gray', 'red', 'black'],
    },
  },
  args: {
    children: 'Sample text',
    color: '#ababab',
  },
};
