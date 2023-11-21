import { Group, GroupProps } from '@copmonents/@base';
import {
  CSSProperties,
  Children,
  HTMLAttributes,
  createContext,
  isValidElement,
  useState,
} from 'react';
import { tabsBodyType } from './components/Body';
import { tabsButtonType } from './components/Button';
import { getComponentFromType } from './utils';

export type TabValueType = string | number | undefined;

export interface TabsMainProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: TabValueType;
  value?: TabValueType;
  onTabChange?: (value: TabValueType) => void;
  buttonGroupCss?: CSSProperties;
  buttonGroupProps?: GroupProps;
  buttonCss?: CSSProperties;
  bodyWrapperCss?: CSSProperties;
  bodyCss?: CSSProperties;
}

export const TabsContext = createContext<
  [TabValueType, (value: TabValueType) => void]
>(['', () => null]);

function TabsMain({
  children,
  defaultValue,
  value: propsTabValue,
  onTabChange: propsOnTabChange,
  buttonGroupCss,
  buttonGroupProps,
  bodyWrapperCss,
  buttonCss,
  bodyCss,
  ...props
}: TabsMainProps) {
  const [localTabValue, setLocalTabState] =
    useState<TabValueType>(defaultValue);
  const tabValue = propsTabValue === undefined ? localTabValue : propsTabValue;

  const tabsButton = getComponentFromType(children, tabsButtonType);
  const tabsBody = getComponentFromType(children, tabsBodyType);

  const onTabChange = (value: TabValueType) => {
    setLocalTabState(value);
    propsOnTabChange?.(value);
  };

  const currentBody = Children.toArray(tabsBody).filter(
    (child) => isValidElement(child) && child.props['value'] === tabValue,
  );

  return (
    <TabsContext.Provider value={[tabValue, onTabChange]}>
      <div {...props}>
        {tabsButton && (
          <Group
            nowrap
            css={[{ ...buttonGroupCss }, { '& > *': { ...buttonCss } }]}
            {...buttonGroupProps}
          >
            {tabsButton}
          </Group>
        )}
        {tabsBody && (
          <div css={[{ ...bodyWrapperCss }, { '& > *': { ...bodyCss } }]}>
            {currentBody}
          </div>
        )}
      </div>
    </TabsContext.Provider>
  );
}

export default TabsMain;
