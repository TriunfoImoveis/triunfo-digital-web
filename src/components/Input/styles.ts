import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  > input {
    background: transparent;
    height: 100%;
    flex: 1;
    border: 0;
    color: ${({ theme }) => theme.colors.textColor};
    &::placeholder {
      color: ${({ theme }) => theme.colors.textColor};
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
      color: ${({ theme }) => theme.colors.textColor};
    }
  }
  > svg {
    margin-right: 16px;
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

  margin-right: 0.8rem;
`;

export const Error = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.tiny};
  color: ${({ theme }) => theme.colors.danger};
`;
