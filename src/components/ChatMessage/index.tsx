import * as S from '@/components/ChatMessage/styles';
import { ChatInfoData } from '../Chat';
import moment from 'moment';

interface IChatMessage {
  message: ChatInfoData;
}

const ChatMessage = ({ message }: IChatMessage) => {
  return (
    <S.Container>
      <S.CreatedTime>{moment(message.createdAt).format('HH:mm')}</S.CreatedTime>
      <S.MyMessage>{message.message}</S.MyMessage>
    </S.Container>
  );
};

export default ChatMessage;
