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
    'data:image/jpeg;base64,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',
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
