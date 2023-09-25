import type { Meta, StoryObj } from '@storybook/react';
import Modal from '.';
import { ModalProps } from './Modal';

const meta: Meta<typeof Modal> = {
  component: Modal,
  argTypes: {
    handleModalClose: {
      action: 'modal-close',
    },
  },
  args: {
    opened: true,
    children: 'modal content',
  },
};
export default meta;

type Story = StoryObj<typeof Modal>;

function ModalDefaultComponent(args: ModalProps) {
  return (
    <Modal
      {...args}
      css={{
        color: 'black',
      }}
    />
  );
}

export const ModalDefault: Story = {
  render: (args) => <ModalDefaultComponent {...args} />,
};
