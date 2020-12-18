import styled from 'styled-components';

export const Container = styled.div`
  max-width: 96rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-bottom: 3.5rem;
    font-size: 3.2rem;
    line-height: 3.7rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
export const Content = styled.div`
  width: 100%;
  form {
    display: flex;
    flex-direction: column;
    width: 100%;

    .submit {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      outline: 0;
      height: 6.4rem;
      background: #6fcf97;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 4px;
      margin-bottom: 1.6rem;

      color: #ffffff;

      > span {
        margin-left: 1.2rem;
        font-size: 32px;
        line-height: 37px;

        color: #ffffff;
      }
    }
  }
`;
export const SaleData = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 10;
  .login {
    width: 100%;
    border: 0;
    padding: 0 0.8rem 0.8rem 0.8rem;

    > legend {
      font-weight: bold;
      font-size: 20px;
      line-height: 23px;
      color: #c32925;
      margin-bottom: 2.5rem;
    }

    > div {
      width: 100%;
      padding-left: 2rem;
      margin-bottom: 0.8rem;
    }
    > div + div {
      margin-bottom: 0.8rem;
    }
  }
`;

export const Legend = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0;
  margin-bottom: 0;
  > legend {
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
    color: #c32925;
    margin-bottom: 2.5rem;
  }

  > button {
    display: flex;
    align-items: center;
    justify-content: center;

    background: none;
    border: 0;

    > span {
      margin-left: 0.8rem;
      color: ${({ theme }) => theme.colors.textColor};
      transition: color 0.2s;

      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;

export const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    flex: 1;
    & + div {
      margin-left: 1.2rem;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-left: 3.2rem;
  padding-bottom: 1.2rem;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    margin-right: 0.8rem;
    height: 6rem;

    background: none;
    border: 0.1rem solid ${({ theme }) => theme.colors.primary};
    /* Primary Triunfo */
    box-sizing: border-box;
    border-radius: 4px;

    > span {
      margin-left: 3.7rem;
      font-size: 24px;
      line-height: 28px;

      color: #c32925;
    }
  }

  > button + button {
    margin-left: 3rem;
  }
`;

export const PaymentInstallments = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Plot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    flex: 1;
    & + div {
      margin-left: 1.2rem;
    }
  }
`;

export const AddButton = styled.button`
  margin-top: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.7rem;
  height: 4.8rem;
  border: 0;
  border-radius: 0 0.4rem 0.4rem 0;
  background: ${({ theme }) => theme.colors.primaryAlpha};
`;

export const ActionsButton = styled.div`
  display: flex;
`;
