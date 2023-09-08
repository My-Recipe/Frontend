import DesignSystem from '@/utils/designSystem';
import { StoryObjWithCSSProp } from '@/utils/types';
import type { Meta } from '@storybook/react';
import Stroke from './Stroke';

const meta: Meta<typeof Stroke> = {
  component: Stroke,
  argTypes: {
    width: {
      control: {
        type: 'number',
        min: 20,
        max: 800,
        step: 10,
      },
      description: 'div Element의 `width` 속성값입니다',
    },
    variant: {
      description: '기준 두께입니다',
    },
    marginX: {
      description:
        '양쪽 margin값입니다. `marginLeft | marginRight` 속성값입니다',
    },
  },
};

export default meta;

type Story = StoryObjWithCSSProp<typeof Stroke>;

export const StrokeDefault: Story = {
  render: (args) => (
    <div
      css={{
        width: 200,
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DesignSystem.Color.text.gray,
      }}
    >
      <Stroke {...args} />
    </div>
  ),
  args: { width: 100, marginX: 20 },
};
