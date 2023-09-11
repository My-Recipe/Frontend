import type { Meta, StoryObj } from '@storybook/react';
import Banner from './Banner';

const meta: Meta<typeof Banner> = {
  parameters: {
    design: {
      type: 'figma',
      url: 'figma link',
    },
  },
  component: Banner,
  argTypes: {
    onRecipeBookClick: {
      action: 'recipe-book-click',
    },
  },
  args: {
    items: [
      {
        recipeNumber: 24,
        subject: '에디터 추천',
        title: '비건을 위한 버섯탕수육 레시피',
        description:
          '요즘 가족들끼리 잘 먹고 있는 버섯탕수육 입니다. 채식을 싫어하던 아이들도 이건 좋아하더라구요. 먼저 표고버섯을 준비해주세요. 물에 씻...',
        author: '해피밀',
      },
      {
        recipeNumber: 16,
        subject: '에디터 추천',
        title: '비건을 위한 버섯탕수육 레시피',
        description:
          '요즘 가족들끼리 잘 먹고 있는 버섯탕수육 입니다. 채식을 싫어하던 아이들도 이건 좋아하더라구요. 먼저 표고버섯을 준비해주세요. 물에 씻...',
        author: '해피밀',
      },
      {
        recipeNumber: 16,
        subject: '추천 레시피 북',
        title: '맛있는 비건요리는 없다구요?',
        description:
          '세상의 모든 비건 요리를 연구합니다. 당신의 몸과 혀가 둘 다 행복하도록.',
        author: '해피밀',
      },
      {
        recipeNumber: 8,
        subject: '추천 레시피 북',
        title: '맛있는 비건요리는 없다구요?',
        description:
          '세상의 모든 비건 요리를 연구합니다. 당신의 몸과 혀가 둘 다 행복하도록.',
        author: '해피밀',
      },
      {
        recipeNumber: 12,
        subject: '추천 레시피 북',
        title: '맛있는 비건요리는 없다구요?',
        description:
          '세상의 모든 비건 요리를 연구합니다. 당신의 몸과 혀가 둘 다 행복하도록.',
        author: '해피밀',
      },
      {
        recipeNumber: 12,
        subject: '추천 레시피 북',
        title: '맛있는 비건요리는 없다구요?',
        description:
          '세상의 모든 비건 요리를 연구합니다. 당신의 몸과 혀가 둘 다 행복하도록.',
        author: '해피밀',
      },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof Banner>;

export const BannerDefault: Story = {};
