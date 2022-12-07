import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    width: 100%;
    overflow-y: auto;
    h3 {
      font-size: 2rem;
      font-weight: 500;
      line-height: 2.2rem;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  .add-button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 34.4rem;
    height: 4.9rem;
    background-color: #6fcf97;

    > svg {
      width: 2.5rem;
      height: 2.5rem;
      margin-right: 2rem;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  p {
    margin-left: 6rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.textColor};
    strong {
      margin-left: 1rem;
    }
  }
`;
export const InputGroup = styled.div`
  display: flex;

  > div {
    flex: 1;

    & + div {
      margin-left: 4rem;
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

interface AddButtonProps {
  disabled?: boolean;
}

export const AddButton = styled.button<AddButtonProps>`
  margin-top: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.7rem;
  height: 4rem;
  border: 0;
  border-radius: 0.4rem;
  background: ${(props) => props.disabled ? 'transparent' :  props.theme.colors.primaryAlpha};

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
