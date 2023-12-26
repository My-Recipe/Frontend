import { CSSProperties, HTMLAttributes, forwardRef, useRef } from 'react';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  spacing?: CSSProperties['gap'];
}

export default forwardRef<HTMLDivElement, StackProps>(function Stack(
  {
    children,
    justify: justifyContent = 'center',
    align: alignItems = 'stretch',
    spacing: gap,
    ...props
  }: StackProps,
  ref,
) {
  const localRef = useRef(null);
  const inputRef = ref || localRef;
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent,
        alignItems,
        gap,
      }}
      ref={inputRef}
      {...props}
    >
      {children}
    </div>
  );
});
