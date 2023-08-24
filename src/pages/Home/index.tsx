import { Stack } from '@base';
import InputBox from '@copmonents/InputBox';
import Tag from '@copmonents/Tag';
import Banner from './components/Banner';

export interface HomeProps {}

function Home({ ...props }: HomeProps) {
  return (
    <Stack>
      <Banner />
      <InputBox
        searchItems={[
          '여름나기 좋은 메밀 소바',
          '메밀 소고기 레시피',
          '최고로 맛있는 메밀소면',
        ]}
      />
      <div>
        <Tag
          onClick={(e, value) => value}
          value="123asdf"
          onClose={(value) => value}
        >
          # 재료 3
        </Tag>
      </div>
    </Stack>
  );
}

export default Home;
