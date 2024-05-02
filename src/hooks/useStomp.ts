import { useCallback } from 'react';
import { Client, messageCallbackType } from '@stomp/stompjs';

const useStomp = (
  client: React.MutableRefObject<Client | undefined>,
  destination: string,
  callback: messageCallbackType,
) => {
  const connect = useCallback(() => {
    client.current = new Client({
      brokerURL: 'ws://techeermarket.ap-northeast-2.elasticbeanstalk.com/ws-stomp',
      connectHeaders: {
        Authorization: localStorage.getItem('token') || '',
      },
      reconnectDelay: 200000,
      heartbeatIncoming: 16000,
      heartbeatOutgoing: 16000,
      onConnect: () => {
        client.current?.subscribe(destination, callback);
      },
    });

    client.current?.activate();
  }, [callback, client, destination]);

  const disconnect = useCallback(() => {
    client.current?.deactivate();
  }, [client]);

  return [connect, disconnect];
};

export default useStomp;
