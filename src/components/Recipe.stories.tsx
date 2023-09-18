import type { Meta, StoryObj } from '@storybook/react';
import Recipe from './Recipe';

const meta: Meta<typeof Recipe> = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6Tcv8DaxZwjY4NYH0NAhmz/Design?type=design&node-id=537-2732&mode=dev',
    },
  },
  component: Recipe,
  args: {
    name: '치킨 샐러드',
    author: '해피밀',
    contents: `소스 : 스리라차 소스, 요거트 소스
반죽 : 밀가루, 계란
오늘은 끝장나는 요리 레시피를 가져왔어요. 오늘은 끝장나는 요리 레시피를 가져왔어요. 에그 스크럼블을 특별하게 어쩌구저쩌구. 에그 스크럼블을 특별하게 어쩌구, 에그 스크럼블을 특별하게 어쩌구, 에그 스크럼블을 특별하게 어쩌구, 에그 스크럼블을 특별하게 어쩌구, 에그 스크럼블을 특별하게 어쩌구, `,
  },
};
export default meta;

type Story = StoryObj<typeof Recipe>;

export const RecipeDefault: Story = {};
export const RecipeWithImage: Story = {
  args: {
    img: 'https://recipe.gabia.io/pds/upfile/2022-07-28_115060389[10].jpg',
  },
};
