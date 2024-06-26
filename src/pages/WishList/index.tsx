import React from 'react';
import ProductForm from '@/components/ProductForm/ProductForm';
import TopNavBar from '@/components/TopNavBar';
import * as S from './styles';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import Loading from '@/components/Loading';
import useFetchProductList from '@/hooks/useFetchProductList';

const WishList: React.FC = () => {
  const path = '/mypage/like',
    queryKey = 'wishlist';
  const { data, isLoading, hasNextPage, fetchNextPage } = useFetchProductList({ path, queryKey });

  useInfiniteScroll({ fetchCallback: fetchNextPage });

  return (
    <>
      <TopNavBar page="좋아요 목록" />

      <S.ProductContainer>
        {isLoading ? (
          <Loading />
        ) : data && data?.pages.flatMap((page) => page.data).length > 0 ? (
          // <ProductForm items={data?.pages.flatMap((page) => page?.data)} />
          data.pages
            .flatMap((page) => page.data)
            .map((item) => <ProductForm key={item.productId} items={item} />)
        ) : (
          <S.EmptyList>좋아요 목록이 없습니다.</S.EmptyList>
        )}
      </S.ProductContainer>
    </>
  );
};

export default WishList;
