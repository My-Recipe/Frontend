import type { Meta, StoryContext, StoryObj } from '@storybook/react';
import { fireEvent, userEvent, within } from '@storybook/testing-library';

import { Group, Stack } from '@base';
import { MouseEvent, useState } from 'react';
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

const InputBoxWithTagWithHooks = (
  args: InputBoxProps,
  context: StoryContext,
) => {
  const [tags, setTags] = useState([{ value: 'ingr-1', label: '# 재료 1' }]);
  const [value, setValue] = useState('');
  const allTags = [
    { value: 'ingr-1', label: '# 재료 1' },
    { value: 'ingr-2', label: '# 재료 2' },
    { value: 'ingr-3', label: '# 재료 3' },
    { value: 'ingr-4', label: '# 재료 4' },
    { value: 'ingr-5', label: '# 재료 5' },
  ];
  const restTags = allTags.filter(
    (tag) => !tags.some((targetTag) => targetTag.value === tag.value),
  );
  const onClickTagClose = (e: MouseEvent, value: string) => {
    setTags(tags.filter((item) => item.value !== value));
  };
  const onClickTag = (e: MouseEvent, value: string) => {
    const filterTag = allTags.find((item) => item.value === value);
    if (filterTag) setTags([...tags, filterTag]);
  };

  return (
    <Stack css={{ width: '100%' }} spacing={24}>
      <InputBox
        tags={
          tags.length &&
          tags.map((props, index) => (
            <Tag
              key={`${props.label}-${props.value}-${index}`}
              {...props}
              onClose={onClickTagClose}
            />
          ))
        }
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
        searchItems={[
          '여름나기 좋은 메밀 소바',
          '메밀 소고기 레시피',
          '최고로 맛있는 메밀소면',
          '여름나기 좋은 수박',
          '수박화채 레시피',
          '최고로 맛있는 소고기',
        ]}
      />
      <Group gap={12}>
        {restTags.map((props, index) => (
          <Tag
            key={`${props.label}-${props.value}-${index}`}
            {...props}
            onClick={onClickTag}
          />
        ))}
      </Group>
    </Stack>
  );
};

export const InputBoxWithTagsControled: Story = {
  render: (args, { hooks }) => <InputBoxWithTagWithHooks {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText('# 재료 1');
    await userEvent.hover(button, { delay: 200 });
    await userEvent.click(canvas.getByTestId('tag-close-icon'));
    await userEvent.click(canvas.getByText('# 재료 3'));
    await userEvent.click(canvas.getByText('# 재료 5'));
    await userEvent.hover(canvas.getByText('# 재료 3'));
    await userEvent.click(canvas.getByTestId('tag-close-icon'));
    await userEvent.hover(canvas.getByText('# 재료 5'));
    await userEvent.click(canvas.getByTestId('tag-close-icon'));
    await userEvent.click(canvas.getByRole('textbox'));
    fireEvent.change(canvas.getByRole('textbox'), {
      target: { value: '메밀 소바' },
    });
    await canvas.findByText('여름나기 좋은 메밀 소바');
  },
  args: {
    width: '100%',
  },
};
