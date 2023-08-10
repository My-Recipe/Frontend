import { Children, HTMLAttributes, ReactNode, isValidElement } from 'react';
import { Group } from '../../../components/base';
import BannerSlide from './BannerSlide';

export interface BannerMainProps extends HTMLAttributes<HTMLDivElement> {}

const BannerSlideType = (<BannerSlide />).type;
const getBannerSlide = (children: ReactNode) => {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter(
    (child) => isValidElement(child) && child.type === BannerSlideType,
  );
};

function BannerMain({ children, ...props }: BannerMainProps) {
  return (
    <>
      <Group position="center">
        <div>12</div>
        <div>12</div>
        <div>12</div>
        <div>12</div>
        <div>12</div>
      </Group>
      <div>{getBannerSlide(children)}</div>
    </>
  );
}

export default BannerMain;
