import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Product } from '@/types/product';
import { getClient, restFetcher } from '@/queryClient';
import { useMutation } from '@tanstack/react-query';
import { ProductProps } from '@/components/ProductForm';
import { AxiosError } from 'axios';
import { ApiResponseType } from '@/types/apiResponseType';

type ProductFormProps = Pick<ProductProps, 'state'>;

const useProductForm = ({ state }: ProductFormProps) => {
  const navigate = useNavigate();
  const queryClient = getClient();
  const [dropDown, setDropDown] = useState<number>(0);

  const mutateChangeProductState = useMutation(
    (product: Product) => {
      let body = state === 'SOLD' ? { state: 'SALE' } : { state: 'SOLD', buyerEmail: null };
      return restFetcher({
        method: 'PUT',
        path: `/products/state/${product.productId}`,
        body: body,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['saleslist']);
      },
      onError: (error) => {
        let err = error as AxiosError<ApiResponseType>;
        let message =
          err.response?.data.errorMessage || '상품 상태 변경에 실패했습니다. 다시 시도해주세요.';
        alert(message);
      },
    },
  );

  const handleChangeState = async (product: Product) => {
    await mutateChangeProductState.mutateAsync(product);
  };

  const handleUpgrade = (productId: number) => {
    navigate(`/item/update/${productId}`);
  };

  const mutateDeleteProduct = useMutation(
    (productId: number) =>
      restFetcher({
        method: 'DELETE',
        path: `/products/${productId}`,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['saleslist']);
      },
      onError: (error) => {
        let err = error as AxiosError<ApiResponseType>;
        let message =
          err.response?.data.errorMessage || '상품 삭제에 실패했습니다. 다시 시도해주세요.';
        alert(message);
      },
    },
  );

  const handleDelete = async (productId: number) => {
    await mutateDeleteProduct.mutateAsync(productId);
  };

  const handleChangeDropDown = (productId: number) => {
    setDropDown(dropDown === productId ? 0 : productId);
  };

  return {
    dropDown,
    handleChangeState,
    handleUpgrade,
    handleDelete,
    handleChangeDropDown,
  };
};

export default useProductForm;
