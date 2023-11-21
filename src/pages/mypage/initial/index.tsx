import BackgroundImg from '@/assets/newmypage-background.png';
import DesignSystem from '@/utils/designSystem';
import globalStyles from '@/utils/styles';
import { css } from '@emotion/react';
import BookSetting from '../components/BookSetting';

const styles = {
  root: css(globalStyles.center, {
    position: 'relative',
    height: '100vh',

    overflow: 'hidden',
  }),
  background: css({
    zIndex: 0,
    background: `no-repeat url(${BackgroundImg})`,
    backgroundSize: 'cover',
    width: 'calc(14px + 100%)',
    height: 'calc(14px + 100%)',
    position: 'absolute',
    filter: 'blur(6px)',
    top: -7,
    left: -7,
  }),
  blur: css({
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    height: '100%',
  }),
  wrapper: css(globalStyles.center, {
    background: DesignSystem.Color.background.white,
    borderRadius: 32,
    width: 658,
    zIndex: 2,
    margin: '116px 0 170px 0',
    padding: '80px 60px 38px 60px',
  }),
};

const initialData = { title: '', intro: '', forPublic: true };

function Initial() {
  return (
    <div css={styles.root}>
      <div css={styles.background} />
      <div css={styles.blur} />
      <div css={styles.wrapper}>
        <BookSetting
          data={initialData}
          onSubmit={() => {}}
          submitText="이대로 레시피북 생성하기"
        />
      </div>
    </div>
  );
}

export default Initial;
