import EmptyCheckbox from '@/assets/checkbox-empty.svg';
import FillCheckbox from '@/assets/checkbox-fill.svg';
import DefaultProfile from '@/assets/default-profile.svg';
import EditIcon from '@/assets/icon-edit-box.svg';
import BackgroundImg from '@/assets/newmypage-background.png';
import DesignSystem from '@/utils/designSystem';
import globalStyles from '@/utils/styles';
import { Group, Stack, Typography } from '@base';
import Button from '@copmonents/Button';
import Modal from '@copmonents/Modal';
import ToggleButton from '@copmonents/Toggle/ToggleButton';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Recipes from '../home/components/Recipes';
import BookSetting from './components/BookSetting';
export interface RecipeBookType {
  title: string;
  intro: string;
  forPublic: boolean;
}

const myPageStyles = {
  wrapper: css(globalStyles.center, {}),
  banner: {
    wrapper: css({
      width: '100%',
      borderBottom: '1px solid black',
    }),
    background: css({
      background: `no-repeat url(${BackgroundImg})`,
      backgroundSize: 'cover',
      width: '74%',
      padding: '139px 0 96px 168px',
      borderRight: '1px solid black',
      height: '100%',
      boxSizing: 'border-box',
      minWidth: 900,
    }),
    checkbox: css(globalStyles.button),
    edit: css({
      padding: '0 0 96px 70px',
      width: '26%',
      height: '100%',
      boxSizing: 'border-box',
      justifyContent: 'center',
    }),
    editBtn: css(
      {
        width: 48,
        marginTop: 106,
      },
      globalStyles.button,
    ),
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
  const [myData, setMyData] = useState<RecipeBookType>({
    title: '',
    intro: '',
    forPublic: true,
  });
  const [linkOpened, setLinkOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const URL = 'Link';
  const { title, intro, forPublic } = myData;
  const handleCopy = () => {
    navigator.clipboard.writeText(URL);
  };
  const onSubmitClick = (data: RecipeBookType) => {
    setMyData(data);
    editOpened && setEditOpened(false);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!title && !intro) navigate('/mypage/initial');
  }, [title, intro]);
  return (
    <Stack spacing={150} css={myPageStyles.wrapper}>
      <Modal opened={editOpened}>
        <BookSetting
          data={myData}
          onSubmit={onSubmitClick}
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
              {URL}
            </Typography>
            <Typography
              variant="button"
              css={myPageStyles.banner.copyLink.copyBtn}
              onClick={handleCopy}
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
                navigator.clipboard.writeText(URL);
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
              setMyData({ ...myData, forPublic: false });
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
              setMyData({ ...myData, forPublic: false });
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
            css={myPageStyles.banner.editBtn}
            onClick={() => {
              setEditOpened(true);
            }}
          />
        </Stack>
      </Group>
      <Stack spacing={73} css={{ overflow: 'hidden' }}>
        <Group gap={'69%'}>
          <Group gap={16}>
            <img src={DefaultProfile} css={{ width: 36 }} />
            <Typography variant="headline">해피밀</Typography>
          </Group>
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
            {
              name: '김치우동',
              author: '고죠 사토루',
              contents: '우동에 김치를 사악',
            },
          ]}
        />
      </Stack>
    </Stack>
  );
}

export default MyPage;
