import styled from 'styled-components';

export const Writepost = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'LINESeedKRBd';
  font-style: normal;
  font-weight: 700;
  justify-content: space-around;
  margin: 0 auto;
  width: 50rem;

  .navContainer {
    display: flex;
  }
`;

export const Nav = styled.div`
  padding-top: 2px;
  display: flex;
  align-items: center;
  img {
    width: 20%;
    margin-left: 5%;
  }
  #category {
    margin-left: -200%;
    width: 100%; /* 이미지의 너비를 설정하세요 */
    height: 100%; /* 이미지의 높이를 설정하세요 */
  }
  #search {
    margin-left: -120%;
    width: 100%; /* 이미지의 너비를 설정하세요 */
    height: 100%; /* 이미지의 높이를 설정하세요 */
  }
`;
export const Wrap = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 드래그 바의 진행 상태 스타일
export const ImagesContainer = styled.div`
  display: flex;
  overflow-x: auto; /* 가로 스크롤을 가능하게 함 */
  gap: 10px; /* 이미지 간의 간격을 조절 */
  padding: 10px; /* 좌우 여백 추가 */

  .upload-label {
    position: relative;
    display: inline-block;
  }

  .image-count {
    position: absolute;
    bottom: 21px;
    right: 47.5px;
    color: black;
    padding: 2px 5px;
    font-size: 16px;
    font-weight: lighter;
  }
`;

export const Img = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-bottom: 2rem;
  margin-left: 3rem;
  width: 50rem;
  gap: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 2rem;
  padding-bottom: 2rem;
  width: 50rem;

  gap: 1rem;
`;
export const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50rem;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 2rem;
  line-height: 2.4rem;
  color: #000000;
  width: 50rem;
  margin-left: 2rem;
  margin-top: 1rem;
`;
export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  line-height: 3rem;
  background: #ffffff;
  border-radius: 4rem;
  border: 1px solid #b8b8b8;
  cursor: pointer;
  font-size: 1.2rem;
  margin-top: 1rem;
  margin-right: 1rem;

  &:hover {
    background: #ff985d;
    color: #ffffff;
  }
  &:disabled {
    background: #ffcec4;
    border-color: #ffcec4;
    cursor: not-allowed;
  }
`;
export const Input = styled.input`
  display: flex;
  width: 95%;
  height: 43px;
  flex-shrink: 0;
  color: ${(props) => (props.disabled ? '#c9c9c9' : '#000')};
  background: ${(props) => (props.disabled ? '#e4e4e4' : '#fff')};
  border-radius: 10px;
  border: 1px solid #828385;
  font-size: 1.5rem;
  padding-left: 1rem;
  margin-top: 1rem;
  padding: 2rem;

  outline: none;
  &:focus {
    border-color: orange;
  }
`;
export const Select = styled.select`
  display: flex;
  width: 95%;
  height: 43px;
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #828385;
  font-size: 1.5rem;
  padding-left: 1rem;
  margin-top: 1rem;
  &:focus {
    outline: none;
    border: 0.1rem solid black;
  }
`;
export const Option = styled.option`
  color: #a5a5a5;
  font-size: 1.5rem;
`;

export const UploadedImg = styled.img`
  width: 166px;
  height: 166px;
  border-radius: 10.5px;
`;
export const DeleteButton = styled.button`
  position: absolute;
  top: 0rem;
  right: 0rem;
  border: none;
  background: #000000;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TextArea = styled.textarea`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 20rem;
  left: 29.3rem;
  top: 73.7rem;
  background: #ffffff;
  border-radius: 10px;
  margin-top: 1rem;
  margin-bottom: 1.7rem;
  border: 1px solid #828385;
  font-size: 2rem;
  padding: 2rem 0 0 2rem;
  outline: none;
  &:focus {
    border-color: orange;
  }
`;

export const UploadButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 48rem;
  height: 4.2rem;
  left: 29.27rem;
  top: 160rem;
  color: #ffffff;
  background: #fd8944;
  border-radius: 10px;
  margin-bottom: 1.25rem;
  border: none;
  cursor: pointer;
  font-size: 2.5rem;
  line-height: 4.1rem;
  margin-top: 5rem;
`;
export const ReturnButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 92.47rem;
  height: 4.2rem;
  left: 29.27rem;
  top: 167.6rem;
  background: #efefef;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 2.5rem;
  line-height: 4.1rem;
`;
export const Map = styled.div`
  width: 95%;
`;
export const OptionButton = styled.button<{
  buttonType: string;
  isSelected: boolean;
}>`
  background-color: ${({ isSelected }) => (isSelected ? '#000000' : '#EFEFEF')};
  color: ${({ isSelected }) => (isSelected ? '#FFFFFF' : '#000000')};
  border-radius: 1.05rem;
  border: none;
  cursor: pointer;
  margin-right: 1.5%;
  height: 2.4rem;
  font-size: 1.5rem;
`;
