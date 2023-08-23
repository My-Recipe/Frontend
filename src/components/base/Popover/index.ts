import PopoverMain from './Popover';
import PopoverClose from './components/Close';
import PopoverContent from './components/Content';
import PopoverTrigger from './components/Trigger';

const Popover = Object.assign(PopoverMain, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Close: PopoverClose,
});

export default Popover;
