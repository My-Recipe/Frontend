import type { Meta, StoryObj } from '@storybook/react';
import PlusMinusIcon from './PlusMinusIcon';

const meta: Meta<typeof PlusMinusIcon> = {
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
  component: PlusMinusIcon,
  args: {
    plus: true,
  },
};
export default meta;

type Story = StoryObj<typeof PlusMinusIcon>;

export const PlusMinusIconDefault: Story = {};
