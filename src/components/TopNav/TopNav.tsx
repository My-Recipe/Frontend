import { Group } from '@base';
import CircleIcon from '../../assets/Circle.svg';
import FilledCircleIcon from '../../assets/FilledCircle.svg';
import TopNavBar from './TopNavBar';
import TopNavUser from './TopNavUser';
function TopNav() {
  const navBarmenu = ['MY RECIPE', 'INVENTORY', 'RECIPE RESEARCH'];
  const userMenu = ['마이 레시피 보기', '피드백 남기기', '로그아웃'];

  return (
    <Group css={{ borderBottom: 'solid 1px #141414' }} position="apart">
      <div
        css={{
          color: '#141414',
          fontSize: '34px',
        }}
      >
        FRiED NOTE
      </div>
      <TopNavBar
        icon={[<img src={CircleIcon} />, <img src={FilledCircleIcon} />]}
      >
        {navBarmenu}
      </TopNavBar>
      <TopNavUser userImg="">{userMenu}</TopNavUser>
    </Group>
  );
}

export default TopNav;
