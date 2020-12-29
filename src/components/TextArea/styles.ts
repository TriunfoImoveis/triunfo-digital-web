import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
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


  > textarea {
    background: transparent;
    padding: 1.2rem;
    height: 100%;
    flex: 1;
    border: 0;
    color: ${({ theme }) => theme.colors.textColor};
    font-size: 1.2rem;
    &::placeholder {
      color: ${({ theme }) => theme.colors.textColorAlpha};
    }
  }

  @media (max-width: 375px) {
    textarea {
      font-size: 1.2rem;
    }
  }
`;

export const Error = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.tiny};
  color: ${({ theme }) => theme.colors.danger};
`;
