import { ReactComponent as IconClock } from '@/assets/icon-clock.svg';
import { ReactComponent as IconImage } from '@/assets/icon-image.svg';
import { ReactComponent as IconTip } from '@/assets/icon-tip.svg';
import DesignSystem from '@/utils/designSystem';
import globalStyles from '@/utils/styles';
import { Stack } from '@base';
import { css } from '@emotion/react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';

const styles = {
  root: css({
    padding: '36px 23px',
    borderRadius: 16,
    background: DesignSystem.Color.background.white,
    boxShadow: '0px 4px 16px rgba(140, 140, 140, 0.13)',
    position: 'absolute',
    right: 40,
  }),
  icon: {
    disabled: {
      svg: DesignSystem.Color.background.disabled,
      style: css({ cursor: 'not-allowed' }),
    },
    active: {
      svg: DesignSystem.Color.secondary.green,
      style: css({ cursor: 'pointer' }),
    },
    animation: css(globalStyles.animation.all(200)),
  },
};

export interface ToolbarProps {
  active?: boolean;
  onItemClicked?: (clickedItem: 'timer' | 'image' | 'tip') => void;
}

function Toolbar({ active, onItemClicked, ...props }: ToolbarProps) {
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const spring = useSpring(scrollY, {
    damping: 20,
    stiffness: 150,
    mass: 0.5,
    // restDelta: 0.01,
  });
  const top = useTransform(() => spring.get() + windowHeight - 400);

  window.onresize = () => {
    setWindowHeight(window.innerHeight);
  };
  return (
    <motion.div style={{ top }} css={styles.root}>
      <Stack align="center" spacing={55}>
        <IconClock
          css={[
            { stroke: styles.icon[active ? 'active' : 'disabled'].svg },
            styles.icon[active ? 'active' : 'disabled'].style,
            styles.icon.animation,
          ]}
          onClick={() => active && onItemClicked?.('timer')}
        />
        <IconImage
          css={[
            { stroke: styles.icon[active ? 'active' : 'disabled'].svg },
            styles.icon[active ? 'active' : 'disabled'].style,
            styles.icon.animation,
          ]}
          onClick={() => active && onItemClicked?.('image')}
        />
        <IconTip
          css={[
            { fill: styles.icon[active ? 'active' : 'disabled'].svg },
            styles.icon[active ? 'active' : 'disabled'].style,
            styles.icon.animation,
          ]}
          onClick={() => active && onItemClicked?.('tip')}
        />
      </Stack>
    </motion.div>
  );
}

export default Toolbar;
