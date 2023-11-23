import { ReactComponent as IconClock } from '@/assets/icon-clock.svg';
import { ReactComponent as IconStart } from '@/assets/icon-start.svg';
import { mergeRef } from '@/utils/components';
import DesignSystem from '@/utils/designSystem';
import { Group, Typography } from '@base';
import { css } from '@emotion/react';
import {
  FocusEvent,
  KeyboardEvent,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { keyDownEventHandler } from './utils';

const styles = {
  root: css({
    padding: '12px 23px',
    borderRadius: DesignSystem.Round.solid,
    background: DesignSystem.Color.background.gray,
    alignSelf: 'start',
  }),
  input: {
    root: css({
      padding: '4px 4px',
      borderRadius: DesignSystem.Round.solid,
      background: DesignSystem.Color.background.disabled,
      margin: 1,
      color: DesignSystem.Color.text.gray,
      width: 'auto',
    }),
    rootFocus: css({
      margin: 0,
      border: '1px solid var(--secondary-green)',
      background: DesignSystem.Color.background.white,
    }),
    number: css(DesignSystem.Text.body, {
      color: DesignSystem.Color.text.gray,
      padding: 0,
      textAlign: 'right',
    }),
    numberSecond: css({
      textAlign: 'left',
    }),
    numberFocus: css({ color: DesignSystem.Color.text.black }),
    colone: css(DesignSystem.Text.body, {
      color: DesignSystem.Color.text.gray,
      padding: '0 4px',
    }),
  },
};

export interface TimerProps {
  onChange?: (value: string) => void;
  onClickArrowKey?: (diraction: 'up' | 'down', caretPos?: number) => void;
  onSubmit?: (value: string) => void;
  onDelete?: (value: string) => void;
  onFocusBlur?: (isFocus: boolean) => void;
}

const Timer = forwardRef<HTMLInputElement, TimerProps>(function Timer(
  {
    onChange,
    onClickArrowKey,
    onDelete,
    onFocusBlur,
    onSubmit,
    ...props
  }: TimerProps,
  ref,
) {
  const [minuteValue, setMinuteValue] = useState('10');
  const [secondValue, setSecondValue] = useState('00');
  const [isFocused, setIsFocused] = useState(false);
  const minuteRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);

  const mergedRef = ref ? mergeRef(ref, minuteRef) : minuteRef;

  const commonParam = { onClickArrowKey, onDelete, onSubmit };

  const inputFocusCaretSet = (e: KeyboardEvent<HTMLInputElement>) => {
    const currentPos = e.currentTarget.selectionStart;
    currentPos && e.currentTarget.setSelectionRange(currentPos, currentPos + 1);
    if (currentPos === 2) secondRef.current?.focus();
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };
  const handleMinuteInput = (e: KeyboardEvent<HTMLInputElement>) => {
    inputFocusCaretSet(e);
    setMinuteValue(e.currentTarget.value);
  };
  const handleSecondInput = (e: KeyboardEvent<HTMLInputElement>) => {
    inputFocusCaretSet(e);
    setSecondValue(e.currentTarget.value);
  };
  const handleMinuteKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowRight' && e.currentTarget.selectionEnd === 2) {
      secondRef.current?.focus();
      return;
    }
    keyDownEventHandler({
      setValue: setMinuteValue,
      value: minuteValue,
      ...commonParam,
    })(e);
  };
  const handleSecondKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowLeft' && e.currentTarget.selectionStart === 0) {
      minuteRef.current?.focus();
      return;
    } else if (e.key === 'Backspace' && e.currentTarget.selectionEnd === 0) {
      minuteRef.current?.focus();
      e.preventDefault();
      return;
    }
    keyDownEventHandler({
      setValue: setSecondValue,
      value: secondValue,
      ...commonParam,
    })(e);
  };
  const handleFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
    e.target.setSelectionRange(0, 1);
    onFocusBlur?.(true);
    setIsFocused(true);
  };
  const handelBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    let minuteNewVal = minuteValue.padEnd(2, '0');
    let secondNewVal = secondValue.padEnd(2, '0');
    if (parseInt(secondNewVal) > 59) {
      minuteNewVal = `${parseInt(minuteNewVal) + 1}`;
      secondNewVal = `${parseInt(secondNewVal) - 60}`.padStart(2, '0');
    }
    if (parseInt(minuteNewVal) >= 59) {
      minuteNewVal = '59';
      secondNewVal = '00';
    }
    setMinuteValue(minuteNewVal);
    setSecondValue(secondNewVal);
    setIsFocused(false);
    onFocusBlur?.(false);
  };
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    let currentPos = e.currentTarget.selectionStart;
    currentPos = currentPos === 0 ? 1 : currentPos === 2 ? 1 : currentPos;
    if (e.key === 'ArrowRight')
      currentPos &&
        e.currentTarget.setSelectionRange(currentPos, currentPos + 1);
    else if (e.key === 'ArrowLeft')
      currentPos &&
        e.currentTarget.setSelectionRange(currentPos - 1, currentPos);
  };

  useEffect(() => {
    onChange?.(`${minuteValue}:${secondValue}}`);
  }, [minuteValue, secondValue]);

  const commonProps = {
    maxLength: 2,
    size: 2,
    css: [styles.input.number, isFocused && styles.input.numberFocus],
    onFocus: handleFocus,
    onBlur: handelBlur,
    autoFocus: true,
    onKeyUp: handleKeyUp,
    onKeyPress: handleKeyPress,
  };

  return (
    <Group css={styles.root} gap={20}>
      <Group gap={5}>
        <IconClock stroke={DesignSystem.Color.secondary.green} />
        <Typography color={DesignSystem.Color.secondary.green} variant="button">
          timer
        </Typography>
      </Group>
      <Group gap={5}>
        <Group css={[styles.input.root, isFocused && styles.input.rootFocus]}>
          <input
            ref={mergedRef}
            value={minuteValue}
            onInput={handleMinuteInput}
            onKeyDown={handleMinuteKeyDown}
            {...commonProps}
          />
          <div css={styles.input.colone}>:</div>
          <input
            ref={secondRef}
            value={secondValue}
            onInput={handleSecondInput}
            onKeyDown={handleSecondKeyDown}
            {...commonProps}
            css={[...commonProps.css, styles.input.numberSecond]}
          />
        </Group>
        <IconStart />
      </Group>
    </Group>
  );
});
export default Timer;
