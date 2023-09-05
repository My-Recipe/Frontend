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
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6Tcv8DaxZwjY4NYH0NAhmz/Design?type=design&node-id=537-1819&mode=dev',
    },
  },
};

export default meta;

type Story = StoryObjWithCSSProp<typeof Tag>;

export const TagDefault: Story = {
  args: {
    children: '# 재료 3',
  },
};
export const TagWithValue: Story = {
  args: {
    children: '# 재료',
    value: 'tag-value-1',
  },
};
