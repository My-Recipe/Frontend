import {
  ForwardRefComponent,
  HTMLMotionProps,
  SVGMotionProps,
  motion,
} from 'framer-motion';

export interface PlusMinusIconProps
  extends ForwardRefComponent<HTMLDivElement, HTMLMotionProps<'div'>> {
  plus: boolean;
}
const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path {...props} />
);
const Rect = (props: SVGMotionProps<SVGRectElement>) => (
  <motion.rect {...props} />
);

const transition: SVGMotionProps<SVGRectElement>['transition'] = {
  type: 'spring',
  damping: 17,
  stiffness: 180,
};

function PlusMinusIcon({ plus, ...props }: PlusMinusIconProps) {
  return (
    <motion.div
      css={{ width: 42, height: 42 }}
      initial={false}
      animate={plus ? 'plus' : 'minus'}
      {...props}
    >
      <svg
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Rect
          x="0.5"
          y="0.5"
          width="41"
          height="41"
          rx="20.0239"
          stroke="#141414"
          fill="#141414"
        />
        <Rect
          x="0.5"
          y="0.5"
          width="41"
          height="41"
          rx="20.0239"
          fill="#4BC25E"
          variants={{
            plus: { opacity: 1 },
            minus: { opacity: 0 },
          }}
          transition={transition}
        />
        <Path
          d="M20.9998 13.8164V28.1831M13.8164 20.9998H28.1831"
          stroke="#141414"
          strokeWidth={2.05239}
          strokeLinecap="square"
          strokeLinejoin="round"
          variants={{
            plus: { opacity: 1, rotate: 0 },
            minus: { opacity: 0, rotate: 180, stroke: '#c2c2c2' },
          }}
          transition={transition}
        />
        <Path
          d="M13.8164 21H28.1831"
          stroke="white"
          strokeWidth="2.05239"
          strokeLinecap="square"
          strokeLinejoin="round"
          variants={{
            plus: { opacity: 0, rotate: -180 },
            minus: { opacity: 1, rotate: 0 },
          }}
          transition={transition}
        />
      </svg>
    </motion.div>
  );
}

export default PlusMinusIcon;
