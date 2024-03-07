import PlusMinusIcon from '@/assets/components/PlusMinusIcon';
import DesignSystem from '@/utils/designSystem';
import { Group, Stack, Stroke, Typography } from '@base';
import { css } from '@emotion/react';
import { useState } from 'react';

const stlyes = {
  root: css({
    width: 305,
    backgroundColor: 'transparent',
  }),
  title: css({ padding: '0 5px' }),
  body: {
    img: css({
      width: '100%',
      height: '216px',
      borderRadius: '3.6px',
    }),
    text: css({
      background: DesignSystem.Color.background.gray,
      width: '100%',
      overflow: 'hidden',
      whiteSpace: 'pre-line',
      textOverflow: 'ellipsis',
      WebkitLineClamp: 7,
      WebkitBoxOrient: 'vertical',
      display: '-webkit-box',
    }),
    textWrapper: css({
      height: '216px',
      padding: 18,
      boxSizing: 'border-box',
      background: DesignSystem.Color.background.gray,
    }),
  },
};
export interface RecipeProps {
  name: string;
  author: string;
  img?: string;
  contents: string;
}

function Recipe({ name, author, img, contents }: RecipeProps) {
  const [hover, setHover] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.type === 'mouseenter') setHover(true);
    else if (e.type === 'mouseleave') setHover(false);
  };
  return (
    <Stack
      css={stlyes.root}
      spacing={15}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <Stroke variant="bold" />
      <Group position="apart" css={stlyes.title}>
        <Stack>
          <Typography variant="subtitle" color="text.black">
            {name}
          </Typography>
          <Typography variant="info" color="text.gray">
            {author}
          </Typography>
        </Stack>
        {hover && (
          <PlusMinusIcon plus={!isSaved} onClick={() => setIsSaved(!isSaved)} />
        )}
      </Group>
      {img ? (
        <img src={img} css={stlyes.body.img} />
      ) : (
        <div css={stlyes.body.textWrapper}>
          <Typography variant="info" css={stlyes.body.text}>
            {contents}
          </Typography>
        </div>
      )}
    </Stack>
  );
}

export default Recipe;
