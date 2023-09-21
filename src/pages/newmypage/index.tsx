import EmptyCheckbox from '@/assets/checkbox-empty.svg';
import FillCheckbox from '@/assets/checkbox-fill.svg';
import BackgroundImg from '@/assets/newmypage-background.png';
import DesignSystem from '@/utils/designSystem';
import globalStyles from '@/utils/styles';
import { Group, Stack, Stroke, Typography } from '@base';
import Button from '@copmonents/Button';
import { css } from '@emotion/react';
import { useState } from 'react';
const myPageStyles = {
  root: css(globalStyles.center),
  background: css({
    zIndex: 0,
    backgroundImage: `url(${BackgroundImg})`,
    width: '100%',
    height: '100%',
    position: 'absolute',
    filter: 'blur(6px)',
    top: 0,
    left: 0,
  }),
  blur: css({
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,

    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    height: '100%',
  }),
  wrapper: css(
    {
      background: DesignSystem.Color.background.white,
      borderRadius: 32,
      width: 778,
      position: 'relative',
      zIndex: 2,
      marginTop: 116,
    },
    globalStyles.center,
  ),
  innerContent: {
    wrapper: css({ padding: '80px 60px 38px 60px', width: '100%' }),
    stroke: css({
      background: DesignSystem.Color.background.disabled,
    }),
    input: css(
      {
        background: DesignSystem.Color.background.gray,
        color: DesignSystem.Color.text.black,
        height: 48,
        borderRadius: 4,
      },
      DesignSystem.Text.body,
    ),
    inputStack: css({ marginTop: 41 }),
    checkboxStack: css({ marginTop: 32 }),
    checkbox: css({ cursor: 'pointer' }),
    button: css({ width: 265, alignSelf: 'center', marginTop: 44 }),
  },
};
function MyPage() {
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [isAllowed, setIsAllowed] = useState(true);

  return (
    <div css={myPageStyles.root}>
      <div css={myPageStyles.background} />
      <div css={myPageStyles.blur} />
      <div css={myPageStyles.wrapper}>
        <Stack css={myPageStyles.innerContent.wrapper}>
          <Typography variant="subtitle">레시피북 설정하기</Typography>
          <Stroke css={myPageStyles.innerContent.stroke} />
          <Stack spacing={15} css={myPageStyles.innerContent.inputStack}>
            <Typography variant="info" color={DesignSystem.Color.text.gray}>
              레시피 제목
            </Typography>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              css={myPageStyles.innerContent.input}
            />
          </Stack>
          <Stack spacing={20} css={myPageStyles.innerContent.checkboxStack}>
            <Typography variant="info" color={DesignSystem.Color.text.gray}>
              공개범위 설정
            </Typography>
            <Group gap={46}>
              <Group
                gap={2}
                onClick={() => {
                  setIsAllowed(true);
                }}
                css={myPageStyles.innerContent.checkbox}
              >
                <img src={isAllowed ? FillCheckbox : EmptyCheckbox} />
                <Typography variant="button">모든 대상에게 공개</Typography>
              </Group>
              <Group
                gap={2}
                onClick={() => {
                  setIsAllowed(false);
                }}
                css={myPageStyles.innerContent.checkbox}
              >
                <img src={isAllowed ? EmptyCheckbox : FillCheckbox} />
                <Typography variant="button">
                  링크를 가진 대상에게만 공개
                </Typography>
              </Group>
            </Group>
          </Stack>
          <Stack spacing={15} css={myPageStyles.innerContent.inputStack}>
            <Typography variant="info" color={DesignSystem.Color.text.gray}>
              한줄 소개
            </Typography>
            <input
              type="text"
              value={intro}
              onChange={(e) => {
                setIntro(e.target.value);
              }}
              css={myPageStyles.innerContent.input}
            />
          </Stack>
          <Button variant="icon" css={myPageStyles.innerContent.button}>
            이대로 레시피북 생성하기
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default MyPage;
