import { Color } from '@/utils/designSystem';
import { Group, Stack, Stroke, Typography } from '@base';
import { useState } from 'react';
import MinusIcon from '../assets/icon-minus.svg';
import PlusIcon from '../assets/icon-plus.svg';
interface RecipeItemProps {
  name: string;
  author: string;
  img?: string;
  contents: string;
}
function Recipe({ name, author, img, contents }: RecipeItemProps) {
  const [hover, setHover] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const handleHover = (newHoverState: boolean) => {
    setHover(newHoverState);
  };
  return (
    <Stack
      css={{
        width: '305px',
        backgroundColor: 'transparent',
        gap: '15px',
      }}
      onMouseEnter={() => {
        handleHover(true);
      }}
      onMouseLeave={() => {
        handleHover(false);
      }}
    >
      <Stroke variant="bold" width="100%" />
      <Group position="apart" css={{ padding: '0 5px' }}>
        <Stack>
          <Typography variant="subtitle" color="text.black">
            {name}
          </Typography>
          <Typography variant="info" color="text.gray">
            {author}
          </Typography>
        </Stack>
        <img
          src={hover ? (isSaved ? MinusIcon : PlusIcon) : ''}
          onClick={() => {
            setIsSaved(!isSaved);
          }}
        />
      </Group>
      {img ? (
        <img
          src={img}
          css={{
            width: '100%',
            height: '216px',
            borderRadius: '3.6px',
          }}
        />
      ) : (
        <Typography
          variant="info"
          css={{
            background: Color.background.gray,
            width: '100%',
            height: '216px',
          }}
        >
          {contents}
        </Typography>
      )}
    </Stack>
  );
}

export default Recipe;
