import ProductFormProvider, { ProductProps } from './index';

const ProductForm = ({ items, state }: ProductProps) => {
  return (
    <ProductFormProvider items={items} state={state}>
      <ProductFormProvider.Layout>
        <ProductFormProvider.Thumbnail />
        <ProductFormProvider.TextInfo />
        <ProductFormProvider.IconLayout />
      </ProductFormProvider.Layout>
    </ProductFormProvider>
  );
};

export default ProductForm;
