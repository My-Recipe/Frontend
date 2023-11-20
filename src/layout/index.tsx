import { useUserData } from '@/utils/hooks';
import TopNav, { UserType } from '@copmonents/TopNav/TopNav';
import { css } from '@emotion/react';
import { ReactNode } from 'react';

const styles = {
  topNav: css({
    minWidth: '1264px',
  }),
  body: css({
    minWidth: '1264px',
    '@media (min-width: 1600px)': {
      margin: '0 168px',
    },
    '@media (max-width: 1600px)': {
      margin: 'auto',
      width: '1264px',
    },
  }),
};

export interface LayoutProps {
  children: ReactNode;
}

function Layout({ children, ...props }: LayoutProps) {
  const [user, setUser] = useUserData<UserType>();

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
      <div css={styles.body}>{children}</div>
    </>
  );
}

export default Layout;
