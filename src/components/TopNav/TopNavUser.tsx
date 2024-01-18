import IconDropdown from '@/assets/icons/icon-dropdown.svg';
import IconSettings from '@/assets/icons/icon-settings.svg';
import { UserType } from '@/auth/stores';
import DesignSystem from '@/utils/designSystem';
import globalStyles from '@/utils/styles';
import { Group, Popover, Stack, Typography } from '@base';
import UserProfileImg from '@copmonents/UserProfileImg';
import { css } from '@emotion/react';
import { ReactNode } from 'react';

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
            <UserProfileImg />
            <img src={IconDropdown} />
          </Group>
        </div>
      </Popover.Trigger>
      <Popover.Content triggerPopoverMargin={9}>
        <div css={styles.content.root}>
          <Stack>
            <Group position="apart" css={styles.content.user}>
              <Group gap={12}>
                <UserProfileImg />
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
