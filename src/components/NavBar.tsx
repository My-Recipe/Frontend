import { css } from '@emotion/react';

const navButton = css(`
  background: none;
  border: none;
  color: black;
  padding: 0;
  &:focus{
    outline:none;
    color: #ffb94d;
  }
  `);
function NavBar() {
  const menu = ['RECIPE PAPER', 'INVENTORY', 'RECIPE RESEARCH'];
  const menuButton: JSX.Element[] = menu.map((name, idx) => {
    return (
      <li key={`${idx}-${name}`}>
        <button css={navButton}>{name}</button>
      </li>
    );
  });
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
        {menuButton}
      </ul>
    </div>
  );
}

export default NavBar;
