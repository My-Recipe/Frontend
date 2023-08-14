import TopNavBar from './TopNavBar';
import TopNavUser from './User/TopNavUser';

function TopNav() {
  const NavBarmenu = ['RECIPE PAPER', 'INVENTORY', 'RECIPE RESEARCH'];
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
      <TopNavBar>
        {NavBarmenu.map((name, idx) => {
          return (
            <li key={`${idx}-${name}`}>
              <button
                css={{
                  background: 'none',
                  border: 'none',
                  color: 'black',
                  padding: 0,
                  '&:focus': { outline: 'none', color: '#ffb94d' },
                }}
              >
                {name}
              </button>
            </li>
          );
        })}
      </TopNavBar>
      <TopNavUser />
    </div>
  );
}

export default TopNav;
