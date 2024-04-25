import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import BottomNavBar from './index';
import { expect } from '@storybook/test';

const meta: Meta<typeof BottomNavBar> = {
  title: 'Navbar/BottomNavBar',
  component: BottomNavBar,
};

export default meta;

type Story = StoryObj<typeof BottomNavBar>;

export const Basic: Story = {
  args: {
    onNavClick: (name) => alert(name),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const homeButton = canvas.getByTestId('home-button');
    const likeButton = canvas.getByTestId('like-button');
    const chatButton = canvas.getByTestId('chat-button');
    const mypageButton = canvas.getByTestId('mypage-button');

    // 클릭 이벤트 테스트
    // [homeButton, likeButton, chatButton, mypageButton].map(async (button) =>
    //   userEvent.click(button),
    // );

    // 화면에 버튼이 모두 보이는지 테스트
    [homeButton, likeButton, chatButton, mypageButton].map(
      async (button) => await expect(button).toBeInTheDocument(),
    );
  },
};
