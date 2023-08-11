import { CSSProperties, HTMLAttributes } from 'react';
import { TabValueType } from './TabsMain';

export interface TabsBodyProps extends HTMLAttributes<HTMLDivElement> {
  value: TabValueType;
  focusStyle?: CSSProperties;
}

function TabsBody({ value, ...props }: TabsBodyProps) {
  return <div css={{}} {...props}></div>;
}

export default TabsBody;
