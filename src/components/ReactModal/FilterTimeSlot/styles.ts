import styled from 'styled-components';

export const ContainerWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    margin-bottom: 1rem;
  }

  @media (max-width: 450px) {
    h3 {
      font-size: 1.4rem;
    }
  }
  @media (max-width: 350px) {
    h3 {
      font-size: 1.4rem;
    }
  }
`;
export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;

  form {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    input {
      height: 4rem;
    }

    button {
      margin-top: 0;
      height: 4rem;
    }
  }

  @media (max-width: 450px) {
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 350px) {
    display: flex;
    flex-direction: column;

    button + button {
      margin-top: 1rem;
    }
  }
`;
