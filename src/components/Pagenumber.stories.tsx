import { StoryObjWithCSSProp } from '@/utils/types';
import type { Meta } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import Pagenumber from './Pagenumber';

const meta: Meta<typeof Pagenumber> = {
  component: Pagenumber,
  argTypes: {
    onPageChange: {
      action: 'page-changed',
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6Tcv8DaxZwjY4NYH0NAhmz/Design?type=design&node-id=537-2897&mode=dev',
    },
  },
  args: {
    pageCount: 10,
  },
};

export default meta;

type Story = StoryObjWithCSSProp<typeof Pagenumber>;

export const PagenumberDefault: Story = {};

export const PagenumberAction: Story = {
  args: {
    pageCount: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('2'), { delay: 50 });
    await userEvent.click(canvas.getByText('3'), { delay: 50 });
    await userEvent.click(canvas.getByText('4'), { delay: 50 });
    await userEvent.click(canvas.getByText('5'), { delay: 50 });
    await userEvent.click(canvas.getByText('6'), { delay: 50 });
    await userEvent.click(canvas.getByText('7'), { delay: 50 });
  },
};
