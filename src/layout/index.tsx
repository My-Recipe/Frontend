import { useUserData } from '@/utils/hooks';
import TopNav, { UserType } from '@copmonents/TopNav/TopNav';
import { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

function Layout({ children, ...props }: LayoutProps) {
  const [user, setUser] = useUserData<UserType>();

  return (
    <>
      <TopNav
        user={user}
        navBarMenu={[
          { label: 'MY RECIPE', path: '/mypage' },
          { label: 'INVENTORY', path: '/inventory' },
          { label: 'SEARCH', path: '/search' },
        ]}
        onLoginClick={() => {
          setUser({ email: 'test@t.com', name: 'testUser' });
        }}
        onLogoutClick={() => {
          setUser(null);
        }}
      />
      <div
        css={{
          boxSizing: 'border-box',
          margin: '0 auto',
          width: '100%',
          height: '100vh',
        }}
      >
        <div
          css={{
            minWidth: 1264,
            padding: '0 164px',
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;
