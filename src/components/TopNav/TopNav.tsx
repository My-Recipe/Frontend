import DesignSystem from '@/utils/designSystem';
import globalStyles from '@/utils/styles';
import { Group, Stack, Stroke, Typography } from '@base';
import { css } from '@emotion/react';
import { HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavTabs from './TopNavTabs';
import TopNavUser from './TopNavUser';

const styles = {
  wrapper: css({
    background: DesignSystem.Color.background.gray,
    width: '100%',
  }),
  group: css({ height: 90, padding: '0 50px 0 80px' }),
  logo: css(
    {
      color: '#141414',
      fontSize: '34px',
    },
    globalStyles.button,
  ),
  loginButton: css(globalStyles.button, {
    fontWeight: 500,
    textDecorationLine: 'underline',
  }),
  menuButton: css({
    textAlign: 'left',
    borderTop: 'solid 1px #F6F7F8',
    padding: '20px 25px',
  }),
};

export type NavBarMenuItemType = {
  label: string;
  path: string;
};
export interface UserType {
  img?: string;
  name: string;
  email: string;
}
interface TopNavProps {
  user: UserType | null;
  navBarMenu: NavBarMenuItemType[];
  onLoginClick?: () => void;
  onLogoutClick: () => void;
  className?: string;
}

function TopNav({
  user,
  className,
  navBarMenu,
  onLoginClick,
  onLogoutClick,
}: TopNavProps) {
  const navigate = useNavigate();

  return (
    <Stack css={styles.wrapper} className={className}>
      <Group position="apart" nowrap css={styles.group}>
        <Group nowrap gap={97}>
          <div onClick={() => navigate('/')} css={styles.logo}>
            FRiED NOTE
          </div>
          <TopNavTabs>{navBarMenu}</TopNavTabs>
        </Group>
        {user ? (
          <TopNavUser user={user}>
            <MenuButtonItem label="마이 레시피 보기" />
            <MenuButtonItem label="피드백 남기기" />
            <MenuButtonItem label="로그아웃" onClick={onLogoutClick} />
          </TopNavUser>
        ) : (
          <Typography
            onClick={onLoginClick}
            variant="subtitle"
            css={styles.loginButton}
          >
            로그인하기
          </Typography>
        )}
      </Group>
      <Stroke />
    </Stack>
  );
}

interface MenuButtonItemProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
}

function MenuButtonItem({ label, ...props }: MenuButtonItemProps) {
  return (
    <button css={styles.menuButton} {...props}>
      <Typography variant="button">{label}</Typography>
    </button>
  );
}

export default TopNav;
