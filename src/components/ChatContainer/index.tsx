import React, { useEffect } from 'react';
import * as S from './styles';
import moment from 'moment';
import 'moment/locale/ko';
import ChatMessage from '../ChatMessage';
import { restFetcher } from '@/queryClient';
import { useNavigate } from 'react-router-dom';

interface IChatContainer {
  chatInfoList: ChatInfoData[];
  setChatInfoList: React.Dispatch<React.SetStateAction<ChatInfoData[]>>;
}
export interface ChatInfoData {
  senderId: number;
  message: string;
  createdAt: string;
}

const ChatContainer = ({ chatInfoList, setChatInfoList }: IChatContainer) => {
  const formatDate = (date: string) => moment(date).format('YYYY년 MM월 DD일');
  const navigate = useNavigate();

  // 날짜를 비교하여 새로운 날짜인지 확인하는 함수
  const isNewDay = (prevDate: string, currentDate: string) => {
    return formatDate(prevDate) !== formatDate(currentDate);
  };

  const handleChat = async (productId: number) => {
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
      {chatInfoList.map((message, index) => {
        // chatInfoList를 사용하여 채팅 내역을 표시
        const prevMessage = chatInfoList[index - 1];
        const showDate = !prevMessage || isNewDay(prevMessage.createdAt, message.createdAt);
        return (
          <React.Fragment key={index}>
            {showDate && (
              <S.TodayDate style={{ alignSelf: 'center' }}>
                {formatDate(message.createdAt)}
              </S.TodayDate>
            )}
            <div style={{ alignSelf: 'flex-end', marginRight: '13px' }}>
              <ChatMessage message={message} />
            </div>
          </React.Fragment>
        );
      })}
    </S.Container>
  );
};
// };
export default ChatContainer;
