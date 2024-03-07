import type { Meta, StoryObj } from '@storybook/react';
import IngrInputBox from './IngrInputBox';

const meta: Meta<typeof IngrInputBox> = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6Tcv8DaxZwjY4NYH0NAhmz/Design?type=design&node-id=733-6359&mode=design&t=CWLm1rDjU9r3ycwv-4',
    },
  },
  component: IngrInputBox,
  args: {
    type: 'input',
  },
};
export default meta;

type Story = StoryObj<typeof IngrInputBox>;

export const IngrInputBoxTypeInput: Story = {};
export const IngrInputBoxTypeEdit: Story = {
  args: {
    type: 'edit',
  },
};
