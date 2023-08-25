import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { useState } from 'react';
import InputBox from './InputBox';

const meta: Meta<typeof InputBox> = {
  component: InputBox,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
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
  render: () => <InputBoxWithHooks />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByRole('textbox'), '메밀 소바');
  },
};
