import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import CheckBox from './CheckBox';

const meta: Meta<typeof CheckBox> = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6Tcv8DaxZwjY4NYH0NAhmz/Design?type=design&node-id=546-2396&mode=dev',
    },
  },
  component: CheckBox,
  args: {
    label: '전체공개',
  },
  argTypes: {
    onCheckChanged: {
      action: 'check-changed',
    },
    initialValue: {
      control: 'boolean',
    },
  },
};
export default meta;

type Story = StoryObj<typeof CheckBox>;

export const CheckBoxDefault: Story = {};

export const CheckBoxWithAction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('전체공개'));
    await userEvent.click(canvas.getByText('전체공개'));
  },
  args: {
    initialValue: true,
  },
};
