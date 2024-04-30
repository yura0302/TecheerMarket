import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Chat from '@/components/Chat';

const ChattingPage = () => {
  const location = useLocation();
  const { productInfo, chatRoomId, chatInfoList, userId } = location.state;

  const [chatList, setChatList] = useState(chatInfoList);

  return <Chat chatRoomId={chatRoomId} productInfo={productInfo} chatInfoList={chatList} />;
};

export default ChattingPage;
