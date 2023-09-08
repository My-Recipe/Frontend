import DesignSystem from '@/utils/designSystem';
import { StoryObjWithCSSProp } from '@/utils/types';
import type { Meta } from '@storybook/react';
import Group from './Group';

const meta: Meta<typeof Group> = {
  component: Group,
  argTypes: {
    position: {
      control: 'inline-radio',
      options: ['left', 'right', 'center', 'apart'],
      description: 'children을 정렬할 기준입니다',
    },
    grow: {
      control: 'boolean',
      description: 'children을 부모 사이즈에 꽉 맞춰 채울지 여부입니다',
    },
    gap: {
      control: { type: 'range', min: 0, max: 20, step: 2 },
      description:
        'children사이의 간격입니다. px 단위이며, 20px을 초과해도 됩니다',
    },
  },
};

export default meta;

type Story = StoryObjWithCSSProp<typeof Group>;

export const GroupDefault: Story = {
  render: (args) => (
    <Group
      css={{ '&>*': { padding: 10 }, width: 400, border: `1px solid gray` }}
      {...args}
    >
      <div css={{ backgroundColor: DesignSystem.Color.primary.yellow }}>
        child-1
      </div>
      <div
        css={{ backgroundColor: DesignSystem.Color.primary['yellow-hover'] }}
      >
        child-2
      </div>
      <div css={{ backgroundColor: DesignSystem.Color.secondary.green }}>
        child-3
      </div>
    </Group>
  ),
  args: {
    grow: false,
  },
};

export const GroupWithProps: Story = {
  ...GroupDefault,
  args: {
    position: 'apart',
    grow: true,
    gap: 10,
  },
};
