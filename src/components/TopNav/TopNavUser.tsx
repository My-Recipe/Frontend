import DefaultProfile from '@/assets/default-profile.svg';
import IconDropdown from '@/assets/icon-dropdown.svg';
import IconSettings from '@/assets/icon-settings.svg';
import { Group, Popover, Stack, Typography } from '@base';
import { css } from '@emotion/react';
import { UserType } from './TopNav';

const topNavUserStyle = {
  trigger: css({ cursor: 'pointer' }),
  content: {
    root: css({
      backgroundColor: 'white',
      width: 354,
      borderRadius: 4,
      padding: '28px 0 14px 0',
    }),
    user: css({ padding: '0 25px', paddingBottom: 33 }),
    setting: css({ alignSelf: 'baseline' }),
    buttons: css({
      textAlign: 'left',
      borderTop: 'solid 1px #F6F7F8',
      padding: '20px 25px',
    }),
  },
};
interface TopNavUserProps {
  children: string[];
  user: UserType;
}

function TopNavUser({ user, children }: TopNavUserProps) {
  return (
    <Popover position="bottom-right">
      <Popover.Trigger>
        <div>
          <Group nowrap gap={14} css={topNavUserStyle.trigger}>
            <img src={user.img || DefaultProfile} />
            <img src={IconDropdown} />
          </Group>
        </div>
      </Popover.Trigger>
      <Popover.Content
        triggerPopoverMargin={9}
        css={topNavUserStyle.content.root}
      >
        <Stack>
          <Group position="apart" css={topNavUserStyle.content.user}>
            <Group gap={12}>
              <img src={user.img || DefaultProfile} />
              <Stack justify="left">
                <Typography variant="subtitle">{user.name}</Typography>
                <Typography variant="info" color="#848484">
                  {user.email}
                </Typography>
              </Stack>
            </Group>
            <img src={IconSettings} css={topNavUserStyle.content.setting} />
          </Group>
          {children.map((menuName, idx) => {
            return (
              <button
                key={`${idx}-${menuName}`}
                css={topNavUserStyle.content.buttons}
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
