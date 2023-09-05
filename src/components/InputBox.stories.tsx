import type { Meta, StoryObj } from '@storybook/react';
import { fireEvent, userEvent, within } from '@storybook/testing-library';

import InputBox from './InputBox';

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
      description: '변경되는 value / tag state를 전달하는 함수입니다',
    },
    onItemClick: {
      action: 'item-clicked',
      description: 'item들의 label과 index를 전달하는 함수입니다',
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
      description:
        'popover content 부분에 보여줄 리스트입니다. 클릭시 검색어가 자동완성됩니다',
    },
    tags: {
      control: 'check',
      options: ['재료 1', '재료 2', '재료 3', '재료 4', '재료 5'],
      mapping: {
        '재료 1': { value: 'ingr-1', label: '# 재료 1' },
        '재료 2': { value: 'ingr-2', label: '# 재료 2' },
        '재료 3': { value: 'ingr-3', label: '# 재료 3' },
        '재료 4': { value: 'ingr-4', label: '# 재료 4' },
        '재료 5': { value: 'ingr-5', label: '# 재료 5' },
      },
      description:
        '태그 리스트입니다. 클릭시 검색어를 숨기고 input창에 태그를 띄워줍니다',
    },
  },
  args: {
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

export const InputBoxDefault: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('textbox'));
    fireEvent.change(canvas.getByRole('textbox'), {
      target: { value: '메밀 소고기' },
    });
  },
};

export const InputBoxWithTags: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
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
    tags: [
      { value: 'ingr-1', label: '# 재료 1' },
      { value: 'ingr-2', label: '# 재료 2' },
      { value: 'ingr-3', label: '# 재료 3' },
      { value: 'ingr-4', label: '# 재료 4' },
      { value: 'ingr-5', label: '# 재료 5' },
    ],
  },
};
