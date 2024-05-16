import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import TopNavBar from '@/components/TopNavBar';
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const backButton = canvas.getByTestId('back-button');

    await userEvent.click(backButton, { delay: 1000 });

    await expect(backButton).toBeInTheDocument();
  },
};
