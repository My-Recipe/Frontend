import { HTMLAttributes } from 'react';

export interface BannerSlideProps extends HTMLAttributes<HTMLDivElement> {
  'image-src'?: string;
}

function BannerSlide({
  children,
  'image-src': src,
  onClick,
  ...props
}: BannerSlideProps) {
  return <>{children}</>;
}

export default BannerSlide;
