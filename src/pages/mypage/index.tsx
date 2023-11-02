import EmptyCheckbox from '@/assets/checkbox-empty.svg';
import FillCheckbox from '@/assets/checkbox-fill.svg';
import EditIcon from '@/assets/icon-edit-box.svg';
import BackgroundImg from '@/assets/newmypage-background.png';
import DesignSystem from '@/utils/designSystem';
import globalStyles from '@/utils/styles';
import { Group, Stack, Typography } from '@base';
import Button from '@copmonents/Button';
import Modal from '@copmonents/Modal';
import ToggleButton from '@copmonents/Toggle/ToggleButton';
import { css } from '@emotion/react';
import { useState } from 'react';
import Recipes from '../home/components/Recipes';
import BookSetting from './components/BookSetting';

export interface RecipeBookType {
  title: string;
  intro: string;
  forPublic: boolean;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setIntro: React.Dispatch<React.SetStateAction<string>>;
  setForPublic: React.Dispatch<React.SetStateAction<boolean>>;
}
const newMyPageStyles = {
  root: css(globalStyles.center, { overflow: 'hidden' }),
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
    height: 879,
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
const myPageStyles = {
  wrapper: css(globalStyles.center, {}),
  banner: {
    wrapper: css({
      width: '100%',
      height: 513,
      borderBottom: '1px solid black',
    }),
    background: css({
      backgroundImage: `url(${BackgroundImg})`,
      width: '74%',
      paddingLeft: 168,
      borderRight: '1px solid black',
      height: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden',
    }),
    checkbox: css(globalStyles.button),
    edit: css({
      paddingLeft: 70,

      width: '26%',
      height: '100%',
      boxSizing: 'border-box',
    }),
    copyLink: {
      wrapper: css(globalStyles.center, { flexDirection: 'column' }),
      linkBox: css({
        backgroundColor: DesignSystem.Color.background.gray,
        width: 576,
        padding: '11.5px 0px 11.5px 23px',
        boxSizing: 'border-box',
      }),
      copyBtn: css(
        {
          backgroundColor: DesignSystem.Color.primary.yellow,
          padding: '11.5px 19px',
          textAlign: 'center',
          '&:hover': {
            backgroundColor: DesignSystem.Color.primary['yellow-hover'],
          },
        },
        globalStyles.button,
      ),
    },
  },
};
function MyPage({ ...props }) {
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [forPublic, setForPublic] = useState(true);
  const [linkOpened, setLinkOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  return title && intro ? (
    <Stack spacing={150} css={myPageStyles.wrapper}>
      <Modal opened={editOpened}>
        <BookSetting
          title={title}
          intro={intro}
          forPublic={forPublic}
          setTitle={setTitle}
          setIntro={setIntro}
          setForPublic={setForPublic}
          submitFunc={setEditOpened}
          submitText="레시피북 수정 완료하기"
        />
      </Modal>
      <Modal opened={linkOpened} css={myPageStyles.banner.copyLink.wrapper}>
        <Typography variant="headline" css={{ alignSelf: 'flex-start' }}>
          링크가 복사되었어요.
        </Typography>
        <Stack spacing={15} css={{ margin: '43px 0 59px 0' }}>
          <Group>
            <Typography
              variant="button"
              css={myPageStyles.banner.copyLink.linkBox}
            >
              link
            </Typography>
            <Typography
              variant="button"
              css={myPageStyles.banner.copyLink.copyBtn}
            >
              COPY
            </Typography>
          </Group>
          <Typography
            variant="info"
            color={DesignSystem.Color.text.gray}
            css={{ alignSelf: 'flex-start' }}
          >
            동료들에게 링크를 공유해 마이 레시피를 소개해보세요.
          </Typography>
        </Stack>
        <Button
          variant="icon"
          onClick={() => {
            setLinkOpened(false);
          }}
        >
          마이 레시피로 돌아가기
        </Button>
      </Modal>
      <Group nowrap align="flex-end" css={myPageStyles.banner.wrapper}>
        <Stack spacing={134} css={myPageStyles.banner.background}>
          <Stack spacing={10}>
            <Typography variant="display">{title}</Typography>
            <Typography variant="body">{intro}</Typography>
          </Stack>
          <Group nowrap gap={8}>
            <Button variant="icon">새로운 레시피 생성하기</Button>
            <Button
              variant="icon"
              onClick={() => {
                setLinkOpened(true);
              }}
            >
              링크 공유하기
            </Button>
          </Group>
        </Stack>

        <Stack spacing={17} css={myPageStyles.banner.edit}>
          <Typography variant="headline">16개의 레시피</Typography>
          <Group
            gap={2}
            onClick={() => {
              setForPublic(true);
            }}
            css={myPageStyles.banner.checkbox}
            nowrap
          >
            <img src={forPublic ? FillCheckbox : EmptyCheckbox} />
            <Typography variant="button">모든 대상에게 공개</Typography>
          </Group>
          <Group
            gap={2}
            onClick={() => {
              setForPublic(false);
            }}
            css={myPageStyles.banner.checkbox}
            nowrap
          >
            <img src={forPublic ? EmptyCheckbox : FillCheckbox} />
            <Typography variant="button">
              링크를 가진 대상에게만 공개
            </Typography>
          </Group>
          <img
            src={EditIcon}
            css={{ width: 48, marginTop: 106 }}
            onClick={() => {
              setEditOpened(true);
            }}
          />
        </Stack>
      </Group>
      <Stack spacing={73}>
        <Group gap={866}>
          <div>해피밀</div>
          <ToggleButton tabs={['모든 레시피', '내 레시피만']} />
        </Group>
        <Recipes
          recipes={[
            {
              name: '김치볶음밥',
              author: '김준수',
              contents: '김치를 열심히 뽂아뽂아',
            },
            {
              name: '간장계란밥',
              author: '짱구',
              contents: '간장과 계란을 밥에 슥슥',
            },
            {
              name: '김치우동',
              author: '고죠 사토루',
              contents: '우동에 김치를 사악',
            },
          ]}
        />
      </Stack>
    </Stack>
  ) : (
    <div css={newMyPageStyles.root}>
      <div css={newMyPageStyles.background} />
      <div css={newMyPageStyles.blur} />
      <div css={newMyPageStyles.wrapper}>
        <BookSetting
          title={title}
          intro={intro}
          forPublic={forPublic}
          setTitle={setTitle}
          setIntro={setIntro}
          setForPublic={setForPublic}
          submitText="이대로 레시피북 생성하기"
        />
      </div>
    </div>
  );
}

export default MyPage;
