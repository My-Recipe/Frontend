import type { Meta, StoryObj } from '@storybook/react';
import Numbers from './Numbers';

const meta: Meta<typeof Numbers> = {
  parameters: {
    design: {
      type: 'figma',
      url: 'figma link',
    },
  },
  component: Numbers,
  args: {
    children: 1,
  },
};
export default meta;

type Story = StoryObj<typeof Numbers>;

export const NumbersDefault: Story = {};
