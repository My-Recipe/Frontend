import { Color } from '@/utils/designSystem';
import type { Meta, StoryObj } from '@storybook/react';
import TabsBody from './TabsBody';

const meta: Meta<Omit<typeof TabsBody, 'defaultProps'>> = {
  component: TabsBody,
  args: {
    value: 'tab-value',
    bgColor: Color.primary['yellow_hover'],
    children: 'mybody',
  },
};

export default meta;

type Story = StoryObj<typeof TabsBody>;

export const DefaultTabsBody: Story = {
  render: (args) => <TabsBody {...args} />,
};

export const TabsBodyWithCssProps: Story = {
  args: {
    css: { width: 400, height: 400 },
  },
  render: (args) => <TabsBody {...args} />,
};
