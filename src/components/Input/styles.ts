import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  status?: string;
}

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;

  span.label {
    margin-top: 0.8rem;

    padding-bottom: 0.2rem;
    font-size: 1.6rem;
    line-height: 1.9rem;
    color: #898989;
  }

  @media (max-width: 500px) {
    span.label {
      font-size: 1.2rem;
    }
  }
`;

export const Container = styled.div<ContainerProps>`
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 0.1rem solid ${({ theme }) => theme.colors.textColorAlpha};
  width: 100%;
  height: 4.5rem;
  display: flex;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      color: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.borderColor};
    `} 
  ${props =>
    props.isFilled &&
    css`
      color: ${({ theme }) => theme.colors.primary};
    `}
    ${props =>
    props.status === 'PENDENTE' &&
    css`
      background-color: ${({ theme }) => theme.colors.warningAlpha};
      border-color: ${({ theme }) => theme.colors.warningAlpha};
    `}
    ${props =>
    props.status === 'PAGO' &&
    css`
      background-color: ${({ theme }) => theme.colors.successAlpha};
      border-color: ${({ theme }) => theme.colors.successAlpha};
    `}


  > input {
    background: transparent;
    padding-left: 1.2rem;
    height: 100%;
    flex: 1;
    border: 0;
    color: ${({ theme }) => theme.colors.textColor};
    &::placeholder {
      color: ${({ theme }) => theme.colors.textColorAlpha};
    }
  }

  input[type='date'] {
    background: transparent;
    height: 100%;
    flex: 1;
    border: 0;
    font-family: 'Roboto';
    font-size: 16px;
    color: ${({ theme }) => theme.colors.textColor};
    &::placeholder {
      color: ${({ theme }) => theme.colors.textColorAlpha};
    }
  }
  > svg {
    margin-right: 16px;
  }

  input:read-only {
    background-color: rgba(129, 129, 129, 0.1);
  }

  @media (max-width: 375px) {
    input {
      font-size: 1.2rem;
    }
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.9rem;
  height: 100%;
  border: 0;
  border-radius: 0.4rem 0 0 0.4rem;
  background: ${({ theme }) => theme.colors.primaryAlpha};
`;

export const Error = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.tiny};
  color: ${({ theme }) => theme.colors.danger};
`;
