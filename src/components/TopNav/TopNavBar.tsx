import { Group, Tabs, Typography } from '@base';
import { TabValueType } from '@base/Tabs/TabsMain';
import { ReactNode, useState } from 'react';

interface TopNavBarProps {
  children: string[];
  icon: ReactNode[];
}
function TopNavBar({ icon, children }: TopNavBarProps) {
  const [tabValue, setTabValue] = useState(children[0]);
  const tabChange = (value: TabValueType) => {
    typeof value === 'string' && value && setTabValue(value);
  };
  return (
    <Tabs buttonGroupCss={{ gap: 65 }} value={tabValue} onTabChange={tabChange}>
      {children.map((menuItem, idx) => {
        return (
          <Tabs.Button
            value={`${menuItem}`}
            key={`${idx}-${menuItem}`}
            css={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <Group css={{ gap: 6 }}>
              {tabValue === menuItem ? icon[1] : icon[0]}
              <Typography variant="subtitle" css={{ marginTop: 3 }}>
                {menuItem}
              </Typography>
            </Group>
          </Tabs.Button>
        );
      })}
    </Tabs>
  );
}

export default TopNavBar;
