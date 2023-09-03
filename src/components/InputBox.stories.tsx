import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { Stack } from '@base';
import { ForwardedRef, MouseEvent, useState } from 'react';
import InputBox, { InputBoxProps } from './InputBox';
import Tag from './Tag';

const meta: Meta<typeof InputBox> = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6Tcv8DaxZwjY4NYH0NAhmz/Design?type=design&node-id=537-2048&mode=dev',
    },
  },
  component: InputBox,
  argTypes: {
    onChange: {
      action: 'changed',
      description: '`value` 파라미터로 변경된 string을 전달하는 함수입니다',
    },
    onItemClick: {
      action: 'item-clicked',
      description: 'item들의 label과 index를 전달하는 함수입니다',
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
        '여름나기 좋은 수박',
        '수박화채 레시피',
        '최고로 맛있는 소고기',
      ],
    },
  },
  args: {
    value: '',
    searchItems: [
      '여름나기 좋은 메밀 소바',
      '메밀 소고기 레시피',
      '최고로 맛있는 메밀소면',
      '여름나기 좋은 수박',
      '수박화채 레시피',
      '최고로 맛있는 소고기',
    ],
    width: 450,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('textbox'));
  },
};

export default meta;

type Story = StoryObj<typeof InputBox>;

const InputBoxWithHooks = (args: InputBoxProps) => {
  const [value, setValue] = useState('');

  const handleOnChange = (val: string) => {
    setValue(val);
  };
  return (
    <InputBox
      {...args}
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

export const InputBoxWithControl: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('textbox'));
  },
};

export const InputBoxWithoutControl: Story = {
  render: (args) => <InputBoxWithHooks {...args} />,
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

export const InputBoxWithTags: Story = {
  args: {
    tags: (
      <>
        <Tag># 재료</Tag>
        <Tag># 재료 1</Tag>
      </>
    ),
  },
  play: () => {},
};

const InputBoxWithTagWithHooks = (args: InputBoxProps) => {
  const onClickTagClose = (
    e: MouseEvent,
    value: string,
    ref: ForwardedRef<unknown>,
  ) => {
    // setTags(tags.filter((item) => item.props.value !== value));
  };
  const [tags, setTags] = useState([
    <Tag onClose={onClickTagClose} value="ingr-1">
      # 재료 1
    </Tag>,
    <Tag onClose={onClickTagClose} value="ingr-2">
      # 재료 2
    </Tag>,
  ]);
  return (
    <Stack>
      <InputBox {...args} tags={tags} />
    </Stack>
  );
};

export const InputBoxWithTagControled: Story = {
  render: (args) => <InputBoxWithTagWithHooks {...args} />,
};
