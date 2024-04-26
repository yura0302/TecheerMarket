import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Stomp from '@stomp/stompjs';
import * as S from './styles';
import TopNavBar from '../TopNavBar';
import NavBar from '../BottomNavBar';
import ChatContainer from '../ChatContainer';
import moment from 'moment';
import 'moment/locale/ko';
import { formatDateToNow } from '@/utils/formatDateToNow';
import { useLocation } from 'react-router-dom';
import { restFetcher } from '@/queryClient';

interface ChatProps {
  chatRoomId: number;
  productInfo: ChatData;
  chatInfoList: ChatInfoData[];
}
export interface ChatInfoData {
  senderId: number;
  message: string;
  createdAt: string;
}

export interface ChatData {
  productId: number;
  title: string;
  thumbnailURL?: string;
  name: string;
  userEmail: string;
  userId: number;
  price: number;
  createdAt: string;
  message: string;
}
export interface ChatResponse {
  content: ChatInfoData[];
  hasNext: boolean;
  hasPrev: boolean;
  next: number;
  prev: number;
}

const Chat = ({ chatRoomId, productInfo, chatInfoList }: ChatProps) => {
  const [chatList, setChatList] = useState<ChatInfoData[]>(chatInfoList);
  const [chatText, setChatText] = useState('');
  const client = useRef<Stomp.Client>();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const subscribe = useCallback(() => {
    client.current?.subscribe(`/sub/chat/room/${chatRoomId}`, (body) => {
      const json_body = JSON.parse(body.body);
      setChatList((chat_list: ChatInfoData[]) => [...chat_list, json_body]);
    });
    console.error();
  }, [chatRoomId]);

  const connect = useCallback(() => {
    client.current = new Stomp.Client({
      brokerURL: 'ws://techeermarket.ap-northeast-2.elasticbeanstalk.com/ws-stomp',
      connectHeaders: {
        Authorization: localStorage.getItem('token') || '',
      },
      onConnect: () => {
        subscribe();
      },
    });
    client.current.activate();
  }, [subscribe]);

  const disconnect = () => {
    client.current?.deactivate();
  };
  const publish = (chat: string) => {
    if (!client.current?.connected) {
      return;
    }
    if (chat.trim() === '') {
      return;
    }
    client.current?.publish({
      destination: '/pub/api/chat/sendMessage',
      body: JSON.stringify({
        chatRoomId,
        senderId: productInfo.userId,
        message: chat,
        createdAt: productInfo.createdAt,
      }),
    });
    setChatText('');
  };

  const onTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatText(e.currentTarget.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.currentTarget.value.trim() !== '' &&
      e.key === 'Enter' &&
      !e.shiftKey &&
      e.nativeEvent.isComposing === false
    ) {
      e.preventDefault();
      publish(chatText);
    }
  };

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect]);
  return (
    <>
      {productInfo && (
        <>
          <TopNavBar page={productInfo.name} />
          <S.Container>
            <S.Div>
              <S.ProductImage src={productInfo?.thumbnailURL}></S.ProductImage>
              <S.Texts>
                <S.ProductName>{productInfo.name}</S.ProductName>
                <S.RowDiv>
                  <S.Writer>{productInfo.title}</S.Writer>
                  <S.DayText>{formatDateToNow(productInfo.createdAt as string)}</S.DayText>
                </S.RowDiv>
                <S.Price>{productInfo.price}원</S.Price>
              </S.Texts>
            </S.Div>
          </S.Container>
          <S.Time>{moment().format('YYYY년 MM월 DD일')}</S.Time>

          {/* <S.ChatContent /> */}
          <ChatContainer chatInfoList={chatInfoList} setChatInfoList={setChatList} />
          <S.ChatDiv>
            <S.Input
              type="text"
              placeholder="메시지 보내기"
              onChange={onTyping}
              onKeyDown={onKeyDown}
              value={chatText}
            />
            <S.Button onClick={() => publish(chatText)} />
          </S.ChatDiv>
          <NavBar />
        </>
      )}
    </>
  );
};
export default Chat;
