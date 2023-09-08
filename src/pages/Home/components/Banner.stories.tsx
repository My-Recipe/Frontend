import type { Meta, StoryObj } from '@storybook/react';
import Banner from './Banner';

const meta: Meta<typeof Banner> = {
  parameters: {
    design: {
      type: 'figma',
      url: 'figma link',
    },
  },
  component: Banner,
  args: {},
};
export default meta;

type Story = StoryObj<typeof Banner>;

export const BannerDefault: Story = {};
