import { Color } from '@/utils/designSystem';
import { StoryObjWithCSSProp } from '@/utils/types';
import type { Meta } from '@storybook/react';
import Stack from './Stack';

const meta: Meta<typeof Stack> = {
  component: Stack,
  argTypes: {
    justify: {
      control: 'inline-radio',
      options: [
        'center',
        'start',
        'end',
        'flex-start',
        'flex-end',
        'space-between',
        'space-around',
        'space-evenly',
        'stretch',
      ],
      description:
        '세로 정렬의 기준값입니다. `CSSProperties.justifyContent` 속성의 값을 받습니다',
    },
    align: {
      control: 'inline-radio',
      options: [
        'normal',
        'stretch',
        'center',
        'start',
        'end',
        'flex-start',
        'flex-end',
      ],
      description:
        '가로 정렬의 기준값입니다. `CSSProperties.alignItems` 속성의 값을 받습니다',
    },
    spacing: {
      control: { type: 'range', min: 0, max: 20, step: 2 },
      description: '`gap` 속성값입니다',
    },
  },
};

export default meta;

type Story = StoryObjWithCSSProp<typeof Stack>;

export const StackDefault: Story = {
  render: (args) => (
    <Stack
      css={{
        '&>*': { padding: 10 },
        height: 400,
        width: 200,
        border: `1px solid gray`,
      }}
      {...args}
    >
      <div css={{ backgroundColor: Color.primary.yellow }}>child-1</div>
      <div css={{ backgroundColor: Color.primary['yellow-hover'] }}>
        child-2
      </div>
      <div css={{ backgroundColor: Color.primary.green }}>child-3</div>
    </Stack>
  ),
  args: {},
};

export const StackWithProps: Story = {
  ...StackDefault,
  args: {
    justify: 'flex-start',
    align: 'start',
    spacing: 20,
  },
};
