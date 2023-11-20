import DefaultProfile from '@/assets/default-profile.svg';
import IconDropdown from '@/assets/icon-dropdown.svg';
import IconSettings from '@/assets/icon-settings.svg';
import DesignSystem from '@/utils/designSystem';
import globalStyles from '@/utils/styles';
import { Group, Popover, Stack, Typography } from '@base';
import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { UserType } from './TopNav';

const styles = {
  trigger: globalStyles.button,
  content: {
    root: css({
      backgroundColor: 'white',
      width: 354,
      borderRadius: DesignSystem.Round.solid,
      padding: '28px 0 14px 0',
    }),
    user: css({ padding: '0 25px', paddingBottom: 33 }),
    setting: css({ alignSelf: 'baseline' }),
  },
};
interface TopNavUserProps {
  children: ReactNode;
  user: UserType;
}

function TopNavUser({ user, children }: TopNavUserProps) {
  return (
    <Popover position="bottom-right">
      <Popover.Trigger>
        <div>
          <Group nowrap gap={14} css={styles.trigger}>
            <img src={user.img || DefaultProfile} />
            <img src={IconDropdown} />
          </Group>
        </div>
      </Popover.Trigger>
      <Popover.Content triggerPopoverMargin={9}>
        <div css={styles.content.root}>
          <Stack>
            <Group position="apart" css={styles.content.user}>
              <Group gap={12}>
                <img src={user.img || DefaultProfile} />
                <Stack justify="left">
                  <Typography variant="subtitle">{user.name}</Typography>
                  <Typography variant="info" color="#848484">
                    {user.email}
                  </Typography>
                </Stack>
              </Group>
              <img src={IconSettings} css={styles.content.setting} />
            </Group>
            {children}
          </Stack>
        </div>
      </Popover.Content>
    </Popover>
  );
}
export default TopNavUser;
