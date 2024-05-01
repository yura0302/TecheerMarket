import { Product, StateType } from '@/types/product';
import * as S from './styles';
import { ReactNode, createContext, useContext } from 'react';
import Layout from './ui/Layout';
import Thumbnail from './ui/Thumbnail';
import TextInfo from './ui/TextInfo';
import IconLayout from './ui/IconLayout';

export interface ProductProps {
  items: Product;
  state?: StateType;
}

interface ProductFormProps extends ProductProps {
  children: ReactNode;
}

const productContext = createContext<ProductProps | null>(null);

const ProductFormProvider = ({ children, items, state }: ProductFormProps) => {
  return (
    <productContext.Provider value={{ items, state }}>
      <S.Div>{children}</S.Div>
    </productContext.Provider>
  );
};

ProductFormProvider.Layout = Layout;
ProductFormProvider.Thumbnail = Thumbnail;
ProductFormProvider.TextInfo = TextInfo;
ProductFormProvider.IconLayout = IconLayout;

export default ProductFormProvider;

export const useProductContext = () => useContext(productContext) as ProductProps;
