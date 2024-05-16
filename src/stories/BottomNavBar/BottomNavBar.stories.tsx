import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
// import BottomNavBar from './index';
import BottomNavBar from '@/components/BottomNavBar';
import { expect } from '@storybook/test';

const meta: Meta<typeof BottomNavBar> = {
  title: 'Navbar/BottomNavBar',
  component: BottomNavBar,
};

export default meta;

type Story = StoryObj<typeof BottomNavBar>;

export const Basic: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const homeButton = canvas.getAllByRole('button')[0];
    const likeButton = canvas.getAllByRole('button')[1];
    const chatButton = canvas.getAllByRole('button')[2];
    const mypageButton = canvas.getAllByRole('button')[3];

    [homeButton, likeButton, chatButton, mypageButton].map(async (button) =>
      userEvent.click(button, { delay: 1000 }),
    );

    [homeButton, likeButton, chatButton, mypageButton].map(
      async (button) => await expect(button).toBeInTheDocument(),
    );
  },
};
