import PopoverClose from './Close';
import PopoverContent from './Content';
import PopoverMain from './Popover';
import PopoverTrigger from './Trigger';

const Popover = Object.assign(PopoverMain, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Close: PopoverClose,
});

export default Popover;
