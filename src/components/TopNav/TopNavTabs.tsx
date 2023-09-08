import EmptyMenuIcon from '@/assets/menu-empty.svg';
import FilledMenuIcon from '@/assets/menu-fill.svg';
import globalStyles from '@/utils/styles';
import { Group, Tabs, Typography } from '@base';
import { TabValueType } from '@base/Tabs/TabsMain';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const topNavTabsStyle = {
  wrapper: {
    gap: 65,
  },
  item: css([
    {
      background: 'transparent',
      border: 'none',
    },
    globalStyles.button,
  ]),
  itemText: css({ marginTop: 3 }),
};

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
    <Tabs
      buttonGroupCss={topNavTabsStyle.wrapper}
      value={tabValue}
      onTabChange={tabChange}
    >
      {children.map((menuItem, idx) => {
        return (
          <Tabs.Button
            value={`${menuItem}`}
            key={`${idx}-${menuItem}`}
            css={topNavTabsStyle.item}
          >
            <Group nowrap gap={6}>
              {tabValue === menuItem ? (
                <img src={FilledMenuIcon} />
              ) : (
                <img src={EmptyMenuIcon} />
              )}
              <Typography variant="subtitle" css={topNavTabsStyle.itemText}>
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
