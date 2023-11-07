import type { Meta, StoryObj } from '@storybook/react';
import TextInput from './TextInput';

const meta: Meta<typeof TextInput> = {
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
  component: TextInput,
  args: {},
};
export default meta;

type Story = StoryObj<typeof TextInput>;

export const TextInputDefault: Story = {};
