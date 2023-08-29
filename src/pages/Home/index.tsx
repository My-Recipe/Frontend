import { Stack, Stroke } from '@base';
import Button from '@copmonents/Button';
import InputBox from '@copmonents/InputBox';
import Tag from '@copmonents/Tag';
import { useState } from 'react';
import Banner from './components/Banner';

export interface HomeProps {}

function Home({ ...props }: HomeProps) {
  const [vlaue, setVlaue] = useState('');
  return (
    <Stack spacing={10}>
      <Banner />
      <InputBox
        searchItems={[
          '여름나기 좋은 메밀 소바',
          '메밀 소고기 레시피',
          '최고로 맛있는 메밀소면',
        ]}
        value={vlaue}
        onChange={(val) => setVlaue(val)}
      />
      <div>
        <Tag
          onClick={(e, value) => value}
          value="123asdf"
          onClose={(e, value) => value}
        >
          # 재료 3
        </Tag>
      </div>
      <Stroke />
      <Stroke variant="bold" marginX={10} />
      <Button>asdf</Button>
    </Stack>
  );
}

export default Home;
