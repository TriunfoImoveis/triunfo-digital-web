import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      margin: 0.8rem 0;
      width: 27rem;
      height: 4.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: 0.2rem solid ${({ theme }) => theme.colors.primary};
      border-radius: 0.5rem;

      > span {
        margin-right: 0.5rem;

        font-size: 1.6rem;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }

  @media (max-width: 500px) {
    width: 100%;
    h2 {
      font-size: 1.6rem;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  width: 100%;
  > div {
    button {
      margin-left: 30rem;
      border: 0;
      background: transparent;
      color: ${({ theme }) => theme.colors.primary};

      > svg {
        margin-right: 1rem;
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }

  h2 {
    margin-top: 2rem;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 500px) {
    width: 100%;
    h2 {
      font-size: 1.6rem;
    }
  }
`;
export const FormContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 500px) {
    .select__placeholder {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.colors.textColorAlpha};
    }
  }
`;

export const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    width: 50%;
    & + div {
      margin-left: 1.2rem;
    }
  }

  @media (max-width: 500px) {
    flex-direction: column;
    > div {
      width: 100%;
      & + div {
        margin-left: 0;
      }
    }
  }
`;
