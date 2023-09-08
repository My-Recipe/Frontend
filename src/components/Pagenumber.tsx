import globalStyles from '@/utils/styles';
import { Typography } from '@base';
import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';

const pagenumberStyle = {
  animation: {
    move: css({
      transition: `all 150ms ease`,
    }),
  },
  wrapper: css({
    display: 'inline-flex',
    padding: '10px 25px',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 20,
    borderRadius: 4,
    position: 'relative',
  }),
  inner: css([
    {
      display: 'flex',
      width: '35px',
      height: '35px',
      justifyContent: 'center',
      alignItems: 'center',
    },
    globalStyles.button,
  ]),
  label: css({
    position: 'absolute',
    width: 30,
    height: 2.4,
    background: '#000',
    left: 0,
    top: 10 - 2.4,
  }),
};

export interface PagenumberProps {
  pageCount: number;
  onPageChange?: (page: number) => void;
}

function Pagenumber({ pageCount, onPageChange, ...props }: PagenumberProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pages = [...Array(pageCount).keys()].map((i) => i + 1);
  const [currentPage, setCurrentPage] = useState(1);
  const [labelPosition, setLabelPosition] = useState(25);

  useEffect(() => {
    if (ref.current) {
      setLabelPosition(ref.current.offsetLeft);
    }
    onPageChange && onPageChange(currentPage);
  }, [currentPage]);

  return (
    <div css={[pagenumberStyle.wrapper]}>
      <div
        css={[pagenumberStyle.label, pagenumberStyle.animation.move]}
        style={{ left: labelPosition + 2.5 }}
      />
      {pages.map((pageNumber, index) => (
        <div
          ref={pageNumber === currentPage ? ref : undefined}
          onClick={() => setCurrentPage(pageNumber)}
          css={pagenumberStyle.inner}
          key={`page-number-item-${pageNumber}-${index}`}
        >
          <Typography variant="subtitle" color="text.black">
            {pageNumber}
          </Typography>
        </div>
      ))}
    </div>
  );
}

export default Pagenumber;
