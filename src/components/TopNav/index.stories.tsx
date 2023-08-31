import type { Meta, StoryObj } from '@storybook/react';
import TopNav from '.';

const meta: Meta<typeof TopNav> = {
  component: TopNav,
  args: {
    user: {
      email: 'test@gmail.com',
      name: '테스트 유저',
    },
  },
};
export default meta;

type Story = StoryObj<typeof TopNav>;

export const TopNavDefault: Story = {};
