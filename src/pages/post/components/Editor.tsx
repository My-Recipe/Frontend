import DesignSystem from '@/utils/designSystem';
import { Stack, Stroke } from '@base';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import Ingredient, { IngredientType } from './Ingredient';

const editorStyles = {
  root: css({
    padding: '154px 82px',
    border: '1px solid var(--background-disabled)',
    background: DesignSystem.Color.background.white,
  }),
  input: css(
    {
      '&::placeholder': {
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
  ingredients: (IngredientType & { index: number })[];
}

let ingrCount = 0;

function Editor({ ...props }: EditorProps) {
  const [data, setData] = useState<PostDataType>({
    ingredients: [],
  });

  useEffect(() => {
    setData({
      ...data,
      ingredients: [{ groupTitle: '', tags: [], index: ingrCount++ }],
    });
  }, []);

  const onIngrChange = (item: IngredientType, targetIndex: number) => {
    setData({
      ...data,
      ingredients: data.ingredients.map((data, index) =>
        index === targetIndex ? { ...item, index: data.index } : data,
      ),
    });
  };
  const onIngrAdd = (item: IngredientType) => {
    if (!item.groupTitle) return;
    setData({
      ...data,
      ingredients: [
        { groupTitle: '', tags: [], index: ingrCount++ },
        ...data.ingredients,
      ],
    });
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
        {data.ingredients.map(({ index }, listIndex) => (
          <Ingredient
            key={index}
            onChange={(item) => {
              if (listIndex === 0) {
                onIngrAdd(item);
              } else {
                onIngrChange(item, listIndex);
              }
            }}
            index={index}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default Editor;
