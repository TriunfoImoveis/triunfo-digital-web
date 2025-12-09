import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 0 3.2rem;
  overflow-y: auto;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  header {
    margin-top: 0.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    > h1 {
      font-family: Roboto;
      font-weight: 500;
      font-size: 3.2rem;
      line-height: 3.7rem;
      color: ${({ theme }) => theme.colors.primary};
      margin-bottom: 1.6rem;
    }
  }

  @media (max-width: 425px) {
    header {
      > h1 {
        font-size: 2rem;
        line-height: 2.3rem;
        margin-bottom: 1.4rem;
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
  }
  @media (max-width: 425px) {
    > form {
      padding: 0;
    }
  }
`;
