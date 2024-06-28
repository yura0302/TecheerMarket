import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import profile from '../../assets/profile.svg';
import { restFetcher } from '@/queryClient';
import { formatDateToNow } from '@/utils/formatDateToNow';
import { ChatListProps, ResChatMessage } from '@/types/chatList';

export default function ChatForm({ items }: ChatListProps) {
  const navigate = useNavigate();
  // const [chatList, setChatList] = useState<ResChatMessage[]>([]);
  const handleChat = async (productId: number, chatRoomId: number) => {
    try {
      const response = await restFetcher({
        method: 'POST',
        path: `/chat/create/${productId}`,
        params: { chatRoomId: chatRoomId },
      });
      const { productInfo, chatInfoList } = response.data;
      navigate(`/chat/${chatRoomId}`, {
        state: { chatRoomId, productInfo, chatInfoList },
      });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(items);
  return (
    <S.Container>
      {items.map((item) => (
        <S.Div onClick={() => handleChat(item.productId, item.id)} key={item.productId}>
          <S.Icon>
            <S.IconImage src={profile} />
          </S.Icon>
          <S.Texts>
            <S.TopText>
              <S.NameText>{item.chatPartnerName}</S.NameText>
              <S.DayText>{formatDateToNow(item?.createdAt)}</S.DayText>
            </S.TopText>
            <S.Chat>{item.message}</S.Chat>
          </S.Texts>
          <S.ProductImage src={item.productThumbnail} />
        </S.Div>
      ))}
    </S.Container>
  );
}
