import { useEffect, useRef, useState } from 'react';
import UserDropdownMenu from './UserDropdownMenu';

function TopNavUser() {
  const [open, setOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const onClick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const menuHandle = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        userMenuRef.current !== null &&
        !userMenuRef.current.contains(event.target)
      ) {
        setOpen(!open);
      }
    };

    if (open) {
      document.addEventListener('click', menuHandle);
    }

    return () => {
      document.removeEventListener('click', menuHandle);
    };
  }, [open]);
  return (
    <div css={{ marginLeft: 'auto', position: 'relative' }} ref={userMenuRef}>
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
      {open ? (
        <UserDropdownMenu
          userMenu={['전체 레시피 보기', '피드백 남기기', '로그아웃']}
        />
      ) : null}
    </div>
  );
}
export default TopNavUser;
