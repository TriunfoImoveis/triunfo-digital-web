import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 0 3.2rem;
`;

export const Content = styled.div`
  margin: 0 auto;
  max-width: 1120px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > h1 {
    margin-top: 2rem;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 2.4rem;
    margin-bottom: 2rem;
  }

  > img {
    width: 40rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    margin-top: 3rem;
    > h1 {
      font-size: 2rem;
      margin-bottom: 5rem;
    }
    > img {
      width: 39rem;
      margin-bottom: 10rem;
    }
  }
  @media (max-width: 375px) {
    margin-top: 1rem;
    > h1 {
      font-size: 1.4rem;
      margin-bottom: 2rem;
    }
    > img {
      width: 28rem;
      margin-bottom: 2rem;
    }
  }
`;
export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  > button {
    width: 27rem;
    background: ${({ theme }) => theme.colors.background};
    border: 0.1rem solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 400;
    &:hover {
      background: ${({ theme }) => theme.colors.primaryAlpha};
    }
    & + button {
      margin-left: 3rem;
    }
  }

  @media (max-width: 768px) {
    button {
      height: 4.8rem;
      font-size: 1.6rem;
    }
  }
  @media (max-width: 375px) {
    margin-top: 0;
    button {
      height: 3.6rem;
      font-size: 1.4rem;
    }
  }
`;
