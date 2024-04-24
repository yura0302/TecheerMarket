import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import TopNavBar from './index';
import { expect } from '@storybook/test';

const meta: Meta<typeof TopNavBar> = {
  title: 'Navbar/TopNavBar',
  component: TopNavBar,
};

export default meta;

type Story = StoryObj<typeof TopNavBar>;

export const Basic: Story = {
  args: {
    page: '페이지',
    onNavBack: () => alert('뒤로가기'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const backButton = canvas.getByTestId('back-button');

    // 클릭 이벤트 테스트
    await userEvent.click(backButton);

    // 화면에 버튼이 보이는지 테스트
    await expect(backButton).toBeInTheDocument();
  },
};
