import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  padding: 0 3.2rem;

  > svg {
    position: absolute;
    width: 30rem;
    height: 50rem;
    top: 130px;
    left: -8px;
    z-index: 0;
  }
`;

export const Content = styled.div`
  margin: 0 auto;
  max-width: 1500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;
