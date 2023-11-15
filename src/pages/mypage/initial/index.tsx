import BackgroundImg from '@/assets/newmypage-background.png';
import DesignSystem from '@/utils/designSystem';
import globalStyles from '@/utils/styles';
import { css } from '@emotion/react';
import BookSetting from '../components/BookSetting';

function Initial() {
  const newMyPageStyles = {
    root: css(globalStyles.center, { height: '100dvh' }),
    background: css({
      zIndex: 0,
      background: `no-repeat url(${BackgroundImg})`,
      backgroundSize: 'cover',
      width: '100%',
      height: '100%',
      position: 'absolute',
      filter: 'blur(6px)',
      top: 0,
      left: 0,
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
    wrapper: css(
      {
        background: DesignSystem.Color.background.white,
        borderRadius: 32,
        width: 658,
        position: 'relative',
        zIndex: 2,
        margin: '116px 0 170px 0',
        padding: '80px 60px 38px 60px',
      },
      globalStyles.center,
    ),
  };
  const initialData = { title: '', intro: '', forPublic: true };
  return (
    <div css={newMyPageStyles.root}>
      <div css={newMyPageStyles.background} />
      <div css={newMyPageStyles.blur} />
      <div css={newMyPageStyles.wrapper}>
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
