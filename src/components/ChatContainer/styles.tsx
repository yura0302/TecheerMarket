import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  bottom: 12rem;
  width: 57%;
  max-height: calc(100% - 30rem);
  overflow-y: auto;
`;
export const TodayDate = styled.div`
  width: 336px;
  height: 25px;
  margin: 5px 0;
  text-align: center;
  line-height: 25px;
  color: #717171;
  font-size: 15px;
  font-weight: bold;
`;
