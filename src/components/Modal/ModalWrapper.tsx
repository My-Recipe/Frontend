import DesignSystem from '@/utils/designSystem';
import { useClickOutside } from '@/utils/hooks';
import globalStyles from '@/utils/styles';
import { css } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';
import { CSSProperties, ReactNode } from 'react';

// ref : https://codesandbox.io/s/react-custom-modal-u91ey?file=/src/custom-modal/index.styled.js

const wrapplerStyles = {
  background: css(
    {
      backgroundColor: 'rgba(0,0,0,0.4)',
      backdropFilter: 'blur(6px)',
      zIndex: 1000,
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'auto',
    },
    globalStyles.center,
  ),
  inner: css({
    backgroundColor: DesignSystem.Color.background.white,
    width: 778,
    margin: 'auto',
    borderRadius: 2.4,
    position: 'relative',
  }),
  content: css({
    padding: '85px 60px 38px',
  }),
};

export interface ModalWrapperProps {
  handleModalClose: () => void;
  children?: ReactNode;
  padding?: CSSProperties['padding'];
  opened: boolean;
}

function ModalWrapper({
  handleModalClose,
  opened,
  children,
  padding,
  ...props
}: ModalWrapperProps) {
  const ref = useClickOutside<HTMLDivElement>(handleModalClose);
  return (
    <AnimatePresence>
      {opened && (
        <motion.div
          key="modal"
          css={wrapplerStyles.background}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div ref={ref} css={wrapplerStyles.inner}>
            <div css={wrapplerStyles.content} style={{ padding }}>
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ModalWrapper;
