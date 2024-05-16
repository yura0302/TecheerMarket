import { useParams } from 'react-router-dom';
import Chat from '@/components/Chat';

const ChattingPage = () => {
  const { chatRoomId } = useParams();

  return <Chat chatId={chatRoomId} />;
};

export default ChattingPage;
