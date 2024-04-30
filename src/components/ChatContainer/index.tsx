// import React, { useEffect } from 'react';
// import * as S from './styles';
// import moment from 'moment';
// import 'moment/locale/ko';
// import ChatMessage from '../ChatMessage';
// import { restFetcher } from '@/queryClient';
// import { useNavigate } from 'react-router-dom';

// interface IChatContainer {
//   chatInfoList: ChatInfoData[];
//   setChatInfoList: React.Dispatch<React.SetStateAction<ChatInfoData[]>>;
// }
// export interface ChatInfoData {
//   senderId: number;
//   message: string;
//   createdAt: string;
// }

// const ChatContainer = ({ chatInfoList, setChatInfoList }: IChatContainer) => {
//   const formatDate = (date: string) => moment(date).format('YYYY년 MM월 DD일');
//   const navigate = useNavigate();

//   // 날짜를 비교하여 새로운 날짜인지 확인하는 함수
//   const isNewDay = (prevDate: string, currentDate: string) => {
//     return formatDate(prevDate) !== formatDate(currentDate);
//   };

//   const handleChat = async (productId: number) => {
//     try {
//       const response = await restFetcher({
//         method: 'POST',
//         path: `/chat/create/${productId}`,
//       });
//       const { chatRoomId, productInfo, chatInfoList } = response.data;
//       navigate(`/chat/${chatRoomId}`, {
//         state: { chatRoomId, productInfo, chatInfoList },
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <S.Container>
//       {chatInfoList.map((message, index) => {
//         const prevMessage = chatInfoList[index - 1];
//         const showDate = !prevMessage || isNewDay(prevMessage.createdAt, message.createdAt);
//         return (
//           <React.Fragment key={index}>
//             {showDate && (
//               <S.TodayDate style={{ alignSelf: 'center' }}>
//                 {formatDate(message.createdAt)}
//               </S.TodayDate>
//             )}
//             <div style={{ alignSelf: 'flex-end', marginRight: '13px' }}>
//               <ChatMessage message={message} />
//             </div>
//           </React.Fragment>
//         );
//       })}
//     </S.Container>
//   );
// };

// // };
// export default ChatContainer;
// // import React from 'react';
// // import * as S from './styles';
// // import moment from 'moment';
// // import 'moment/locale/ko';
// // import ChatMessage from '../ChatMessage';
// // import ChatOtherMessage from '../ChatOtherMessage';

// // interface IChatContainer {
// //   chatInfoList: ChatInfoData[];
// //   setChatInfoList: React.Dispatch<React.SetStateAction<ChatInfoData[]>>;
// //   userId: number;
// // }

// // interface ChatInfoData {
// //   senderId: number;
// //   message: string;
// //   createdAt: string;
// // }

// // const ChatContainer = ({ chatInfoList, setChatInfoList, userId }: IChatContainer) => {
// //   const formatDate = (date: string) => moment(date).format('YYYY년 MM월 DD일');

// //   const isNewDay = (index: number) => {
// //     if (index === 0) return true;
// //     const previousDate = moment(chatInfoList[index - 1].createdAt).format('YYMMDD');
// //     const currentDate = moment(chatInfoList[index].createdAt).format('YYMMDD');
// //     return previousDate !== currentDate;
// //   };

// //   return (
// //     <S.Container>
// //       {chatInfoList.map((message, index) => {
// //         const isMyMessage = message.senderId !== userId;
// //         const showDate = isNewDay(index);
// //         const alignSelf = isMyMessage ? 'flex-end' : 'flex-start';
// //         const margin = isMyMessage ? 'marginRight' : 'marginLeft';

// //         return (
// //           <React.Fragment key={index}>
// //             {showDate && (
// //               <S.TodayDate style={{ alignSelf: 'center' }}>
// //                 {formatDate(message.createdAt)}
// //               </S.TodayDate>
// //             )}
// //             <div style={{ alignSelf, [margin]: '13px' }}>
// //               {isMyMessage ? (
// //                 <ChatMessage message={message} />
// //               ) : (
// //                 <ChatOtherMessage message={message} />
// //               )}
// //             </div>
// //           </React.Fragment>
// //         );
// //       })}
// //     </S.Container>
// //   );
// // };

// // export default ChatContainer;

