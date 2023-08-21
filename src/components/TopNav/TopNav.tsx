import { Group } from '@base';
import TopNavBar from './TopNavBar';
import TopNavUser from './TopNavUser';

function TopNav() {
  const navBarmenu = ['MY RECIPE', 'INVENTORY', 'RECIPE RESEARCH'];
  const userMenu = ['마이 레시피 보기', '피드백 남기기', '로그아웃'];
  return (
    <Group css={{ borderBottom: 'solid 1px #141414' }}>
      <div
        css={{
          color: '#141414',
          fontFamily: 'Archivo Black',
          fontSize: '34.307px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '150%',
          letterSpacing: '-0.377px',
          // width: '285.803px',
          // height: '37.882px',
        }}
      >
        FRiED NOTE
      </div>
      <TopNavBar
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
          >
            <circle
              cx="9.52295"
              cy="8.73682"
              r="7.5"
              stroke="#292929"
              strokeWidth="2.4"
            />
          </svg>
        }
      >
        {navBarmenu}
      </TopNavBar>
      <TopNavUser userImg="">{userMenu}</TopNavUser>
    </Group>
  );
}

export default TopNav;
