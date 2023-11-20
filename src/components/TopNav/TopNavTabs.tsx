import EmptyMenuIcon from '@/assets/menu-empty.svg';
import FilledMenuIcon from '@/assets/menu-fill.svg';
import globalStyles from '@/utils/styles';
import { Group, Tabs, Typography } from '@base';
import { TabValueType } from '@base/Tabs/Tabs';
import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavBarMenuItemType } from './TopNav';

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
  children: NavBarMenuItemType[];
}
function TopNavTabs({ children }: TopNavBarProps) {
  // const [tabValue, setTabValue] = useState(children[0]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const tabValue = pathname;

  const tabChange = (value: TabValueType) => {
    // typeof value === 'string' && value && setTabValue(value);\
    typeof value === 'string' && value && navigate(value);
  };

  // useEffect(() => {
  //   onTabChange && onTabChange(tabValue);
  // }, [tabValue]);

  return (
    <Tabs
      buttonGroupCss={topNavTabsStyle.wrapper}
      value={''}
      onTabChange={tabChange}
    >
      {children.map(({ label, path }, idx) => {
        return (
          <Tabs.Button
            value={`${path}`}
            key={`${idx}-${path}`}
            css={topNavTabsStyle.item}
          >
            <Group nowrap gap={6}>
              {tabValue === path ? (
                <img src={FilledMenuIcon} />
              ) : (
                <img src={EmptyMenuIcon} />
              )}
              <Typography variant="subtitle" css={topNavTabsStyle.itemText}>
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
