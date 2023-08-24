import {
  ShortColorType,
  TextStyle,
  TextType,
  colorGenerator,
} from '@/utils/designSystem';
import { CSSProperties, HTMLAttributes } from 'react';

export interface TypographyProps extends HTMLAttributes<HTMLDivElement> {
  variant: TextType;
  color?: CSSProperties['color'] | ShortColorType;
}

function Typography({ variant, color: propsColor, ...props }: TypographyProps) {
  const color = propsColor && colorGenerator(propsColor);
  return <div css={[TextStyle[variant], { color }]} {...props} />;
}

export default Typography;
