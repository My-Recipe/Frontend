import { useAuth } from '@/auth/hooks';
import { useUserState } from '@/auth/stores';
import globalStyles from '@/utils/styles';
import TopNav from '@copmonents/TopNav/TopNav';
import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

const styles = {
  topNav: css({
    minWidth: '1264px',
  }),
  body: {
    default: css({
      minWidth: '1264px',
    }),
    mediaQuery: globalStyles.padding,
  },
};

export interface LayoutProps {
  children: ReactNode;
}

const EXCEPT_PATH = ['/mypage/initial', '/post'];

function Layout({ children, ...props }: LayoutProps) {
  const { user } = useUserState();
  const { setLogin, setLogout } = useAuth();
  const locaton = useLocation();

  const isExceptPath = EXCEPT_PATH.includes(locaton.pathname);

  return (
    <>
      <TopNav
        css={styles.topNav}
        user={user}
        navBarMenu={[
          { label: 'MY RECIPE', path: '/mypage' },
          { label: 'INVENTORY', path: '/inventory' },
          { label: 'SEARCH', path: '/search' },
        ]}
        onLoginClick={() =>
          setLogin({
            name: 'hi',
            email: '',
            profileImage: '',
            token: 'temp token',
          })
        }
        onLogoutClick={setLogout}
      />
      <div css={[styles.body.default, !isExceptPath && styles.body.mediaQuery]}>
        {children}
      </div>
    </>
  );
}

export default Layout;
