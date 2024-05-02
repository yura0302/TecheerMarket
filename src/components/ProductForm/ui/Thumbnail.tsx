import { useProductContext } from '../index';
import * as S from '../styles';

const Thumbnail = () => {
  const { items } = useProductContext();
  return <S.ImageDiv style={{ backgroundImage: `url(${items.thumbnailURL})` }} />;
};

export default Thumbnail;
