import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: { onClick: { action: 'clicked' } },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Button1: Story = {
  args: {
    variant: 'icon',
    children: 'label',
  },
};

export const Button2: Story = {
  args: {
    variant: 'outline',
    children: 'label',
  },
};

export const Button3: Story = {
  args: {
    children: 'label',
  },
};
