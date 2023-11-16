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
    width: 88,
    boxSizing: 'border-box',
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
  btn: css(
    { width: '100%', height: 42 },
    globalStyles.button,
    globalStyles.center,
  ),
  input: css({
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    border: '0',
  }),
};

export interface ToolbarProps {
  active?: boolean;
  onItemClicked?: (
    clickedItem: 'timer' | 'image' | 'tip',
    imageSrc?: string,
  ) => void;
  onMouseUp?: () => void;
}

function Toolbar({ active, onItemClicked, onMouseUp, ...props }: ToolbarProps) {
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
        <div
          css={[styles.btn, styles.icon[active ? 'active' : 'disabled'].style]}
          onMouseDown={() => active && onItemClicked?.('timer')}
          onMouseUp={() => onMouseUp?.()}
        >
          <IconClock
            css={[
              { stroke: styles.icon[active ? 'active' : 'disabled'].svg },
              styles.icon.animation,
            ]}
          />
        </div>
        <div>
          <label htmlFor="ex_file" css={[styles.btn, styles.icon.active.style]}>
            <IconImage
              css={[
                { stroke: styles.icon[active ? 'active' : 'disabled'].svg },
                styles.icon.animation,
              ]}
            />
          </label>
          <input
            css={styles.input}
            id={'ex_file'}
            type="file"
            accept="image/*"
            onChange={(e) => {
              onItemClicked?.(
                'image',
                'https://recipe1.ezmember.co.kr/cache/recipe/2017/04/25/9dcf6bd106995d4a2c8c580ea0fbe24f1.jpg',
              );
            }}
          />
        </div>
        <div
          css={[styles.btn, styles.icon[active ? 'active' : 'disabled'].style]}
          onMouseDown={() => active && onItemClicked?.('tip')}
          onMouseUp={() => onMouseUp?.()}
        >
          <IconTip
            css={[
              { fill: styles.icon[active ? 'active' : 'disabled'].svg },
              styles.icon.animation,
            ]}
          />
        </div>
      </Stack>
    </motion.div>
  );
}

export default Toolbar;
