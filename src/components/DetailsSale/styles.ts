import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1120px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  z-index: 10;

  h1 {
    margin-top: 2.4rem;
    margin-bottom: 3.5rem;
    font-size: 3.2rem;
    line-height: 3.7rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
export const Content = styled.div`
  width: 100%;
  padding: 0 3rem;
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .nav-tabs {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  .nav-tabs .nav-link.active {
    color: ${({ theme }) => theme.colors.primary};
    background-color: transparent;
    border-color: ${({ theme }) => theme.colors.primary}
      ${({ theme }) => theme.colors.primary} #fff;
  }

  .nav-tabs .nav-link {
    padding: 0.5rem 3rem;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.8rem;
    border-radius: 1rem 1rem 0 0;
    &:hover {
      border-color: ${({ theme }) => theme.colors.primaryAlpha}
        ${({ theme }) => theme.colors.primaryAlpha} #fff;
    }
  }
`;
export const SaleData = styled.div`
  width: 100%;
  margin-top: 2rem;
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
      color: ${({ theme }) => theme.colors.primary};
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
    > .submit {
      margin-left: 2rem;
      width: 97%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      outline: 0;
      height: 6.4rem;
      background: ${({ theme }) => theme.colors.success};
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 4px;
      margin-bottom: 1.6rem;

      color: #ffffff;

      &:hover {
        background: ${({ theme }) => theme.colors.secondaryLight}
      }
      &:disabled {
        background: ${({ theme }) => theme.colors.textColor};
        cursor: not-allowed;
      }

      > span {
        margin-left: 1.2rem;
        font-size: 32px;
        line-height: 37px;

        color: #ffffff;
      }
    }
  }

  .not-coordinator {
    display: flex;
    align-items: center;

    input[type='checkbox'] {
      width: 2rem;
      height: 2rem;
      margin-left: 0;
    }
    > label {
      margin-top: 0.5rem;
      margin-left: 0.5rem;
      font-size: 1.4rem;
      color: ${({ theme }) => theme.colors.textColor};
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
    color: ${({ theme }) => theme.colors.primary};
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
      margin-left: 1.5rem;
    }
  }

  .addPlots {
    grid-area: addPlots;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;

  button + button {
    margin-left: 0.8rem;
  }
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

      color: ${({ theme }) => theme.colors.primary};
    }

    > svg {
      path {
        fill: ${({ theme }) => theme.colors.primary}
      }
    }
  }
`;

export const PaymentInstallments = styled.div`
  display: flex;
  flex-direction: column;

  > span {
    font-size: 1.6rem;
    text-transform: uppercase;
    margin: 0.8rem 0;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }

  > strong {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.textColor};
  }
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
  background: ${({ theme }) => theme.colors.danger};

  &.valid {
    margin-top: 2.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.7rem;
    height: 4.8rem;
    border: 0;
    border-radius: 0 0.4rem 0.4rem 0;
    background: ${({ theme }) => theme.colors.success};
  }
`;

export const ActionsButton = styled.div`
  display: flex;
`;

export const ButtonModal = styled.button`
  width: 20.9rem;
  margin-right: 11rem;
  padding-top: 2rem;
  background: none;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-left: 0.8rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.primary};

    &:hover {
      color: ${({ theme }) => theme.colors.primaryDark};
    }
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -200px;
  margin-bottom: 3rem;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40.3rem;
    height: 6rem;
    border: 0;
    background-color: ${({ theme }) => theme.colors.success};
    transition: background-color 0.2s;

    color: #fff;
    font-size: ${({ theme }) => theme.fontSize.large};

    &:hover {
      background-color: ${({ theme }) => theme.colors.successLight};
    }

    > svg {
      margin-right: 1.2rem;
    }
  }
`;

export const ContentFallForm = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  > form {
  }
  > form > div {
    margin-top: 50px;
    margin-bottom: 2rem;
  }

  > form > textarea {
    width: 100%;
    height: 20rem;
    padding: 2.4rem;
    border-radius: ${({ theme }) => theme.borderRadius};
    border-color: ${({ theme }) => theme.colors.borderColor};
  }
`;

export const BonusConatainer = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.textColor};

    margin-right: 0.8rem;
  }

  @media (max-width: 375px) {
    span {
      font-size: 1.2rem;
    }
  }
`;

export const AlertDanger = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  width: 100%;
  height: 5rem;
  background: ${({ theme }) => theme.colors.dangerLight};
  font-size: 1.6rem;
  border-radius: 0.5rem;
  border: 0.2rem solid ${({ theme }) => theme.colors.danger};
`;
