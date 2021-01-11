import styled from 'styled-components';

export const Container = styled.div`
  max-width: 770px;
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

  form {
    display: flex;
    flex-direction: column;
    width: 100%;

    .submit {
      border: 0;
      outline: 0;
      height: 6.4rem;
      background: #6fcf97;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 4px;
      margin-bottom: 1.6rem;

      font-size: 32px;
      line-height: 37px;

      color: #ffffff;
    }
  }
`;

export const InfoLogin = styled.div`
  position: relative;
  width: 100%;
  padding-right: 0.8rem;
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
      padding-left: 2rem;
      margin-bottom: 0.8rem;
    }

    > div + div {
      margin-bottom: 0.8rem;
    }
  }
`;

export const AdmissionsInfo = styled.div`
  width: 100%;
  padding-right: 0.8rem;
  .login {
    border: 0;
    padding: 0 0 0.8rem 0.8rem;

    > legend {
      font-weight: bold;
      font-size: 20px;
      line-height: 23px;
      color: #c32925;
      margin-bottom: 2.5rem;
    }

    > div {
      padding-left: 2rem;
      margin-bottom: 0.8rem;
    }

    > div + div {
      margin-bottom: 0.8rem;
    }
  }
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    flex: 1;
    padding-left: 0.8rem;
  }

  > div + div {
    margin-left: 3rem;
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
export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
