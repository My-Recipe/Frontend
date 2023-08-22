import { Group, Tabs } from '@base';
import { TabValueType } from '@base/Tabs/TabsMain';
import { css } from '@emotion/react';
import { ReactNode, useState } from 'react';

interface TopNavBarChild {
  children: string[];
  icon: ReactNode[];
}
function TopNavBar({ icon, children }: TopNavBarChild) {
  const [tabValue, setTabValue] = useState(children[0]);
  const tabChange = (value: TabValueType) => {
    typeof value === 'string' && value && setTabValue(value);
  };
  return (
    <Tabs
      buttonGroupCss={css({ gap: '65px' })}
      value={tabValue}
      onTabChange={tabChange}
    >
      {children.map((menuItem, idx) => {
        return (
          <Tabs.Button
            value={`${menuItem}`}
            key={`${idx}-${menuItem}`}
            css={{
              fontSize: '20px',
              color: '#292929',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <Group css={{ gap: 6 }}>
              {tabValue === menuItem ? icon[1] : icon[0]}
              {menuItem}
            </Group>
          </Tabs.Button>
        );
      })}
    </Tabs>
  );
}

export default TopNavBar;
