import { Dispatch, KeyboardEvent, SetStateAction } from 'react';

export const keyDownEventHandler =
  ({
    onClickArrowKey,
    setValue,
    value,
    onDelete,
    onSubmit,
  }: {
    onClickArrowKey?: (diraction: 'up' | 'down', caretPos?: number) => void;
    onSubmit?: (value: string) => void;
    onDelete?: (value: string) => void;
    value?: string;
    setValue?: Dispatch<SetStateAction<string>>;
  }) =>
  (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      onClickArrowKey?.(e.key === 'ArrowUp' ? 'up' : 'down');
    } else if (e.currentTarget.selectionEnd === 0 && e.key === 'ArrowLeft') {
      onClickArrowKey?.('up', -1);
    } else if (
      e.currentTarget.selectionEnd === e.currentTarget.value.length &&
      e.key === 'ArrowRight'
    ) {
      onClickArrowKey?.('down', 0);
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const caretPos = e.currentTarget.selectionEnd;
      if (caretPos === null) return;
      if (value) {
        const [tipValue, etcValue] = [
          value.substring(0, caretPos),
          value.substring(caretPos),
        ];
        setValue?.(tipValue);
        onSubmit?.(etcValue);
      }
    } else if (
      e.key === 'Backspace' &&
      (value === '' ||
        value === undefined ||
        e.currentTarget.selectionEnd === 0)
    ) {
      e.preventDefault();
      onDelete?.(value || '');
      setValue?.('');
    }
  };
