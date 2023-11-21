import { mergeRef } from '@/utils/components';
import DesignSystem from '@/utils/designSystem';
import { Group, Typography } from '@base';
import { css } from '@emotion/react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { keyDownEventHandler } from './utils';

const style = {
  root: css({
    padding: '12px 23px',
    width: 1054,
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
    <Group gap={20} css={style.root}>
      <Typography variant="body" color={DesignSystem.Color.secondary.green}>
        TIP
      </Typography>
      <input
        data-testid="tip-input"
        ref={mergedRef}
        value={inputValue}
        maxLength={60}
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
