import { Stack, Stroke } from '@base';
import Button from '@copmonents/Button';
import Tag from '@copmonents/Tag';
import Banner from './components/Banner';

export interface HomeProps {}

function Home({ ...props }: HomeProps) {
  return (
    <Stack spacing={10}>
      <Banner />
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
