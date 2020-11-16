import styled from 'styled-components';
import Input from '../../Input';
import InputMask from '../../Input/InputMask';

export const Container = styled.div`
  form {
    margin-top: 1.2rem;
    div {
      margin: 0.2rem 0;
    }
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
  justify-content: space-between;

  > div,
  select,
  input {
    width: 50%;
    margin-top: 0;
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

export const FifityContainer = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.textColor};

    margin-right: 0.8rem;
  }
`;
