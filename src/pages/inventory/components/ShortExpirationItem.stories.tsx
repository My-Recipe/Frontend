import type { Meta, StoryObj } from '@storybook/react';
import moment from 'moment';
import ShortExpirationItem from './ShortExpirationItem';

const meta: Meta<typeof ShortExpirationItem> = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6Tcv8DaxZwjY4NYH0NAhmz/Design?type=design&node-id=733-6585&mode=design&t=CWLm1rDjU9r3ycwv-4',
    },
  },
  component: ShortExpirationItem,
  args: {
    item: {
      name: '김치',
      quantity: '3개',
      registrationDate: moment('2023-02-05'),
      expirationDate: moment('2024-02-05'),
    },
  },
};
export default meta;

type Story = StoryObj<typeof ShortExpirationItem>;

export const ShortExpirationItemDefault: Story = {};

export const ShortExpirationItemExpired: Story = {
  args: {
    item: {
      name: '김치',
      quantity: '3개',
      registrationDate: moment('2023-02-05'),
      expirationDate: moment('2021-02-05'),
    },
  },
};
