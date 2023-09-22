import DesignSystem from '@/utils/designSystem';
import globalStyles from '@/utils/styles';
import { css } from '@emotion/react';

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
      paddingTop: 60,
      paddingBottom: 60,
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
};

export interface ModalWrapperProps {}

function ModalWrapper({ ...props }: ModalWrapperProps) {
  return (
    <div css={wrapplerStyles.background} style={{ visibility: 'visible' }}>
      Enter
    </div>
  );
}

export default ModalWrapper;
