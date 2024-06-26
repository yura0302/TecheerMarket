import styled from 'styled-components';

export const Div = styled.div`
  width: 100%;
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 12rem;
  border-radius: 10px;
  background-color: rgba(217, 217, 217, 0.15);
  margin-bottom: 1.6rem;
  &:hover {
    cursor: pointer;
  }
`;

export const ProductContent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 1rem;
`;

export const ImageDiv = styled.img`
  width: 9rem;
  height: 9rem;
  border-radius: 1rem;
  object-fit: cover;
  aspect-ratio: 1 / 1;
`;

export const TextDiv = styled.div`
  height: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 2rem;
  font-style: normal;
`;

export const TitleDiv = styled.h3`
  width: 27rem;
  font-size: 13px;
  font-weight: 700;
  // 제목 넘칠 경우 ... 표시
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Wrapper = styled.div``;

export const InfoDiv = styled.p`
  font-size: 10px;
  font-weight: 400;
`;

export const InfoContent = styled.span`
  padding-right: 8px;
  font-size: 10px;
  font-weight: 400;
`;

export const PriceDiv = styled.p`
  font-size: 10px;
  font-weight: 700;
`;

export const Section = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 1.6rem;
  display: flex;
  align-items: center;
`;
export const Part = styled.div`
  display: flex;
  align-items: center;
  padding-right: 15px;
`;

export const Image = styled.svg`
  width: 2rem;
  height: 2rem;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: contain;
  transition: transform 0.3s ease-out;
  cursor: pointer;
  &:active {
    transform: scale(1.2);
  }
`;

export const Value = styled.span`
  padding-left: 3px;
  color: #7e7e7e;
  font-size: 10px;
  font-weight: 400;
`;

export const MenuBar = styled.div`
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
