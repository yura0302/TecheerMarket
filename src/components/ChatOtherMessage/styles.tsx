import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;
export const OtherMessage = styled.div`
  position: relative;
  min-height: 15px;
  min-width: 30px;
  max-width: 680px;
  background-color: #ececec;
  color: black;
  font-weight: bold;
  display: flex;
  justify-content: right;
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
    border-color: transparent ${(props) => props.theme.subColor};
    display: block;
    width: 0;
    z-index: 0;
    left: 10px;
    top: 9px;
  }

  &::after {
    content: '';
    position: absolute;
    border-color: transparent #ffffff;
    display: block;
    width: 0;
    z-index: 1;
    left: -8px;
    top: 9px;
  }
`;
export const CreatedTime = styled.p`
  margin-left: 7px;
  font-size: 13px;
  font-weight: bold;
  color: #717171;
`;
