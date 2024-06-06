import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import profile from '@/assets/profile.svg';
import { MYPAGE_ITEMS } from '@/constants/mypageItem';
import TopNavBar from '@/components/TopNavBar';
import { restFetcher } from '@/queryClient';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UserInfo } from '@/types/userInfo';

const MyPage: React.FC = () => {
  const navigate = useNavigate();

  const { data: userInfo } = useQuery<UserInfo, AxiosError>(
    ['userInfo'],
    async () => {
      const response = await restFetcher({
        method: 'GET',
        path: '/users',
      });
      return response.data;
    },
    {
      onError: (error) => {
        console.error(error);
      },
      // 자동 리프레시 비활성화
      refetchOnWindowFocus: false,
    },
  );

  return (
    <>
      <TopNavBar page="마이페이지" />

      <S.Div>
        <S.MyPageContainer>
          <S.ChangImg src={profile} alt="Profile" />
          <S.Name>{userInfo?.name}</S.Name>
        </S.MyPageContainer>

        <S.Title>나의 거래</S.Title>

        {MYPAGE_ITEMS.map((item, index) => (
          <S.ItemBox key={index}>
            <S.ClickArea onClick={() => navigate(item.path)}>
              <img src={item.imgSrc} alt={item.altText} />
              <S.Item>{item.label}</S.Item>
            </S.ClickArea>
          </S.ItemBox>
        ))}

        <S.ButtonWrapper>
          <S.NavBtn onClick={() => navigate('/edit_info')}>계정 / 정보 관리</S.NavBtn>

          <S.FormBtn href="https://docs.google.com/forms/d/e/1FAIpQLScBTFRrxNFv69iL--I2rpCg8lb7n6VCRw42QIUOr2tLVHEgfQ/viewform">
            마음의 소리함 📮
          </S.FormBtn>
        </S.ButtonWrapper>
      </S.Div>
    </>
  );
};

export default MyPage;
