import Numbers from '@/assets/Numbers';
import { mergeRef } from '@/utils/components';
import DesignSystem from '@/utils/designSystem';
import { useComposing } from '@/utils/hooks';
import { Group } from '@base';
import { css } from '@emotion/react';
import { KeyboardEvent, forwardRef, useEffect, useRef, useState } from 'react';

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
  propsValue?: TextInputValueItemType;
  onValueChange?: (item: TextInputValueItemType) => void;
  onSubmit?: (item: TextInputValueItemType) => void;
  onDelete?: (remainValue: string) => void;
  placeholder?: string;
}

const TextInput = forwardRef<HTMLTextAreaElement, TextInputProps>(
  function TextInput(
    {
      propsValue,
      onValueChange,
      onSubmit,
      onDelete,
      placeholder,
      ...props
    }: TextInputProps,
    ref,
  ) {
    const [index, setIndex] = useState(propsValue?.index);
    const [inputValue, setInputValue] = useState(propsValue?.value || '');

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
      setIndex(prefixNumber);
      setInputValue(inputValue.replace(`${prefixNumber} `, ''));
    }, [inputValue]);

    useEffect(() => {
      onValueChange && onValueChange({ index, value: inputValue });
    }, [index, inputValue]);

    useEffect(() => {
      setInputValue(propsValue?.value || '');
    }, [propsValue?.value]);

    const handelKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (isComposing) return;

      if (
        e.code === 'Backspace' &&
        (inputValue === '' || e.currentTarget.selectionStart === 0)
      ) {
        if (index) setIndex(undefined);
        else {
          e.preventDefault();
          onDelete && onDelete(inputValue);
        }
      } else if (index && e.code === 'Enter' && inputValue === '') {
        e.preventDefault();
        setIndex(undefined);
      } else if (e.code === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSubmit && onSubmit({ value: inputValue, index });
      }
    };

    const resizeTextArea = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + 'px';
      }
    };

    useEffect(resizeTextArea, [inputValue]);

    return (
      <Group css={textInputStyles.root}>
        {index && <Numbers css={textInputStyles.index}>{index}</Numbers>}
        <textarea
          {...composeProps}
          onKeyDown={handelKeyDown}
          onChange={(e) => setInputValue(e.target.value)}
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
