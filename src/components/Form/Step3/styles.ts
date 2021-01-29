import styled from 'styled-components';
import Input from '../../Input';
import InputMask from '../../Input/InputMask';

export const Container = styled.div`
  padding-bottom: 1.6rem;
  form {
    margin-top: 1.2rem;
  }
`;
export const InputForm = styled(Input)`
  padding: 0 0.8rem;
`;

export const InputFormMask = styled(InputMask)`
  padding: 0 0.8rem;
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    width: 50%;
  }

  div + div {
    margin-left: 0.8rem;
  }

  @media (max-width: 375px) {
    flex: 1;
    flex-direction: column;

    > div,
    select,
    input {
      width: 100%;
      margin-top: 0;
    }
    div + div {
      margin-left: 0;
    }
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

  @media (max-width: 375px) {
    flex: 1;
    flex-direction: column;

    > button {
      width: 100%;
    }

    button + button {
      margin-left: 0;
    }
  }
`;

export const UserSallersContainer = styled.div`
  display: flex;
  flex-direction: column;

  div + div {
    margin-left: 0;
  }
`;
export const UserCaptivators = styled.div`
  display: flex;
  flex-direction: column;

  div + div {
    margin-left: 0;
  }
`;

export const Directors = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  > span {
    margin-top: 0.8rem;

    padding-bottom: 0.2rem;
    font-size: 1.6rem;
    line-height: 1.9rem;
    color: #898989;
  }

  > input {
    border-radius: 0.5rem;
    padding: 1rem;
    background: transparent;
    padding-left: 1.2rem;
    width: 100%;
    height: 4.3rem;
    flex: 1;
    border: 0.1rem solid ${({ theme }) => theme.colors.textColorAlpha};
    color: ${({ theme }) => theme.colors.textColor};
    &::placeholder {
      color: ${({ theme }) => theme.colors.textColorAlpha};
    }
  }

  input:read-only {
    background-color: rgba(129, 129, 129, 0.1);
  }

  @media (max-width: 500px) {
    > span {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 375px) {
    input {
      font-size: 1.2rem;
    }
  }
`;
