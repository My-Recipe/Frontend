import PlusMinusIcon from '@/assets/PlusMinusIcon';
import DesignSystem from '@/utils/designSystem';
import { useInterval } from '@/utils/hooks';
import globalStyles from '@/utils/styles';
import { Group, Stack, Typography } from '@base';
import { css } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const bgColors = [
  DesignSystem.Color.sub.brown,
  DesignSystem.Color.secondary.green,
  DesignSystem.Color.sub.pink,
  DesignSystem.Color.sub.blue,
  DesignSystem.Color.background.gray,
  DesignSystem.Color.background.gray,
];

const styles = {
  wrapper: css({ width: '100%' }),
  item: {
    root: (index: number) =>
      css(globalStyles.button, globalStyles.animation.all(ANIMATION_DURATION), {
        height: '100%',
        width: 100,
        background: bgColors[index],
        color: DesignSystem.Color.text.black,
        animationFillMode: 'backwards',
        overflow: 'hidden',
        position: 'relative',
        outline: `1px solid var(--background-black)`,
      }),
    fold: css({
      height: '100%',
    }),
    height: css({
      height: 500,
      padding: '53px 0',
    }),
    number: css({
      lineHeight: 1,
    }),
    body: {
      root: css({
        height: '100%',
        boxSizing: 'border-box',
        whiteSpace: 'initial',
        paddingLeft: 77,
        paddingRight: 77,
      }),
      description: css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 25,
      }),
      text: css({
        minWidth: 320,
        width: 320,
      }),
      icon: css({
        minWidth: 42,
        minHeight: 42,
      }),
      recipeNumber: css({
        display: 'flex',
        alignItems: 'flex-end',
        gap: 5,
        position: 'absolute',
        right: 77,
        bottom: 53,
      }),
    },
  },
};

const ANIMATION_DURATION = 600;

const transition = { duration: ANIMATION_DURATION / 1000, ease: 'easeOut' };

export interface BannerItemType {
  recipeNumber: number;
  subject: string;
  title: string;
  description: string;
  author: string;
  isAdded: boolean;
}

export interface BannerProps {
  items: BannerItemType[];
  onRecipeBookClick: (index: number, item: BannerItemType) => void;
  onRecipeAddClick: (index: number, item: BannerItemType) => void;
}

function Banner({
  items,
  onRecipeBookClick,
  onRecipeAddClick,
  ...props
}: BannerProps) {
  const [activeBanner, setActiveBanner] = useState(0);

  const pause = useInterval(() => {
    setActiveBanner((activeBanner + 1) % items.length);
  }, 4000);
  const handleClickItem = (index: number, item: BannerItemType) => {
    if (index !== activeBanner) {
      pause();
      setActiveBanner(index);
    } else onRecipeBookClick(index, item);
  };

  return (
    <Group nowrap css={styles.wrapper}>
      {items.map((item, index) => {
        const isActive = activeBanner === index;
        return (
          <div
            key={`banner-fold-${item.author}-${item.recipeNumber}-${index}`}
            css={styles.item.root(index)}
            style={{ flexGrow: isActive ? 2 : undefined }}
            onClick={() => handleClickItem(index, item)}
          >
            <AnimatePresence>
              {isActive ? (
                <Active
                  {...item}
                  onRecipeAddClick={() => onRecipeAddClick(index, item)}
                />
              ) : (
                <Fold value={item.recipeNumber} />
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </Group>
  );
}

interface ActiveProps extends BannerItemType {
  onRecipeAddClick: () => void;
}

const Active = ({
  author,
  description,
  recipeNumber,
  subject,
  title,
  isAdded,
  onRecipeAddClick,
}: ActiveProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ...transition, ease: 'easeIn' }}
        css={styles.item.height}
      >
        <Stack css={styles.item.body.root} justify="space-between">
          <Group nowrap position="apart">
            <Typography css={styles.item.body.text} variant="headline">
              {subject}
            </Typography>
            <PlusMinusIcon
              plus={!isAdded}
              onClick={(e) => {
                e.stopPropagation();
                onRecipeAddClick();
              }}
            />
          </Group>
          <div css={[styles.item.body.description, styles.item.body.text]}>
            <Typography variant="display">{title}</Typography>
            <Typography variant="body">{description}</Typography>
          </div>
          <Typography css={styles.item.body.text} variant="subtitle">
            {author}
          </Typography>
        </Stack>
      </motion.div>
      <motion.div
        initial={{ x: 140 }}
        animate={{ x: 0 }}
        exit={{ x: -140 }}
        css={styles.item.body.recipeNumber}
        transition={transition}
      >
        <Typography css={styles.item.number} variant="display">
          {recipeNumber}
        </Typography>
        <Typography variant="subtitle">개의 레시피</Typography>
      </motion.div>
    </>
  );
};

const Fold = ({ value }: { value: number | string }) => {
  return (
    <motion.div
      initial={{ opacity: 1, x: '20%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      css={styles.item.height}
      transition={transition}
    >
      <Stack css={styles.item.fold} justify="end" align="center">
        <Typography css={styles.item.number} variant="display">
          {value}
        </Typography>
      </Stack>
    </motion.div>
  );
};

export default Banner;
