import Numbers from '@/assets/Numbers';
import { mergeRef } from '@/utils/components';
import DesignSystem from '@/utils/designSystem';
import { useComposing } from '@/utils/hooks';
import { Group } from '@base';
import { css } from '@emotion/react';
import { KeyboardEvent, forwardRef, useEffect, useRef } from 'react';
import getCaretCoordinates from 'textarea-caret';

const textInputStyles = {
  root: css({
    padding: '3px 0',
    alignItems: 'flex-start',
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
  }),
  input: css(
    {
      '::placeholder': {
        color: DesignSystem.Color.text.gray,
      },
      flex: 1,
      background: 'none',
      border: 'none',
      resize: 'none',
      overflowY: 'hidden',
      outline: 'none',
      boxShadow: 'none',
      paddingTop: 6,
      lineHeight: 1.2,
    },
    DesignSystem.Text.textbody,
  ),

  index: css({
    padding: 0,
    height: 42,
  }),
};

export type TextInputValueItemType = {
  index?: number;
  value: string;
};

export interface TextInputProps {
  propsValue: TextInputValueItemType;
  onValueChange: (item: Partial<TextInputValueItemType>) => void;
  onSubmit?: (remainValue: string) => void;
  onDelete?: (remainValue: string) => void;
  onArrowUpDown?: (direction: 'up' | 'down') => void;
  placeholder?: string;
}

const TextInput = forwardRef<HTMLTextAreaElement, TextInputProps>(
  function TextInput(
    {
      propsValue,
      onValueChange,
      onSubmit,
      onDelete,
      onArrowUpDown,
      placeholder,
      ...props
    }: TextInputProps,
    ref,
  ) {
    // const [index, setIndex] = useState(propsValue?.index);
    const { value: inputValue, index } = propsValue;
    // const [inputValue, setInputValue] = useState(propsValue?.value || '');

    const [isComposing, composeProps] = useComposing();

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const mergedRef = ref ? mergeRef(textareaRef, ref) : textareaRef;

    useEffect(() => {
      const splitValue = inputValue.split(' ');
      if (splitValue.length < 2) return;
      const prefixNumber = parseInt(splitValue[0]);
      if (
        Number.isNaN(prefixNumber) ||
        prefixNumber > 20 ||
        prefixNumber <= 0 ||
        splitValue[0] !== `${prefixNumber}`
      )
        return;
      if (index) return;
      onValueChange({
        index: prefixNumber,
        value: inputValue.replace(`${prefixNumber} `, ''),
      });
    }, [inputValue]);

    useEffect(() => {
      if (propsValue?.index !== index || propsValue?.value !== inputValue)
        onValueChange && onValueChange({ index, value: inputValue });
    }, [index, inputValue]);

    const resizeTextArea = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + 'px';
      }
    };

    useEffect(resizeTextArea, [inputValue]);

    const handelKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (isComposing) return;
      if (textareaRef.current === null) return;

      if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
        const caret = getCaretCoordinates(
          textareaRef.current,
          textareaRef.current?.selectionStart || 0,
        );
        const top = 6;
        const bottom = e.currentTarget.offsetHeight - top - caret.height;

        if (top >= caret.top && e.code === 'ArrowUp') {
          e.preventDefault();
          onArrowUpDown && onArrowUpDown('up');
        } else if (bottom <= caret.top && e.code === 'ArrowDown') {
          e.preventDefault();
          onArrowUpDown && onArrowUpDown('down');
        }
      }

      if (
        e.code === 'Backspace' &&
        (inputValue === '' || e.currentTarget.selectionStart === 0)
      ) {
        if (index) onValueChange({ index: undefined });
        else {
          e.preventDefault();
          onDelete && onDelete(inputValue);
        }
      } else if (index && e.code === 'Enter' && inputValue === '') {
        e.preventDefault();
        onValueChange({ index: undefined });
      } else if (e.code === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const caretIndex = e.currentTarget.selectionStart;
        onValueChange({ index: undefined });
        onSubmit && onSubmit(inputValue.slice(caretIndex));
      }
    };

    return (
      <Group css={textInputStyles.root}>
        {index && <Numbers css={textInputStyles.index}>{index}</Numbers>}
        <textarea
          {...composeProps}
          onKeyDown={handelKeyDown}
          onChange={(e) => onValueChange({ value: e.target.value })}
          css={textInputStyles.input}
          value={inputValue}
          ref={mergedRef}
          rows={1}
          spellCheck={false}
          placeholder={placeholder}
          autoFocus
        />
      </Group>
    );
  },
);

export default TextInput;
