import Heart from '@/assets/HeartIcon.svg';
import Store from '@/assets/StoreIcon.svg';
import Cart from '@/assets/CartIcon.svg';

export const MYPAGE_ITEMS = [
  { path: '/wishlist', imgSrc: Heart, altText: 'heartIcon', label: '좋아요 목록' },
  { path: '/saleslist', imgSrc: Store, altText: 'StoreIcon', label: '판매 내역' },
  { path: '/purchaselist', imgSrc: Cart, altText: 'CartIcon', label: '구매 내역' },
];
