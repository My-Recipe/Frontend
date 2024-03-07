import { ReactComponent as IconCancel } from '@/assets/icons/icon-cancel.svg';
import DesignSystem from '@/utils/designSystem';
import { useComposing } from '@/utils/hooks';
import globalStyles from '@/utils/styles';
import { Group, Stack } from '@base';
import Button from '@copmonents/Button';
import Tag from '@copmonents/Tag';
import { css } from '@emotion/react';
import { KeyboardEvent, MouseEvent, useEffect, useState } from 'react';

const styles = {
  root: css({
    borderRadius: DesignSystem.Round.solid,
    border: `1.4px solid ${DesignSystem.Color.background.disabled}`,
    padding: '41px 42px',
  }),
  input: css(
    {
      '::placeholder': { color: DesignSystem.Color.text.gray },
      color: DesignSystem.Color.text.black,
      flex: 1,
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
        maxWidth: 658,
      },
      DesignSystem.Text.body,
    ),
    button: css({
      padding: '14.5px 29px',
      height: '100%',
      borderRadius: DesignSystem.Round.solid,
    }),
    group: css({ maxWidth: 658 }),
  },
  cancel: {
    wrapper: css(globalStyles.button, globalStyles.center, {
      width: 36,
      height: 36,
    }),
    root: css({
      fill: DesignSystem.Color.text.gray,
    }),
    hover: css({
      fill: DesignSystem.Color.text.black,
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
  onRemove?: () => void;
}

let ingrCounter = 0;
const tagsColors = [
  DesignSystem.Color.sub.brown,
  DesignSystem.Color.sub.pink,
  DesignSystem.Color.secondary.green,
];

function Ingredient({ index, onChange, onRemove, ...props }: IngredientProps) {
  const [ingrTags, setIngrTags] = useState<IngredientTagsType[]>([]);
  const [ingrGroup, setIngrGroup] = useState('');
  const [newIngrLabel, setNewIngrLabel] = useState('');
  const [cancelHover, setCancelHover] = useState(false);

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
    <Stack css={styles.root} spacing={60}>
      <Group position="apart">
        <input
          css={styles.input}
          placeholder={`재료 그룹 ${index}`}
          onChange={(e) => setIngrGroup(e.target.value)}
        />
        {onRemove && (
          <div
            css={styles.cancel.wrapper}
            onMouseOut={() => setCancelHover(false)}
            onMouseOver={() => setCancelHover(true)}
            onClick={onRemove}
          >
            <IconCancel
              css={[styles.cancel.root, cancelHover && styles.cancel.hover]}
            />
          </div>
        )}
      </Group>
      <Stack spacing={20}>
        <Group css={styles.ingr.root} gap={12}>
          <input
            css={[styles.input, styles.ingr.input]}
            placeholder="ex) 돼지고기"
            value={newIngrLabel}
            onChange={(e) => setNewIngrLabel(e.target.value)}
            onKeyDown={onKeyDown}
            {...composeProps}
          />
          {newIngrLabel && (
            <Button onClick={onAddButtonClick} css={styles.ingr.button}>
              추가하기
            </Button>
          )}
        </Group>
        <Group css={styles.ingr.group} gap={6}>
          {ingrTags.map(({ label, value }) => (
            <Tag
              color={tagsColors[(index - 1) % tagsColors.length]}
              key={value}
              label={label}
              value={value}
              onClick={onIngrTagsOnClose}
              onClose={onIngrTagsOnClose}
            />
          ))}
        </Group>
      </Stack>
    </Stack>
  );
}

export default Ingredient;
