import { CSSProperties, HTMLAttributes } from 'react';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  spacing?: CSSProperties['gap'];
}

function Stack({
  children,
  justify: justifyContent = 'center',
  align: alignItems = 'stretch',
  spacing: gap,
  ...props
}: StackProps) {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent,
        alignItems,
        gap,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default Stack;
