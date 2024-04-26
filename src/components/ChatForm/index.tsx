import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as S from './style';
import profile from '../../assets/profile.svg';
import { restFetcher } from '@/queryClient';
import { formatDateToNow } from '@/utils/formatDateToNow';
import { ChatListProps, ResChatMessage } from '@/types/chatList';

// // export interface ChatFormProps {
// //   items: ResProductInfo[];
// // }

// // export interface ResChat {
// //   chatRoomId: number;
// //   productInfo: ResProductInfo[];
// //   chatCreatedAt: string;
// //   chatInfoList: ResChatInfo[];
// // }

// // export interface ResProductInfo {
// //   productId: number;
// //   title: string;
// //   thumbnailURL: string;
// //   name: string;
// //   userEmail: string;
// //   userId: number;
// //   price: number;
// //   createdAt: string;
// // }

export default function ChatForm({ items }: ChatListProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [chatList, setChatList] = useState<ResChatMessage[]>([]);

  // const goToChatRoom = async (id: number) => {
  //   const response = await restFetcher({
  //     method: 'GET',
  //     path: `/chat/${id}`,
  //   });
  //   navigate(`/chat/${id}`, {
  //     state: {
  //       id: response.data.chatRoomId,
  //       productInfo: response.data.productInfo,
  //       chatInfoList: response.data?.chatInfoList,
  //     },
  //   });
  //   // console.log(location.state);
  // };
  const handleChat = async (productId: number) => {
    // const parsedProductId = parseInt(productId ?? '', 10);
    try {
      const response = await restFetcher({
        method: 'POST',
        path: `/chat/create/${productId}`,
      });
      const { chatRoomId, productInfo, chatInfoList } = response.data;
      navigate(`/chat/${chatRoomId}`, {
        state: { chatRoomId, productInfo, chatInfoList },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <S.Container>
      {items.map((item) => (
        <S.Div onClick={() => handleChat(item.productId)} key={item.productId}>
          <S.Icon>
            <S.IconImage src={profile} />
          </S.Icon>
          <S.Texts>
            <S.TopText>
              <S.NameText>{item.chatPartnerName}</S.NameText>
              <S.DayText>{formatDateToNow(item.createdAt)}</S.DayText>
            </S.TopText>
            <S.Chat>{item.chatPartnerName}</S.Chat>
          </S.Texts>
          <S.ProductImage src={item.productThumbnail} />
        </S.Div>
      ))}
    </S.Container>
  );
}
