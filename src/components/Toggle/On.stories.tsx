import type { Meta, StoryObj } from '@storybook/react';
import On from './On';

const meta: Meta<typeof On> = {
  component: On,
  argTypes: {
    onChange: {
      action: 'toggle-changed',
    },
    checked: {
      control: 'radio',
      options: [true, false, undefined],
      description:
        '토글 버튼의 상태입니다. `undefined` 시, 내부 상태를 사용합니다',
    },
    label: {
      description: '토글 버튼의 우측에 위치하는 설명 라벨입니다',
    },
  },
  args: {
    label: '유통기한 알림 ON',
    checked: true,
  },
};
export default meta;

type Story = StoryObj<typeof On>;

export const OnDefault: Story = {
  args: {},
};
