import EmptyCheckbox from '@/assets/checkbox-empty.svg';
import FillCheckbox from '@/assets/checkbox-fill.svg';
import BackgroundImg from '@/assets/newmypage-background.png';
import DesignSystem from '@/utils/designSystem';
import globalStyles from '@/utils/styles';
import { Group, Stack, Stroke, Typography } from '@base';
import Button from '@copmonents/Button';
import { css } from '@emotion/react';
import { ChangeEvent, useState } from 'react';
const newMyPageStyles = {
  root: css(globalStyles.center, { overflow: 'hidden' }),
  background: css({
    zIndex: 0,

    background: `no-repeat url(${BackgroundImg})`,
    backgroundSize: 'cover',
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
    height: 879,
  }),
  wrapper: css(
    {
      background: DesignSystem.Color.background.white,
      borderRadius: 32,
      width: 658,
      position: 'relative',
      zIndex: 2,
      margin: '116px 0 170px 0',
      padding: '80px 60px 38px 60px',
    },
    globalStyles.center,
  ),
  innerContent: {
    wrapper: css({ width: '100%' }),
    stroke: css({
      background: DesignSystem.Color.background.disabled,
      marginTop: 16,
    }),
    input: {
      box: css(
        {
          background: DesignSystem.Color.background.gray,
          color: DesignSystem.Color.text.black,
          height: 42,
          borderRadius: DesignSystem.Round.solid,
          textIndent: 15,
          padding: 0,
          width: 658,
          boxSizing: 'border-box',
          '&:focus': {
            border: '1px solid',
            borderColor: DesignSystem.Color.primary['yellow-hover'],
          },
        },
        DesignSystem.Text.button,
      ),
      counter: css({
        color: DesignSystem.Color.text.gray,
        position: 'relative',
        top: -35,
        left: 590,
        marginBottom: -24,
      }),
      stack: css({ marginTop: 41 }),
    },
    checkboxStack: css({ marginTop: 32 }),
    checkbox: css(globalStyles.button),
    button: css({ width: 265, alignSelf: 'center', marginTop: 44 }),
  },
};
export interface RecipeBookType {
  title: string;
  intro: string;
  isAllowed: boolean;
  setIsAllowed: React.Dispatch<React.SetStateAction<boolean>>;
}
function MyPage() {
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [isAllowed, setIsAllowed] = useState(true);

  return (
    <div css={newMyPageStyles.root}>
      <div css={newMyPageStyles.background} />
      <div css={newMyPageStyles.blur} />
      <div css={newMyPageStyles.wrapper}>
        <Stack css={newMyPageStyles.innerContent.wrapper}>
          <Typography variant="subtitle">레시피북 설정 편집</Typography>
          <Stroke css={newMyPageStyles.innerContent.stroke} />
          <Stack spacing={15} css={newMyPageStyles.innerContent.input.stack}>
            <Typography variant="info" color={DesignSystem.Color.text.gray}>
              레시피북 제목
            </Typography>

            <TextInput value={title} setValue={setTitle} maxLength={20} />
          </Stack>
          <Stack spacing={20} css={newMyPageStyles.innerContent.checkboxStack}>
            <Typography variant="info" color={DesignSystem.Color.text.gray}>
              공개범위 설정
            </Typography>
            <Group gap={46}>
              <Group
                gap={2}
                onClick={() => {
                  setIsAllowed(true);
                }}
                css={newMyPageStyles.innerContent.checkbox}
              >
                <img src={isAllowed ? FillCheckbox : EmptyCheckbox} />
                <Typography variant="button">모든 대상에게 공개</Typography>
              </Group>
              <Group
                gap={2}
                onClick={() => {
                  setIsAllowed(false);
                }}
                css={newMyPageStyles.innerContent.checkbox}
              >
                <img src={isAllowed ? EmptyCheckbox : FillCheckbox} />
                <Typography variant="button">
                  링크를 가진 대상에게만 공개
                </Typography>
              </Group>
            </Group>
          </Stack>
          <Stack spacing={15} css={newMyPageStyles.innerContent.input.stack}>
            <Typography variant="info" color={DesignSystem.Color.text.gray}>
              한줄 소개
            </Typography>
            <TextInput value={intro} setValue={setIntro} maxLength={40} />
          </Stack>
          <Button variant="icon" css={newMyPageStyles.innerContent.button}>
            이대로 레시피북 생성하기
          </Button>
        </Stack>
      </div>
    </div>
  );
}
interface TextInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  maxLength: number;
}
function TextInput({ value, setValue, maxLength }: TextInputProps) {
  const [inputCount, setInputCount] = useState(0);
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
    setValue(e.target.value);
    setInputCount(e.target.value.length);
  };
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleInput}
        maxLength={maxLength}
        css={newMyPageStyles.innerContent.input.box}
      />
      <Typography
        variant="info"
        css={newMyPageStyles.innerContent.input.counter}
      >
        ({inputCount}/{maxLength})
      </Typography>
    </div>
  );
}

export default MyPage;
