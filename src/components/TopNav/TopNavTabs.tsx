import EmptyMenuIcon from '@/assets/menu-empty.svg';
import FilledMenuIcon from '@/assets/menu-fill.svg';
import { Group, Tabs, Typography } from '@base';
import { TabValueType } from '@base/Tabs/TabsMain';
import { useEffect, useState } from 'react';
interface TopNavBarProps {
  children: string[];
  onTabChange?: (currentTab: string) => void;
}
function TopNavTabs({ children, onTabChange }: TopNavBarProps) {
  const [tabValue, setTabValue] = useState(children[0]);
  const tabChange = (value: TabValueType) => {
    typeof value === 'string' && value && setTabValue(value);
  };
  useEffect(() => {
    onTabChange && onTabChange(tabValue);
  }, [tabValue]);

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
            <Group nowrap css={{ gap: 6 }}>
              {tabValue === menuItem ? (
                <img src={FilledMenuIcon} />
              ) : (
                <img src={EmptyMenuIcon} />
              )}
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

export default TopNavTabs;
