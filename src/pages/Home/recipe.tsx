import RecipeItem from '@copmonents/RecipeItem';

function Recipe() {
  const recipeItemProps = {
    name: '치킨 샐러드',
    author: '해피맘',
    contents:
      '소스 : 스리라차 소스, 요거트 소스 반죽 : 밀가루, 계란 오늘은 끝장나는 요리 레시피를 가져왔어요. 오늘은 끝장나는 요리 레시피를 가져왔어요. 에그 스크럼블을 특별하게 어쩌구저쩌구. 에그 스크럼블을 특별하게 어쩌구...',
  };
  return <RecipeItem {...recipeItemProps}></RecipeItem>;
}

export default Recipe;
