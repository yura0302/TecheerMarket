import { Meta, StoryObj } from '@storybook/react';
import Carousel from '../../components/Carousel/index';
import { userEvent, within } from '@storybook/testing-library';

const meta: Meta<typeof Carousel> = {
  title: 'Component/Carousel',
  component: Carousel,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Empty: Story = {
  args: {
    images: [],
  },
};

export const Basic: Story = {
  args: {
    images: [
      'https://techeer-market.s3.ap-northeast-2.amazonaws.com/product/a3861677-5968-4fe6-a27b-0ec781274142-blob',
    ],
  },
};

export const Multiple: Story = {
  args: {
    images: [
      'https://techeer-market.s3.ap-northeast-2.amazonaws.com/product/a3861677-5968-4fe6-a27b-0ec781274142-blob',
      'https://techeer-market.s3.ap-northeast-2.amazonaws.com/product/a3861677-5968-4fe6-a27b-0ec781274142-blob',
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const buttons = canvas.getByTestId('1');
    await userEvent.click(buttons, { delay: 1000 });
  },
};
