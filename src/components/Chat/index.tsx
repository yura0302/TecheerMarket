import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Stomp from '@stomp/stompjs';
import * as S from './styles';
import TopNavBar from '../TopNavBar';
import NavBar from '../BottomNavBar';
import 'moment/locale/ko';
import { formatDateToNow } from '@/utils/formatDateToNow';
import ChatContainer from '../ChatContainer';
import ChatBtn from '@/assets/ChatBtn.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { restFetcher } from '@/queryClient';

interface ChatProps {
  chatId: string | undefined;
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

const Chat: React.FC<ChatProps> = ({ chatId }) => {
  const { chatRoomId } = useParams();
  const [chatList, setChatList] = useState<ChatInfoData[]>([]);
  const [productInfo, setProductInfo] = useState<ChatData | null>(null);
  const [chatText, setChatText] = useState('');
  const client = useRef<Stomp.Client>();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const fetchInitialData = async () => {
    try {
      const res = await restFetcher({
        method: 'GET',
        path: `/chat/${chatRoomId}`,
      });
      setChatList(res.data.chatInfoList);
      setProductInfo(res.data.productInfo);
    } catch (err) {
      console.error('Failed to fetch chat data:', err);
    }
  };

  const subscribe = useCallback(() => {
    client.current?.subscribe(`/sub/chat/room/${chatRoomId}`, (body) => {
      const json_body = JSON.parse(body.body);
      setChatList((prevChatList) => [...prevChatList, json_body]);
    });
  }, [chatRoomId]);

  const connect = useCallback(() => {
    client.current = new Stomp.Client({
      brokerURL: 'wss://eb.techeermarket.store/ws-stomp',
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
        senderId: localStorage.getItem('userId'),
        message: chat,
        createdAt: new Date().toISOString(), // productInfo.createdAt 대신 현재 시간을 사용
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
    fetchInitialData();
    connect();
    return () => disconnect();
  }, [chatRoomId, connect]);

  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  return (
    <>
      {productInfo && (
        <>
          <TopNavBar page={productInfo.name} />
          <S.Container onClick={() => navigate(`/item/${productInfo.productId}`)}>
            <S.Div>
              <S.ProductImage src={productInfo?.thumbnailURL}></S.ProductImage>
              <S.Texts>
                <S.ProductName>{productInfo.name}</S.ProductName>
                <S.RowDiv>
                  <S.Writer>{productInfo.title}</S.Writer>
                  <S.DayText>{formatDateToNow(productInfo.createdAt)}</S.DayText>
                </S.RowDiv>
                <S.Price>{productInfo.price}원</S.Price>
              </S.Texts>
            </S.Div>
          </S.Container>

          <ChatContainer
            chatList={chatList}
            setChatList={setChatList}
            chatContainerRef={chatContainerRef}
          />
          <S.BottomContainer>
            <S.ChatDiv>
              <S.Input
                type="text"
                placeholder="메시지 보내기"
                onChange={onTyping}
                onKeyDown={onKeyDown}
                value={chatText}
              />
              <S.Button src={ChatBtn} onClick={() => publish(chatText)} />
            </S.ChatDiv>
            <NavBar />
          </S.BottomContainer>
        </>
      )}
    </>
  );
};

export default Chat;
