import RecipeItem, { RecipeItemProps } from './RecipeItem';

interface RecipeListProps {
  children: RecipeItemProps[];
}
function RecipeList({ children }: RecipeListProps) {
  return (
    <div
      css={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '67px 15px',
      }}
    >
      {children.map((recipe, idx) => {
        return (
          <RecipeItem {...recipe} key={`${idx}${recipe.name}`}></RecipeItem>
        );
      })}
    </div>
  );
}

export default RecipeList;
