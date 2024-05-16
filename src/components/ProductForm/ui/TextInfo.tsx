import { formatDateToNow } from '@/utils/formatDateToNow';
import { useProductContext } from '../index';
import * as S from '../styles';

const TextInfo = () => {
  const { items } = useProductContext();

  return (
    <S.TextDiv>
      <S.Wrapper>
        <S.TitleDiv>{items.title}</S.TitleDiv>
        <S.InfoDiv>
          <S.InfoContent>{items.name}</S.InfoContent>
          <S.InfoContent>{formatDateToNow(items.createdAt)}</S.InfoContent>
        </S.InfoDiv>
      </S.Wrapper>
      <S.PriceDiv>
        {items.price === 0 ? '무료나눔🧡' : Number(items.price).toLocaleString() + '원'}
      </S.PriceDiv>
    </S.TextDiv>
  );
};

export default TextInfo;
