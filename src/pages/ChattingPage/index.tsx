import { useLocation } from 'react-router-dom';
import Chat from '@/components/Chat';

// interface UserInfo {
//   chatRoomId: number;
//   senderEmail: string;
//   createdAt: string;
// }

const ChattingPage = () => {
  const location = useLocation();
  const chatData = location.state;

  return <Chat chatRoomId={chatData.chatRoomId} productInfo={chatData.productInfo} />;

  // const userInfo = async () => {
  //   try {
  //     const response = await axios.get<UserInfo>('/users');
  //     return response.data.chatRoomId;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const { data, isFetching, isLoading } = useQuery('userInfo', userInfo);
  // if (!isFetching && !data) {
  //   return <Navigate to="/login" />;
  // }
  // if (isLoading) return <Loading />;
  // console.log(state.chatRoomId);
};
export default ChattingPage;
