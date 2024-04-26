// // import React from 'react';
// // import { useLocation } from 'react-router-dom';
// // import Chat from '@/components/Chat';

// // const ChattingPage = () => {
// //   const location = useLocation();
// //   const { productInfo, chatRoomId, chatInfoList, message } = location.state;
// //   return <Chat chatRoomId={chatRoomId} productInfo={productInfo} chatInfoList={chatInfoList} />;
// // };

// // export default ChattingPage;
// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import Chat from '@/components/Chat';

// const ChattingPage = () => {
//   const location = useLocation();
//   const { productInfo, chatRoomId, chatInfoList } = location.state;

//   // chatInfoList 상태를 여기에서 관리합니다.
//   const [chatList, setChatList] = useState(chatInfoList);

//   // Chat 컴포넌트에 chatList와 setChatList를 전달합니다.
//   return <Chat chatRoomId={chatRoomId} productInfo={productInfo} chatInfoList={chatList} />;
// };

// export default ChattingPage;
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Chat from '@/components/Chat';

const ChattingPage = () => {
  const location = useLocation();
  const { productInfo, chatRoomId, chatInfoList } = location.state;

  // chatInfoList 상태를 여기에서 관리합니다.
  const [chatList, setChatList] = useState(chatInfoList);

  // Chat 컴포넌트에 chatList와 setChatList를 전달합니다.
  return <Chat chatRoomId={chatRoomId} productInfo={productInfo} chatInfoList={chatList} />;
};

export default ChattingPage;
