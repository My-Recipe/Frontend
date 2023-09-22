import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import TopNav from '.';

const meta: Meta<typeof TopNav> = {
  component: TopNav,
  argTypes: {},
  args: {
    user: {
      email: 'test@gmail.com',
      name: '테스트 유저',
    },
    navBarMenu: [
      { label: 'MY RECIPE', path: '/mypage' },
      { label: 'INVENTORY', path: '/inventory' },
      { label: 'SEARCH', path: '/search' },
    ],
  },
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof TopNav>;

export const TopNavDefault: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('INVENTORY'));
    await userEvent.click(canvas.getByText('SEARCH'));
    await userEvent.click(canvas.getByText('MY RECIPE'));
  },
};
