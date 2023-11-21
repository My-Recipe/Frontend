import { useUserData } from '@/utils/hooks';
import TopNav, { UserType } from '@copmonents/TopNav/TopNav';
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
    mediaQuery: css({
      '@media (min-width: 1600px)': {
        margin: '0 168px',
      },
      '@media (max-width: 1600px)': {
        margin: 'auto',
        width: '1264px',
      },
    }),
  },
};

export interface LayoutProps {
  children: ReactNode;
}

const EXCEPT_PATH = ['/mypage/initial'];

function Layout({ children, ...props }: LayoutProps) {
  const [user, setUser] = useUserData<UserType>();
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
        onLoginClick={() => setUser({ email: 'test@t.com', name: 'testUser' })}
        onLogoutClick={() => setUser(null)}
      />
      <div css={[styles.body.default, !isExceptPath && styles.body.mediaQuery]}>
        {children}
      </div>
    </>
  );
}

export default Layout;
