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
  onClickArrowKey?: (direction: 'up' | 'down', caretPosition?: number) => void;
  placeholder?: string;
}

const TextInput = forwardRef<HTMLTextAreaElement, TextInputProps>(
  function TextInput(
    {
      propsValue,
      onValueChange,
      onSubmit,
      onDelete,
      onClickArrowKey,
      placeholder,
      ...props
    }: TextInputProps,
    ref,
  ) {
    const { value: inputValue, index } = propsValue;

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
        // ArrowUp, ArrowDown 키를 눌렀을 때
        const caret = getCaretCoordinates(
          textareaRef.current,
          textareaRef.current?.selectionStart || 0,
        );
        const top = 6;
        const bottom = e.currentTarget.offsetHeight - top - caret.height;

        if (top >= caret.top && e.code === 'ArrowUp') {
          e.preventDefault();
          onClickArrowKey && onClickArrowKey('up');
        } else if (bottom <= caret.top && e.code === 'ArrowDown') {
          e.preventDefault();
          onClickArrowKey && onClickArrowKey('down');
        }
      } else if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
        // ArrowLeft, ArrowRight 키를 눌렀을 때
        const caret = e.currentTarget.selectionStart;
        if (caret === 0 && e.code === 'ArrowLeft') {
          onClickArrowKey && onClickArrowKey('up', -1);
        } else if (caret === inputValue.length && e.code === 'ArrowRight') {
          onClickArrowKey && onClickArrowKey('down', 0);
        }
      }

      if (
        e.code === 'Backspace' &&
        (inputValue === '' || e.currentTarget.selectionStart === 0)
      ) {
        // Backspace와 함께 inputValue가 비어있거나, 커서가 맨 앞에 있을 때
        // 즉, 사용자가 number 아이콘을 지우려는 동작
        if (index) onValueChange({ index: undefined });
        else {
          e.preventDefault();
          onDelete && onDelete(inputValue);
        }
      } else if (index && e.code === 'Enter' && inputValue === '') {
        // Enter 키를 눌렀고, inputValue가 비어있을 때
        e.preventDefault();
        onValueChange({ index: undefined });
      } else if (e.code === 'Enter' && !e.shiftKey) {
        //shift + Enter 가 아닌 동작
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
