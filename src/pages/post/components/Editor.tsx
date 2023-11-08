import DesignSystem from '@/utils/designSystem';
import { Stack, Stroke } from '@base';
import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import Ingredient, { IngredientType } from './Ingredient';
import TextInput, { TextInputValueItemType } from './TextInput';

const editorStyles = {
  root: css({
    padding: '154px 82px',
    border: '1px solid var(--background-disabled)',
    minWidth: 960,
    background: DesignSystem.Color.background.white,
  }),
  input: css(
    {
      '::placeholder': {
        color: DesignSystem.Color.text.gray,
      },
      color: DesignSystem.Color.text.black,
      width: '100%',
    },
    DesignSystem.Text.headline,
  ),
  stroke: css({
    backgroundColor: DesignSystem.Color.background.disabled,
    marginTop: 12,
  }),
};

export interface EditorProps {}

type TextType = TextInputValueItemType & { key: number; id: string };

export interface PostDataType {
  ingredients: (IngredientType & { key: number })[];
  text: TextType[];
}

let ingrCount = 0;
let textCount = 0;

function Editor({ ...props }: EditorProps) {
  const [data, setData] = useState<PostDataType>({
    ingredients: [],
    text: [],
  });
  const textRefs = useRef<Array<HTMLTextAreaElement | null>>([]);

  useEffect(() => {
    setData({
      ...data,
      ingredients: [{ groupTitle: '', tags: [], key: ingrCount++ }],
      text: [{ value: '', index: 1, key: textCount++, id: 'index-text' }],
    });
  }, []);

  const handleIngrChange = (item: IngredientType, targetIndex: number) => {
    if (targetIndex === 0) {
      if (!item.groupTitle) return;
      setData({
        ...data,
        ingredients: [
          { groupTitle: '', tags: [], key: ingrCount++ },
          ...data.ingredients,
        ],
      });
    }
    setData({
      ...data,
      ingredients: data.ingredients.map((data, index) =>
        index === targetIndex ? { ...item, key: data.key } : data,
      ),
    });
  };

  const handleTextChange = (
    item: Partial<TextInputValueItemType>,
    targetIndex: number,
  ) => {
    setData({
      ...data,
      text: data.text.map((data, index) =>
        index === targetIndex ? { ...data, ...item } : data,
      ),
    });
  };

  const handleTextSubmit = (value: string, index: number) => {
    const prevItem = data.text[index];

    setData({
      ...data,
      text: [
        ...data.text.slice(0, index),
        {
          ...prevItem,
          value: prevItem.value.slice(0, prevItem.value.length - value.length),
        },
        {
          value,
          index: prevItem?.index && prevItem.index + 1,
          key: textCount++,
          id: 'index-text',
        },
        ...data.text.slice(index + 1),
      ],
    });
  };

  const handleTextDelete = (value: string, targetIndex: number) => {
    const prevRef = textRefs.current[targetIndex - 1];

    setData({
      ...data,
      text: data.text
        .map((item, index) =>
          index === targetIndex - 1
            ? { ...item, value: `${item.value}${value}` }
            : item,
        )
        .filter((_, index) => index !== targetIndex),
    });

    prevRef?.focus();
    setTimeout(() => {
      prevRef?.setSelectionRange(-1, -1);
    }, 1);
  };

  const handleArrowUpDown = (direction: 'up' | 'down', index: number) => {
    const isDirectinoUp = direction === 'up';
    const ref = textRefs.current[isDirectinoUp ? index - 1 : index + 1];
    const indexCheck = isDirectinoUp
      ? index === 0
      : index === data.text.length - 1;
    const indexPosition = isDirectinoUp ? 0 : -1;
    const position = isDirectinoUp ? -1 : 0;

    if (indexCheck || !ref) {
      textRefs.current[index]?.setSelectionRange(indexPosition, indexPosition);
    } else {
      setTimeout(() => {
        ref.focus();
        ref.setSelectionRange(position, position);
      });
    }
  };

  return (
    <Stack spacing={85} css={editorStyles.root}>
      <div>
        <input
          css={editorStyles.input}
          placeholder="레시피의 이름을 알려주세요."
        />
        <Stroke css={editorStyles.stroke} />
      </div>
      <Stack spacing={12}>
        {data.ingredients.map(({ key }, listIndex) => (
          <Ingredient
            key={key}
            onChange={(item) => handleIngrChange(item, listIndex)}
            index={key}
          />
        ))}
        {data.text.map((item, index) =>
          item.id === 'index-text' ? (
            <TextInput
              key={`data-text-${item.key}`}
              ref={(el) => (textRefs.current[index] = el)}
              propsValue={item}
              onValueChange={(data) => handleTextChange(data, index)}
              onSubmit={(value) => handleTextSubmit(value, index)}
              onDelete={(value) => handleTextDelete(value, index)}
              onArrowUpDown={(direction) => handleArrowUpDown(direction, index)}
              placeholder="이미지와 함께 조리과정을 적어보세요."
            />
          ) : (
            <>tes</>
          ),
        )}
      </Stack>
    </Stack>
  );
}

export default Editor;
