import { ReactComponent as IconComplete } from '@/assets/icon-complete-edit-text.svg';
import { ReactComponent as IconEdit } from '@/assets/icon-edit-text.svg';
import { ReactComponent as IconList } from '@/assets/icon-list.svg';
import DesignSystem from '@/utils/designSystem';
import globalStyles from '@/utils/styles';
import { Group, Stack, Typography } from '@base';
import { css } from '@emotion/react';
import moment, { Moment } from 'moment';
import { useEffect, useRef, useState } from 'react';
import IngrInputBox from './components/IngrInputBox';
const styles = {
  wrapper: css({}),
  inventory: {
    background: css(
      {
        backgroundColor: DesignSystem.Color.background.gray,
        width: '100%',
        padding: '100px 10px',
      },
      globalStyles.center,
    ),
    header: css({
      backgroundColor: DesignSystem.Color.background.black,
      color: DesignSystem.Color.background.white,
      padding: '16px 0',
      boxSizing: 'border-box',
    }),

    ingredients: {
      box: css({
        backgroundColor: DesignSystem.Color.background.white,
        padding: '45px 0 61px 43px',
        position: 'relative',
        width: 1264,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }),
      scrollBar: css({
        backgroundColor: DesignSystem.Color.background.disabled,
        position: 'absolute',
        height: 454,
        top: 213,
        right: 37,
        width: 10,
        borderRadius: 19,
      }),
      guide: css(DesignSystem.Text.info, {
        color: DesignSystem.Color.text.gray,
        width: 260,
      }),
    },
  },
};

export interface IngredientDataType {
  name: string;
  number: string;
  registerDate: Moment;
  bestBefore: Moment | null;
}

function Inventory() {
  const [data, setData] = useState<IngredientDataType[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [submit, setSubmit] = useState(false);
  const handleDataChange = (inputData: IngredientDataType) => {
    setData([{ ...inputData }, ...data]);
  };
  const handleEditing = (targetIdx: number, inputData: IngredientDataType) => {
    setData(data.map((item, idx) => (targetIdx === idx ? inputData : item)));
  };
  const handleDelete = (targetIdx: number) => {
    setData(data.filter((_, idx) => idx !== targetIdx));
  };
  const checkRef = useRef<HTMLDivElement>(null);

  const [isOverflowed, setIsOverflowed] = useState<boolean>(false);

  useEffect(() => {
    setIsOverflowed(
      !!checkRef.current &&
        checkRef?.current.scrollHeight > checkRef.current?.clientHeight,
    );
  });
  return (
    <Stack>
      <Stack css={styles.inventory.background}>
        <Group position="apart" style={{ marginBottom: 31, width: 1264 }}>
          <Group gap={11}>
            <IconList />
            <Typography variant="headline">INVENTORY</Typography>
          </Group>
          {isEditing ? (
            <IconComplete
              onClick={() => {
                setIsEditing(!isEditing);
                setSubmit(true);
              }}
            />
          ) : (
            <IconEdit
              onClick={() => {
                data.length !== 0 && setIsEditing(!isEditing);
                setSubmit(false);
              }}
            />
          )}
        </Group>
        <Stack>
          <Group gap={1}>
            <Typography
              variant="body"
              css={[styles.inventory.header, { width: 332, paddingLeft: 59 }]}
            >
              재료명
            </Typography>
            <Typography
              variant="body"
              css={[styles.inventory.header, { width: 263, paddingLeft: 22 }]}
            >
              수량
            </Typography>
            <Typography
              variant="body"
              css={[styles.inventory.header, { width: 263, paddingLeft: 22 }]}
            >
              등록일자
            </Typography>
            <Typography
              variant="body"
              css={[styles.inventory.header, { width: 403, paddingLeft: 22 }]}
            >
              유통기한
            </Typography>
          </Group>
          <Stack css={styles.inventory.ingredients.box}>
            <Group
              position="apart"
              style={{
                paddingRight: 136,
                marginBottom: 19,
                opacity: `${isEditing ? 0 : 1}`,
              }}
            >
              <Typography
                variant="info"
                css={styles.inventory.ingredients.guide}
              >
                *당근
              </Typography>
              <Typography
                variant="info"
                css={styles.inventory.ingredients.guide}
              >
                *2개
              </Typography>
              <Typography
                variant="info"
                css={styles.inventory.ingredients.guide}
              >
                *{moment().format('YYYY/MM/DD').toString()}
              </Typography>
              <Typography
                variant="info"
                css={styles.inventory.ingredients.guide}
              >
                *{moment().add(1, 'months').format('YYYY/MM/DD').toString()}
              </Typography>
            </Group>
            <Stack spacing={17} style={{ maxHeight: 592 }}>
              {!isEditing && (
                <IngrInputBox
                  type="input"
                  handleDataChange={handleDataChange}
                />
              )}
              <Stack
                css={{
                  overflowX: 'hidden',
                  overflowY: 'scroll',
                  marginRight: 37,
                  zIndex: 2,
                  '&::-webkit-scrollbar': {
                    borderRadius: 19,
                    width: 10,
                    zIndex: 1,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: DesignSystem.Color.text.gray,
                    borderRadius: 19,
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: 'transparent',
                  },
                  '&::-webkit-scrollbar-track-piece:start': {
                    backgroundColor: 'transparent',
                    marginTop: isEditing ? 125 : 38,
                  },
                  '&::-webkit-scrollbar-track-piece:end': {
                    backgroundColor: 'transparent',
                    marginBottom: 13,
                  },
                }}
                spacing={17}
                justify="flex-start"
                ref={checkRef}
              >
                {data.map((item, idx) => {
                  return (
                    <IngrInputBox
                      type={isEditing ? 'edit' : 'list'}
                      item={item}
                      submit={submit}
                      hanldeEdit={(input: IngredientDataType) => {
                        handleEditing(idx, input);
                      }}
                      handleRemove={() => {
                        handleDelete(idx);
                      }}
                      key={`${idx}-${item.name}-${item.registerDate}`}
                    />
                  );
                })}
              </Stack>
            </Stack>
            {isOverflowed && (
              <div css={styles.inventory.ingredients.scrollBar}></div>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
export default Inventory;
