import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 10rem;
  border-radius: 10px;
  background-color: rgba(217, 217, 217, 0.15);
  margin-bottom: 1rem;
  align-items: center;
`;
export const Div = styled.div`
  display: flex;
  flex-direction: row;
`;
export const ProductImage = styled.img`
  width: 8rem;
  height: 8rem;
  background-repeat: no-repeat;
  border-radius: 10px;
  margin-top: 10px;
  margin-left: 15px;
  background-size: object-fit;
`;
export const Texts = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-top: 10px;
`;
export const ProductName = styled.div`
  width: 27rem;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
`;
export const Writer = styled.div``;
export const DayText = styled.div`
  margin-left: 5px;
`;
export const Price = styled.div`
  margin-top: 30px;
  font-size: 10px;
  font-weight: 700;
`;
export const ChatDiv = styled.div`
  position: absolute;
  bottom: 10.2%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const Input = styled.input`
  border-radius: 10px;
  width: 46.5rem;
  height: 3rem;
  margin-right: 10px;
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  background-color: #ececec;
  border: none;
  color: rgba(0, 0, 0, 0.7);
  padding-left: 10px;
`;
export const Button = styled.button`
  margin: 0 auto;
  width: 25px;
  height: 25px;
  background-color: orange;
`;
export const ChatContent = styled.div`
  width: 100%;
  height: 60rem;
`;
