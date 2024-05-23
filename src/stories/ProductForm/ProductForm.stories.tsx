import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import ProductForm from '@/components/ProductForm/ProductForm';
import { Product } from '@/types/product';
import { expect } from '@storybook/test';

const meta: Meta<typeof ProductForm> = {
  title: 'Component/ProductForm',
  component: ProductForm,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProductForm>;

const ITEM: Product = {
  id: 1,
  productId: 1,
  title: '노트북 팝니다',
  thumbnailURL:
    'https://techeer-market.s3.ap-northeast-2.amazonaws.com/product/a3861677-5968-4fe6-a27b-0ec781274142-blob',
  name: '조은주',
  price: 100000,
  createdAt: '2023-10-10',
  productState: 'SALE',
  likes: 1,
  views: 2,
  chatRooms: 3,
};

export const Basic: Story = {
  args: {
    items: ITEM,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText(ITEM.title)).toBeInTheDocument();
    expect(canvas.getAllByText(ITEM.name)[0]).toBeInTheDocument();
    expect(canvas.getByText(`${Number(ITEM.price).toLocaleString()}원`)).toBeInTheDocument();
  },
};

// 판매 중
export const SalesList_SALE: Story = {
  args: {
    items: ITEM,
    state: 'SALE',
  },
};

// 거래 완료
export const SalesList_SOLD: Story = {
  args: {
    items: ITEM,
    state: 'SOLD',
  },
};
