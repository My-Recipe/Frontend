import type { Meta, StoryObj } from '@storybook/react';
import ToggleButton from './ToggleButton';

const meta: Meta<typeof ToggleButton> = {
  component: ToggleButton,
  args: {
    tabs: ['모든 레시피', '내 레시피만', '간장콩장공장장이퀄스'],
  },
  argTypes: {
    onChange: {
      action: 'changed',
      description: '변경된 토글의 state value를 전달해주는 함수입니다.',
    },
    tabs: {
      control: 'check',
      options: ['모든 레시피', '내 레시피만', '간장콩장공장장이퀄스'],
      description: '탭 목록입니다',
    },
    value: {
      control: 'radio',
      options: [
        '모든 레시피',
        '내 레시피만',
        '간장콩장공장장이퀄스',
        undefined,
      ],
      description:
        'value state입니다. `undefined` 라면 내부 state를 사용합니다 ',
    },
  },
};
export default meta;

type Story = StoryObj<typeof ToggleButton>;

export const ToggleButtonDefault: Story = {
  args: {
    tabs: ['모든 레시피', '내 레시피만'],
  },
};

export const ToggleButtonWithControl: Story = {
  args: {
    value: '내 레시피만',
  },
};
