import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MainDiv = styled.div`
  flex-direction: column;
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  position: relative;
`;

export const NavContainer = styled.div`
  position: fixed;
  width: 50rem;
  height: 8rem;
  background-color: white;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  img {
    width: 20%;
    margin-left: 2%;
  }
`;

export const NavLink = styled.div`
  padding-top: 2px;
  display: flex;
  align-items: center;

  #category {
    margin-left: -160%;
    width: 110%;
    height: 100%;
    &:hover {
      cursor: pointer;
      color: #828385;
    }
  }
  #search {
    margin-left: -90%;
    width: 110%;
    height: 100%;
    &:hover {
      cursor: pointer;
      color: #828385;
    }
  }
`;

export const ClickArea = styled.div`
  display: flex;
  width: 25px;
  height: 25px;
  margin-right: 1rem;
  &:hover {
    cursor: pointer;
    color: #0a57f2;
  }
`;

export const scroll = styled.div`
  overflow-y: scroll;
`;

export const MainContainer = styled.div`
  flex-grow: 3;
  margin: 8rem 0rem;
  /* background-color: red; */
`;

export const Button = styled.button`
  z-index: 1;
  display: flex;
  border: none;
  cursor: pointer;
  position: fixed;
  bottom: 40px;
  right: calc(50vw - 225px);
  margin-bottom: 55px;
  background: no-repeat center center;
  color: #fd8944;
`;

export const ProductContainer = styled.div`
  padding: 1rem 1.6rem 0 1.6rem;
`;

export const EmptyList = styled.div`
  padding-top: 2rem;
  text-align: center;
  color: #828385;
`;
