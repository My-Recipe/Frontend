import { Stack } from '../../components/base';
import { Banner } from './Banner';

export interface HomeProps {}

function Home({ ...props }: HomeProps) {
  return (
    <Stack>
      <Banner>
        <Banner.Slide>hi</Banner.Slide>
        <Banner.Slide>hi</Banner.Slide>
        <Banner.Slide>hi</Banner.Slide>
        <Banner.Slide>hi</Banner.Slide>
        <Banner.Slide>hi</Banner.Slide>
        <div>hihi</div>
      </Banner>
    </Stack>
  );
}

export default Home;
