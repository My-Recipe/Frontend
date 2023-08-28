import { StoryObjWithCSSProp } from '@/utils/types';
import type { Meta } from '@storybook/react';
import Stroke from './Stroke';

const meta: Meta<typeof Stroke> = {
  component: Stroke,
  argTypes: {
    width: {
      control: {
        type: 'number',
        min: 20,
        max: 800,
        step: 10,
      },
    },
  },
};

export default meta;

type Story = StoryObjWithCSSProp<typeof Stroke>;

export const StrokeDefault: Story = {
  args: { width: 100 },
};
