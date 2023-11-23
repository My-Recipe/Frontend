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
import UserProfileImg from '@copmonents/UserProfileImg';
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

const styles = {
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
    }),
    checkbox: css(globalStyles.button),
    edit: css({
      padding: '0 0 96px 70px',
      width: '26%',
      height: '100%',
      boxSizing: 'border-box',
      justifyContent: 'center',
    }),
    editBtn: css(globalStyles.button, {
      width: 48,
      marginTop: 106,
    }),
    copyLink: {
      wrapper: css(globalStyles.center, { flexDirection: 'column' }),
      linkBox: css({
        backgroundColor: DesignSystem.Color.background.gray,
        width: 576,
        padding: '11.5px 0px 11.5px 23px',
        boxSizing: 'border-box',
      }),
      copyBtn: css(globalStyles.button, {
        backgroundColor: DesignSystem.Color.primary.yellow,
        padding: '11.5px 19px',
        textAlign: 'center',
        '&:hover': {
          backgroundColor: DesignSystem.Color.primary['yellow-hover'],
        },
      }),
    },
  },
};

const mockData = {
  recipes: [
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
  ],
};

function MyPage({ ...props }) {
  const [myData, setMyData] = useState<RecipeBookType>({
    title: '',
    intro: '',
    forPublic: true,
  });
  const [linkModalOpened, setLinkModalOpened] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const URL = 'Link';
  const { title, intro, forPublic } = myData;
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(URL);
  };
  const handleSubmit = (data: RecipeBookType) => {
    setMyData(data);
    editModalOpened && setEditModalOpened(false);
  };
  const handleLink = () => {
    setLinkModalOpened(true);
    handleCopy();
  };
  const handlePublic = (forPublic: boolean) => {
    setMyData({ ...myData, forPublic });
  };
  const handleEditClick = () => {
    setEditModalOpened(true);
  };

  useEffect(() => {
    if (!title && !intro) {
      navigate('/mypage/initial', { replace: true });
    }
  }, [title, intro]);

  type ToggleSelectType = {
    children: string;
    isPublic: boolean;
  };

  const ToggleSelect = ({ children, isPublic }: ToggleSelectType) => (
    <Group
      gap={2}
      onClick={() => handlePublic(isPublic)}
      css={styles.banner.checkbox}
      nowrap
    >
      <img src={isPublic === forPublic ? FillCheckbox : EmptyCheckbox} />
      <Typography variant="button">{children}</Typography>
    </Group>
  );

  return (
    <>
      <Stack spacing={150} css={styles.wrapper}>
        <Group nowrap align="flex-end" css={styles.banner.wrapper}>
          <Stack spacing={134} css={styles.banner.background}>
            <Stack spacing={10}>
              <Typography variant="display">{title}</Typography>
              <Typography variant="body">{intro}</Typography>
            </Stack>
            <Group nowrap gap={8}>
              <Button variant="icon">새로운 레시피 생성하기</Button>
              <Button variant="icon" onClick={handleLink}>
                링크 공유하기
              </Button>
            </Group>
          </Stack>
          <Stack spacing={17} css={styles.banner.edit}>
            <Typography variant="headline">
              {mockData.recipes.length}개의 레시피
            </Typography>
            <ToggleSelect isPublic={true}>모든 대상에게 공개</ToggleSelect>
            <ToggleSelect isPublic={false}>
              링크를 가진 대상에게만 공개
            </ToggleSelect>
            <img
              src={EditIcon}
              css={styles.banner.editBtn}
              onClick={handleEditClick}
            />
          </Stack>
        </Group>
        <Stack spacing={73}>
          <Group position="apart">
            <Group gap={16}>
              <UserProfileImg width={36} />
              <Typography variant="headline">해피밀</Typography>
            </Group>
            <ToggleButton tabs={['모든 레시피', '내 레시피만']} />
          </Group>
          <Recipes recipes={mockData.recipes} />
        </Stack>
      </Stack>
      <Modal opened={editModalOpened}>
        <BookSetting
          data={myData}
          onSubmit={handleSubmit}
          submitText="레시피북 수정 완료하기"
        />
      </Modal>
      <Modal opened={linkModalOpened} css={styles.banner.copyLink.wrapper}>
        <Typography variant="headline" css={{ alignSelf: 'flex-start' }}>
          링크가 복사되었어요.
        </Typography>
        <Stack spacing={15} css={{ margin: '43px 0 59px 0' }}>
          <Group>
            <Typography variant="button" css={styles.banner.copyLink.linkBox}>
              {URL}
            </Typography>
            <Typography
              variant="button"
              css={styles.banner.copyLink.copyBtn}
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
        <Button variant="icon" onClick={() => setLinkModalOpened(false)}>
          마이 레시피로 돌아가기
        </Button>
      </Modal>
    </>
  );
}

export default MyPage;
