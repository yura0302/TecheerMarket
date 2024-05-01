import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../index';
import * as S from '../styles';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const { items } = useProductContext();

  return (
    <S.Container onClick={() => navigate(`/item/${items.productId}`)}>
      <S.ProductContent>{children}</S.ProductContent>
    </S.Container>
  );
};

export default Layout;
