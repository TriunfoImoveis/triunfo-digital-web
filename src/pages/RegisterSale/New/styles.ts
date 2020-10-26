import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 0 3.2rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  header {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    > h1 {
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 3.2rem;
      line-height: 3.7rem;
      color: ${({ theme }) => theme.colors.primary};
      margin-bottom: 1.6rem;
    }

    > span {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 2rem;
      line-height: 1.6rem;
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  @media (max-width: 425px) {
    header {
      margin-top: 1.6rem;

      > h1 {
        font-size: 2rem;
        line-height: 2.3rem;
        margin-bottom: 1.4rem;
      }

      > span {
        font-size: 1.4rem;
        line-height: 1.6rem;
      }
    }
  }
`;

export const FormContainer = styled.div`
  max-width: 80rem;
  width: 100%;

  margin-top: 0.8rem;

  > form {
    padding: 0 9rem;
    > div {
      height: 4.8rem;
      margin-bottom: 0.8rem;
      > input {
        padding: 0 1.6rem;
        &::placeholder {
          color: ${({ theme }) => theme.colors.textColorAlpha};
        }
      }
    }
  }

  @media (max-width: 425px) {
    > form {
      padding: 0;
    }
  }
`;

export const TabNavigator = styled.div`
  height: 3.2rem;
  background-color: rgba(129, 129, 129, 0.3);
`;

export const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;

  > div,
  select {
    width: 50%;
  }
  div + div {
    margin-left: 0.8rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;

  > button {
    width: 50%;
  }

  button + button {
    margin-left: 0.8rem;
  }

  .cancel,
  .next {
    height: 4.5rem;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 1.6rem;
    line-height: 1.9rem;

    color: #ffffff;
  }

  .cancel {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
    border: 0.1rem solid ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 425px) {
    .cancel,
    .next {
      height: 3.6rem;
    }
  }
`;
