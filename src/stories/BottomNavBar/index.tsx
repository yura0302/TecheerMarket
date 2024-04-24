import * as S from '@/components/BottomNavBar/styles';
import homeImage from '../../assets/Home.svg';
import heartImage from '../../assets/Heart.svg';
import chatImage from '../../assets/Chat.svg';
import mypageImage from '../../assets/mypage.svg';

interface BottomNavBarProps {
  onNavClick: (nav: string) => void;
}

const BottomNavBar = ({ onNavClick }: BottomNavBarProps) => {
  return (
    <S.NavbarContainer>
      <div onClick={() => onNavClick('홈')} data-testid="home-button">
        <S.Button>
          <S.LogoImage src={homeImage} alt="로고 이미지" />홈
        </S.Button>
      </div>

      <div onClick={() => onNavClick('좋아요')} data-testid="like-button">
        <S.Button>
          <S.LogoImage src={heartImage} alt="로고 이미지" />
          좋아요
        </S.Button>
      </div>

      <div onClick={() => onNavClick('채팅')} data-testid="chat-button">
        <S.Button>
          <S.LogoImage src={chatImage} alt="로고 이미지" />
          채팅
        </S.Button>
      </div>

      <div onClick={() => onNavClick('마이페이지')} data-testid="mypage-button">
        <S.Button>
          <S.LogoImage src={mypageImage} alt="로고 이미지" />
          마이페이지
        </S.Button>
      </div>
    </S.NavbarContainer>
  );
};

export default BottomNavBar;
