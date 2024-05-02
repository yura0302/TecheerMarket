import useProductForm from '@/hooks/useProductForm';
import { useProductContext } from '../ProductForm';
import * as S from './styles';

const DropDown = () => {
  const { items, state } = useProductContext();
  const { handleChangeState, handleUpgrade, handleDelete } = useProductForm({ state });

  return (
    <S.Dropdown>
      <S.DropdownItem
        onClick={(event) => {
          event.stopPropagation(); // 이벤트 버블링 방지
          handleChangeState(items);
        }}
      >
        {state !== 'SOLD' ? '거래 완료로 변경' : '판매 중으로 변경'}
      </S.DropdownItem>

      <S.DropdownItem
        onClick={(event) => {
          event.stopPropagation();
          handleUpgrade(items.productId);
        }}
      >
        게시글 수정
      </S.DropdownItem>

      <S.DropdownItem
        onClick={(event) => {
          event.stopPropagation();
          handleDelete(items.productId);
        }}
      >
        삭제
      </S.DropdownItem>
    </S.Dropdown>
  );
};

export default DropDown;
