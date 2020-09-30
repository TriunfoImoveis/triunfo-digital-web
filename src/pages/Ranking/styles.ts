import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 0 3.2rem;

  > svg {
    position: absolute;
    width: 28rem;
    top: 0;
    left: 0;
    z-index: 0;
  }

  @media (max-width: 768px) {
    > svg {
      position: absolute;
      width: 20rem;
      top: 0;
      left: 0;
      z-index: 0;
    }
  }
`;

export const Content = styled.div`
  margin: 0 auto;
  max-width: 1120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;

export const Title = styled.h1`
  margin-top: 3.2rem;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 7rem;
  font-weight: normal;

  @media (max-width: 375px) {
    margin-top: 1.2rem;
    font-size: 3rem;
  }
`;
