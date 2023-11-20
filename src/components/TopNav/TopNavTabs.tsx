import EmptyMenuIcon from '@/assets/menu-empty.svg';
import FilledMenuIcon from '@/assets/menu-fill.svg';
import globalStyles from '@/utils/styles';
import { Group, Tabs, Typography } from '@base';
import { TabValueType } from '@base/Tabs/Tabs';
import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavBarMenuItemType } from './TopNav';

const styles = {
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
  children: NavBarMenuItemType[];
}
function TopNavTabs({ children }: TopNavBarProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const tabValue = pathname;

  const handleTabChange = (value: TabValueType) => {
    typeof value === 'string' && value && navigate(value);
  };

  return (
    <Tabs
      buttonGroupCss={styles.wrapper}
      value={tabValue}
      onTabChange={handleTabChange}
    >
      {children.map(({ label, path }, idx) => {
        return (
          <Tabs.Button
            value={`${path}`}
            key={`${idx}-${path}`}
            css={styles.item}
          >
            <Group nowrap gap={6}>
              {tabValue === path ? (
                <img src={FilledMenuIcon} />
              ) : (
                <img src={EmptyMenuIcon} />
              )}
              <Typography variant="subtitle" css={styles.itemText}>
                {label}
              </Typography>
            </Group>
          </Tabs.Button>
        );
      })}
    </Tabs>
  );
}

export default TopNavTabs;
