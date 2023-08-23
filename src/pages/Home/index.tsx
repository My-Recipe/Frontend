import { Stack } from '@base';
import InputBox from '@copmonents/InputBox';
import Banner from './components/Banner';

export interface HomeProps {}

function Home({ ...props }: HomeProps) {
  return (
    <Stack>
      {/* <Popover preventCloseOnClickTrigger position="bottom-left">
        <Popover.Trigger>
          <button>asdf</button>
        </Popover.Trigger>
        <Popover.Content triggerPopoverMargin={3}>asdf</Popover.Content>
      </Popover> */}
      <Banner />
      <InputBox searchItems={['a', 'b', 'c']} />
    </Stack>
  );
}

export default Home;
