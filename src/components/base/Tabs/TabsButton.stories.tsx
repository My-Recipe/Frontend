import { Color } from '@/utils/designSystem';
import { StoryObjWithCSSProp } from '@/utils/types';
import type { Meta } from '@storybook/react';
import TabsButton from './TabsButton';

const meta: Meta<Omit<typeof TabsButton, 'defaultProps'>> = {
  component: TabsButton,
};

export default meta;

type Story = StoryObjWithCSSProp<typeof TabsButton>;

export const DefaultTabsButton: Story = {
  args: {
    bgColor: Color.primary['yellow'],
    children: 'mybutton',
  },
  render: (args) => <TabsButton {...args} />,
};

export const TabsButtonWithCssProps: Story = {
  args: {
    ...DefaultTabsButton.args,
    css: {
      borderRadius: 40,
      padding: 10,
      border: `1px solid ${Color.text.gray}`,
      color: Color.text.gray,
    },
  },
  render: (args) => <TabsButton {...args} />,
};
