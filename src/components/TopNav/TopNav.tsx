import EmptyMenuIcon from '@/assets/menu-empty.svg';
import FilledMenuIcon from '@/assets/menu-fill.svg';
import { Group, Stack, Stroke } from '@base';
import TopNavBar from './TopNavBar';
import TopNavUser from './TopNavUser';

export interface UserType {
  img?: string;
  name: string;
  email: string;
}
interface TopNavProps {
  user: UserType;
}
function TopNav({ user }: TopNavProps) {
  const navBarmenu = ['MY RECIPE', 'INVENTORY', 'SEARCH'];
  const userMenu = ['마이 레시피 보기', '피드백 남기기', '로그아웃'];

  return (
    <Stack css={{ background: 'transparent', width: '100%', minWidth: 1050 }}>
      <Group position="apart" css={{ height: 90, padding: '0 50px 0 80px' }}>
        <Group gap={97}>
          <div
            css={{
              color: '#141414',
              fontSize: '34px',
            }}
          >
            FRiED NOTE
          </div>
          <TopNavBar
            icon={[<img src={EmptyMenuIcon} />, <img src={FilledMenuIcon} />]}
          >
            {navBarmenu}
          </TopNavBar>
        </Group>
        <TopNavUser user={user}>{userMenu}</TopNavUser>
      </Group>
      <Stroke />
    </Stack>
  );
}

export default TopNav;
