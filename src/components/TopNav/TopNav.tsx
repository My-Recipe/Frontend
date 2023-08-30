import { Group, Stack, Stroke } from '@base';
import EmptyMenuIcon from '../../assets/menu-empty.svg';
import FilledMenuIcon from '../../assets/menu-fill.svg';
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
    <Stack css={{ background: 'transparent' }}>
      <Group position="apart" css={{ height: 90 }}>
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
        <TopNavUser user={user}>{userMenu}</TopNavUser>
      </Group>
      <Stroke />
    </Stack>
  );
}

export default TopNav;
