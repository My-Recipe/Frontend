import type { Meta, StoryObj } from '@storybook/react';
import Modal from '.';

const meta: Meta<typeof Modal> = {
  component: Modal,
  args: {
    opened: true,
  },
};
export default meta;

type Story = StoryObj<typeof Modal>;

export const ModalDefault: Story = {};
