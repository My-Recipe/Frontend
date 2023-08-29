import { StoryObjWithCSSProp } from '@/utils/types';
import type { Meta } from '@storybook/react';
import Tag from './Tag';

const meta: Meta<typeof Tag> = {
  component: Tag,
  argTypes: {
    children: {
      description: 'string을 받으면 내용을 그대로 보여줍니다',
    },
    value: {
      description:
        'optional props로, string을 전달받으며 undefined면 내부적으로 children을 사용합니다',
    },
    onClose: {
      action: 'clickedClose',
      description: '`event`, `value`를 파라미터로 전달합니다',
    },
    onClick: {
      action: 'clicked',
      description: '`event`, `value`를 파라미터로 전달합니다',
    },
  },
};

export default meta;

type Story = StoryObjWithCSSProp<typeof Tag>;

export const TagDefault: Story = {
  args: {
    children: 'tag-example',
  },
};
export const TagWithValue: Story = {
  args: {
    children: 'tag-example1',
    value: 'tag-value-1',
  },
};
