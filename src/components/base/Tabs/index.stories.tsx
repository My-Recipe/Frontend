import { Color } from '@/utils/designSystem';
import { StoryObjWithCSSProp } from '@/utils/types';
import type { Meta } from '@storybook/react';
import Tabs from '.';
const valueOptions = ['tab1', 'tab2', undefined];
const meta: Meta<typeof Tabs> = {
  component: Tabs,
  argTypes: {
    value: {
      control: 'select',
      options: valueOptions,
      description:
        'Tab State의 외부 control value입니다. value가 존재하면 내부 value는 사용하지 않습니다',
    },
    defaultValue: {
      control: 'select',
      options: valueOptions,
      description:
        '내부 Tab State의 default value입니다. value값이 존재한다면 작동하지 않습니다.',
    },
    onTabChange: {
      action: 'tabChange',
      control: 'select',
      options: [undefined],
      description:
        'Tab SetStateAction 함수입니다. value state 업데이트를 위해 value와 같이 전달되어야 합니다',
    },
    buttonCss: {
      description: '개별 button에 적용되는 css입니다',
    },
    buttonGroupCss: {
      description: 'button 부모 컴포넌트인 Group에 적용되는 css입니다',
    },
    buttonGroupProps: {
      description:
        'button 부모 컴포넌트인 Group에 전달되는 props입니다. HTMLDivElement Attribute 속성입니다',
    },
    bodyCss: {
      description: '개별 body에 적용되는 css입니다',
    },
    bodyWrapperCss: {
      description: 'body 부모 컴포넌트인 div wrapper에 적용되는 css입니다',
    },
  },
  args: {
    value: 'tab1',
  },
};

export default meta;

type Story = StoryObjWithCSSProp<typeof Tabs>;

export const TabsNoStyle: Story = {
  render: (args) => {
    return (
      <Tabs {...args}>
        <Tabs.Button bgColor={Color.primary['yellow']} value="tab1">
          tab1 button
        </Tabs.Button>
        <Tabs.Button bgColor={Color.primary['yellow-hover']} value="tab2">
          tab2 button
        </Tabs.Button>
        <Tabs.Body bgColor={Color.primary['yellow']} value="tab1">
          tab1 body <br />
          when `value` is defined, tab button doesn't work.
        </Tabs.Body>
        <Tabs.Body bgColor={Color.primary['yellow-hover']} value="tab2">
          tab2 body <br />
          when `defaultValue` is defined with `value`, defaultValue doesn't
          work.
        </Tabs.Body>
      </Tabs>
    );
  },
};

export const TabsWithStyle: Story = {
  ...TabsNoStyle,
  args: {
    buttonCss: {
      borderRadius: '10px 10px 0 0',
      padding: 10,
      border: `1px solid ${Color.text.gray}`,
    },
    buttonGroupProps: {
      grow: true,
    },
    bodyCss: {
      height: 300,
      borderRadius: '0 0 10px 10px',
    },
    css: {
      width: 400,
      color: Color.text.black,
    },
  },
};

export const TabsWithDefaultValue: Story = {
  ...TabsNoStyle,
  args: {
    ...TabsWithStyle.args,
    value: undefined,
    onTabChange: undefined,
    defaultValue: 'tab2',
  },
};
