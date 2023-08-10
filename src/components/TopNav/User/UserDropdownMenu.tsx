interface UserDropdownMenuProps {
  userMenu: string[];
}
function UserDropdownMenu(props: UserDropdownMenuProps) {
  const userDropdownmenuButton = props.userMenu.map((name, idx) => {
    return (
      <button
        key={`${idx}-${name}`}
        css={{
          color: 'black',
          background: 'none',
          width: '100%',
          height: '25%',
        }}
      >
        {name}
      </button>
    );
  });
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        textAlign: 'left',
        color: 'black',
        backgroundColor: 'white',
        position: 'absolute',
        right: '-50px',
        top: '90px',
        border: 'solid 1px #e0e0e0',
        boxShadow: '0 13px 30px -3px rgba(186, 147,112,60)',
        width: '522px',
        height: '456px',
        borderRadius: '16px',
      }}
    >
      <button
        css={{
          color: 'black',
          background: 'none',
          width: '100%',
          height: '25%',
        }}
      >
        Jorjy
      </button>
      {userDropdownmenuButton}
    </div>
  );
}
export default UserDropdownMenu;
