import { Color } from '@/utils/designSystem';
import { StoryObjWithCSSProp } from '@/utils/types';
import type { Meta } from '@storybook/react';
import Group from './Group';

const meta: Meta<typeof Group> = {
  component: Group,
  argTypes: {
    position: {
      control: 'inline-radio',
      options: ['left', 'right', 'center', 'apart'],
    },
    grow: { control: 'boolean' },
    gap: {
      control: { type: 'range', min: 0, max: 20, step: 2 },
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
      <div css={{ backgroundColor: Color.primary.yellow }}>child-1</div>
      <div css={{ backgroundColor: Color.primary.yellow_hover }}>child-2</div>
      <div css={{ backgroundColor: Color.primary.green }}>child-3</div>
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
