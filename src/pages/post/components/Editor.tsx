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

export interface PostDataType {
  ingredients: (IngredientType & { key: number })[];
  text: (TextInputValueItemType & { key: number })[];
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
      text: [{ value: '', index: 1, key: textCount++ }],
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
    item: TextInputValueItemType,
    targetIndex: number,
  ) => {
    setData({
      ...data,
      text: data.text.map((data, index) =>
        index === targetIndex ? { ...item, key: data.key } : data,
      ),
    });
  };

  const handleTextSubmit = (index: number) => {
    const prevItem = data.text[index];

    setData({
      ...data,
      text: [
        ...data.text.slice(0, index + 1),
        {
          value: '',
          index: prevItem?.index && prevItem.index + 1,
          key: textCount++,
        },
        ...data.text.slice(index + 1),
      ],
    });
  };

  const handleTextDelete = (value: string, targetIndex: number) => {
    const prevRef = textRefs.current[targetIndex - 1];
    const carrotPos = data.text[targetIndex - 1].value.length;

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
      prevRef?.setSelectionRange(carrotPos, carrotPos);
    }, 1);
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
        {data.text.map((item, index) => (
          <TextInput
            key={`data-text-${item.key}`}
            ref={(el) => (textRefs.current[index] = el)}
            propsValue={item}
            onValueChange={(data) => handleTextChange(data, index)}
            onSubmit={() => handleTextSubmit(index)}
            onDelete={(value) => handleTextDelete(value, index)}
            placeholder="이미지와 함께 조리과정을 적어보세요."
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default Editor;
