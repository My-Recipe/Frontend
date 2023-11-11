import DesignSystem from '@/utils/designSystem';
import { Group, Typography } from '@base';
import { css } from '@emotion/react';
import { KeyboardEvent, forwardRef } from 'react';

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
  onCursorChange?: (diraction: 'up' | 'down', caretPos?: number) => void;
}
const Tip = forwardRef<HTMLInputElement, TipProps>(function Tip(
  { onChange, onCursorChange, ...props },
  ref,
) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      onCursorChange?.(e.key === 'ArrowUp' ? 'up' : 'down');
    } else if (e.currentTarget.selectionStart === 0 && e.key === 'ArrowLeft') {
      onCursorChange?.('up', -1);
    } else if (
      e.currentTarget.selectionStart === e.currentTarget.value.length &&
      e.key === 'ArrowRight'
    ) {
      onCursorChange?.('down', 0);
    }
  };
  return (
    <Group gap={20} css={style.root}>
      <Typography variant="body" color={DesignSystem.Color.secondary.green}>
        TIP
      </Typography>
      <input
        ref={ref}
        maxLength={65}
        onInput={(e) => onChange?.(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        css={style.input}
      />
    </Group>
  );
});

export default Tip;
