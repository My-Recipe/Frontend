import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import Editor from './Editor';

const meta: Meta<typeof Editor> = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6Tcv8DaxZwjY4NYH0NAhmz/Design?type=design&node-id=466-2537&mode=dev',
    },
  },
  component: Editor,
  decorators: [
    (Story) => (
      <div style={{ width: '80%' }}>
        <Story />
      </div>
    ),
  ],
  args: {},
};
export default meta;

type Story = StoryObj<typeof Editor>;

export const EditorDefault: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByPlaceholderText('레시피의 이름을 알려주세요.'),
      '비건을 위한 버섯 탕수육 레시피',
    );

    let input = canvas.getAllByPlaceholderText('ex) 돼지고기');
    await userEvent.type(input[0], '돼지고기 500g');
    await userEvent.keyboard('[Enter]');
    await userEvent.type(input[0], '돼지고기 500g');
    await userEvent.keyboard('[Enter]');
    await userEvent.type(input[0], '돼지고기 500g');
    await userEvent.keyboard('[Enter]');
    await userEvent.type(input[0], '돼지고기 500g');
    await userEvent.keyboard('[Enter]');
    input = canvas.getAllByPlaceholderText('재료 그룹 1');
    await userEvent.type(input[0], '재료 그룹 1');
    await userEvent.keyboard('[Enter]');

    input = canvas.getAllByPlaceholderText('ex) 돼지고기');
    await userEvent.type(input[1], '돼지고기 500g');
    await userEvent.keyboard('[Enter]');
    await userEvent.type(input[1], '돼지고기 500g');
    await userEvent.keyboard('[Enter]');
    await userEvent.type(input[1], '돼지고기 500g');
    await userEvent.keyboard('[Enter]');
    await userEvent.type(input[1], '돼지고기 500g');
    await userEvent.keyboard('[Enter]');
    await userEvent.type(input[1], '돼지고기 500g');
    await userEvent.keyboard('[Enter]');
    await userEvent.type(input[1], '돼지고기 500g');
    await userEvent.keyboard('[Enter]');
    await userEvent.type(input[1], '돼지고기 500g');
    await userEvent.keyboard('[Enter]');
    input = canvas.getAllByPlaceholderText('재료 그룹 2');
    await userEvent.type(input[0], '재료 그룹 2');
    await userEvent.keyboard('[Enter]');

    input = canvas.getAllByPlaceholderText('ex) 돼지고기');
    await userEvent.type(input[2], '돼지고기 500g');
    await userEvent.keyboard('[Enter]');
    await userEvent.type(input[2], '돼지고기 500g');
    await userEvent.keyboard('[Enter]');
    await userEvent.type(input[2], '돼지고기 500g');
    await userEvent.keyboard('[Enter]');
    await userEvent.type(input[2], '돼지고기 500g');
    await userEvent.keyboard('[Enter]');
    input = canvas.getAllByPlaceholderText('재료 그룹 3');
    await userEvent.type(input[0], '재료 그룹 3');
    await userEvent.keyboard('[Enter]');
    input = canvas.getAllByPlaceholderText('재료 그룹 4');
    await userEvent.click(input[0]);

    input = canvas.getAllByPlaceholderText(
      '이미지와 함께 조리과정을 적어보세요.',
    );
    await userEvent.type(
      input[0],
      '요즘 가족들끼리 잘 먹고 있는 버섯탕수육 입니다. 채식을 싫어하던 아이들도 이건 좋아하더라구요. 요즘 가족들끼리 잘 먹고 있는 버섯탕수육 입니다. 채식을 싫어하던 아이들도 이건 좋아하더라구요.',
    );
    await userEvent.keyboard('[Enter]');

    input = canvas.getAllByPlaceholderText(
      '이미지와 함께 조리과정을 적어보세요.',
    );
    await userEvent.type(
      input[1],
      '요즘 가족들끼리 잘 먹고 있는 버섯탕수육 입니다. 채식을 싫어하던 아이들도 이건 좋아하더라구요. 요즘 가족들끼리 잘 먹고 있는 버섯탕수육 입니다. 채식을 싫어하던 아이들도 이건 좋아하더라구요.',
    );
    await userEvent.keyboard('[Enter]');

    input = canvas.getAllByPlaceholderText(
      '이미지와 함께 조리과정을 적어보세요.',
    );
    await userEvent.type(
      input[2],
      '요즘 가족들끼리 잘 먹고 있는 버섯탕수육 입니다. 채식을 싫어하던 아이들도 이건 좋아하더라구요. 요즘 가족들끼리 잘 먹고 있는 버섯탕수육 입니다. 채식을 싫어하던 아이들도 이건 좋아하더라구요.',
    );

    const button = canvas.getAllByTestId('toolbar');
    await userEvent.click(button[2]);
    input = canvas.getAllByTestId('tip-input');
    await userEvent.type(
      input[0],
      '일이삼사오육칠팔구십일이삼사오육칠팔구십일이',
    );
    await userEvent.keyboard('[Enter]');
    await userEvent.keyboard(
      '당근을 엄청나게 깔끔하게 닦고 예쁘게 잘라주세요.[Enter]',
    );
    await userEvent.keyboard(
      '당근을 엄청나게 깔끔하게 닦고 예쁘게 잘라주세요.[Enter]',
    );
    await userEvent.keyboard(
      '당근을 엄청나게 깔끔하게 닦고 예쁘게 잘라주세요.',
    );
    await userEvent.click(button[2]);
    await userEvent.keyboard(
      '일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십',
    );
    await userEvent.click(button[0]);
    await userEvent.keyboard('10:00');

    let file = new File(['hello'], 'hello.png', { type: 'image/png' });
    await userEvent.click(button[1]);
    await userEvent.upload(button[1], file);

    const addArea = canvas.getByTestId('add-area');
    await userEvent.click(addArea);
    await userEvent.keyboard(
      '4 요즘 가족들끼리 잘 먹고 있는 버섯탕수육 입니다. 채식을 싫어하던 아이들도 이건 좋아하더라구요. 요즘 가족들끼리 잘 먹고 있는 버섯탕수육 입니다. 채식을 싫어하던 아이들도 이건 좋아하더라구요.',
    );
    await userEvent.click(button[0]);

    file = new File(['hello2'], 'hello2.png', { type: 'image/png' });
    await userEvent.click(button[1]);
    await userEvent.upload(button[1], file);
    file = new File(['hello3'], 'hello3.png', { type: 'image/png' });
    await userEvent.click(button[1]);
    await userEvent.upload(button[1], file);

    await userEvent.click(addArea);
  },
};
