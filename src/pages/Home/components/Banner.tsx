import DesignSystem from '@/utils/designSystem';
import globalStyles from '@/utils/styles';
import { Group, Stack, Typography } from '@base';
import { css } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const mockData = [24, 16, 36, 8, 12, 10];

const bgColors = [
  DesignSystem.Color.sub.brown,
  DesignSystem.Color.secondary.green,
  DesignSystem.Color.sub.pink,
  DesignSystem.Color.sub.blue,
  DesignSystem.Color.background.gray,
];

const bannerStyles = {
  wrapper: css({ height: 500, width: '100%' }),
  item: {
    root: (index: number) =>
      css(globalStyles.animation.all(300), {
        height: '100%',
        width: 100,
        background: bgColors[index],
        color: DesignSystem.Color.text.black,
        animationFillMode: 'backwards',
        overflow: 'hidden',
        position: 'relative',
      }),
    fold: css({
      height: '100%',
    }),
    number: css({
      marginBottom: 50,
      lineHeight: 1,
    }),
  },
};

export interface BannerProps {}

function Banner({ ...props }: BannerProps) {
  const [activeBanner, setActiveBanner] = useState(0);
  const onClickItem = (index: number) => setActiveBanner(index);
  return (
    <Group nowrap css={bannerStyles.wrapper}>
      {mockData.map((val, index) => {
        const isActive = activeBanner === index;
        return (
          <div
            key={`banner-fold-${val}-${index}`}
            css={bannerStyles.item.root(index)}
            style={{ flexGrow: isActive ? 2 : undefined }}
            onClick={() => onClickItem(index)}
          >
            <AnimatePresence>
              {isActive ? <Active /> : <Fold value={val} />}
            </AnimatePresence>
          </div>
        );
      })}
    </Group>
  );
}

const Active = () => {
  return (
    <motion.div
      key="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Stack>
        <Typography variant="headline">추천 레시피 북</Typography>
        <Typography variant="display">맛있는 비건요리는 없다구요?</Typography>
        <Typography variant="body">
          세상의 모든 비건 요리를 연구합니다. 당신의 몸과 혀가 둘 다 행복하도록.
        </Typography>
      </Stack>
    </motion.div>
  );
};

const Fold = ({ value }: { value: number | string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      css={bannerStyles.item.fold}
    >
      <Stack css={bannerStyles.item.fold} justify="end" align="center">
        <Typography css={bannerStyles.item.number} variant="display">
          {value}
        </Typography>
      </Stack>
    </motion.div>
  );
};

export default Banner;
