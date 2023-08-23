import { Popover, Stack } from '@base';
import Banner from './components/Banner';

export interface HomeProps {}

function Home({ ...props }: HomeProps) {
  return (
    <Stack>
      <Popover position="bottom-left">
        <Popover.Trigger>
          <button>asdf</button>
        </Popover.Trigger>
        <Popover.Content triggerPopoverMargin={3}>asdf</Popover.Content>
      </Popover>
      <Banner />
    </Stack>
  );
}

export default Home;
