import DesignSystem, { ShortColorType, TextType } from '@/utils/designSystem';
import { CSSProperties, HTMLAttributes } from 'react';

export interface TypographyProps extends HTMLAttributes<HTMLDivElement> {
  variant: TextType;
  color?: CSSProperties['color'] | ShortColorType;
}

function Typography({ variant, color: propsColor, ...props }: TypographyProps) {
  const color = propsColor && DesignSystem.Color.colorGenerator(propsColor);
  return <div css={[DesignSystem.Text[variant], { color }]} {...props} />;
}

export default Typography;
