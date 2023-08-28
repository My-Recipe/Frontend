import { Color } from '@/utils/designSystem';
import { StoryObjWithCSSProp } from '@/utils/types';
import { Stack } from '@base';
import type { Meta } from '@storybook/react';
import Popover from '.';

const meta: Meta<typeof Popover> = {
  component: Popover,
  argTypes: {
    position: {
      control: 'inline-radio',
      options: ['bottom-left', 'bottom-center', 'bottom-right'],
    },
    preventCloseOnClickTrigger: {
      control: 'boolean',
    },
  },
  args: {
    position: 'bottom-center',
    preventCloseOnClickTrigger: false,
  },
};

export default meta;

type Story = StoryObjWithCSSProp<typeof Popover>;

export const PopoverNoStyle: Story = {
  render: (args) => (
    <Popover {...args}>
      <Popover.Trigger>
        <button
          css={{ backgroundColor: Color.primary.yellow, padding: '10px 20px' }}
        >
          Click to open popover!
        </button>
      </Popover.Trigger>
      <Popover.Content
        css={{
          backgroundColor: Color.primary.yellow_hover,
          width: 50,
          height: 50,
        }}
      >
        <div>Popover content</div>
      </Popover.Content>
    </Popover>
  ),
};

export const PopoverWithExit: Story = {
  render: (args) => (
    <Popover {...args}>
      <Popover.Trigger>
        <button
          css={{ backgroundColor: Color.primary.yellow, padding: '10px 20px' }}
        >
          Click to open popover!
        </button>
      </Popover.Trigger>
      <Popover.Content
        css={{
          backgroundColor: Color.primary.yellow_hover,
          width: 100,
          height: 100,
        }}
      >
        <div>
          <Popover.Close>
            <button css={{ backgroundColor: Color.text.gray }}>
              Click to close
            </button>
          </Popover.Close>
          Popover content
        </div>
      </Popover.Content>
    </Popover>
  ),
};

const ITEMS = Array.from({ length: 10 }, (_, index) => `item${index + 1}`);

export const PopoverWithInput: Story = {
  render: (args) => (
    <Popover {...args}>
      <Popover.Trigger>
        <input
          css={{
            border: `1px solid gray`,
            padding: 10,
            color: Color.text.black,
          }}
          placeholder="type text"
        />
      </Popover.Trigger>
      <Popover.Content>
        <Stack>
          {ITEMS.map((value) => (
            <div key={value}>{value}</div>
          ))}
        </Stack>
      </Popover.Content>
    </Popover>
  ),
  args: {
    position: 'bottom-left',
    preventCloseOnClickTrigger: true,
  },
};
