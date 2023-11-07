import type { Meta, StoryObj } from '@storybook/react';
import Editor from './Editor';

const meta: Meta<typeof Editor> = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6Tcv8DaxZwjY4NYH0NAhmz/Design?type=design&node-id=466-2537&mode=dev',
    },
  },
  component: Editor,
  args: {},
};
export default meta;

type Story = StoryObj<typeof Editor>;

export const EditorDefault: Story = {};
