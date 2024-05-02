import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const MyMessage = styled.div`
  position: relative;
  min-height: 15px;
  min-width: 30px;
  max-width: 680px;
  background-color: #fd8944;
  color: black;
  font-weight: bold;
  display: flex;
  justify-content: left;
  align-items: center;
  border-radius: 10px;
  font-size: 14px;
  margin: 0 auto;
  margin-bottom: 5px;
  padding: 10px 10px;
  white-space: pre-wrap;
  word-break: break-all;
  &::before {
    content: '';
    position: absolute;
    border-color: transparent ${(props) => props.theme.mainColor};
    display: block;
    width: 0;
    z-index: 0;
    right: -10px;
    top: 9px;
  }

  &::after {
    content: '';
    position: absolute;
    border-color: transparent #fd8944;
    display: block;
    width: 0;
    z-index: 1;
    right: -8px;
    top: 9px;
  }
`;
export const CreatedTime = styled.p`
  margin-right: 7px;
  font-size: 13px;
  color: #717171;
  font-weight: bold;
`;
