import DesignSystem from '@/utils/designSystem';
import { useComposing } from '@/utils/hooks';
import { Group, Stack } from '@base';
import Button from '@copmonents/Button';
import Tag from '@copmonents/Tag';
import { css } from '@emotion/react';
import { KeyboardEvent, MouseEvent, useEffect, useState } from 'react';

const ingredientStyles = {
  root: css({
    borderRadius: DesignSystem.Round.solid,
    border: `1.4px solid ${DesignSystem.Color.background.disabled}`,
    padding: '41px 42px',
  }),
  input: css(
    {
      '::placeholder': { color: DesignSystem.Color.text.gray },
      color: DesignSystem.Color.text.black,
    },
    DesignSystem.Text.subtitle,
  ),
  ingr: {
    root: css({
      height: 42,
    }),
    input: css(
      {
        borderRadius: DesignSystem.Round.solid,
        background: DesignSystem.Color.background.gray,
        padding: '9.46px 17px',
        flex: 1,
        height: '100%',
        boxSizing: 'border-box',
      },
      DesignSystem.Text.body,
    ),
    button: css({
      padding: '14.5px 29px',
      height: '100%',
      borderRadius: DesignSystem.Round.solid,
    }),
  },
};

interface IngredientTagsType {
  value: string;
  label: string;
}

export type IngredientType = {
  groupTitle: string;
  tags: IngredientTagsType[];
};

export interface IngredientProps {
  index: number;
  onChange?: (item: IngredientType) => void;
}

let ingrCounter = 0;
const tagsColors = [
  DesignSystem.Color.sub.brown,
  DesignSystem.Color.sub.pink,
  DesignSystem.Color.secondary.green,
];

function Ingredient({ index, onChange, ...props }: IngredientProps) {
  const [ingrTags, setIngrTags] = useState<IngredientTagsType[]>([]);
  const [ingrGroup, setIngrGroup] = useState('');
  const [newIngrLabel, setNewIngrLabel] = useState('');

  const [isComposing, composeProps] = useComposing();

  useEffect(() => {
    onChange && onChange({ groupTitle: ingrGroup, tags: ingrTags });
  }, [ingrTags, ingrGroup]);

  const onIngrTagsOnClose = (e: MouseEvent, closeValue: string) => {
    setIngrTags(ingrTags.filter(({ value }) => value !== closeValue));
  };
  const onAddButtonClick = () => {
    if (!newIngrLabel) return;
    setIngrTags([
      ...ingrTags,
      { value: `${ingrCounter}-${newIngrLabel}`, label: newIngrLabel },
    ]);
    setNewIngrLabel('');
    ingrCounter++;
  };
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;
    if (e.key === 'Enter') {
      onAddButtonClick();
    }
  };

  return (
    <Stack css={ingredientStyles.root} spacing={60}>
      <input
        css={ingredientStyles.input}
        placeholder={`재료 그룹 ${index}`}
        onChange={(e) => setIngrGroup(e.target.value)}
      />
      <Stack spacing={20}>
        <Group css={ingredientStyles.ingr.root} gap={12}>
          <input
            css={[ingredientStyles.input, ingredientStyles.ingr.input]}
            placeholder="ex) 돼지고기"
            value={newIngrLabel}
            onChange={(e) => setNewIngrLabel(e.target.value)}
            onKeyDown={onKeyDown}
            {...composeProps}
          />
          {newIngrLabel && (
            <Button
              onClick={onAddButtonClick}
              css={ingredientStyles.ingr.button}
            >
              추가하기
            </Button>
          )}
        </Group>
        <Group gap={6}>
          {ingrTags.map(({ label, value }) => (
            <Tag
              color={tagsColors[(index - 1) % tagsColors.length]}
              key={value}
              label={label}
              value={value}
              onClose={onIngrTagsOnClose}
            />
          ))}
        </Group>
      </Stack>
    </Stack>
  );
}

export default Ingredient;
