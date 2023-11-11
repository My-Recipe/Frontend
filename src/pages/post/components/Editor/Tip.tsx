import { mergeRef } from '@/utils/components';
import DesignSystem from '@/utils/designSystem';
import { Group, Typography } from '@base';
import { css } from '@emotion/react';
import { KeyboardEvent, forwardRef, useEffect, useRef, useState } from 'react';

const style = {
  root: css({
    padding: '12px 23px',
    borderRadius: DesignSystem.Round.solid,
    background: DesignSystem.Color.background.gray,
  }),
  input: css(DesignSystem.Text.body, {
    color: DesignSystem.Color.text.gray,
    flex: 1,
  }),
};

export interface TipProps {
  onChange?: (value: string) => void;
  onClickArrowKey?: (diraction: 'up' | 'down', caretPos?: number) => void;
  onSubmit?: (value: string) => void;
  onDelete?: (value: string) => void;
  onFocusBlur?: (isFocus: boolean) => void;
}
const Tip = forwardRef<HTMLInputElement, TipProps>(function Tip(
  { onChange, onClickArrowKey, onDelete, onSubmit, onFocusBlur, ...props },
  ref,
) {
  const [inputValue, setInputValue] = useState('');
  const tipRef = useRef<HTMLInputElement>(null);

  const mergedRef = ref ? mergeRef(ref, tipRef) : tipRef;

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      onClickArrowKey?.(e.key === 'ArrowUp' ? 'up' : 'down');
    } else if (e.currentTarget.selectionStart === 0 && e.key === 'ArrowLeft') {
      onClickArrowKey?.('up', -1);
    } else if (
      e.currentTarget.selectionStart === e.currentTarget.value.length &&
      e.key === 'ArrowRight'
    ) {
      onClickArrowKey?.('down', 0);
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const caretPos = e.currentTarget.selectionStart;
      if (caretPos === null) return;
      const [tipValue, etcValue] = [
        inputValue.substring(0, caretPos),
        inputValue.substring(caretPos),
      ];
      setInputValue(tipValue);
      onSubmit?.(etcValue);
    } else if (
      e.key === 'Backspace' &&
      (inputValue === '' || e.currentTarget.selectionStart === 0)
    ) {
      e.preventDefault();
      onDelete?.(inputValue);
      setInputValue('');
    }
  };

  useEffect(() => {
    onChange?.(inputValue);
  }, [inputValue]);

  return (
    <Group gap={20} css={style.root}>
      <Typography variant="body" color={DesignSystem.Color.secondary.green}>
        TIP
      </Typography>
      <input
        ref={mergedRef}
        value={inputValue}
        maxLength={65}
        onInput={(e) => setInputValue(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        css={style.input}
        onFocus={() => onFocusBlur?.(true)}
        onBlur={() => onFocusBlur?.(false)}
        autoFocus
      />
    </Group>
  );
});

export default Tip;
