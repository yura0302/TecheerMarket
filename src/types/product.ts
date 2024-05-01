const state = ['SALE', 'RESERVED', 'SOLD'] as const; // 판매중, 예약중, 판매완료
export type StateType = (typeof state)[number];

export type Product = {
  id?: number;
  productId: number;
  title: string;
  thumbnailURL: string;
  name: string;
  price: number;
  createdAt: string;
  productState: StateType;
  likes: number;
  views: number;
  // chatroomCount: number; // 채팅방 개수
};
