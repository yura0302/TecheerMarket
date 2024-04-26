import React from 'react';
import { ChatInfoData } from '../Chat';
import * as S from '@/components/ChatOtherMessage/styles';
import moment from 'moment';

interface IChatMessage {
  message: ChatInfoData;
}

const ChatOtherMessage = ({ message }: IChatMessage) => {
  return (
    <S.Container>
      <S.CreatedTime>{moment(message.createdAt).format('HH:mm')}</S.CreatedTime>
      <S.OtherMessage>{message.message}</S.OtherMessage>
    </S.Container>
  );
};

export default ChatOtherMessage;
