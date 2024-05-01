import styled from 'styled-components';

export const BtnDiv = styled.div`
  padding: 2.8rem 2rem 0;
`;

export const WriteBtn = styled.button`
  width: 106px;
  height: 35px;
  appearance: none;
  border: 0;
  padding: 0;
  background-color: transparent;
  border-radius: 10px;
  background: #fd8944;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  &:hover {
    cursor: pointer;
  }
`;

export const TabWrapper = styled.div`
  padding: 6.2rem 2rem 0;
`;

export const Tabs = styled.ul`
  display: flex;
  list-style: none;
  cursor: pointer;
`;

export const Tab = styled.li<{ isActive: boolean }>`
  flex: 1;
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${(props) => (props.isActive ? '#000' : 'transparent')};
  border-bottom: ${(props) => (props.isActive ? '2px solid #000' : '1.5px solid #D9D9D9')};
  color: ${(props) => (props.isActive ? '#000' : ' #7A7676')};
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  transition: border-bottom 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
  }
`;

export const TabContent = styled.div`
  padding-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const EmptyList = styled.div`
  width: 100%;
  padding-top: 2rem;
  text-align: center;
  color: #828385;
`;
