import TabsBody from './components/Body';
import TabsButton from './components/Button';
import TabsMain from './Tabs';

const Tabs = Object.assign(TabsMain, {
  Body: TabsBody,
  Button: TabsButton,
});

export default Tabs;
