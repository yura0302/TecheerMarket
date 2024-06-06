import { useProductContext } from '../index';
import * as S from '../styles';

const Thumbnail = () => {
  const { items } = useProductContext();
  return <S.ImageDiv alt={items.title} src={items.thumbnailURL} />;
};

export default Thumbnail;
