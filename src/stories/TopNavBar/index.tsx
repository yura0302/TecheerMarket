import * as S from '@/components/TopNavBar/styles';
import { SlArrowLeft } from 'react-icons/sl';

interface TopNavBarProps {
  page: string;
  onNavBack?: () => void;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ page, onNavBack }: TopNavBarProps) => {
  return (
    <S.BarContainer>
      <S.ClickArea onClick={onNavBack} data-testid="back-button">
        <SlArrowLeft style={{ width: '25px', height: '25px' }} />
      </S.ClickArea>
      <S.NavText>{page}</S.NavText>
    </S.BarContainer>
  );
};

export default TopNavBar;
