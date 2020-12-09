import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  padding: 0 1.6rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-bottom: 1.6rem;

  > svg {
    margin-top: 5.2rem;
    width: 30rem;
    margin-bottom: 5rem;
  }

  h1 {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 3.2rem;
    line-height: 3.7rem;
    color: ${({ theme }) => theme.colors.primary};

    margin-bottom: 4.3rem;
  }

  form {
    width: 37rem;
    > div {
      margin-bottom: 1.6rem;
    }
  }

  @media (max-width: 375px) {
    > svg {
      margin-top: 1.2rem;
      width: 8rem;
      margin-bottom: 1.4rem;
    }

    > h1 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }
    > form {
      width: 30rem;
    }
  }
`;
