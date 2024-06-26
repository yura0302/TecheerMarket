import * as S from '@/pages/ChatList/style';
import TopNavBar from '@/components/TopNavBar';
import ChatForm from '@/components/ChatForm';
import Loading from '@/components/Loading';
import useFetchProductList from '@/hooks/useFetchProductList';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { restFetcher } from '@/queryClient';
import { useEffect } from 'react';

export default function ChatList() {
  restFetcher({
    method: 'GET',
    path: '/chat/room',
  });
  const path = '/chat/room',
    queryKey = 'chat_room';
  const { data, isLoading, fetchNextPage } = useFetchProductList({ path, queryKey });
  useInfiniteScroll({ fetchCallback: fetchNextPage });

  useEffect(() => {
    fetchNextPage();
  });
  return (
    <>
      <TopNavBar page="채팅 목록" />

      <S.ProductContainer>
        {isLoading ? (
          <Loading />
        ) : data && data?.pages.flatMap((page) => page.data).length > 0 ? (
          <ChatForm items={data?.pages.flatMap((page) => page.data)} />
        ) : (
          <S.EmptyList>채팅 목록이 없습니다.</S.EmptyList>
        )}
      </S.ProductContainer>
    </>
  );
}
