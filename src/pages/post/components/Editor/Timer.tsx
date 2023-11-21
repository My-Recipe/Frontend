import { ReactComponent as IconClock } from '@/assets/icon-clock.svg';
import { ReactComponent as IconStart } from '@/assets/icon-start.svg';
import { mergeRef } from '@/utils/components';
import DesignSystem from '@/utils/designSystem';
import { Group, Typography } from '@base';
import { css } from '@emotion/react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { keyDownEventHandler } from './utils';

const styles = {
  root: css({
    padding: '12px 23px',
    borderRadius: DesignSystem.Round.solid,
    background: DesignSystem.Color.background.gray,
    alignSelf: 'start',
  }),
  input: css(DesignSystem.Text.body, {
    padding: '4px 12px',
    borderRadius: DesignSystem.Round.solid,
    background: DesignSystem.Color.background.disabled,
    margin: 1,
    color: DesignSystem.Color.text.gray,
    width: 'auto',
    ':focus': {
      margin: 0,
      border: '1px solid var(--secondary-green)',
      background: DesignSystem.Color.background.white,
    },
    '::placeholder': {
      color: DesignSystem.Color.text.gray,
    },
  }),
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
  const [inputValue, setInputValue] = useState('');
  const timerRef = useRef<HTMLInputElement>(null);

  const mergedRef = ref ? mergeRef(ref, timerRef) : timerRef;

  const handleKeyDown = keyDownEventHandler({
    onClickArrowKey,
    onDelete,
    onSubmit,
    setValue: setInputValue,
    value: inputValue,
  });

  useEffect(() => {
    onChange?.(inputValue);
  }, [inputValue]);

  return (
    <Group css={styles.root} gap={20}>
      <Group gap={5}>
        <IconClock stroke={DesignSystem.Color.secondary.green} />
        <Typography color={DesignSystem.Color.secondary.green} variant="button">
          timer
        </Typography>
      </Group>
      <Group gap={5}>
        <input
          ref={mergedRef}
          value={inputValue}
          onInput={(e) => setInputValue(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => onFocusBlur?.(true)}
          onBlur={() => onFocusBlur?.(false)}
          autoFocus
          placeholder="10:00"
          size={4}
          css={styles.input}
        />
        <IconStart />
      </Group>
    </Group>
  );
});
export default Timer;
