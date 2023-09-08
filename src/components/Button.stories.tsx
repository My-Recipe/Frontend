import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    onClick: {
      action: 'clicked',
      description: '`HTMLButtonElement`의 `onCilck` 속성입니다',
    },
    children: { description: 'string 제공 시에는 내용을 그대로 보여줍니다' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6Tcv8DaxZwjY4NYH0NAhmz/Design?type=design&node-id=543-2336&mode=dev',
    },
  },
  args: {
    children: '새로운 레시피 생성하기',
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Button1: Story = {
  args: {
    variant: 'icon',
  },
};

export const Button2: Story = {
  args: {
    variant: 'outline',
  },
};

export const Button3: Story = {
  args: {
    variant: 'none',
  },
};
