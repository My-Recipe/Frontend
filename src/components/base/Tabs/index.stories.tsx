import { Color } from '@/utils/designSystem';
import type { Meta, StoryObj } from '@storybook/react';
import Tabs from '.';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  argTypes: { onClick: { action: 'clicked' } },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const NoOptionsTabs: Story = {
  render: (args) => (
    <Tabs>
      <Tabs.Button bgColor={Color.primary['yellow']} value="tab1">
        tab1 button
      </Tabs.Button>
      <Tabs.Button bgColor={Color.primary['yellow_hover']} value="tab2">
        tab2 button
      </Tabs.Button>
      <Tabs.Body bgColor={Color.primary['yellow']} value="tab1">
        tab1 body
      </Tabs.Body>
      <Tabs.Body bgColor={Color.primary['yellow_hover']} value="tab2">
        tab2 body
      </Tabs.Body>
    </Tabs>
  ),
};
