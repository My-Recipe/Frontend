import { ReactNode } from 'react';

interface UserDropdownMenuChild {
  children: ReactNode;
}
function UserDropdownMenu({ children }: UserDropdownMenuChild) {
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
        borderRadius: '8px',
      }}
    >
      {children}
    </div>
  );
}
export default UserDropdownMenu;
