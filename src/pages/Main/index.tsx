import NavBar from '@/components/BottomNavBar';
import React from 'react';
import ProductForm from '@/components/ProductForm/ProductForm';
import Loading from '@/components/Loading';
import * as S from './styles';
import logo from '../../assets/logo.svg';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { Link } from 'react-router-dom';
import useFetchProductList from '@/hooks/useFetchProductList';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoSearchOutline } from 'react-icons/io5';
import { FaCirclePlus } from 'react-icons/fa6';

const index: React.FC = () => {
  const path = '/products/list',
    queryKey = 'main';
  const { data, isLoading, hasNextPage, fetchNextPage } = useFetchProductList({ path, queryKey });

  useInfiniteScroll({ fetchCallback: fetchNextPage });

  return (
    <S.MainDiv>
      <S.NavContainer className="Nav">
        <S.Nav>
          <img id="main_logo" alt="To Main" loading="lazy" src={logo} />
          <S.NavLink>
            <S.ClickArea>
              <Link to="/category">
                <RxHamburgerMenu style={{ width: '25px', height: '25px', color: '#fd8944' }} />
                {/* <img id="category" alt="To category" src={categoryBar}></img> */}
              </Link>
            </S.ClickArea>
            <S.ClickArea>
              <Link to="/search">
                <IoSearchOutline style={{ width: '25px', height: '25px', color: '#fd8944' }} />
                {/* <img id="search" alt="To search" src={searchBtn}></img> */}
              </Link>
            </S.ClickArea>
          </S.NavLink>
        </S.Nav>
      </S.NavContainer>

      <S.MainContainer className="list">
        <S.scroll className="scroll">
          <S.ProductContainer>
            {isLoading ? (
              <Loading />
            ) : data && data?.pages.flatMap((page) => page.data).length > 0 ? (
              data.pages
                .flatMap((page) => page.data)
                .map((item) => <ProductForm key={item.productId} items={item} />)
            ) : (
              <S.EmptyList>상품 목록이 없습니다.</S.EmptyList>
            )}
          </S.ProductContainer>
        </S.scroll>
      </S.MainContainer>

      <Link to="/write">
        <S.Button>
          <FaCirclePlus size={55} />
        </S.Button>
      </Link>
      <NavBar />
    </S.MainDiv>
  );
};

export default index;
