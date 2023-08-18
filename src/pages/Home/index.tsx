import { Stack } from '../../components/base';
import Banner from './components/Banner';

export interface HomeProps {}

function Home({ ...props }: HomeProps) {
  return (
    <Stack>
      <Banner />
    </Stack>
  );
}

export default Home;
