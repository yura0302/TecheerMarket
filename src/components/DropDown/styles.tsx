import styled from 'styled-components';

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 10rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #fff;
  z-index: 10;
`;

export const DropdownItem = styled.span`
  width: 100%;
  padding: 1rem 1rem;
  font-size: 10px;
  font-weight: 400;

  &:hover {
    cursor: pointer;
    background-color: rgba(217, 217, 217, 0.15);
  }
`;