// import React, { useEffect, useState } from 'react';
// import * as S from './styles';
// import moment from 'moment';
// import 'moment/locale/ko';
// import ChatMessage from '../ChatMessage';
// import ChatOtherMessage from '../ChatOtherMessage';
// import axios from 'axios';
// import { useInfiniteQuery, useQuery } from 'react-query';
// import { Navigate } from 'react-router-dom';
// import Loading from '../Loading';
// import { IUserInfo, UserInfo } from '@/types/userInfo';

// interface IChatContainer {
//   chatInfoList: ChatInfoData[];
//   setChatInfoList: React.Dispatch<React.SetStateAction<ChatInfoData[]>>;
// }

// interface ChatInfoData {
//   senderId: number;
//   message: string;
//   createdAt: string;
// }
// const BASE_URL = 'http://techeermarket.ap-northeast-2.elasticbeanstalk.com/api';
// const userInfo = async () => {
//   const response = await axios.get<IUserInfo>(`${BASE_URL}/users/id`);
//   return response.data;
// };
// const ChatContainer = ({ chatInfoList, setChatInfoList }: IChatContainer) => {
//   const { data: userData, isFetching, isLoading } = useQuery('userInfo', userInfo);
//   const formatDate = (date: string) => moment(date).format('YYYY년 MM월 DD일');

//   const isNewDay = (index: number) => {
//     if (index === 0) return true;
//     const previousDate = moment(chatInfoList[index - 1].createdAt).format('YYMMDD');
//     const currentDate = moment(chatInfoList[index].createdAt).format('YYMMDD');
//     return previousDate !== currentDate;
//   };
//   return (
//     <S.Container>
//       {chatInfoList.map((message, index) => {
//         const isMyMessage = message.senderId === userData?.userId;
//         const showDate = isNewDay(index);
//         const MessageComponent = isMyMessage ? ChatMessage : ChatOtherMessage; // Choose component based on the sender

//         return (
//           <React.Fragment key={index}>
//             {showDate && (
//               <S.TodayDate style={{ alignSelf: 'center' }}>
//                 {formatDate(message.createdAt)}
//               </S.TodayDate>
//             )}
//             <div
//               style={{
//                 alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
//                 marginRight: isMyMessage ? '13px' : '0',
//                 marginLeft: isMyMessage ? '0' : '13px',
//               }}
//             >
//               <MessageComponent message={message} />
//             </div>
//           </React.Fragment>
//         );
//       })}
//     </S.Container>
//   );
// };

// export default ChatContainer;
import React, { useState, useEffect } from 'react';
import * as S from './styles';
import moment from 'moment';
import 'moment/locale/ko';
import ChatMessage from '../ChatMessage';
import ChatOtherMessage from '../ChatOtherMessage';
import { restFetcher } from '@/queryClient'; // Assuming restFetcher is configured for use
import { ChatInfoData } from '../Chat';

interface IChatContainer {
  senderId: number;
  chatInfoList: ChatInfoData[];
  setChatInfoList: React.Dispatch<React.SetStateAction<ChatInfoData[]>>;
}
const BASE_URL = 'http://techeermarket.ap-northeast-2.elasticbeanstalk.com/api';
const ChatContainer = ({ chatInfoList, setChatInfoList, senderId }: IChatContainer) => {
  const [IsUserId, setIsUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await restFetcher({
          method: 'GET',
          path: `${BASE_URL}/users/id`, // Make sure this path is correct
        });
        setIsUserId(response.data.userId); // Assuming the ID is returned as { data: userId }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user ID:', error);
        setLoading(false);
      }
    };
    fetchUserId();
  }, []);

  const formatDate = (date: string) => moment(date).format('YYYY년 MM월 DD일');

  const isNewDay = (index: number, message: ChatInfoData) => {
    if (index === 0) return true;
    const previousDate = moment(chatInfoList[index - 1].createdAt).format('YYMMDD');
    const currentDate = moment(message.createdAt).format('YYMMDD');
    return previousDate !== currentDate;
  };
  const userIdFromLocalStorage = localStorage.getItem('userId');
  let newUserId: number | null = null;
  if (userIdFromLocalStorage) {
    newUserId = parseInt(userIdFromLocalStorage, 10);
  }

  return (
    <S.Container>
      {chatInfoList.map((message, index) => {
        console.log(message);
        console.log(newUserId);
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
                marginRight: isMyMessage ? '13px' : '0',
                marginLeft: isMyMessage ? '0' : '13px',
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
