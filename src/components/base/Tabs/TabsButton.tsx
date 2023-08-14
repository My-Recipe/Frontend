import { DEFAULT_PROPS_PREFIX } from '@/utils/constants';
import { HTMLAttributes, useContext } from 'react';
import { TabValueType, TabsContext } from './TabsMain';

export interface TabsButtonProps extends HTMLAttributes<HTMLButtonElement> {
  value: TabValueType;
}
export const tabsButtonType = 'tabs-button';

function TabsButton({ children, value, ...props }: TabsButtonProps) {
  const [, setTabValue] = useContext(TabsContext);

  return (
    <button onClick={() => setTabValue(value)} {...props}>
      {children}
    </button>
  );
}

TabsButton.defaultProps = {
  [DEFAULT_PROPS_PREFIX]: tabsButtonType,
};

export default TabsButton;
