import { ReactNode } from 'react';

interface TopNavBarChild {
  children: ReactNode;
}
function TopNavBar({ children }: TopNavBarChild) {
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: '40px',
        justifySelf: 'center',
        padding: '22px 61px',
      }}
    >
      <ul
        css={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          width: '100%',
          display: 'flex',
          color: 'black',
          fontSize: '20px',
          gap: '126px',
          alignItems: 'center',
        }}
      >
        {children}
      </ul>
    </div>
  );
}

export default TopNavBar;
