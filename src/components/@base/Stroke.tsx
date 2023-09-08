import { CSSProperties, HTMLAttributes } from 'react';

export interface StrokeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  variant?: 'default' | 'bold';
  width?: CSSProperties['width'];
  marginX?: CSSProperties['marginLeft' | 'marginRight'];
}

function Stroke({
  variant = 'default',
  width,
  marginX,
  ...props
}: StrokeProps) {
  const strokeWidth = variant === 'bold' ? 2.4 : 1;
  return (
    <div
      css={{
        width,
        marginLeft: marginX,
        marginRight: marginX,
        height: strokeWidth,
        backgroundColor: '#000',
      }}
      {...props}
    />
  );
}

export default Stroke;
