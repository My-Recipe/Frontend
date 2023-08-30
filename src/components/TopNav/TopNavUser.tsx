import { Group, Popover, Stack, Typography } from '@base';
import DefaultProfile from '../../assets/default-profile.svg';
import IconDropdown from '../../assets/icon-dropdown.svg';
import IconSettings from '../../assets/icon-settings.svg';
import { UserType } from './TopNav';
interface TopNavUserProps {
  children: string[];
  user: UserType;
}
function TopNavUser({ user, children }: TopNavUserProps) {
  return (
    <Popover position="bottom-right">
      <Popover.Trigger>
        <div css={{ display: 'flex', alignItems: 'center', gap: 15 }}>
          <button
            css={{
              width: 47,
              height: 48,
              borderRadius: 13,
              border: 'none',
            }}
          >
            {<img src={user.img || DefaultProfile} />}
          </button>
          <img src={IconDropdown} css={{ cursor: 'pointer' }} />
        </div>
      </Popover.Trigger>
      <Popover.Content
        triggerPopoverMargin={9}
        css={{
          backgroundColor: 'white',
          width: 354,
          height: 303,
          borderRadius: 4,
          padding: 0,
        }}
      >
        <Stack>
          <Group position="apart" css={{ padding: '0 25px' }}>
            <button
              css={{
                display: 'flex',
                border: 'none',
                padding: '24px 0 33px 0',
              }}
            >
              {<img src={user.img || DefaultProfile} />}
              <Stack css={{ textAlign: 'left', margin: '3px 0 0 12px' }}>
                <Typography variant="subtitle">{user.name}</Typography>
                <Typography variant="info" color="#848484">
                  {user.email}
                </Typography>
              </Stack>
            </button>
            <img src={IconSettings} css={{ marginBottom: 30 }} />
          </Group>

          {children.map((menuName, idx) => {
            return (
              <button
                key={`${idx}-${menuName}`}
                css={{
                  textAlign: 'left',
                  borderTop: 'solid 1px #F6F7F8',
                  padding: '20px 25px',
                }}
              >
                <Typography variant="button">{menuName}</Typography>
              </button>
            );
          })}
        </Stack>
      </Popover.Content>
    </Popover>
  );
}
export default TopNavUser;
