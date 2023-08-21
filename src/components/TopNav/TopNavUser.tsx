import { Group, Stack } from '@base';
import { useEffect, useRef, useState } from 'react';

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="12"
          viewBox="0 0 23 12"
          fill="none"
          onClick={onClick}
        >
          <path
            d="M1.33301 1.62828L10.9528 10.5442C11.3554 10.9173 11.9774 10.9173 12.3799 10.5442L21.9998 1.62828"
            stroke="#292929"
            strokeWidth="1.62782"
            strokeLinecap="round"
          />
        </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <path
                  d="M10.0777 19.3711L10.6621 20.6856C10.8358 21.0768 11.1194 21.4093 11.4783 21.6426C11.8373 21.8759 12.2562 22.0001 12.6843 22C13.1124 22.0001 13.5314 21.8759 13.8903 21.6426C14.2493 21.4093 14.5328 21.0768 14.7065 20.6856L15.291 19.3711C15.499 18.9047 15.849 18.5159 16.291 18.26C16.7358 18.0034 17.2503 17.8941 17.761 17.9478L19.191 18.1C19.6167 18.145 20.0463 18.0656 20.4277 17.8713C20.8091 17.6771 21.126 17.3763 21.3399 17.0056C21.5541 16.635 21.6561 16.2103 21.6336 15.7829C21.6111 15.3555 21.4651 14.9438 21.2132 14.5978L20.3665 13.4344C20.0651 13.0171 19.904 12.5148 19.9065 12C19.9065 11.4866 20.0691 10.9864 20.371 10.5711L21.2177 9.40778C21.4695 9.06175 21.6156 8.65007 21.6381 8.22267C21.6605 7.79528 21.5585 7.37054 21.3443 7C21.1304 6.62923 20.8135 6.32849 20.4321 6.13423C20.0507 5.93997 19.6211 5.86053 19.1954 5.90556L17.7654 6.05778C17.2548 6.11141 16.7402 6.00212 16.2954 5.74556C15.8526 5.48825 15.5025 5.09736 15.2954 4.62889L14.7065 3.31444C14.5328 2.92317 14.2493 2.59072 13.8903 2.3574C13.5314 2.12408 13.1124 1.99993 12.6843 2C12.2562 1.99993 11.8373 2.12408 11.4783 2.3574C11.1194 2.59072 10.8358 2.92317 10.6621 3.31444L10.0777 4.62889C9.87059 5.09736 9.52053 5.48825 9.07766 5.74556C8.63287 6.00212 8.11833 6.11141 7.60766 6.05778L6.17321 5.90556C5.74754 5.86053 5.31795 5.93997 4.93653 6.13423C4.55511 6.32849 4.23823 6.62923 4.02433 7C3.81015 7.37054 3.70811 7.79528 3.73059 8.22267C3.75308 8.65007 3.89912 9.06175 4.15099 9.40778L4.99766 10.5711C5.2996 10.9864 5.4622 11.4866 5.4621 12C5.4622 12.5134 5.2996 13.0137 4.99766 13.4289L4.15099 14.5922C3.89912 14.9382 3.75308 15.3499 3.73059 15.7773C3.70811 16.2047 3.81015 16.6295 4.02433 17C4.23844 17.3706 4.55535 17.6712 4.93672 17.8654C5.31809 18.0596 5.74758 18.1392 6.17321 18.0944L7.60321 17.9422C8.11388 17.8886 8.62843 17.9979 9.07322 18.2544C9.51774 18.511 9.86942 18.902 10.0777 19.3711Z"
                  stroke="#868686"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.6825 15C14.3394 15 15.6825 13.6569 15.6825 12C15.6825 10.3431 14.3394 9 12.6825 9C11.0257 9 9.68254 10.3431 9.68254 12C9.68254 13.6569 11.0257 15 12.6825 15Z"
                  stroke="#868686"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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
