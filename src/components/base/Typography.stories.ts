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
      description: '디자인시스템의 color나 기본 CSS의 color를 받습니다',
    },
    variant: {
      control: 'inline-radio',
      options: ['button', 'display', 'headline', 'subtitle', 'body', 'info'],
      description: '디자인시스템의 Typography를 받습니다',
    },
  },
  args: {
    children: 'Sample text',

    variant: 'body',
  },
};

export default meta;

type Story = StoryObjWithCSSProp<typeof Typography>;

export const TypographyDefault: Story = {
  args: {
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
    color: '#ababab',
  },
};
