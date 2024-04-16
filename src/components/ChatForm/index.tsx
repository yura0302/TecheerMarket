import { useState, useEffect } from 'react';
import * as S from './style';
import profile from '../../assets/profile.svg';
import { useNavigate } from 'react-router-dom';
import { ResChatMessage } from '@/types/chatList';
import { restFetcher } from '@/queryClient';
import { formatDateToNow } from '@/utils/formatDateToNow';

interface ChatFormProps {
  items: ResChatMessage[];
}

export default function ChatForm({ items }: ChatFormProps) {
  const [chatList, setChatList] = useState<ResChatMessage[]>([]);
  const navigate = useNavigate();

  const goToChatRoom = async (chatRoomId: number) => {
    const response = await restFetcher({
      method: 'GET',
      path: `/chat/${chatRoomId}`,
    });
    navigate(`/chat/${chatRoomId}`, {
      state: { chatRoomId: response.data.chatRoomId },
    });
  };

  useEffect(() => {
    setChatList(chatList);
  }, []);

  return (
    <S.Container>
      {items.map((item) => (
        <S.Div onClick={() => goToChatRoom(item.id)} key={item.id}>
          <S.Icon>
            <S.IconImage src={profile} />
          </S.Icon>
          <S.Texts>
            <S.TopText>
              <S.NameText>{item.chatPartnerName}</S.NameText>
              <S.DayText>{formatDateToNow(item.createdAt as string)}</S.DayText>
            </S.TopText>
            <S.Chat>넵 수고염</S.Chat>
          </S.Texts>
          <S.ProductImage src={item.productThumbnail} />
        </S.Div>
      ))}
    </S.Container>
  );
}
