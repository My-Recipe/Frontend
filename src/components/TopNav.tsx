import NavBar from './NavBar';
import User from './User';

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
      <NavBar />
      <User />
    </div>
  );
}

export default TopNav;
