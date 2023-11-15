import EmptyCheckbox from '@/assets/checkbox-empty.svg';
import FillCheckbox from '@/assets/checkbox-fill.svg';
import DesignSystem from '@/utils/designSystem';
import globalStyles from '@/utils/styles';
import { Group, Stack, Stroke, Typography } from '@base';
import Button from '@copmonents/Button';
import { css } from '@emotion/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { RecipeBookType } from '..';

interface BookSettingProps {
  data: RecipeBookType;
  onSubmit: (data: RecipeBookType) => void;
  submitText: string;
}

function BookSetting({
  data: { title, intro, forPublic },
  onSubmit,
  submitText,
}: BookSettingProps) {
  const [inputData, setInputData] = useState<RecipeBookType>({
    title: '',
    intro: '',
    forPublic: true,
  });
  const {
    title: inputTitle,
    intro: inputIntro,
    forPublic: inputForPublic,
  } = inputData;
  const bookSettingStyle = {
    innerContent: {
      wrapper: css({ width: '100%' }),
      stroke: css({
        background: DesignSystem.Color.background.disabled,
        marginTop: 16,
      }),
      input: {
        stack: css({ marginTop: 41 }),
      },
      checkboxStack: css({ marginTop: 32 }),
      checkbox: css(globalStyles.button),
      button: css({
        width: 265,
        alignSelf: 'center',
        marginTop: 44,
        backgroundColor:
          inputTitle && inputIntro
            ? DesignSystem.Color.background.black
            : DesignSystem.Color.background.disabled,
        cursor: inputTitle && inputIntro ? 'pointer' : 'default',
      }),
    },
  };

  return (
    <Stack css={bookSettingStyle.innerContent.wrapper}>
      <Typography variant="subtitle">레시피북 설정 편집</Typography>
      <Stroke css={bookSettingStyle.innerContent.stroke} />
      <Stack spacing={15} css={bookSettingStyle.innerContent.input.stack}>
        <Typography variant="info" color={DesignSystem.Color.text.gray}>
          레시피북 제목
        </Typography>

        <TextInput
          value={inputTitle}
          setValue={(text) => {
            setInputData({ ...inputData, title: text });
          }}
          maxLength={20}
        />
      </Stack>
      <Stack spacing={20} css={bookSettingStyle.innerContent.checkboxStack}>
        <Typography variant="info" color={DesignSystem.Color.text.gray}>
          공개범위 설정
        </Typography>
        <Group gap={46}>
          <Group
            gap={2}
            onClick={() => {
              setInputData({ ...inputData, forPublic: true });
            }}
            css={bookSettingStyle.innerContent.checkbox}
          >
            <img src={inputForPublic ? FillCheckbox : EmptyCheckbox} />
            <Typography variant="button">모든 대상에게 공개</Typography>
          </Group>
          <Group
            gap={2}
            onClick={() => {
              setInputData({ ...inputData, forPublic: false });
            }}
            css={bookSettingStyle.innerContent.checkbox}
          >
            <img src={inputForPublic ? EmptyCheckbox : FillCheckbox} />
            <Typography variant="button">
              링크를 가진 대상에게만 공개
            </Typography>
          </Group>
        </Group>
      </Stack>
      <Stack spacing={15} css={bookSettingStyle.innerContent.input.stack}>
        <Typography variant="info" color={DesignSystem.Color.text.gray}>
          한줄 소개
        </Typography>
        <TextInput
          value={inputIntro}
          setValue={(text) => {
            setInputData({ ...inputData, intro: text });
          }}
          maxLength={45}
        />
      </Stack>
      <Button
        variant="icon"
        css={bookSettingStyle.innerContent.button}
        onClick={() => {
          onSubmit(inputData);
        }}
      >
        {submitText}
      </Button>
    </Stack>
  );
}
interface TextInputProps {
  value: string;
  setValue: (text: string) => void;
  maxLength: number;
}
function TextInput({ value, setValue, maxLength }: TextInputProps) {
  const [inputCount, setInputCount] = useState(0);
  const inputStyle = {
    box: css(
      {
        background: DesignSystem.Color.background.gray,
        color: DesignSystem.Color.text.black,
        height: 42,
        borderRadius: DesignSystem.Round.solid,
        textIndent: 15,
        padding: '0 70px 0 0',
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
  };
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
    setValue(e.target.value);
  };
  useEffect(() => {
    setInputCount(value.length);
  }, [value]);
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleInput}
        maxLength={maxLength}
        css={inputStyle.box}
      />
      <Typography variant="info" css={inputStyle.counter}>
        ({inputCount}/{maxLength})
      </Typography>
    </div>
  );
}
export default BookSetting;
