import DesignSystem from '@/utils/designSystem';
import globalStyles from '@/utils/styles';
import { Group, Typography } from '@base';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

const styles = {
  wrapper: {
    off: css([
      {
        width: 60,
        backgroundColor: DesignSystem.Color.background.disabled,
        display: 'flex',
        justifyContent: 'flex-start',
        borderRadius: 50,
        padding: 2,
        border: `1.4px solid ${DesignSystem.Color.background.black}`,
      },
      globalStyles.button,
    ]),
    on: css({
      justifyContent: 'flex-end',
      backgroundColor: DesignSystem.Color.primary.yellow,
    }),
  },
  handle: css({
    height: 30,
    width: 30,
    backgroundColor: DesignSystem.Color.background.white,
    borderRadius: 40,
    border: `1.4px solid ${DesignSystem.Color.background.black}`,
  }),
};

export interface OnProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  children?: ReactNode;
}

function On({
  checked: propsChecked,
  onChange,
  label,
  children,
  ...props
}: OnProps) {
  const isUseLocal = propsChecked === undefined;
  const [localChecked, setChecked] = useState(false);
  const checked = isUseLocal ? localChecked : propsChecked;

  const handleClickToggle = () => {
    if (isUseLocal) setChecked(!checked);
    onChange?.(!checked);
  };

  return (
    <Group gap={12}>
      <div
        onClick={handleClickToggle}
        css={[styles.wrapper.off, checked && styles.wrapper.on]}
      >
        <motion.div
          css={styles.handle}
          layout
          transition={{
            type: 'spring',
            stiffness: 300,
            duration: 100,
            damping: 25,
          }}
        />
      </div>
      {(label && <Typography variant="subtitle">{label}</Typography>) ||
        children}
    </Group>
  );
}

export default On;
