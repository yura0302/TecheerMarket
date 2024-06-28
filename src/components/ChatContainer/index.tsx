import React, { useState, useEffect, useRef } from 'react';
import * as S from './styles';
import moment from 'moment';
import 'moment/locale/ko';
import ChatMessage from '../ChatMessage';
import ChatOtherMessage from '../ChatOtherMessage';
import { restFetcher } from '@/queryClient';
import { ChatInfoData } from '../Chat';

interface IChatContainer {
  chatList: ChatInfoData[];
  setChatList: React.Dispatch<React.SetStateAction<ChatInfoData[]>>;
  chatContainerRef: React.RefObject<HTMLDivElement>;
}

const BASE_URL = import.meta.env.VITE_APP_URL;
const ChatContainer = ({ chatList, setChatList, chatContainerRef }: IChatContainer) => {
  const [IsUserId, setIsUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await restFetcher({
          method: 'GET',
          path: `${BASE_URL}/users/id`,
        });
        setIsUserId(response.data.userId);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatList, chatContainerRef]);

  const formatDate = (date: string) => moment(date).format('YYYY년 MM월 DD일');

  const isNewDay = (index: number, message: ChatInfoData) => {
    if (index === 0) return true;
    const previousDate = moment(chatList[index - 1].createdAt).format('YYMMDD');
    const currentDate = moment(message.createdAt).format('YYMMDD');
    return previousDate !== currentDate;
  };
  const userIdFromLocalStorage = localStorage.getItem('userId');
  let newUserId: number | null = null;
  if (userIdFromLocalStorage) {
    newUserId = parseInt(userIdFromLocalStorage, 10);
  }
  return (
    <S.Container ref={chatContainerRef}>
      {chatList?.map((message, index) => {
        const isMyMessage = message.senderId === newUserId;
        const showDate = isNewDay(index, message);

        const dateComponent = showDate && (
          <S.TodayDate style={{ alignSelf: 'center' }}>{formatDate(message.createdAt)}</S.TodayDate>
        );

        const MessageComponent = isMyMessage ? ChatMessage : ChatOtherMessage;

        return (
          <React.Fragment key={index}>
            {dateComponent}
            <div
              style={{
                alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
                marginRight: isMyMessage ? '7px' : '0',
                marginLeft: isMyMessage ? '0' : '7px',
              }}
            >
              <MessageComponent message={message} />
            </div>
          </React.Fragment>
        );
      })}
    </S.Container>
  );
};

export default ChatContainer;
