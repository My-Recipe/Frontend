import { Group, Stack, Typography } from '@base';

interface RecipeTitleProps {
  children: { name: string; author: string };
  icon: string;
  setIsSaved: () => void;
}
function RecipeTitle({ children, icon, setIsSaved }: RecipeTitleProps) {
  return (
    <Group position="apart" css={{ padding: '0 5px' }}>
      <Stack>
        <Typography variant="subtitle" color="text.black">
          {children.name}
        </Typography>
        <Typography variant="info" color="text.gray">
          {children.author}
        </Typography>
      </Stack>
      <img src={icon} onClick={setIsSaved} />
    </Group>
  );
}

export default RecipeTitle;
