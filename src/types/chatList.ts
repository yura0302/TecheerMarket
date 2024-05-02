export interface ChatListProps {
  items: ResChatMessage[];
}

export interface ResChatMessage {
  createdAt: string;
  chatPartnerName: string;
  currentChatAt?: string;
  id: number;
  productId: number;
  productLocation: string;
  productPrice: number;
  productThumbnail: string;
  productTitle: string;
  message: string;
  chatRoomId: number;
}
