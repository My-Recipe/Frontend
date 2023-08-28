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
    },
    spacing: {
      control: { type: 'range', min: 0, max: 20, step: 2 },
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
      <div css={{ backgroundColor: Color.primary.yellow_hover }}>child-2</div>
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
