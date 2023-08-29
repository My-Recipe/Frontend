import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { useState } from 'react';
import InputBox from './InputBox';

const meta: Meta<typeof InputBox> = {
  component: InputBox,
  argTypes: {
    onChange: {
      action: 'changed',
      description: '`value` 파라미터로 변경된 string을 전달하는 함수입니다',
    },
    value: {
      control: 'text',
      description: '`value` state입니다',
    },
    searchItems: {
      control: 'check',
      options: [
        '여름나기 좋은 메밀 소바',
        '메밀 소고기 레시피',
        '최고로 맛있는 메밀소면',
      ],
    },
  },
  args: {
    value: '',
    searchItems: [
      '여름나기 좋은 메밀 소바',
      '메밀 소고기 레시피',
      '최고로 맛있는 메밀소면',
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('textbox'));
  },
};

export default meta;

type Story = StoryObj<typeof InputBox>;

const InputBoxWithHooks = () => {
  const [value, setValue] = useState('');

  const handleOnChange = (val: string) => {
    setValue(val);
  };
  return (
    <InputBox
      searchItems={[
        '여름나기 좋은 메밀 소바',
        '메밀 소고기 레시피',
        '최고로 맛있는 메밀소면',
      ]}
      value={value}
      onChange={handleOnChange}
    />
  );
};

export const Default: Story = {
  args: {},

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('textbox'));
  },
};

export const InputBoxAction: Story = {
  render: () => <InputBoxWithHooks />,
  args: {
    value: undefined,
    onChange: undefined,
    searchItems: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByRole('textbox'), '메밀 소바');
  },
};
