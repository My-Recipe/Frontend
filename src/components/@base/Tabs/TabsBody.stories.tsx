import DesignSystem from '@/utils/designSystem';
import { StoryObjWithCSSProp } from '@/utils/types';
import type { Meta } from '@storybook/react';
import TabsBody from './TabsBody';

const meta: Meta<Omit<typeof TabsBody, 'defaultProps'>> = {
  component: TabsBody,
};

export default meta;

type Story = StoryObjWithCSSProp<typeof TabsBody>;

export const DefaultTabsBody: Story = {
  args: {
    value: 'tab-value',
    bgColor: DesignSystem.Color.primary['yellow-hover'],
    children: 'mybody',
  },
  render: (args) => <TabsBody {...args} />,
};

export const TabsBodyWithCssProps: Story = {
  args: {
    ...DefaultTabsBody.args,
    css: { width: 400, height: 400 },
  },
  render: (args) => <TabsBody {...args} />,
};
