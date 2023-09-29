import EmptyCheckbox from '@/assets/checkbox-empty.svg';
import FillCheckbox from '@/assets/checkbox-fill.svg';
import EditIcon from '@/assets/icon-edit-box.svg';
import BackgroundImg from '@/assets/newmypage-background.png';
import globalStyles from '@/utils/styles';
import { Group, Stack, Typography } from '@base';
import Button from '@copmonents/Button';
import ToggleButton from '@copmonents/Toggle/ToggleButton';
import { css } from '@emotion/react';
import Recipes from '../home/components/Recipes';

interface MyPageProps {
  title: string;
  intro: string;
  isAllowed: boolean;
  setIsAllowed: React.Dispatch<React.SetStateAction<boolean>>;
}
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
  },
};
function MyPage({
  title,
  intro,
  isAllowed,
  setIsAllowed,
  ...props
}: MyPageProps) {
  return (
    <Stack spacing={150} css={myPageStyles.wrapper}>
      <Group nowrap align="flex-end" css={myPageStyles.banner.wrapper}>
        <Stack spacing={134} css={myPageStyles.banner.background}>
          <Stack spacing={10}>
            <Typography variant="display">
              맛있는 비건 요리는 없다구요?
            </Typography>
            <Typography variant="body">
              세상의 모든 비건 요리를 연구합니다. 당신의 몸과 혀가 둘 다
              행복하도록.
            </Typography>
          </Stack>
          <Group nowrap gap={8}>
            <Button variant="icon">새로운 레시피 생성하기</Button>
            <Button variant="icon">링크 공유하기</Button>
          </Group>
        </Stack>

        <Stack spacing={17} css={myPageStyles.banner.edit}>
          <Typography variant="headline">16개의 레시피</Typography>
          <Group
            gap={2}
            onClick={() => {
              setIsAllowed(true);
            }}
            css={myPageStyles.banner.checkbox}
            nowrap
          >
            <img src={isAllowed ? FillCheckbox : EmptyCheckbox} />
            <Typography variant="button">모든 대상에게 공개</Typography>
          </Group>
          <Group
            gap={2}
            onClick={() => {
              setIsAllowed(false);
            }}
            css={myPageStyles.banner.checkbox}
            nowrap
          >
            <img src={isAllowed ? EmptyCheckbox : FillCheckbox} />
            <Typography variant="button">
              링크를 가진 대상에게만 공개
            </Typography>
          </Group>
          <img src={EditIcon} css={{ width: 48, marginTop: 106 }} />
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
              name: '김볶밥',
              author: '김준수',
              contents: '김치를 열심히 뽂아뽂아',
            },
            {
              name: '간장계란밥',
              author: '페이커',
              contents: '간장과 계란을 밥에 슥슥',
            },
            {
              name: '김치우동',
              author: '고죠 사토루',
              contents: '간장과 계란을 밥에 슥슥',
            },
          ]}
        />
      </Stack>
    </Stack>
  );
}

export default MyPage;
