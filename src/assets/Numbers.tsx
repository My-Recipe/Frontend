import { HTMLAttributes, ReactNode, useEffect, useState } from 'react';

export interface NumbersProps extends HTMLAttributes<HTMLDivElement> {
  children: number;
}

function Numbers({ children, ...props }: NumbersProps) {
  const [svgComponent, setSVGComponent] = useState<ReactNode | null>(null);

  useEffect(() => {
    async function importSVG() {
      try {
        const { ReactComponent } = await import(
          `./numbers/number${children}.svg`
        );
        ReactComponent && setSVGComponent(ReactComponent as ReactNode);
      } catch (error) {
        setSVGComponent(null);
      }
    }

    // Call the importSVG function to load the SVG dynamically
    importSVG();
  }, [children]); // Use an empty dependency array to ensure it's called only once

  return <div {...props}>{svgComponent ? svgComponent : children}</div>;
}

export default Numbers;
