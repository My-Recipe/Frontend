import { Stack } from '@base';
import Pagenumber from '@copmonents/Pagenumber';
import Recipe, { RecipeProps } from '@copmonents/Recipe';
import { useState } from 'react';

export interface RecipesProps {
  recipes: RecipeProps[];
}

const chunkSize = 12;
function Recipes({ recipes: propsRecipesData, ...props }: RecipesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const recipes = propsRecipesData.reduce(
    (acc: RecipeProps[][], val, index) => {
      const chunkIndex = Math.floor(index / chunkSize);
      if (!acc[chunkIndex]) acc[chunkIndex] = [];
      acc[chunkIndex].push(val);
      return acc;
    },
    [],
  );

  return (
    <Stack spacing={75}>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '67px 15px',
          alignSelf: 'center',
        }}
      >
        {recipes[currentPage - 1]?.map((props, index) => (
          <Recipe
            {...props}
            key={`recipe-${props.name}-${props.author}-${index}`}
          />
        ))}
      </div>
      <Pagenumber
        pageCount={recipes.length}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Stack>
  );
}

export default Recipes;
