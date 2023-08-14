import { DEFAULT_PROPS_PREFIX } from '@/utils/constants';
import { HTMLAttributes } from 'react';
import { TabValueType } from './TabsMain';

export interface TabsBodyProps extends HTMLAttributes<HTMLDivElement> {
  value: TabValueType;
}

export const tabsBodyType = 'tabs-body';

function TabsBody({ value, ...props }: TabsBodyProps) {
  return <div css={{}} {...props} />;
}

TabsBody.defaultProps = {
  [DEFAULT_PROPS_PREFIX]: tabsBodyType,
};

export default TabsBody;
