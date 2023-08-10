import TopNavBar from './TopNavBar';
import TopNavUser from './User/TopNavUser';

function TopNav() {
  return (
    <div
      css={{
        display: 'flex',
        padding: '45px 89px',
        backgroundColor: 'white',
        boxSizing: 'border-box',
        width: '100vw',
        justifyContent: 'center',
      }}
    >
      <div css={{ color: 'black', marginRight: 'auto' }}>logo</div>
      <TopNavBar />
      <TopNavUser />
    </div>
  );
}

export default TopNav;
