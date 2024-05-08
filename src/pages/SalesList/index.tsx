import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import TopNavBar from '@/components/TopNavBar';
import ProductForm from '@/components/ProductForm/ProductForm';
import { Product } from '@/types/product';
import { restFetcher } from '@/queryClient';
import Loading from '@/components/Loading';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface ApiResponse {
  판매중: Product[];
  거래완료: Product[];
}

const SalesList: React.FC = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  const fetchSalesList = async () => {
    try {
      const response = await restFetcher({
        method: 'GET',
        path: `/mypage/sell/${userId}`,
      });
      return response.data;
    } catch (error) {
      return [];
    }
  };

  const { data, isLoading } = useQuery<ApiResponse, AxiosError>(['saleslist'], () =>
    fetchSalesList(),
  );

  const onSaleItems = data?.판매중 || [];
  const completedItems = data?.거래완료 || [];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <TopNavBar page="나의 판매 내역" />
      {/* <S.BtnDiv> */}
      {/* <S.WriteBtn
          onClick={() => {
            navigate('/write');
          }}
        >
          글쓰기
        </S.WriteBtn> */}
      {/* </S.BtnDiv> */}

      <S.TabWrapper>
        <S.Tabs>
          <S.Tab isActive={activeIndex === 0} onClick={() => handleTabClick(0)}>
            판매 중
          </S.Tab>
          <S.Tab isActive={activeIndex === 1} onClick={() => handleTabClick(1)}>
            거래 완료
          </S.Tab>
        </S.Tabs>

        <S.TabContent>
          {activeIndex === 0 ? (
            onSaleItems && onSaleItems.length > 0 ? (
              onSaleItems.map((item) => <ProductForm items={item} state="SALE" />)
            ) : (
              <S.EmptyList>판매 중인 게시글이 없습니다.</S.EmptyList>
            )
          ) : completedItems && completedItems.length > 0 ? (
            completedItems.map((item) => <ProductForm items={item} state="SOLD" />)
          ) : (
            <S.EmptyList>거래 완료된 게시글이 없습니다.</S.EmptyList>
          )}
        </S.TabContent>
      </S.TabWrapper>
    </>
  );
};

export default SalesList;
