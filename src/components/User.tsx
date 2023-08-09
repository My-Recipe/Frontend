import { useEffect, useRef, useState } from 'react';
import UserInfo from './UserInfo';

function User() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const onClick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    console.log(menuRef.current);
    console.log(open);
    const menuHandle = (event: any) => {
      if (menuRef.current !== null && !menuRef.current.contains(event.target)) {
        console.log('외부클릭');
        setOpen(!open);
      }
    };

    if (open) {
      console.log('감지 시작');
      document.addEventListener('click', menuHandle);
    }

    return () => {
      console.log('감지 종료');
      document.removeEventListener('click', menuHandle);
    };
  }, [open]);
  return (
    <div css={{ marginLeft: 'auto', position: 'relative' }} ref={menuRef}>
      <button
        css={{
          width: '67px',
          height: '67px',
          borderRadius: '100%',
          backgroundColor: 'orange',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={onClick}
      >
        <div>아이콘</div>
      </button>
      {open ? <UserInfo /> : null}
    </div>
  );
}
export default User;
