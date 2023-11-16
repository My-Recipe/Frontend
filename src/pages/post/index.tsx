import DefaultProfile from '@/assets/default-profile.svg';
import { ReactComponent as IconDropdown } from '@/assets/icon-dropdown.svg';
import DesignSystem from '@/utils/designSystem';
import globalStyles from '@/utils/styles';
import { Group, Stack, Typography } from '@base';
import ToggleButton from '@copmonents/Toggle/ToggleButton';
import { css } from '@emotion/react';
import Editor from './components/Editor';

const styles = {
  root: css({
    padding: '97px 0',
  }),
  top: {
    root: css({
      height: 163,
      background: DesignSystem.Color.primary.yellow,
      padding: '0 89px',
      margin: '0 -164px',
      borderBottom: '1px solid var(--background-black)',
    }),
    back: {
      wrapper: css(globalStyles.button, { padding: 30 }),
      svg: css({
        rotate: '90deg',
        width: 32,
      }),
    },
    button: css(DesignSystem.Text.subtitle, {
      padding: '4px 19px',
      height: 51,
      width: 138,
      border: '1.4px solid var(--background-black)',
    }),
  },
};

export interface PostPageProps {}

function PostPage({ ...props }: PostPageProps) {
  return (
    <>
      <Group position="apart" css={styles.top.root}>
        <div css={styles.top.back.wrapper}>
          <IconDropdown css={styles.top.back.svg} />
        </div>
        <ToggleButton
          tabs={['링크를 가진 모두 보기', '나만 보기']}
          onChange={(value) => value}
        />
        <button onClick={() => {}} css={styles.top.button}>
          저장하기
        </button>
      </Group>
      <div css={styles.root}>
        <Stack spacing={28}>
          <Group gap={16}>
            <img src={DefaultProfile} css={{ width: 36 }} />
            <Typography variant="headline">해피밀</Typography>
          </Group>
          <Editor onChange={(data) => data} />
        </Stack>
      </div>
    </>
  );
}

export default PostPage;
