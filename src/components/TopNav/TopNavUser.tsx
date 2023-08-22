import { Group, Stack } from '@base';
import { useEffect, useRef, useState } from 'react';
import DropdownIcon from '../../assets/Dropdown.svg';
import SettingsIcon from '../../assets/Settings.svg';
interface TopNavUserProps {
  children: string[];
  userImg: string;
}
function TopNavUser({ userImg, children }: TopNavUserProps) {
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
    <div ref={userMenuRef}>
      <Group
        css={{
          gap: '15px',
        }}
      >
        <button
          css={{
            width: '47px',
            height: '48px',
            borderRadius: '13px',
            border: 'none',
          }}
          onClick={onClick}
        >
          {userImg || <div>계란후라이</div>}
        </button>
        <img src={DropdownIcon} onClick={onClick} />
      </Group>
      {open && (
        <Stack
          justify="flex-start"
          css={{
            position: 'absolute',
            backgroundColor: 'white',
            width: '354px',
            height: '303px',
            borderRadius: '4px',
          }}
        >
          <button
            css={{
              width: '100%',

              border: 'none',
              background: 'none',
              color: '#292929',

              padding: '24px 0 33px 0',
            }}
          >
            <Group position="apart" css={{ padding: '0 25px' }}>
              <div
                css={{
                  width: '47px',
                  height: '48px',
                  borderRadius: '13px',
                  border: 'none',
                  background: 'orange',
                }}
              >
                {userImg || <div>계란후라이</div>}
              </div>
              <Stack css={{ textAlign: 'left', margin: '0 auto 0 12px' }}>
                <div
                  css={{
                    color: '#000',
                    fontFamily: 'Pretendard',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                  }}
                >
                  Journy J
                </div>
                <div
                  css={{
                    color: '#848484',
                    fontFamily: 'Pretendard',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '150%',
                    letterSpacing: '-0.176px',
                  }}
                >
                  Journy234@gmail.com
                </div>
              </Stack>
              <img src={SettingsIcon} />
            </Group>
          </button>
          {children.map((name, idx) => {
            return (
              <button
                key={`${idx}-${name}`}
                css={{
                  color: '#292929',
                  textAlign: 'left',
                  background: 'none',
                  width: '100%',
                  border: 'none',
                  borderTop: 'solid 1px #F6F7F8',
                  borderRadius: '0',
                  padding: '20px 25px',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                }}
              >
                {name}
              </button>
            );
          })}
        </Stack>
      )}
    </div>
  );
}
export default TopNavUser;
