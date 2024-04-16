import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Stomp from '@stomp/stompjs';
import * as S from './styles';
import TopNavBar from '../TopNavBar';
import NavBar from '../BottomNavBar';
import ChatContainer from '../ChatContainer';
import moment from 'moment';
import 'moment/locale/ko';
import { formatDateToNow } from '@/utils/formatDateToNow';
interface ChatProps {
  chatRoomId: number;
  productInfo: ChatData;
}

export interface ChatContent {
  type: string;
  chatRoomId: number;
  data: ChatData;
}
export interface ChatData {
  chatRoomId: number;
  senderEmail: string;
  message?: string;
  createdAt: string;
  name: string;
  price: number;
  productId: number;
  thumbnailURL: string;
  title: string;
  userId: number;
}

export interface ChatResponse {
  content: ChatContent[];
  hasNext: boolean;
  hasPrev: boolean;
  next: number;
  prev: number;
}

const Chat = ({ chatRoomId, productInfo }: ChatProps) => {
  const [chatList, setChatList] = useState<ChatContent[]>([]);
  const [chatText, setChatText] = useState('');
  const client = useRef<Stomp.Client>();

  const subscribe = useCallback(() => {
    client.current?.subscribe(`/sub/chat/room/${chatRoomId}`, (body) => {
      const json_body = JSON.parse(body.body);
      setChatList((_chat_list: ChatContent[]) => [..._chat_list, json_body]);
    });
  }, []);

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
    if (!client.current?.connected) return;
    if (chat.trim() === '') return;
    client.current?.publish({
      destination: '/pub/api/chat/sendMessage',
      body: JSON.stringify({
        chatRoomId: productInfo.chatRoomId,
        senderEmail: productInfo.senderEmail,
        message: chat,
        createdAt: productInfo.createdAt,
        name: productInfo.name,
        price: productInfo.price,
        productId: productInfo.productId,
        thumbnailURL: productInfo.thumbnailURL,
        title: productInfo.title,
      }),
    });
    setChatText('');
  };

  const onTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatText(e.currentTarget.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && e.nativeEvent.isComposing === false) {
      e.preventDefault();
      publish(chatText);
    }
  };

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
              <S.ProductImage src={productInfo.thumbnailURL}></S.ProductImage>
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
          <S.ChatContent />
          <ChatContainer chatList={chatList} setChatList={setChatList} />
          <S.ChatDiv>
            <S.Input
              type="text"
              placeholder="메시지 보내기"
              onKeyDown={onKeyDown}
              onChange={onTyping}
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
