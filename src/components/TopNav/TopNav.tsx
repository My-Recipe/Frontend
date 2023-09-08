import { Group, Stack, Stroke } from '@base';
import { css } from '@emotion/react';
import TopNavTabs from './TopNavTabs';
import TopNavUser from './TopNavUser';

const topNavStyle = {
  wrapper: css({ background: 'transparent', width: '100%' }),
  group: css({ height: 90, padding: '0 50px 0 80px' }),
  logo: {
    color: '#141414',
    fontSize: '34px',
  },
};
export interface UserType {
  img?: string;
  name: string;
  email: string;
}
interface TopNavProps {
  user: UserType;
  onTabChange?: (currentTab: string) => void;
}

function TopNav({ user, onTabChange }: TopNavProps) {
  const navBarmenu = ['MY RECIPE', 'INVENTORY', 'SEARCH'];
  const userMenu = ['마이 레시피 보기', '피드백 남기기', '로그아웃'];

  return (
    <Stack css={topNavStyle.wrapper}>
      <Group position="apart" nowrap css={topNavStyle.group}>
        <Group nowrap gap={97}>
          <div css={topNavStyle.logo}>FRiED NOTE</div>
          <TopNavTabs onTabChange={onTabChange}>{navBarmenu}</TopNavTabs>
        </Group>
        <TopNavUser user={user}>{userMenu}</TopNavUser>
      </Group>
      <Stroke />
    </Stack>
  );
}

export default TopNav;
