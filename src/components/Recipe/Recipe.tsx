import { Color } from '@/utils/designSystem';
import { Stack, Stroke, Typography } from '@base';
import { useState } from 'react';
import MinusIcon from '../../assets/icon-minus.svg';
import PlusIcon from '../../assets/icon-plus.svg';
import RecipeTitle from './RecipeTitle';
interface RecipeProps {
  children: { name: string; author: string; img?: string; contents: string };
}
function Recipe({ children: { name, author, img, contents } }: RecipeProps) {
  const [hover, sethover] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const handleHover = () => {
    sethover(!hover);
  };
  return (
    <Stack
      css={{
        width: '305px',
        backgroundColor: 'transparent',
        gap: '15px',
      }}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <Stroke variant="bold" width="100%" />
      <RecipeTitle
        icon={hover ? (isSaved ? MinusIcon : PlusIcon) : ''}
        setIsSaved={() => {
          setIsSaved(!isSaved);
        }}
      >
        {{ name: name, author: author }}
      </RecipeTitle>
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
