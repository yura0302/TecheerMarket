import { useProductContext } from '../index';
import * as S from '../styles';
import Heart from '@/assets/grayHeartIcon.svg';
import FilledHeart from '@/assets/likedHeart.svg';
import Chat from '@/assets/chatIcon.svg';
import Circle from '@/assets/circle.svg';
import { useLocation } from 'react-router-dom';
import useProductForm from '@/hooks/useProductForm';
import DropDown from '@/components/DropDown';

const IconLayout = () => {
  const { items, state } = useProductContext();
  const { dropDown, handleChangeDropDown } = useProductForm({});
  const location = useLocation();

  const isWishPage = location.pathname === '/wishlist';
  const isSalesPage = location.pathname === '/saleslist';

  return (
    <S.Section>
      <S.Part>
        <S.Image style={{ backgroundImage: `url(${isWishPage ? FilledHeart : Heart})` }} />
        <S.Value>{items.likes}</S.Value>
      </S.Part>

      <S.Part>
        <S.Image style={{ backgroundImage: `url(${Chat})` }} />
        <S.Value>{items.views}</S.Value>
      </S.Part>

      {isSalesPage && (
        <S.MenuBar
          onClick={(event) => {
            event.stopPropagation(); // 이벤트 버블링 방지
            handleChangeDropDown(items.productId);
          }}
        >
          <S.Image style={{ backgroundImage: `url(${Circle})` }} />
        </S.MenuBar>
      )}

      {dropDown === items.productId && <DropDown state={state} />}
    </S.Section>
  );
};

export default IconLayout;
